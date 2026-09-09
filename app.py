"""
Prahar AI - Unified Intelligent Mining Command Center
Main ASGI Application Entry Point & Module Orchestrator.
"""

import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from backend.core.config import config
from backend.routes.views_routes import router as views_router
from backend.routes.auth_routes import router as auth_router
from backend.routes.alerts_routes import router as alerts_router
from backend.routes.fleet_routes import router as fleet_router
from backend.routes.audit_routes import router as audit_router


def create_app() -> FastAPI:
    """
    Application Factory:
    Initializes FastAPI, mounts static asset directories, and registers modular routers.
    """
    application = FastAPI(
        title=config.APP_TITLE,
        version=config.APP_VERSION,
        docs_url="/docs",
        redoc_url="/redoc"
    )

    # 1. Mount Static Asset Directories
    base_dir = config.BASE_DIR
    static_path = base_dir / "static"
    if static_path.exists():
        application.mount("/static", StaticFiles(directory=str(static_path)), name="static")

    media_screenshots_path = base_dir / "Media screenshots"
    if media_screenshots_path.exists():
        application.mount("/media_screenshots", StaticFiles(directory=str(media_screenshots_path)), name="media_screenshots")

    # 2. Register Modular API & View Routers
    application.include_router(views_router)
    application.include_router(auth_router)
    application.include_router(alerts_router)
    application.include_router(fleet_router)
    application.include_router(audit_router)

    return application


# Global ASGI App Instance (Compatible with Vercel and local Uvicorn)
app = create_app()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
