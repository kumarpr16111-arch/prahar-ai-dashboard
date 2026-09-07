from fastapi import FastAPI, Request, Form, Response
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os
from typing import Optional 
import supabase_db
import json

app = FastAPI(title="TRACE Dashboard")

# Setup static files and templates
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")
app.mount("/media_screenshots", StaticFiles(directory=os.path.join(BASE_DIR, "Media screenshots")), name="media_screenshots")

templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))
templates.env.cache = None

# Totals (kept local as they are summary aggregates)
WEIGHMENT_TOTAL = { "road_dispatch": "71,161.66 T", "internal_sending": "128,460.86 T", "internal_receiving": "56,108.77 T", "total": "255,731.28 T" }
WEIGHBRIDGE_STATUS_TOTAL = { "operational_total": "104/146", "operational_pct": "71%" }
ADVANCED_ANALYTICS_TOTAL = { "tx_road": 2673, "tx_internal": 7196, "tx_total": 9869, "bypassing": 0, "barrier": 442, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)" }
CHECKPOST_STATUS_TOTAL = { "operational_total": "79/102", "operational_pct": "77%" }
CHECKPOST_ANALYTICS_TOTAL = { "entry_total": 6022, "entry_anpr": "18 (0.3%)", "exit_total": 6046, "exit_anpr": "18 (0.3%)", "boom_total": 1099, "boom_others": 841, "boom_dept": 258, "boom_pct": "100%" }
VTS_ALERT_TOTAL = { "offroute_closed": "54/64", "offroute_pct_closed": "84.38%", "offroute_pct_total": "100.00%", "offarea_closed": "63/71", "offarea_pct_closed": "88.73%", "offarea_pct_total": "100.00%", "overlap": 9, "tamper_closed": "700/1956", "tamper_pct_closed": "35.79%", "tamper_pct_total": "100.00%", "stoppage_closed": "27/1715", "stoppage_pct_closed": "1.57%", "stoppage_pct_total": "100.00%" }
VTS_FLEET_TOTAL = { "total_vehicle": 2279, "online": 1621, "pct_online": "71.13%", "offline": 496, "pct_offline": "21.76%", "workshop": 162, "offline_48h": 360, "offline_7d": 254, "no_data": 29, "no_route": 22 }

@app.get("/")
async def read_root(request: Request):
    session_user = request.cookies.get("session_user")
    users = await supabase_db.fetch_app_users()
    user_info = next((u for u in users if u["username"] == session_user), None)
    
    if not session_user or not user_info:
        return RedirectResponse(url="/login", status_code=303)

    # Fetch live data from Supabase
    live_weighbridge = await supabase_db.fetch_weighbridge_data()
    live_checkpost = await supabase_db.fetch_checkpost_data()
    live_fleet = await supabase_db.fetch_vts_fleet_data()
    live_alerts = await supabase_db.fetch_security_alerts()
    
    weighbridge_status_data = await supabase_db.fetch_weighbridge_status()
    advanced_analytics_data = await supabase_db.fetch_advanced_analytics()
    checkpost_status_data = await supabase_db.fetch_checkpost_status()
    checkpost_analytics_data = await supabase_db.fetch_checkpost_analytics()
    vts_alert_data = await supabase_db.fetch_vts_alert_summary()
    
    rfid_config = await supabase_db.fetch_rfid_config()
    rfid_op_wbs = [r for r in rfid_config if r["type"] == "WEIGHBRIDGE" and r["is_operational"]]
    rfid_non_op_wbs = [r for r in rfid_config if r["type"] == "WEIGHBRIDGE" and not r["is_operational"]]
    rfid_op_cps = [r for r in rfid_config if r["type"] == "CHECKPOST" and r["is_operational"]]
    rfid_non_op_cps = [r for r in rfid_config if r["type"] == "CHECKPOST" and not r["is_operational"]]
    
    irregular_vehicles = await supabase_db.fetch_irregular_vehicles()
    irregular_dos = await supabase_db.fetch_irregular_dos()

    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={
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
            "user_id": session_user
        },
        headers={"Cache-Control": "no-store, no-cache, must-revalidate, max-age=0"}
    )

@app.get("/login")
async def get_login(request: Request):
    session_user = request.cookies.get("session_user")
    if session_user:
        users = await supabase_db.fetch_app_users()
        if any(u["username"] == session_user for u in users):
            return RedirectResponse(url="/", status_code=303)
    return templates.TemplateResponse(
        request=request,
        name="login.html",
        context={"error": None}
    )

