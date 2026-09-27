from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.app.core.database import get_db
from backend.app.models.profile import UserProfileModel
from backend.app.schemas.dashboard import (
    DashboardOverviewResponse,
    TelemetrySegment,
    NextBestAction,
    TimelineTask,
)

router = APIRouter()

@router.get("/overview", response_model=DashboardOverviewResponse)
async def get_dashboard_overview(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(UserProfileModel).filter(UserProfileModel.id == "default_user"))
    profile = result.scalars().first()
    
    readiness = profile.overall_readiness if profile else 88
    
    return DashboardOverviewResponse(
        missionStatus="MISSION: SECURE STAFF/PRINCIPAL AI ROLE",
        overallReadiness=readiness,
        readinessTrend="+4% this week",
        telemetrySegments=[
            TelemetrySegment(label="Evidence Proofs", value=94, color="bg-emerald-500"),
            TelemetrySegment(label="Arena Readyness", value=89, color="bg-primary"),
            TelemetrySegment(label="Market Alignment", value=85, color="bg-blue-400"),
            TelemetrySegment(label="Negotiation Index", value=82, color="bg-purple-500"),
        ],
        nextBestAction=NextBestAction(
            title="Scale AI — Technical Round 2 Simulation",
            subtitle="Benchmark your distributed consensus & Raft leader election answers against Anthropic & Scale AI evaluation rubrics.",
            actionLabel="Launch Simulator",
            actionRoute="/interview-arena",
            estimatedTime="25 min",
            impactScore="+5.4% Readiness",
        ),
        timelineTasks=[
            TimelineTask(id="t_1", title="Read TruLens RAG Chapter 3", time="10:00 AM", category="Learning", completed=True),
            TimelineTask(id="t_2", title="Update CareerOS Architecture Diagram", time="12:00 PM", category="Project", completed=True),
            TimelineTask(id="t_3", title="Apply to Google DeepMind Research Role", time="02:30 PM", category="Application", completed=False),
            TimelineTask(id="t_4", title="Run Live Arena Simulation for Scale AI", time="04:00 PM", category="Interview", completed=False),
        ],
        activeOpportunitiesCount=42,
        verifiedProofsCount=14,
        applicationsInFlightCount=11,
        interviewArenaScore=92,
    )
