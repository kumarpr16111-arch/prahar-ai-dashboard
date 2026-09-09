"""
Supabase Database Service
Encapsulates all Supabase PostgREST data interactions.
"""

from typing import List, Dict, Any, Optional
from backend.services.base_service import BaseService


class SupabaseService(BaseService):
    """
    Core Database Service managing persistence and retrieval of mining telemetries,
    user credentials, RFID configurations, and operational logs.
    """

    DEFAULT_USERS: List[Dict[str, Any]] = [
        {
            "id": 1,
            "username": "gm",
            "password": "gm@trace2026",
            "name": "Dr. Rajeshwar Sharma",
            "designation": "General Manager (Mining & Ops)",
            "role": "gm",
            "email": "gm@trace.gov.in"
        },
        {
            "id": 2,
            "username": "vigilance",
            "password": "vigilance@trace2026",
            "name": "Col. Ajay Singh (Retd.)",
            "designation": "Chief Vigilance Officer",
            "role": "vigilance",
            "email": "vigilance@trace.gov.in"
        },
        {
            "id": 3,
            "username": "surveillance",
            "password": "surveillance@trace2026",
            "name": "Vikramaditya Bose",
            "designation": "Surveillance Commander",
            "role": "surveillance",
            "email": "surveillance@trace.gov.in"
        },
        {
            "id": 4,
            "username": "dispatch",
            "password": "dispatch@trace2026",
            "name": "Sunil Kumar Meena",
            "designation": "Dispatch Officer (DO)",
            "role": "dispatch",
            "email": "dispatch@trace.gov.in"
        },
        {
            "id": 5,
            "username": "operator",
            "password": "operator@trace2026",
            "name": "Manoj Verma",
            "designation": "Control Room Operator",
            "role": "operator",
            "email": "operator@trace.gov.in"
        },
        {
            "id": 6,
            "username": "admin",
            "password": "password123",
            "name": "System Administrator",
            "designation": "Command Center Chief",
            "role": "admin",
            "email": "admin@prahar.ai"
        }
    ]

    async def fetch_app_users(self) -> List[Dict[str, Any]]:
        """Retrieves authorized system users for authentication."""
        db_users = await self.get("app_users", {"select": "*"})
        if not db_users:
            return self.DEFAULT_USERS
        
        # Merge db_users with DEFAULT_USERS so all SIH roles are always guaranteed
        existing_usernames = {u.get("username") for u in db_users}
        merged = list(db_users)
        for du in self.DEFAULT_USERS:
            if du["username"] not in existing_usernames:
                merged.append(du)
        return merged

    async def fetch_weighbridge_data(self) -> List[Dict[str, Any]]:
        """Retrieves raw weighbridge transactions."""
        return await self.get("weighbridge_data", {"select": "*", "order": "id.asc"})

    async def fetch_checkpost_data(self) -> List[Dict[str, Any]]:
        """Retrieves live checkpost surveillance logs."""
        return await self.get("checkpost_data", {"select": "*", "order": "id.asc"})

    async def fetch_weighbridge_status(self) -> List[Dict[str, Any]]:
        """Retrieves weighbridge operational status summaries."""
        return await self.get("weighbridge_status", {"select": "*", "order": "id.asc"})

    async def fetch_advanced_analytics(self) -> List[Dict[str, Any]]:
        """Retrieves hourly throughput and anomaly aggregates."""
        return await self.get("advanced_analytics", {"select": "*", "order": "id.asc"})

    async def fetch_checkpost_status(self) -> List[Dict[str, Any]]:
        """Retrieves checkpost health & CCTV uptime indicators."""
        return await self.get("checkpost_status", {"select": "*", "order": "id.asc"})

    async def fetch_checkpost_analytics(self) -> List[Dict[str, Any]]:
        """Retrieves checkpost traffic analytics."""
        return await self.get("checkpost_analytics", {"select": "*", "order": "id.asc"})

    async def fetch_vts_alert_summary(self) -> List[Dict[str, Any]]:
        """Retrieves VTS aggregated alert statistics."""
        return await self.get("vts_alert_summary", {"select": "*", "order": "id.asc"})

    async def fetch_rfid_config(self) -> List[Dict[str, Any]]:
        """Retrieves RFID reader configurations."""
        return await self.get("rfid_config", {"select": "*", "order": "id.asc"})

    async def fetch_irregular_vehicles(self) -> List[Dict[str, Any]]:
        """Retrieves flagged irregular vehicle registrations."""
        return await self.get("irregular_vehicles", {"select": "*", "order": "id.asc"})

    async def fetch_irregular_dos(self) -> List[Dict[str, Any]]:
        """Retrieves irregular Delivery Order compliance records."""
        return await self.get("irregular_dos", {"select": "*", "order": "id.asc"})


# Global Singleton Instance
supabase_service = SupabaseService()
