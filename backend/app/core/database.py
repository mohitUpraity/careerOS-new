from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from backend.app.core.config import settings

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
    future=True,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def init_db():
    # Import all models to ensure they are registered with Base.metadata
    import backend.app.models.user
    import backend.app.models.profile
    import backend.app.models.opportunity
    import backend.app.models.application
    import backend.app.models.skill

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Seed initial data if tables are empty
    from backend.app.services.seed_service import seed_initial_data_if_empty
    async with AsyncSessionLocal() as session:
        await seed_initial_data_if_empty(session)
