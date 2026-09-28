import os
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from backend.app.core.config import settings, BASE_DIR

Base = declarative_base()

# Local SQLite fallback URL
SQLITE_FALLBACK_URL = f"sqlite+aiosqlite:///{BASE_DIR}/careeros.db"

def _create_engine(db_url: str):
    connect_args = {}
    if "sqlite" in db_url:
        connect_args = {"check_same_thread": False}
    elif "postgresql" in db_url:
        connect_args = {"ssl": "require"}
    return create_async_engine(
        db_url,
        echo=False,
        future=True,
        connect_args=connect_args,
        pool_pre_ping=True,
    )

engine = _create_engine(settings.DATABASE_URL)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

async def check_and_switch_to_fallback():
    global engine, AsyncSessionLocal
    if "postgresql" in settings.DATABASE_URL:
        try:
            # Test connection with 8s timeout to allow secure pooler handshake
            async with asyncio.timeout(8):
                async with engine.connect() as conn:
                    from sqlalchemy import text
                    await conn.execute(text("SELECT 1"))
            print("[CareerOS Engine] Supabase PostgreSQL (17.6) connected successfully.")
        except Exception as err:
            print(f"[CareerOS Engine Notice] Supabase connection unavailable ({err}). Switching to persistent local storage.")
            engine = _create_engine(SQLITE_FALLBACK_URL)
            AsyncSessionLocal = async_sessionmaker(
                bind=engine,
                class_=AsyncSession,
                expire_on_commit=False,
                autocommit=False,
                autoflush=False,
            )

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception as e:
            try:
                await session.rollback()
            except Exception:
                pass
            raise e
        finally:
            await session.close()

async def init_db():
    await check_and_switch_to_fallback()
    
    # Import all models to ensure they are registered with Base.metadata
    import backend.app.models.user
    import backend.app.models.profile
    import backend.app.models.resume
    import backend.app.models.skill
    import backend.app.models.rag
    import backend.app.models.opportunity
    import backend.app.models.application
    import backend.app.models.hackathon
    import backend.app.models.document

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Seed initial data if tables are empty
    from backend.app.services.seed_service import seed_initial_data_if_empty
    async with AsyncSessionLocal() as session:
        await seed_initial_data_if_empty(session)
