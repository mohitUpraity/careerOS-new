from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from backend.app.core.database import get_db
from backend.app.models.profile import UserProfileModel
from backend.app.models.opportunity import OpportunityModel
from backend.app.models.skill import SkillModel, EvidenceModel
from backend.app.models.application import ApplicationModel
from backend.app.schemas.dashboard import (
    DashboardOverviewResponse,
    TelemetrySegment,
    NextBestAction,
    TimelineTask,
)

router = APIRouter()

@router.get("/overview", response_model=DashboardOverviewResponse)
async def get_dashboard_overview(db: AsyncSession = Depends(get_db)):
    try:
        # 1. Fetch Profile
        prof_res = await db.execute(select(UserProfileModel).filter(UserProfileModel.id == "default_user"))
        profile = prof_res.scalars().first()

        # 2. Real Opportunity Count
        opp_res = await db.execute(select(func.count(OpportunityModel.id)))
        opp_count = opp_res.scalar() or 0

        # 3. Real Verified Proof Count
        proof_res = await db.execute(select(func.count(EvidenceModel.id)))
        proof_count = proof_res.scalar() or 0

        # 4. Real Applications in Flight Count
        app_res = await db.execute(select(func.count(ApplicationModel.id)))
        app_count = app_res.scalar() or 0

        # 5. Real Skills Count & Breakdown
        skill_res = await db.execute(select(SkillModel))
        skills = skill_res.scalars().all()
        total_skills = len(skills)
        verified_skills = len([s for s in skills if s.verified])

        # Dynamic Readiness calculation based on actual user profile completeness and verified skills
        completeness = profile.profile_completeness if profile else 0
        readiness = min(100, int((completeness * 0.4) + (min(verified_skills, 10) * 6))) if profile else 0

        # Top opportunity for Next Best Action if available
        top_opp_res = await db.execute(select(OpportunityModel).order_by(OpportunityModel.match_score.desc()).limit(1))
        top_opp = top_opp_res.scalars().first()

        if top_opp:
            next_action = NextBestAction(
                title=f"{top_opp.company} — {top_opp.title}",
                subtitle=f"Direct match found based on verified skill telemetry ({top_opp.match_score}% match).",
                actionLabel="Review Opportunity",
                actionRoute=f"/opportunities",
                estimatedTime="5 min",
                impactScore=f"+{min(10, max(2, int(top_opp.match_score * 0.05)))}% Pipeline",
            )
        elif profile and profile.target_roles:
            next_action = NextBestAction(
                title="Calibrate Skill Graph",
                subtitle="Upload your latest resume or add GitHub project proofs to unlock automated opportunity matching.",
                actionLabel="Calibrate Graph",
                actionRoute="/skills-and-evidence",
                estimatedTime="3 min",
                impactScore="+15% Alignment",
            )
        else:
            next_action = NextBestAction(
                title="Set Target Roles & Level",
                subtitle="Specify your desired job titles and compensation target to power your real-time career intelligence.",
                actionLabel="Configure Profile",
                actionRoute="/profile",
                estimatedTime="2 min",
                impactScore="+25% Precision",
            )

        role_target = (profile.target_roles[0] if profile and profile.target_roles else "ENGINEERING").upper()
        mission_str = f"MISSION: SECURE {role_target} ROLE" if profile and profile.target_roles else "MISSION: INITIALIZE CAREER ENGINE"

        evidence_pct = int((min(proof_count, 10) / 10) * 100) if proof_count > 0 else 0
        skills_pct = int((min(verified_skills, 10) / 10) * 100) if total_skills > 0 else 0
        pipeline_pct = int((min(app_count, 5) / 5) * 100) if app_count > 0 else 0
        profile_pct = completeness

        telemetry = [
            TelemetrySegment(label="Evidence Proofs", value=evidence_pct, color="bg-emerald-500"),
            TelemetrySegment(label="Verified Skills", value=skills_pct, color="bg-primary"),
            TelemetrySegment(label="Profile Integrity", value=profile_pct, color="bg-blue-400"),
            TelemetrySegment(label="Pipeline Velocity", value=pipeline_pct, color="bg-purple-500"),
        ]

        return DashboardOverviewResponse(
            missionStatus=mission_str,
            overallReadiness=readiness,
            readinessTrend="Live dynamic calculation",
            telemetrySegments=telemetry,
            nextBestAction=next_action,
            timelineTasks=[],
            activeOpportunitiesCount=opp_count,
            verifiedProofsCount=proof_count,
            applicationsInFlightCount=app_count,
            interviewArenaScore=readiness,
        )
    except Exception as err:
        print(f"[Dashboard Overview Error] Handled safely: {err}")
        return DashboardOverviewResponse(
            missionStatus="MISSION: INITIALIZE CAREER ENGINE",
            overallReadiness=0,
            readinessTrend="Awaiting telemetry",
            telemetrySegments=[
                TelemetrySegment(label="Evidence Proofs", value=0, color="bg-emerald-500"),
                TelemetrySegment(label="Verified Skills", value=0, color="bg-primary"),
                TelemetrySegment(label="Profile Integrity", value=0, color="bg-blue-400"),
                TelemetrySegment(label="Pipeline Velocity", value=0, color="bg-purple-500"),
            ],
            nextBestAction=NextBestAction(
                title="Configure Profile & Targets",
                subtitle="Set your target roles and upload your resume to calibrate your autonomous career engine.",
                actionLabel="Set Up Profile",
                actionRoute="/profile",
                estimatedTime="2 min",
                impactScore="+25% Readiness",
            ),
            timelineTasks=[],
            activeOpportunitiesCount=0,
            verifiedProofsCount=0,
            applicationsInFlightCount=0,
            interviewArenaScore=0,
        )

