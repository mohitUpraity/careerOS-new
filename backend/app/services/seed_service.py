from sqlalchemy.ext.asyncio import AsyncSession

async def seed_initial_data_if_empty(session: AsyncSession):
    """
    Zero-mock architecture: No hardcoded demo data is injected.
    All data is strictly populated dynamically by real users through:
    1. Mandatory Onboarding & Gemini Resume / AST Parsing
    2. Live Opportunity Scrapers (LinkedIn, Google, Devpost, Unstop, YC)
    3. User-created Applications, Skills, Evidence nodes, and Interviews
    """
    # Clean no-op to ensure a pure, 100% real user database
    pass
