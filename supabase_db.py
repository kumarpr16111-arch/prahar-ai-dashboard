import httpx
import os
import random
from typing import List, Dict, Any, Optional

# Load local .env if present
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
if os.path.exists(env_path):
    try:
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                if "=" in line and not line.strip().startswith("#"):
                    k, v = line.strip().split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip())
    except Exception:
        pass

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://tlvqakflxvepqqwctixy.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", os.getenv("SUPABASE_ANON_KEY", "sb_publishable_CWp5ao0adBx2TnNb9alAEA_S8iSFqb9"))

def get_headers():
    k = os.getenv("SUPABASE_KEY", os.getenv("SUPABASE_ANON_KEY", "sb_publishable_CWp5ao0adBx2TnNb9alAEA_S8iSFqb9"))
    return {
        "apikey": k,
        "Authorization": f"Bearer {k}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }

# In-memory fallback if network/db is temporarily unreachable during demo
FALLBACK_WEIGHBRIDGE = [
    {"s_no": 1, "name": "Amrapali & Chandragupta (CO07)", "road_dispatch": "18,708.55 T", "internal_sending": "10,826.24 T", "internal_receiving": "0.00 T", "total": "29,534.79 T", "status": "Operational"},
    {"s_no": 2, "name": "Ashoka OCP (CO02)", "road_dispatch": "14,320.10 T", "internal_sending": "8,410.50 T", "internal_receiving": "1,200.00 T", "total": "23,930.60 T", "status": "Operational"},
    {"s_no": 3, "name": "Piparwar Washery (CO01)", "road_dispatch": "12,940.80 T", "internal_sending": "6,150.20 T", "internal_receiving": "0.00 T", "total": "19,091.00 T", "status": "Operational"},
    {"s_no": 4, "name": "Magadh Open Cast (CO08)", "road_dispatch": "22,450.00 T", "internal_sending": "14,200.00 T", "internal_receiving": "0.00 T", "total": "36,650.00 T", "status": "Operational"},
    {"s_no": 5, "name": "North Karanpura Siding (CO09)", "road_dispatch": "9,810.25 T", "internal_sending": "4,320.10 T", "internal_receiving": "3,110.00 T", "total": "17,240.35 T", "status": "Operational"},
    {"s_no": 6, "name": "Tetricon Weighbridge #03", "road_dispatch": "7,450.60 T", "internal_sending": "2,900.40 T", "internal_receiving": "0.00 T", "total": "10,351.00 T", "status": "Operational"}
]

FALLBACK_CHECKPOST = [
    {"checkpost_name": "Checkpost #01 - North Siding", "vehicle_no": "JH01-AX-9912", "driver_name": "Rajesh Kumar Soren", "rfid_tag": "RFID-8829-CCL", "entry_time": "21:15:20", "exit_time": "21:18:40", "status": "Cleared", "payload_type": "Raw Coal Grade G11"},
    {"checkpost_name": "Checkpost #02 - Main Quarry Exit", "vehicle_no": "JH02-CC-4019", "driver_name": "Sunil Mahto", "rfid_tag": "RFID-1920-CCL", "entry_time": "21:22:10", "exit_time": "21:26:05", "status": "Cleared", "payload_type": "Grade G13 Clean Coal"},
    {"checkpost_name": "Checkpost #03 - Weighbridge Siding", "vehicle_no": "JH01-DY-7721", "driver_name": "Manoj Tirkey", "rfid_tag": "RFID-5541-CCL", "entry_time": "21:30:15", "exit_time": "21:34:50", "status": "Cleared", "payload_type": "Overburden Material"},
    {"checkpost_name": "Checkpost #01 - North Siding", "vehicle_no": "JH05-BK-3390", "driver_name": "Ramesh Yadav", "rfid_tag": "RFID-7712-CCL", "entry_time": "21:38:00", "exit_time": "--:--:--", "status": "Inspecting", "payload_type": "Raw Coal Grade G9"},
    {"checkpost_name": "Checkpost #04 - Rail Silo Ingate", "vehicle_no": "JH02-ER-6102", "driver_name": "Vikram Singh", "rfid_tag": "RFID-4002-CCL", "entry_time": "21:40:12", "exit_time": "21:43:00", "status": "Cleared", "payload_type": "Washed Coal"}
]

FALLBACK_FLEET = [
    {"id": 1, "vehicle_no": "JH01-AX-9912", "driver_name": "Rajesh Kumar Soren", "speed": 38, "latitude": 23.8542, "longitude": 85.0512, "route_status": "On Approved Corridor", "fuel_level": 82, "battery_status": "Good (98%)", "destination": "Tori Siding Silo #2"},
    {"id": 2, "vehicle_no": "JH02-CC-4019", "driver_name": "Sunil Mahto", "speed": 42, "latitude": 23.8610, "longitude": 85.0645, "route_status": "On Approved Corridor", "fuel_level": 74, "battery_status": "Good (95%)", "destination": "Piparwar Coal Washery"},
    {"id": 3, "vehicle_no": "JH01-DY-7721", "driver_name": "Manoj Tirkey", "speed": 0, "latitude": 23.8470, "longitude": 85.0420, "route_status": "Halted (>12m)", "fuel_level": 61, "battery_status": "Normal (88%)", "destination": "Dakra Central Weighbridge"},
    {"id": 4, "vehicle_no": "JH05-BK-3390", "driver_name": "Ramesh Yadav", "speed": 29, "latitude": 23.8720, "longitude": 85.0780, "route_status": "Route Deviation (280m)", "fuel_level": 90, "battery_status": "Good (99%)", "destination": "Ashoka Siding Platform #4"},
    {"id": 5, "vehicle_no": "JH02-ER-6102", "driver_name": "Vikram Singh", "speed": 35, "latitude": 23.8590, "longitude": 85.0560, "route_status": "On Approved Corridor", "fuel_level": 68, "battery_status": "Good (92%)", "destination": "Amrapali Siding Berth #1"}
]

FALLBACK_ALERTS = [
    {"id": 1, "alert_type": "Unauthorized Stoppage", "vehicle_no": "JH01-DY-7721", "location": "Karkatta Mining Road (KM 4.2)", "severity": "CRITICAL", "status": "ACTIVE", "confidence_score": 96, "description": "Vehicle halted stationary in unauthorized corridor zone for > 15 minutes with active coal payload."},
    {"id": 2, "alert_type": "Geofence Route Breach", "vehicle_no": "JH05-BK-3390", "location": "Amrapali Sector 4 Western Perimeter", "severity": "HIGH", "status": "ACTIVE", "confidence_score": 92, "description": "Commercial coal tipper deviated 280 meters outside designated geo-fenced coal transport route."},
    {"id": 3, "alert_type": "Weight Variance Detected", "vehicle_no": "JH02-CC-4019", "location": "Piparwar Ingate Weighbridge WB-02", "severity": "WARNING", "status": "ACTIVE", "confidence_score": 88, "description": "Gross weight registered 2.4 Tons higher than e-Way Bill pre-clearance declaration."},
    {"id": 4, "alert_type": "Unregistered RFID Tag", "vehicle_no": "JH09-ZZ-1100", "location": "North Karanpura Checkpost Gate 3", "severity": "HIGH", "status": "ACTIVE", "confidence_score": 99, "description": "RFID tag mismatch: Vehicle attempted gate passage without matching dispatch record in TRACE ERP."}
]


async def fetch_weighbridge_data() -> List[Dict[str, Any]]:
    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.get(f"{SUPABASE_URL}/rest/v1/weighbridge_records?select=*&order=s_no.asc", headers=get_headers())
            if resp.status_code == 200:
                data = resp.json()
                if data:
                    return data
    except Exception as e:
        print(f"[Supabase] fetch_weighbridge_data error: {e}")
    return FALLBACK_WEIGHBRIDGE


async def fetch_checkpost_data() -> List[Dict[str, Any]]:
    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.get(f"{SUPABASE_URL}/rest/v1/checkpost_logs?select=*&order=id.asc", headers=get_headers())
            if resp.status_code == 200:
                data = resp.json()
                if data:
                    return data
    except Exception as e:
        print(f"[Supabase] fetch_checkpost_data error: {e}")
    return FALLBACK_CHECKPOST


async def fetch_vts_fleet_data() -> List[Dict[str, Any]]:
    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.get(f"{SUPABASE_URL}/rest/v1/vts_fleet?select=*&order=id.asc", headers=get_headers())
            if resp.status_code == 200:
                data = resp.json()
                if data:
                    return data
    except Exception as e:
        print(f"[Supabase] fetch_vts_fleet_data error: {e}")
    return FALLBACK_FLEET


async def fetch_security_alerts(status_filter: Optional[str] = None) -> List[Dict[str, Any]]:
    try:
        url = f"{SUPABASE_URL}/rest/v1/security_alerts?select=*&order=id.desc"
        if status_filter:
            url += f"&status=eq.{status_filter}"
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.get(url, headers=get_headers())
            if resp.status_code == 200:
                data = resp.json()
                if data:
                    return data
    except Exception as e:
        print(f"[Supabase] fetch_security_alerts error: {e}")
    return FALLBACK_ALERTS


async def update_alert_status(alert_id: int, new_status: str) -> bool:
    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.patch(
                f"{SUPABASE_URL}/rest/v1/security_alerts?id=eq.{alert_id}",
                headers=get_headers(),
                json={"status": new_status}
            )
            return resp.status_code in [200, 204]
    except Exception as e:
        print(f"[Supabase] update_alert_status error: {e}")
    return False


async def create_security_alert(alert_data: Dict[str, Any]) -> Dict[str, Any]:
    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.post(
                f"{SUPABASE_URL}/rest/v1/security_alerts",
                headers=get_headers(),
                json=alert_data
            )
            if resp.status_code in [200, 201]:
                return resp.json()[0] if resp.json() else alert_data
    except Exception as e:
        print(f"[Supabase] create_security_alert error: {e}")
    return alert_data


async def update_vts_telemetry(vehicle_no: str, delta_lat: float, delta_lng: float, speed: int) -> bool:
    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            # First get vehicle
            get_resp = await client.get(f"{SUPABASE_URL}/rest/v1/vts_fleet?vehicle_no=eq.{vehicle_no}", headers=get_headers())
            if get_resp.status_code == 200 and get_resp.json():
                veh = get_resp.json()[0]
                new_lat = round(veh["latitude"] + delta_lat, 6)
                new_lng = round(veh["longitude"] + delta_lng, 6)
                patch_resp = await client.patch(
                    f"{SUPABASE_URL}/rest/v1/vts_fleet?vehicle_no=eq.{vehicle_no}",
                    headers=get_headers(),
                    json={"latitude": new_lat, "longitude": new_lng, "speed": speed}
                )
                return patch_resp.status_code in [200, 204]
    except Exception as e:
        print(f"[Supabase] update_vts_telemetry error: {e}")
    return False
