from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class HackathonBase(BaseModel):
    id: str
    title: str
    organizer: str
    prize_pool: str = "$50,000"
    status: str = "LIVE" # LIVE, UPCOMING, PAST
    deadline: Optional[str] = None
    start_date: Optional[str] = None
    location: str = "Virtual / Global"
    team_size: str = "1 - 4 Members"
    tracks: List[str] = []
    tags: List[str] = []
    url: Optional[str] = None
    description: Optional[str] = None
    registered_count: int = 1240

class HackathonResponse(HackathonBase):
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class HackathonListResponse(BaseModel):
    total: int
    items: List[HackathonResponse]
