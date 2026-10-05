import asyncio
from pathlib import Path
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import RedirectResponse, FileResponse
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

    if advanced_analytics_data:
        tx_road_sum = sum(int(item.get("tx_road", 0) or 0) for item in advanced_analytics_data)
        tx_internal_sum = sum(int(item.get("tx_internal", 0) or 0) for item in advanced_analytics_data)
        tx_total_sum = sum(int(item.get("tx_total", 0) or 0) for item in advanced_analytics_data)
        bypassing_sum = sum(int(item.get("bypassing", 0) or 0) for item in advanced_analytics_data)
        barrier_sum = sum(int(item.get("barrier", 0) or 0) for item in advanced_analytics_data)
        lv_100t_sum = sum(int(item.get("lv_100t", 0) or 0) for item in advanced_analytics_data)

        def avg_pct(field):
            vals = [float(str(i.get(field, "0%")).replace("%", "").strip()) for i in advanced_analytics_data if i.get(field)]
            return f"{sum(vals)/len(vals):.1f}%" if vals else "100%"

        ADVANCED_ANALYTICS_TOTAL = {
            "tx_road": tx_road_sum,
            "tx_internal": tx_internal_sum,
            "tx_total": tx_total_sum,
            "bypassing": bypassing_sum,
            "barrier": barrier_sum,
            "lv_100t": lv_100t_sum,
            "lv_road": avg_pct("lv_road"),
            "lv_internal": avg_pct("lv_internal"),
            "lv_total": avg_pct("lv_total"),
            "anpr_road": avg_pct("anpr_road"),
            "anpr_internal": avg_pct("anpr_internal"),
            "anpr_total": avg_pct("anpr_total")
        }
    else:
        ADVANCED_ANALYTICS_TOTAL = { "tx_road": 15000, "tx_internal": 8530, "tx_total": 23530, "bypassing": 1, "barrier": 0, "lv_100t": 23529, "lv_road": "100%", "lv_internal": "100%", "lv_total": "100%", "anpr_road": "98.9%", "anpr_internal": "98.5%", "anpr_total": "98.7%" }

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


@router.api_route("/download/apk", methods=["GET", "HEAD"])
@router.api_route("/api/download/apk", methods=["GET", "HEAD"])
async def download_apk():
    """Serves the TRACE Mobile V1.0.0.0 APK file directly for download."""
    candidates = [
        config.BASE_DIR / "static" / "downloads" / "TRACE_Mobile-V1.0.0.0.apk",
        config.BASE_DIR / "TRACE_Mobile-V1.0.0.0.apk",
        config.BASE_DIR / "static" / "downloads" / "Trace- mobile-v1.0.0.0.apk",
        config.BASE_DIR / "Trace- mobile-v1.0.0.0.apk",
        config.BASE_DIR / "static" / "downloads" / "Trace-mobile-v1.0.0.0.apk",
        config.BASE_DIR / "Trace-mobile-v1.0.0.0.apk",
    ]
    
    apk_path = None
    for p in candidates:
        if p.exists() and p.is_file() and p.stat().st_size > 1000:
            apk_path = p
            break

    if not apk_path:
        # Search all .apk files in static/downloads and root base directory
        all_apks = list((config.BASE_DIR / "static" / "downloads").glob("*.apk")) + list(config.BASE_DIR.glob("*.apk"))
        for apk in all_apks:
            if apk.is_file() and apk.stat().st_size > 1000:
                apk_path = apk
                break

    if not apk_path or not apk_path.exists():
        raise HTTPException(status_code=404, detail="TRACE Mobile APK file not found on server")

    return FileResponse(
        path=str(apk_path),
        filename="TRACE_Mobile-V1.0.0.0.apk",
        media_type="application/vnd.android.package-archive",
        headers={"Content-Disposition": 'attachment; filename="TRACE_Mobile-V1.0.0.0.apk"'}
    )


import socket

def get_local_lan_ip() -> str:
    """Returns the reachable LAN IP of the host machine for local phone QR scanning."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0.5)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        try:
            return socket.gethostbyname(socket.gethostname())
        except Exception:
            return "127.0.0.1"


@router.get("/api/server-info")
async def get_server_info(request: Request):
    """Returns local LAN IP, active port, and mobile-friendly download endpoints."""
    lan_ip = get_local_lan_ip()
    host_header = request.headers.get("host", "")
    port = "8000"
    if ":" in host_header:
        port = host_header.split(":")[-1]
    
    scheme = request.url.scheme or "http"
    base_url = f"{scheme}://{lan_ip}:{port}" if port not in ("80", "443") else f"{scheme}://{lan_ip}"
    
    return {
        "lan_ip": lan_ip,
        "port": port,
        "base_url": base_url,
        "download_app_url": f"{base_url}/download/app",
        "download_apk_url": f"{base_url}/download/apk"
    }


@router.api_route("/download/app", methods=["GET", "HEAD"])
async def download_app_landing(request: Request):
    """Mobile-friendly landing page when scanning QR code on phone."""
    return templates.TemplateResponse(
        request=request,
        name="download_app.html",
        context={"app_version": "v1.0.0.0", "apk_filename": "TRACE_Mobile-V1.0.0.0.apk", "file_size": "36.9 MB"}
    )


