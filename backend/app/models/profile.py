from sqlalchemy import Column, String, Integer, Float, Text, Boolean, JSON, DateTime
from datetime import datetime
from backend.app.core.database import Base

class UserProfileModel(Base):
    __tablename__ = "user_profiles"

    id = Column(String, primary_key=True, index=True, default="default_user")
    name = Column(String, default="Mohit Upraity")
    headline = Column(String, default="AI Systems & Low-Latency Engineer | Building eBPF Zero-Copy Firewalls & Triton CUDA Kernels")
    location = Column(String, default="Bengaluru, India / Remote PST")
    email = Column(String, default="mohit@careeros.ai")
    github = Column(String, default="https://github.com/mohitUpraity")
    linkedin = Column(String, default="https://linkedin.com/in/mohitupraity")
    manifesto = Column(Text, default="Passionate about high-throughput distributed inference, zero-copy kernel networking, and deterministic systems.")
    target_roles = Column(JSON, default=lambda: ["AI Infrastructure Engineer", "Distributed Systems Engineer", "MLOps Architect", "Kernel & Systems Security Engineer"])
    profile_completeness = Column(Integer, default=94)
    overall_readiness = Column(Integer, default=88)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
