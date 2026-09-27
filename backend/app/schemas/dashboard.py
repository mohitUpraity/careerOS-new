from pydantic import BaseModel
from typing import List, Optional

class TelemetrySegment(BaseModel):
    label: str
    value: int
    color: str

class NextBestAction(BaseModel):
    title: str
    subtitle: str
    actionLabel: str
    actionRoute: str
    estimatedTime: str
    impactScore: str

class TimelineTask(BaseModel):
    id: str
    title: str
    time: str
    category: str
    completed: bool

class DashboardOverviewResponse(BaseModel):
    missionStatus: str
    overallReadiness: int
    readinessTrend: str
    telemetrySegments: List[TelemetrySegment]
    nextBestAction: NextBestAction
    timelineTasks: List[TimelineTask]
    activeOpportunitiesCount: int
    verifiedProofsCount: int
    applicationsInFlightCount: int
    interviewArenaScore: int
