from fastapi import APIRouter
from backend.app.api.v1.endpoints import (
    auth,
    profile,
    dashboard,
    ai,
    opportunities,
    applications,
    skills,
    onboarding,
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(profile.router, prefix="/profile", tags=["Profile"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI Intelligence"])
api_router.include_router(opportunities.router, prefix="/opportunities", tags=["Opportunities"])
api_router.include_router(applications.router, prefix="/applications", tags=["Applications"])
api_router.include_router(skills.router, prefix="/skills", tags=["Skills & Evidence"])
api_router.include_router(onboarding.router, prefix="/onboarding", tags=["Onboarding & Knowledge Graph"])

