import pytest
from httpx import AsyncClient, ASGITransport
from backend.app.main import app

@pytest.mark.asyncio
async def test_health():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "online"
        assert data["service"] == "CareerOS Intelligence API"

@pytest.mark.asyncio
async def test_get_and_update_profile():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # Get
        response = await ac.get("/api/v1/profile")
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Mohit Upraity"
        assert "AI Infrastructure Engineer" in data["target_roles"]

        # Update
        update_payload = {"location": "Bengaluru, India / Remote Global"}
        put_response = await ac.put("/api/v1/profile", json=update_payload)
        assert put_response.status_code == 200
        updated = put_response.json()
        assert updated["location"] == "Bengaluru, India / Remote Global"

@pytest.mark.asyncio
async def test_dashboard_overview():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/dashboard/overview")
        assert response.status_code == 200
        data = response.json()
        assert data["overallReadiness"] >= 80
        assert data["activeOpportunitiesCount"] > 0
        assert len(data["telemetrySegments"]) == 4
        assert data["nextBestAction"]["actionLabel"] == "Launch Simulator"
