import httpx
import time
from typing import Optional, Dict, Any, List
from backend.core.config import config


class BaseService:
    """
    Abstract Base Service managing asynchronous HTTP interactions,
    connection timeouts, in-memory caching, and standardized error encapsulation.
    """

    _cache: Dict[str, Dict[str, Any]] = {}
    CACHE_TTL_SECONDS: float = 5.0  # 5-second in-memory response cache

    def __init__(self):
        self.config = config
        self._timeout = httpx.Timeout(1.8, connect=1.0)

    def _get_client(self) -> httpx.AsyncClient:
        """Instantiates an async HTTP client with standard timeout config."""
        return httpx.AsyncClient(timeout=self._timeout)

    async def get(self, endpoint: str, params: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        """Performs an authenticated GET request against Supabase PostgREST with TTL cache."""
        cache_key = f"{endpoint}:{sorted(params.items()) if params else ''}"
        now = time.time()
        
        # Check cache
        if cache_key in self._cache:
            entry = self._cache[cache_key]
            if now - entry["timestamp"] < self.CACHE_TTL_SECONDS:
                return entry["data"]

        url = f"{self.config.rest_url}/{endpoint}"
        try:
            async with self._get_client() as client:
                res = await client.get(url, headers=self.config.headers, params=params)
                if res.status_code == 200:
                    data = res.json()
                    self._cache[cache_key] = {"data": data, "timestamp": now}
                    return data
                # Return stale cache if available
                if cache_key in self._cache:
                    return self._cache[cache_key]["data"]
                return []
        except Exception as e:
            # On network latency or timeout, return cached data gracefully
            if cache_key in self._cache:
                return self._cache[cache_key]["data"]
            return []

    async def post(self, endpoint: str, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Performs an authenticated POST request to insert a record into Supabase."""
        url = f"{self.config.rest_url}/{endpoint}"
        try:
            async with self._get_client() as client:
                res = await client.post(url, headers=self.config.headers, json=data)
                if res.status_code in (200, 201):
                    body = res.json()
                    return body[0] if isinstance(body, list) and body else body
                print(f"[{self.__class__.__name__}] POST {endpoint} failed: {res.status_code} - {res.text}")
                return None
        except Exception as e:
            print(f"[{self.__class__.__name__}] POST {endpoint} exception: {e}")
            return None

    async def patch(self, endpoint: str, query_params: str, data: Dict[str, Any]) -> bool:
        """Performs an authenticated PATCH request to update records in Supabase."""
        url = f"{self.config.rest_url}/{endpoint}?{query_params}"
        try:
            async with self._get_client() as client:
                res = await client.patch(url, headers=self.config.headers, json=data)
                return res.status_code in (200, 204)
        except Exception as e:
            print(f"[{self.__class__.__name__}] PATCH {endpoint} exception: {e}")
            return False
