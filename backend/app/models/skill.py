from sqlalchemy import Column, String, Integer, Float, Text, Boolean, JSON, DateTime
from datetime import datetime
from backend.app.core.database import Base

class SkillModel(Base):
    __tablename__ = "skills"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, default="default_user")
    name = Column(String, nullable=False)
    category = Column(String, default="Engineering") # AI & ML Infra, Distributed Systems, Low-Level & Hardware, Networking & Security
    proficiency = Column(Integer, default=85) # 0-100
    verified = Column(Boolean, default=True)
    proof_count = Column(Integer, default=1)
    ast_proof_hash = Column(String, nullable=True)
    ast_proof_details = Column(JSON, default=dict)
    tags = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class EvidenceModel(Base):
    __tablename__ = "evidence_vault"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, default="default_user")
    title = Column(String, nullable=False)
    type = Column(String, default="PR") # PR, Package, Paper, System, Benchmark
    platform = Column(String, default="GitHub") # GitHub, PyPI, ArXiv, Kaggle, HuggingFace, Production
    sha_hash = Column(String, nullable=True)
    url = Column(String, nullable=True)
    metric_proof = Column(String, nullable=True)
    skills_linked = Column(JSON, default=list)
    verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class SkillGapModel(Base):
    __tablename__ = "skill_gaps"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, default="default_user")
    target_role = Column(String, nullable=False)
    competency = Column(String, nullable=False)
    current_level = Column(Integer, default=50)
    required_level = Column(Integer, default=85)
    status = Column(String, default="GAP") # VERIFIED, PARTIAL, GAP
    remediation_task = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
