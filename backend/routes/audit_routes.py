"""
Digital Audit Trail API Routes
"""

from fastapi import APIRouter
from backend.services.audit_service import audit_service

router = APIRouter(tags=["Audit"])


@router.get("/api/audit-reports")
def get_audit_reports():
    """Returns the statutory 50-part audit report split manifest."""
    return audit_service.get_audit_reports()
