"""
Alert Management Service
Encapsulates real-time security anomalies, simulation, triage, and state transitions.
"""

import random
from typing import List, Dict, Any, Optional
from backend.services.base_service import BaseService


class AlertService(BaseService):
    """
    Service responsible for managing ICCC security alerts, live telemetry polling,
    incident triage status updates, and dynamic anomaly simulations.
    """

    SIMULATION_TEMPLATES = [
        ("Unauthorized stoppage", "CRITICAL", "Vehicle stationary in unapproved transit sector > 18 mins with active coal payload."),
        ("Off Route Alerts", "HIGH", "Vehicle deviated 340 meters outside approved Geo-fenced mining transport corridor."),
        ("Off Area Alerts", "HIGH", "Vehicle entered unauthorized extraction benchmark without valid trip permit."),
        ("Tamper Alerts", "CRITICAL", "Hardware GPS sensor enclosure opened or signal jammer signature detected."),
        ("Over Speed", "WARNING", "Vehicle radar clocked at 48 km/h exceeding 25 km/h internal pit safety limit."),
        ("Open Boom Barriers", "HIGH", "Checkpost security barrier opened without automatic RFID authorization scan."),
        ("Crowd Detection", "HIGH", "Surveillance camera flagged unapproved cluster of 8+ personnel near siding loading chute."),
        ("Vehicle Detection", "WARNING", "Unscheduled commercial dump truck identified in North Overburden Sector."),
        ("Person Detection", "WARNING", "Unauthorized individual detected within active haulage path."),
        ("Intrusion Detection", "CRITICAL", "Perimeter fence tripwire breach detected on East Boundary Grid 4."),
        ("Traffic Congestion", "WARNING", "Haul truck bottleneck exceeding 6 vehicles at Central Weighbridge approach."),
        ("Loaded-Unloaded Alerts", "HIGH", "Gross axle tare discrepancy registered +3.4 Tons variance from dispatch manifest."),
        ("Camera Tampering", "CRITICAL", "Optical occlusion or camera lens disorientation detected on Siding Pole #12."),
        ("Safety Hazard", "HIGH", "Spillage of bulk coal lump on primary haul road creating vehicular hazard."),
        ("Insufficient Illumination", "WARNING", "Night photometric lux dropped below 15 Lux threshold in Stockpile B.")
    ]

    LOCATIONS = [
        "Amrapali Pit Haul Road WB-02",
        "Piparwar Washery Transit Corridor",
        "Ashoka Siding Platform B Gate 3",
        "Karkatta Section C Overburden",
        "Magadh Siding Checkpost 04",
        "North Karanpura Main Haulage Track",
        "Giridih Siding Weighbridge 01"
    ]

    FALLBACK_ALERTS: List[Dict[str, Any]] = [
        {"id": 1, "alert_type": "Unauthorized stoppage", "vehicle_no": "JH01-DY-7721", "location": "Karkatta Mining Road (KM 4.2)", "severity": "CRITICAL", "status": "ACTIVE", "confidence_score": 96, "description": "Vehicle halted stationary in unauthorized corridor zone for > 15 minutes with active coal payload."},
        {"id": 2, "alert_type": "Off Route Alerts", "vehicle_no": "JH05-BK-3390", "location": "Amrapali Sector 4 Western Perimeter", "severity": "HIGH", "status": "ACTIVE", "confidence_score": 92, "description": "Commercial coal tipper deviated 280 meters outside designated geo-fenced coal transport route."},
        {"id": 3, "alert_type": "Loaded-Unloaded Alerts", "vehicle_no": "JH02-CC-4019", "location": "Piparwar Ingate Weighbridge WB-02", "severity": "WARNING", "status": "ACTIVE", "confidence_score": 88, "description": "Gross weight registered 2.4 Tons higher than e-Way Bill pre-clearance declaration."},
        {"id": 4, "alert_type": "Tamper Alerts", "vehicle_no": "JH09-ZZ-1100", "location": "North Karanpura Checkpost Gate 3", "severity": "HIGH", "status": "ACTIVE", "confidence_score": 99, "description": "RFID tag mismatch: Vehicle attempted gate passage without matching dispatch record in TRACE ERP."}
    ]

    async def fetch_alerts(self, status_filter: Optional[str] = None) -> List[Dict[str, Any]]:
        """Retrieves security alerts sorted by newest first, with optional status filtering."""
        params: Dict[str, Any] = {"select": "*", "order": "id.desc"}
        if status_filter:
            params["status"] = f"eq.{status_filter}"
        data = await self.get("security_alerts", params)
        return data if data else self.FALLBACK_ALERTS

    async def create_alert(self, alert_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Inserts a new security alert into Supabase."""
        return await self.post("security_alerts", alert_data)

    async def update_status(self, alert_id: int, new_status: str) -> bool:
        """Updates the status of an alert (e.g. ACKNOWLEDGED, RESOLVED)."""
        return await self.patch("security_alerts", f"id=eq.{alert_id}", {"status": new_status})

    async def simulate_anomaly(self) -> Optional[Dict[str, Any]]:
        """Generates and persists a synthetic mining anomaly for live SIH demonstration."""
        chosen = random.choice(self.SIMULATION_TEMPLATES)
        veh_no = f"JH0{random.randint(1,9)}-{chr(random.randint(65,90))}{chr(random.randint(65,90))}-{random.randint(1000,9999)}"
        loc = random.choice(self.LOCATIONS)

        alert_obj = {
            "alert_type": chosen[0],
            "vehicle_no": veh_no,
            "location": loc,
            "severity": chosen[1],
            "status": "ACTIVE",
            "confidence_score": random.randint(93, 99),
            "description": chosen[2]
        }
        return await self.create_alert(alert_obj)


# Global Singleton Instance
alert_service = AlertService()
