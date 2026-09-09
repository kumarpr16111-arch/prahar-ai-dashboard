"""
Fleet & Telemetry API Routes
"""

from fastapi import APIRouter
from backend.services.fleet_service import fleet_service

router = APIRouter(tags=["Fleet"])


@router.get("/api/data/vts")
async def get_vts_fleet():
    """Retrieves all active vehicles and their GPS coordinates."""
    data = await fleet_service.fetch_fleet_data()
    return {"status": "success", "count": len(data), "data": data}


@router.post("/api/vts/simulate-step")
async def simulate_vts_step():
    """Simulates a random real-time vehicle movement on the GPS map."""
    ok = await fleet_service.simulate_fleet_step()
    return {"status": "success" if ok else "skipped"}