@app.post("/login")
async def post_login(
    request: Request,
    username: str = Form(""),
    password: str = Form(""),
    role: Optional[str] = Form(None)
):
    cleaned_user = username.strip().lower()
    cleaned_pass = password.strip()
    selected_role = role.strip().lower() if role else None

    users = await supabase_db.fetch_app_users()

    if selected_role:
        user_info = next((u for u in users if u["username"] == selected_role), None)
        if user_info:
            valid_identifiers = {
                selected_role,
                user_info.get("email", "").lower(),
                f"{selected_role}@trace.gov.in",
                f"{selected_role}@trace2026",
                f"{selected_role}@trace.in"
            }
            if (cleaned_user in valid_identifiers or cleaned_user == selected_role) and user_info["password"] == cleaned_pass:
                response = RedirectResponse(url="/", status_code=303)
                response.set_cookie(key="session_user", value=selected_role, max_age=86400, httponly=True, samesite="lax")
                response.set_cookie(key="user_role", value=user_info["role"], max_age=86400, samesite="lax")
                response.set_cookie(key="user_name", value=user_info["name"], max_age=86400, samesite="lax")
                response.set_cookie(key="user_designation", value=user_info["designation"], max_age=86400, samesite="lax")
                return response
            else:
                return templates.TemplateResponse(
                    request=request,
                    name="login.html",
                    context={"error": f"Invalid Email/ID or Password for selected role '{user_info['designation']}'."}
                )

    for user_info in users:
        role_key = user_info["username"]
        valid_identifiers = {
            role_key,
            user_info.get("email", "").lower(),
            f"{role_key}@trace.gov.in",
            f"{role_key}@trace2026",
            f"{role_key}@trace.in"
        }
        if cleaned_user in valid_identifiers and user_info["password"] == cleaned_pass:
            response = RedirectResponse(url="/", status_code=303)
            response.set_cookie(key="session_user", value=role_key, max_age=86400, httponly=True, samesite="lax")
            response.set_cookie(key="user_role", value=user_info["role"], max_age=86400, samesite="lax")
            response.set_cookie(key="user_name", value=user_info["name"], max_age=86400, samesite="lax")
            response.set_cookie(key="user_designation", value=user_info["designation"], max_age=86400, samesite="lax")
            return response

    return templates.TemplateResponse(
        request=request,
        name="login.html",
        context={"error": "Invalid Role, User ID/Email, or Password. Please select a role and verify credentials."}
    )

# =========================================================================
# REST API ENDPOINTS FOR SUPABASE LIVE DATA & REAL-TIME DEMO
# =========================================================================

@app.get("/api/data/weighbridge")
async def api_get_weighbridge():
    data = await supabase_db.fetch_weighbridge_data()
    return {"status": "success", "count": len(data), "data": data}

@app.get("/api/data/checkpost")
async def api_get_checkpost():
    data = await supabase_db.fetch_checkpost_data()
    return {"status": "success", "count": len(data), "data": data}

@app.get("/api/data/vts")
async def api_get_vts():
    data = await supabase_db.fetch_vts_fleet_data()
    return {"status": "success", "count": len(data), "data": data}

@app.get("/api/data/alerts")
@app.get("/api/alerts")
async def api_get_alerts(status: Optional[str] = None):
    data = await supabase_db.fetch_security_alerts(status_filter=status)
    return {"status": "success", "count": len(data), "data": data}

@app.post("/api/alerts/{alert_id}/acknowledge")
async def api_acknowledge_alert(alert_id: int):
    ok = await supabase_db.update_alert_status(alert_id, "ACKNOWLEDGED")
    return {"status": "success" if ok else "error", "alert_id": alert_id, "new_status": "ACKNOWLEDGED"}

@app.post("/api/alerts/{alert_id}/resolve")
async def api_resolve_alert(alert_id: int):
    ok = await supabase_db.update_alert_status(alert_id, "RESOLVED")
    return {"status": "success" if ok else "error", "alert_id": alert_id, "new_status": "RESOLVED"}

@app.post("/api/alerts/simulate")
async def api_simulate_alert(request: Request):
    import random
    types = [
        ("Unauthorized Stoppage", "CRITICAL", "Vehicle stationary in unapproved transit sector > 18 mins with coal payload."),
        ("Geofence Route Breach", "HIGH", "Vehicle deviated 340 meters outside approved mining corridor."),
        ("Weight Anomaly Detected", "WARNING", "Gross weight registered +3.1 Tons over authorized e-Way bill capacity."),
        ("Unregistered RFID Ingate", "HIGH", "Vehicle RFID scan unrecognized at Siding Gate 4.")
    ]
    chosen = random.choice(types)
    veh_no = f"JH0{random.randint(1,9)}-{chr(random.randint(65,90))}{chr(random.randint(65,90))}-{random.randint(1000,9999)}"
    loc = random.choice(["Amrapali Sector 3 Road", "Piparwar Coal Washery Route", "Ashoka Siding Platform B", "Karkatta Section C"])
    
    alert_obj = {
        "alert_type": chosen[0],
        "vehicle_no": veh_no,
        "location": loc,
        "severity": chosen[1],
        "status": "ACTIVE",
        "confidence_score": random.randint(90, 99),
        "description": chosen[2]
    }
    result = await supabase_db.create_security_alert(alert_obj)
    return {"status": "success", "created_alert": result}

@app.post("/api/vts/simulate-step")
async def api_simulate_vts_step():
    import random
    fleet = await supabase_db.fetch_vts_fleet_data()
    if fleet:
        veh = random.choice(fleet)
        delta_lat = random.uniform(-0.0008, 0.0008)
        delta_lng = random.uniform(-0.0008, 0.0008)
        new_speed = max(0, min(55, veh.get("speed", 30) + random.randint(-4, 4)))
        await supabase_db.update_vts_telemetry(veh["vehicle_no"], delta_lat, delta_lng, new_speed)
    return {"status": "success"}

@app.get("/api/audit-reports")
def get_audit_reports():
    manifest_path = os.path.join(BASE_DIR, "static", "reports_split", "manifest.json")
    if os.path.exists(manifest_path):
        with open(manifest_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

@app.get("/logout")
def get_logout():
    response = RedirectResponse(url="/login", status_code=303)
    response.delete_cookie("session_user")
    response.delete_cookie("user_role")
    response.delete_cookie("user_name")
    response.delete_cookie("user_designation")
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
