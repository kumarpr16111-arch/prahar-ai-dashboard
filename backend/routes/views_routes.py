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

    # Calculate summary totals
    weighment_total = {
        "pass_count": sum(1 for r in live_weighbridge if (r.get("rfid_status") or "").upper() == "PASS"),
        "fail_count": sum(1 for r in live_weighbridge if (r.get("rfid_status") or "").upper() != "PASS"),
        "total_qty": round(sum(float(r.get("net_weight") or 0) for r in live_weighbridge), 2)
    }

    context = {
        "weighment_data": live_weighbridge,
        "weighment_total": weighment_total,
        "weighbridge_status_data": weighbridge_status_data,
        "weighbridge_status_total": {},
        "advanced_analytics_data": advanced_analytics_data,
        "advanced_analytics_total": {},
        "checkpost_status_data": checkpost_status_data,
        "checkpost_status_total": {},
        "checkpost_analytics_data": checkpost_analytics_data,
        "checkpost_analytics_total": {},
        "vts_alert_data": vts_alert_data,
        "vts_alert_total": {},
        "vts_fleet_data": live_fleet,
        "vts_fleet_total": {},
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
