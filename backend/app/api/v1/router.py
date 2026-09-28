from fastapi import APIRouter
from backend.app.api.v1.endpoints import (
    auth,
    profile,
    resume,
    knowledge_graph,
    rag,
    dashboard,
    ai,
    opportunities,
    applications,
    skills,
    onboarding,
    hackathons,
    documents,
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(profile.router, prefix="/profile", tags=["Profile & Trajectory"])
api_router.include_router(documents.router, prefix="/documents", tags=["Documents & Knowledge Vault"])
api_router.include_router(resume.router, prefix="/resume", tags=["Golden Resume & Tailoring"])
api_router.include_router(knowledge_graph.router, prefix="/knowledge-graph", tags=["Knowledge Graph Engine"])
api_router.include_router(rag.router, prefix="/rag", tags=["RAG & Vector Retrieval"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI Intelligence"])
api_router.include_router(opportunities.router, prefix="/opportunities", tags=["Opportunities"])
api_router.include_router(hackathons.router, prefix="/hackathons", tags=["Hackathons & Events"])
api_router.include_router(applications.router, prefix="/applications", tags=["Applications"])
api_router.include_router(skills.router, prefix="/skills", tags=["Skills & Evidence Vault"])
api_router.include_router(onboarding.router, prefix="/onboarding", tags=["Onboarding Pipeline"])
