import asyncio
from httpx import AsyncClient, ASGITransport
from backend.app.main import app
from backend.app.core.database import init_db

async def test_all():
    await init_db()
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # 1. Health
        h = await client.get("/health")
        print("Health response:", h.status_code, h.json())
        assert h.status_code == 200

        # 2. Profile GET
        p = await client.get("/api/v1/profile")
        print("Profile GET response:", p.status_code, p.json())
        assert p.status_code == 200

        # 3. Profile PUT
        update = await client.put("/api/v1/profile", json={"location": "Bengaluru, India / Remote PST (Verified)"})
        print("Profile PUT response:", update.status_code, update.json())
        assert update.status_code == 200

        # 4. Dashboard Overview
        d = await client.get("/api/v1/dashboard/overview")
        print("Dashboard Overview response:", d.status_code, d.json())
        assert d.status_code == 200

    print("ALL ASGI ENDPOINT TESTS PASSED SUCCESSFULLY! 🚀")

if __name__ == "__main__":
    asyncio.run(test_all())
