"""
Authentication API Routes
"""

from typing import Optional
from fastapi import APIRouter, Request, Form, Response
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates

from backend.core.config import config
from backend.core.security import SessionManager
from backend.services.supabase_service import supabase_service

router = APIRouter(tags=["Authentication"])
templates = Jinja2Templates(directory=str(config.TEMPLATES_DIR))


@router.post("/login")
async def post_login(
    request: Request,
    username: str = Form(""),
    password: str = Form(""),
    role: Optional[str] = Form(None),
    subsidiary: Optional[str] = Form("CCL")
):
    """Processes user authentication and establishes secure session cookies."""
    cleaned_user = username.strip().lower()
    cleaned_pass = password.strip()
    selected_role = role.strip().lower() if role else None
    selected_sub = (subsidiary or "CCL").strip().upper()

    users = await supabase_service.fetch_app_users()

    if selected_role:
        user_info = next((u for u in users if u["username"] == selected_role), None)
        if user_info:
            valid_identifiers = {
                selected_role,
                user_info.get("email", "").lower(),
                f"{selected_role}@trace.gov.in",
                f"{selected_role}@trace2026",
                f"{selected_role}@trace.in"
            }
            if (cleaned_user in valid_identifiers or cleaned_user == selected_role) and user_info["password"] == cleaned_pass:
                response = RedirectResponse(url="/", status_code=303)
                SessionManager.set_user_session(response, user_info, selected_role, subsidiary=selected_sub)
                return response
            else:
                return templates.TemplateResponse(
                    request=request,
                    name="login.html",
                    context={"error": f"Invalid Email/ID or Password for selected role '{user_info.get('designation', '')}'."}
                )

    for user_info in users:
        role_key = user_info["username"]
        valid_identifiers = {
            role_key,
            user_info.get("email", "").lower(),
            f"{role_key}@trace.gov.in",
            f"{role_key}@trace2026",
            f"{role_key}@trace.in"
        }
        if (cleaned_user in valid_identifiers or cleaned_user == role_key) and user_info["password"] == cleaned_pass:
            response = RedirectResponse(url="/", status_code=303)
            SessionManager.set_user_session(response, user_info, role_key, subsidiary=selected_sub)
            return response

    return templates.TemplateResponse(
        request=request,
        name="login.html",
        context={"error": "Invalid credentials provided. Please select your designation or re-enter password."}
    )


@router.get("/logout")
def get_logout():
    """Logs out the user and redirects to the login screen."""
    response = RedirectResponse(url="/login", status_code=303)
    SessionManager.clear_user_session(response)
    return response
