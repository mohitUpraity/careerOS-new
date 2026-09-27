from pydantic_settings import BaseSettings
import os
from typing import List

class Settings:
    PROJECT_NAME: str = "CareerOS Intelligence API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
    ]
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./careeros.db")
    
    # Environment
    ENV: str = os.getenv("ENV", "development")

settings = Settings()
