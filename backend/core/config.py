"""
Application Configuration Module
Staff-Level Enterprise Settings using Encapsulation & Environment Management.
"""

import os
from pathlib import Path
from typing import Optional


class AppConfig:
    """
    Singleton Configuration Class for Prahar AI Command Center.
    Loads and provides strongly-typed access to environment variables,
    base paths, API credentials, and application defaults.
    """

    _instance: Optional['AppConfig'] = None

    def __new__(cls) -> 'AppConfig':
        if cls._instance is None:
            cls._instance = super(AppConfig, cls).__new__(cls)
            cls._instance._load_config()
        return cls._instance

    def _load_config(self) -> None:
        """Load settings from environment variables with fallback defaults."""
        self.BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
        self.STATIC_DIR: Path = self.BASE_DIR / "static"
        self.TEMPLATES_DIR: Path = self.BASE_DIR / "templates"
        
        # Load .env file manually if exists
        env_file = self.BASE_DIR / ".env"
        if env_file.exists():
            with open(env_file, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, v = line.split("=", 1)
                        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

        # Supabase API Credentials
        self.SUPABASE_URL: str = os.getenv("SUPABASE_URL", "https://yryqsqmqucwtfxhgyvsl.supabase.co")
        self.SUPABASE_KEY: str = os.getenv(
            "SUPABASE_KEY",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeXFzcW1xdWN3dGZ4aGd5dnNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwOTcwODEsImV4cCI6MjA3MjY3MzA4MX0.X_b_3B_n4Q5uP6yGv7h0f4g_lq5E-d_k4L9m1k-k2j0"
        )
        self.SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", self.SUPABASE_KEY)

        # Server Settings
        self.APP_TITLE: str = "Prahar AI - Command Center"
        self.APP_VERSION: str = "2.0.0"
        self.SESSION_COOKIE_NAME: str = "session_user"
        self.SESSION_MAX_AGE: int = 86400  # 24 Hours

    @property
    def rest_url(self) -> str:
        """Returns the Supabase PostgREST base endpoint."""
        return f"{self.SUPABASE_URL.rstrip('/')}/rest/v1"

    @property
    def headers(self) -> dict:
        """Returns standard authentication headers for Supabase REST requests."""
        return {
            "apikey": self.SUPABASE_KEY,
            "Authorization": f"Bearer {self.SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }

    @property
    def service_headers(self) -> dict:
        """Returns elevated service role headers for administrative database operations."""
        return {
            "apikey": self.SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": f"Bearer {self.SUPABASE_SERVICE_ROLE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }


# Global Singleton Instance
config = AppConfig()
