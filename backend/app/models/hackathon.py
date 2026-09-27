from sqlalchemy import Column, String, Integer, Text, JSON, DateTime, Boolean
from datetime import datetime
from backend.app.core.database import Base

class HackathonModel(Base):
    __tablename__ = "hackathons"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    organizer = Column(String, nullable=False) # Google, Unstop, Devpost, ETHGlobal, MLH, Microsoft
    prize_pool = Column(String, default="$50,000")
    status = Column(String, default="LIVE") # LIVE, UPCOMING, PAST
    deadline = Column(String, nullable=True)
    start_date = Column(String, nullable=True)
    location = Column(String, default="Virtual / Global")
    team_size = Column(String, default="1 - 4 Members")
    tracks = Column(JSON, default=list)
    tags = Column(JSON, default=list)
    url = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    registered_count = Column(Integer, default=1240)
    created_at = Column(DateTime, default=datetime.utcnow)
