"""
Blacklisted Vehicles Routes
Provides endpoints for retrieving, blacklisting, and unblacklisting vehicles with Supabase PostgreSQL persistence.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from backend.services.supabase_service import supabase_service

router = APIRouter(prefix="/api/blacklisted-vehicles", tags=["Blacklisted Vehicles"])


class BlacklistRequest(BaseModel):
    v_no: str = Field(..., description="Vehicle registration number")
    remarks: str = Field(..., description="Reason for blacklisting")
    blacklisted_by: Optional[str] = Field(default="admin", description="Approver or department name")


class UnblacklistRequest(BaseModel):
    v_no: str = Field(..., description="Vehicle registration number to unblacklist")
    remarks: Optional[str] = Field(default="", description="Resolution / clearance remarks")
    approver: Optional[str] = Field(default="admin", description="Approver name")


@router.get("", response_model=List[Dict[str, Any]])
async def get_blacklisted_vehicles():
    """Retrieves all active blacklisted vehicles from Supabase Cloud."""
    data = await supabase_service.fetch_blacklisted_vehicles()
    return data


@router.post("", response_model=Dict[str, Any])
async def add_blacklisted_vehicle(payload: BlacklistRequest):
    """Blacklists a vehicle in Supabase Cloud."""
    v_no = payload.v_no.strip().upper()
    if not v_no:
        raise HTTPException(status_code=400, detail="Vehicle number cannot be empty")
    
    res = await supabase_service.add_blacklisted_vehicle(
        v_no=v_no,
        remarks=payload.remarks,
        blacklisted_by=payload.blacklisted_by or "admin"
    )
    if not res:
        raise HTTPException(status_code=500, detail="Failed to insert into Supabase")
    return {"status": "success", "message": f"Vehicle {v_no} blacklisted", "data": res}


@router.delete("/{v_no}")
async def remove_blacklisted_vehicle(v_no: str):
    """Unblacklists/removes a vehicle from Supabase Cloud."""
    v_no_clean = v_no.strip().upper()
    success = await supabase_service.remove_blacklisted_vehicle(v_no_clean)
    return {"status": "success" if success else "warning", "message": f"Vehicle {v_no_clean} unblacklisted", "vehicle_no": v_no_clean}
