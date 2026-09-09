"""
Fleet Telemetry & VTS Tracking Service
Encapsulates real-time vehicle GPS coordinates and route simulations.
"""

import random
from typing import List, Dict, Any, Optional
from backend.services.base_service import BaseService


class FleetService(BaseService):
    """
    Service managing VTS vehicle fleet locations, geofence validations,
    and synthetic coordinate steps.
    """

    async def fetch_fleet_data(self) -> List[Dict[str, Any]]:
        """Retrieves all tracked vehicles and their latest GPS telemetries."""
        return await self.get("vts_fleet_data", {"select": "*", "order": "id.asc"})

    async def update_telemetry(self, vehicle_no: str, delta_lat: float, delta_lng: float, new_speed: int) -> bool:
        """Updates latitude, longitude, and current speed for a specific vehicle."""
        url = f"{self.config.rest_url}/vts_fleet_data?vehicle_no=eq.{vehicle_no}&select=*"
        try:
            async with self._get_client() as client:
                res = await client.get(url, headers=self.config.headers)
                if res.status_code == 200 and res.json():
                    row = res.json()[0]
                    curr_lat = float(row.get("latitude") or 23.7957)
                    curr_lng = float(row.get("longitude") or 86.4304)

                    patch_data = {
                        "latitude": round(curr_lat + delta_lat, 6),
                        "longitude": round(curr_lng + delta_lng, 6),
                        "speed": new_speed
                    }
                    return await self.patch("vts_fleet_data", f"vehicle_no=eq.{vehicle_no}", patch_data)
        except Exception as e:
            print(f"[FleetService] update_telemetry exception: {e}")
        return False

    async def simulate_fleet_step(self) -> bool:
        """Picks a random vehicle and steps its GPS coordinates for live simulation."""
        fleet = await self.fetch_fleet_data()
        if fleet:
            veh = random.choice(fleet)
            delta_lat = random.uniform(-0.0008, 0.0008)
            delta_lng = random.uniform(-0.0008, 0.0008)
            new_speed = max(0, min(55, veh.get("speed", 30) + random.randint(-4, 4)))
            return await self.update_telemetry(veh["vehicle_no"], delta_lat, delta_lng, new_speed)
        return False


# Global Singleton Instance
fleet_service = FleetService()
