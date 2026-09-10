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
        {"id": 2, "alert_type": "Unauthorized stoppage", "vehicle_no": "JH02-CC-8812", "location": "Amrapali Sector 3 Haul Road", "severity": "CRITICAL", "status": "ACTIVE", "confidence_score": 98, "description": "Unscheduled halt detected on highwall access ramp."},
        {"id": 3, "alert_type": "Off Route Alerts", "vehicle_no": "JH05-BK-3390", "location": "Amrapali Sector 4 Western Perimeter", "severity": "HIGH", "status": "ACTIVE", "confidence_score": 92, "description": "Commercial coal tipper deviated 280 meters outside designated geo-fenced coal transport route."},
        {"id": 4, "alert_type": "Off Route Alerts", "vehicle_no": "JH01-AX-9912", "location": "Piparwar North Siding Link", "severity": "HIGH", "status": "ACTIVE", "confidence_score": 95, "description": "Vehicle tracking outside approved secondary haulage corridor."},
        {"id": 5, "alert_type": "Off Area Alerts", "vehicle_no": "JH02-ER-6102", "location": "Ashoka OCP Blasting Zone Boundary", "severity": "HIGH", "status": "ACTIVE", "confidence_score": 94, "description": "Vehicle entered restricted blasting perimeter without safety clearance."},
        {"id": 6, "alert_type": "Tamper Alerts", "vehicle_no": "JH09-ZZ-1100", "location": "North Karanpura Checkpost Gate 3", "severity": "CRITICAL", "status": "ACTIVE", "confidence_score": 99, "description": "RFID tag mismatch: Vehicle attempted gate passage without matching dispatch record in TRACE ERP."},
        {"id": 7, "alert_type": "Tamper Alerts", "vehicle_no": "JH02-BZ-8562", "location": "Dhori Central Weighbridge #02", "severity": "CRITICAL", "status": "ACTIVE", "confidence_score": 97, "description": "VTS GPS unit antenna disconnect and enclosure tampering signal detected."},
        {"id": 8, "alert_type": "Over Speed", "vehicle_no": "JH01-FA-4401", "location": "Magadh Main Ingate Approach", "severity": "WARNING", "status": "ACTIVE", "confidence_score": 91, "description": "Radar recorded 52 km/h in restricted 20 km/h pit transit zone."},
        {"id": 9, "alert_type": "Open Boom Barriers", "vehicle_no": "JH05-LM-7711", "location": "Checkpost #02 Main Quarry Exit", "severity": "HIGH", "status": "ACTIVE", "confidence_score": 93, "description": "Boom barrier forced manual override without valid e-Way bill sync."},
        {"id": 10, "alert_type": "Open Boom Barriers", "vehicle_no": "JH02-BY-3436", "location": "Checkpost #12 Siding Gate", "severity": "HIGH", "status": "ACTIVE", "confidence_score": 96, "description": "Vehicle passed gate without RFID sensor trip trigger."},
        {"id": 11, "alert_type": "Crowd Detection", "vehicle_no": "CAM-SIDING-04", "location": "Tori Siding Silo Berth #2", "severity": "HIGH", "status": "ACTIVE", "confidence_score": 94, "description": "AI optical feed flagged group of 9 unauthorized persons near coal hopper."},
        {"id": 12, "alert_type": "Vehicle Detection", "vehicle_no": "CAM-NORTH-01", "location": "Piparwar Washery Stockyard Gate", "severity": "WARNING", "status": "ACTIVE", "confidence_score": 89, "description": "Unregistered light commercial vehicle entered heavy dump zone."},
        {"id": 13, "alert_type": "Person Detection", "vehicle_no": "CAM-PIT-08", "location": "Amrapali Face 2 Shovel Grid", "severity": "WARNING", "status": "ACTIVE", "confidence_score": 92, "description": "Pedestrian movement identified inside active excavator bucket radius."},
        {"id": 14, "alert_type": "Intrusion Detection", "vehicle_no": "CAM-PERIM-02", "location": "Giridih East Boundary Perimeter", "severity": "CRITICAL", "status": "ACTIVE", "confidence_score": 98, "description": "Tripwire perimeter breach detected at unauthorized mine access breach point."},
        {"id": 15, "alert_type": "Intrusion Detection", "vehicle_no": "CAM-PERIM-05", "location": "Kathara Siding Fencing Line", "severity": "CRITICAL", "status": "ACTIVE", "confidence_score": 96, "description": "Thermal camera detected illegal fence crossing near railway siding."},
        {"id": 16, "alert_type": "Traffic Congestion", "vehicle_no": "CAM-WB-03", "location": "Dakra Central Weighbridge", "severity": "WARNING", "status": "ACTIVE", "confidence_score": 90, "description": "Queue backlog exceeding 8 coal tippers at gross tare scale."},
        {"id": 17, "alert_type": "Loaded-Unloaded Alerts", "vehicle_no": "JH02-CC-4019", "location": "Piparwar Ingate Weighbridge WB-02", "severity": "HIGH", "status": "ACTIVE", "confidence_score": 88, "description": "Gross weight registered 2.4 Tons higher than e-Way Bill pre-clearance declaration."},
        {"id": 18, "alert_type": "Loaded-Unloaded Alerts", "vehicle_no": "JH01-HY-5520", "location": "Kuju Outgate Weighbridge #01", "severity": "HIGH", "status": "ACTIVE", "confidence_score": 94, "description": "Discrepancy: Vehicle marked empty but net tare indicates residual payload."},
        {"id": 19, "alert_type": "Camera Tampering", "vehicle_no": "CAM-POLE-14", "location": "Rajrappa Siding Platform #1", "severity": "CRITICAL", "status": "ACTIVE", "confidence_score": 97, "description": "Camera feed lens spray occlusion or physical misalignment detected."},
        {"id": 20, "alert_type": "Safety Hazard", "vehicle_no": "CAM-HAUL-09", "location": "Hazaribagh Main Transit Corridor", "severity": "HIGH", "status": "ACTIVE", "confidence_score": 93, "description": "Heavy boulder spillage on primary two-lane haul road."},
        {"id": 21, "alert_type": "Insufficient Illumination", "vehicle_no": "CAM-NIGHT-03", "location": "Barka Sayal Coal Stockpile Area", "severity": "WARNING", "status": "ACTIVE", "confidence_score": 86, "description": "Ambient photometric illumination dropped below 12 Lux safety standard."}
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
