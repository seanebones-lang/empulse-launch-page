import pytest
from httpx import AsyncClient
from app.main import app


@pytest.mark.asyncio
async def test_health_check():
    """Test the health check endpoint"""
    async with AsyncClient(app=app, base_url="http://testserver") as client:
        response = await client.get("/healthz")

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        assert data["service"] == "empulse-chatbot-backend"


@pytest.mark.asyncio
async def test_websocket_endpoint_exists():
    """Test that WebSocket endpoint accepts connections (without full handshake)"""
    async with AsyncClient(app=app, base_url="http://testserver") as client:
        # Test that the endpoint exists by checking if it's in the app routes
        routes = [route.path for route in app.routes]
        assert "/ws/xai-voice" in routes


@pytest.mark.asyncio
async def test_cors_headers():
    """Test CORS configuration"""
    async with AsyncClient(app=app, base_url="http://testserver") as client:
        response = await client.options("/healthz")

        assert "access-control-allow-origin" in response.headers
        assert "access-control-allow-methods" in response.headers
        assert "access-control-allow-headers" in response.headers