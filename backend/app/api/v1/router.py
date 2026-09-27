from fastapi import APIRouter
from backend.app.api.v1.endpoints import profile, dashboard, ai

api_router = APIRouter()

api_router.include_router(profile.router, prefix="/profile", tags=["Profile"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI Intelligence"])
