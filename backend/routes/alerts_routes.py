"""
Alerts & Security Incident API Routes
"""

from typing import Optional
from fastapi import APIRouter, Request
from backend.services.alert_service import alert_service

router = APIRouter(tags=["Alerts"])


@router.get("/api/alerts")
@router.get("/api/data/alerts")
async def get_alerts(status: Optional[str] = None):
    """Fetches real-time security alerts from Supabase with optional status filter."""
    data = await alert_service.fetch_alerts(status_filter=status)
    return {"status": "success", "count": len(data), "data": data}


@router.post("/api/alerts/{alert_id}/acknowledge")
async def acknowledge_alert(alert_id: int):
    """Marks an active security alert as ACKNOWLEDGED."""
    ok = await alert_service.update_status(alert_id, "ACKNOWLEDGED")
    return {"status": "success" if ok else "error", "alert_id": alert_id, "new_status": "ACKNOWLEDGED"}


@router.post("/api/alerts/{alert_id}/resolve")
async def resolve_alert(alert_id: int):
    """Marks an active security alert as RESOLVED."""
    ok = await alert_service.update_status(alert_id, "RESOLVED")
    return {"status": "success" if ok else "error", "alert_id": alert_id, "new_status": "RESOLVED"}


@router.post("/api/alerts/simulate")
async def simulate_alert(request: Request):
    """Simulates a real-time mining anomaly and persists it to Supabase."""
    result = await alert_service.simulate_anomaly()
    return {"status": "success", "created_alert": result}
