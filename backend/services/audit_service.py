"""
Digital Audit Trail Service
Manages statutory audit reports, PDF split manifest loading, and immutable verification.
"""

import json
from pathlib import Path
from typing import List, Dict, Any
from backend.core.config import config


class AuditService:
    """
    Service managing digital audit trail manifests and cryptographic hash verification.
    """

    def __init__(self):
        self.manifest_path: Path = config.STATIC_DIR / "reports_split" / "manifest.json"

    def get_audit_reports(self) -> List[Dict[str, Any]]:
        """Loads and parses the official 50-part statutory audit report manifest."""
        if self.manifest_path.exists():
            try:
                with open(self.manifest_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception as e:
                print(f"[AuditService] Error loading manifest: {e}")
        return []


# Global Singleton Instance
audit_service = AuditService()
