from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from typing import Optional, List
from backend.app.core.database import get_db
from backend.app.models.hackathon import HackathonModel
from backend.app.schemas.hackathon import HackathonResponse, HackathonListResponse

router = APIRouter()

INITIAL_HACKATHONS = [
    {
        "id": "hack_unstop_01",
        "title": "Google Cloud & Vertex AI Global Hackathon 2026",
        "organizer": "Google Cloud / Unstop",
        "prize_pool": "$150,000",
        "status": "LIVE",
        "deadline": "Oct 15, 2026",
        "start_date": "Sep 20, 2026",
        "location": "Virtual / Global",
        "team_size": "2 - 4 Members",
        "tracks": ["Generative AI & LLM Systems", "Multimodal Agents", "Cloud Infrastructure"],
        "tags": ["Google Cloud", "Gemini 2.0", "Vertex AI", "Unstop"],
        "url": "https://unstop.com/hackathons/google-cloud-vertex-ai-2026",
        "description": "Build production-grade AI applications and low-latency inference systems using Google Cloud and Gemini 2.0.",
        "registered_count": 3420
    },
    {
        "id": "hack_devpost_02",
        "title": "Anthropic Claude Frontier Autonomous Systems Hackathon",
        "organizer": "Anthropic / Devpost",
        "prize_pool": "$100,000",
        "status": "LIVE",
        "deadline": "Oct 22, 2026",
        "start_date": "Sep 25, 2026",
        "location": "Virtual / San Francisco",
        "team_size": "1 - 4 Members",
        "tracks": ["Autonomous Coding Agents", "Multi-Agent Workflows", "Computer Use API"],
        "tags": ["Anthropic", "Claude 3.5", "Devpost", "Agents"],
        "url": "https://devpost.com/hackathons/anthropic-frontier-2026",
        "description": "Develop multi-agent autonomous orchestrations and reliable reasoning tools with Claude 3.5 Sonnet.",
        "registered_count": 2180
    },
    {
        "id": "hack_ethglobal_03",
        "title": "ETHGlobal Autonomous Defense & Cryptographic Proofs",
        "organizer": "ETHGlobal",
        "prize_pool": "$250,000",
        "status": "UPCOMING",
        "deadline": "Nov 5, 2026",
        "start_date": "Oct 28, 2026",
        "location": "Singapore & Virtual",
        "team_size": "2 - 5 Members",
        "tracks": ["ZK Verifiable ML", "Distributed Infrastructure", "Decentralized AI"],
        "tags": ["ZK-Proofs", "Distributed Systems", "Cryptography"],
        "url": "https://ethglobal.com/events/autonomous-2026",
        "description": "Pioneering verifiable computation, zero-knowledge evidence verification, and decentralized computing.",
        "registered_count": 1890
    }
]

@router.get("", response_model=HackathonListResponse)
async def get_hackathons(
    status: Optional[str] = Query(None, description="Filter by status: LIVE, UPCOMING, PAST"),
    search: Optional[str] = Query(None, description="Search by title, organizer, or tags"),
    db: AsyncSession = Depends(get_db)
):
    query = select(HackathonModel)

    if status and status != "ALL":
        query = query.where(HackathonModel.status == status.upper())

    if search:
        search_pattern = f"%{search}%"
        query = query.where(
            or_(
                HackathonModel.title.ilike(search_pattern),
                HackathonModel.organizer.ilike(search_pattern)
            )
        )

    result = await db.execute(query)
    items = result.scalars().all()

    # Seed on the fly if table is empty
    if len(items) == 0 and (status is None or status == "ALL"):
        for h in INITIAL_HACKATHONS:
            db.add(HackathonModel(**h))
        await db.commit()
        refreshed = await db.execute(select(HackathonModel))
        items = refreshed.scalars().all()

    return HackathonListResponse(
        total=len(items),
        items=[HackathonResponse.model_validate(h) for h in items]
    )
