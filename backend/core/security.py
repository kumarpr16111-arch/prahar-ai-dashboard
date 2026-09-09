"""
Security and Session Management Module
Staff-Level Session & Role-Based Access Control (RBAC).
"""

from typing import Optional, Dict, Any
from fastapi import Request, Response, HTTPException
from backend.core.config import config


class SessionManager:
    """
    Handles secure cookie-based session verification, role resolution,
    and user authentication state across the application.
    """

    @staticmethod
    def get_session_user(request: Request) -> Optional[str]:
        """Extracts the authenticated session username from request cookies."""
        return request.cookies.get(config.SESSION_COOKIE_NAME)

    @staticmethod
    def set_user_session(response: Response, user_info: Dict[str, Any], role_key: str, subsidiary: str = "CCL") -> None:
        """Sets secure session cookies upon successful authentication."""
        response.set_cookie(
            key=config.SESSION_COOKIE_NAME,
            value=role_key,
            max_age=config.SESSION_MAX_AGE,
            httponly=True,
            samesite="lax"
        )
        response.set_cookie(
            key="user_role",
            value=user_info.get("role", ""),
            max_age=config.SESSION_MAX_AGE,
            samesite="lax"
        )
        response.set_cookie(
            key="user_name",
            value=user_info.get("name", "Officer"),
            max_age=config.SESSION_MAX_AGE,
            samesite="lax"
        )
        response.set_cookie(
            key="user_designation",
            value=user_info.get("designation", ""),
            max_age=config.SESSION_MAX_AGE,
            samesite="lax"
        )
        response.set_cookie(
            key="user_subsidiary",
            value=subsidiary.upper(),
            max_age=config.SESSION_MAX_AGE,
            samesite="lax"
        )

    @staticmethod
    def clear_user_session(response: Response) -> None:
        """Clears all session cookies upon user logout."""
        response.delete_cookie(config.SESSION_COOKIE_NAME)
        response.delete_cookie("user_role")
        response.delete_cookie("user_name")
        response.delete_cookie("user_designation")
        response.delete_cookie("user_subsidiary")
