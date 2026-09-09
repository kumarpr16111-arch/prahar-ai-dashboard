import asyncio
from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates

from backend.core.config import config
from backend.core.security import SessionManager
from backend.services.supabase_service import supabase_service
from backend.services.alert_service import alert_service
from backend.services.fleet_service import fleet_service

router = APIRouter(tags=["Web Views"])
templates = Jinja2Templates(directory=str(config.TEMPLATES_DIR))


@router.get("/")
async def read_root(request: Request):
    """Renders the main command center dashboard for authenticated users with parallel data retrieval."""
    session_user = SessionManager.get_session_user(request)
    users = await supabase_service.fetch_app_users()
    user_info = next((u for u in users if u["username"] == session_user), None)

    if not session_user or not user_info:
        return RedirectResponse(url="/login", status_code=303)

    # Fetch all live datasets concurrently in parallel
    results = await asyncio.gather(
        supabase_service.fetch_weighbridge_data(),
        supabase_service.fetch_checkpost_data(),
        fleet_service.fetch_fleet_data(),
        alert_service.fetch_alerts(),
        supabase_service.fetch_weighbridge_status(),
        supabase_service.fetch_advanced_analytics(),
        supabase_service.fetch_checkpost_status(),
        supabase_service.fetch_checkpost_analytics(),
        supabase_service.fetch_vts_alert_summary(),
        supabase_service.fetch_rfid_config(),
        supabase_service.fetch_irregular_vehicles(),
        supabase_service.fetch_irregular_dos(),
        return_exceptions=True
    )

    def safe_res(val):
        return val if isinstance(val, list) and not isinstance(val, Exception) else []

    (
        live_weighbridge,
        live_checkpost,
        live_fleet,
        live_alerts,
        weighbridge_status_data,
        advanced_analytics_data,
        checkpost_status_data,
        checkpost_analytics_data,
        vts_alert_data,
        rfid_config,
        irregular_vehicles,
        irregular_dos
    ) = [safe_res(r) for r in results]

    rfid_op_wbs = [r for r in rfid_config if r.get("type") == "WEIGHBRIDGE" and r.get("is_operational")]
    rfid_non_op_wbs = [r for r in rfid_config if r.get("type") == "WEIGHBRIDGE" and not r.get("is_operational")]
    rfid_op_cps = [r for r in rfid_config if r.get("type") == "CHECKPOST" and r.get("is_operational")]
    rfid_non_op_cps = [r for r in rfid_config if r.get("type") == "CHECKPOST" and not r.get("is_operational")]

    # Master Summary Totals (Aggregates across all 14 mining areas)
    WEIGHMENT_TOTAL = { "road_dispatch": "71,161.66 T", "internal_sending": "128,460.86 T", "internal_receiving": "56,108.77 T", "total": "255,731.28 T" }
    WEIGHBRIDGE_STATUS_TOTAL = { "operational_total": "104/146", "operational_pct": "71%" }
    ADVANCED_ANALYTICS_TOTAL = { "tx_road": 2673, "tx_internal": 7196, "tx_total": 9869, "bypassing": 0, "barrier": 442, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)" }
    CHECKPOST_STATUS_TOTAL = { "operational_total": "79/102", "operational_pct": "77%" }
    CHECKPOST_ANALYTICS_TOTAL = { "entry_total": 6022, "entry_anpr": "18 (0.3%)", "exit_total": 6046, "exit_anpr": "18 (0.3%)", "boom_total": 1099, "boom_others": 841, "boom_dept": 258, "boom_pct": "100%" }
    VTS_ALERT_TOTAL = { "offroute_closed": "54/64", "offroute_pct_closed": "84.38%", "offroute_pct_total": "100.00%", "offarea_closed": "63/71", "offarea_pct_closed": "88.73%", "offarea_pct_total": "100.00%", "overlap": 9, "tamper_closed": "700/1956", "tamper_pct_closed": "35.79%", "tamper_pct_total": "100.00%", "stoppage_closed": "27/1715", "stoppage_pct_closed": "1.57%", "stoppage_pct_total": "100.00%" }
    VTS_FLEET_TOTAL = { "total_vehicle": 2279, "online": 1621, "pct_online": "71.13%", "offline": 496, "pct_offline": "21.76%", "workshop": 162, "offline_48h": 360, "offline_7d": 254, "no_data": 29, "no_route": 22 }

    context = {
        "weighment_data": live_weighbridge,
        "weighment_total": WEIGHMENT_TOTAL,
        "weighbridge_status_data": weighbridge_status_data,
        "weighbridge_status_total": WEIGHBRIDGE_STATUS_TOTAL,
        "advanced_analytics_data": advanced_analytics_data,
        "advanced_analytics_total": ADVANCED_ANALYTICS_TOTAL,
        "checkpost_status_data": checkpost_status_data,
        "checkpost_status_total": CHECKPOST_STATUS_TOTAL,
        "checkpost_analytics_data": checkpost_analytics_data,
        "checkpost_analytics_total": CHECKPOST_ANALYTICS_TOTAL,
        "vts_alert_data": vts_alert_data,
        "vts_alert_total": VTS_ALERT_TOTAL,
        "vts_fleet_data": live_fleet,
        "vts_fleet_total": VTS_FLEET_TOTAL,
        "live_checkpost_logs": live_checkpost,
        "live_alerts_data": live_alerts,
        "rfid_op_wbs": rfid_op_wbs,
        "rfid_non_op_wbs": rfid_non_op_wbs,
        "rfid_op_cps": rfid_op_cps,
        "rfid_non_op_cps": rfid_non_op_cps,
        "irregular_vehicles": irregular_vehicles,
        "irregular_dos": irregular_dos,
        "current_date": "2026-08-24",
        "user_name": user_info.get("name", "Unknown"),
        "user_designation": user_info.get("designation", ""),
        "user_role": user_info.get("role", ""),
        "user_id": session_user,
        "user_subsidiary": request.cookies.get("user_subsidiary", "CCL")
    }

    return templates.TemplateResponse(request=request, name="index.html", context=context)


@router.get("/login")
async def get_login(request: Request):
    """Renders the login view or redirects if already authenticated."""
    session_user = SessionManager.get_session_user(request)
    if session_user:
        return RedirectResponse(url="/", status_code=303)

    return templates.TemplateResponse(
        request=request,
        name="login.html",
        context={"error": None, "app_version": config.APP_VERSION}
    )
