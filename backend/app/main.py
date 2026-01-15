from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import websockets
import asyncio
import os
import httpx
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="EmPulse Chatbot Backend")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your Vercel domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# xAI Voice API configuration
SESSION_REQUEST_URL = "https://api.x.ai/v1/realtime/client_secrets"
XAI_API_KEY = os.getenv("XAI_API_KEY")

@app.get("/healthz")
async def health_check():
    """Health check endpoint for Railway"""
    return {"status": "ok", "service": "empulse-chatbot-backend"}

@app.post("/session")
async def get_ephemeral_token():
    """
    Get ephemeral token for xAI Voice API client authentication
    This endpoint fetches a scoped access token for secure client-side connections
    """
    if not XAI_API_KEY:
        raise HTTPException(status_code=500, detail="XAI_API_KEY not configured")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                url=SESSION_REQUEST_URL,
                headers={
                    "Authorization": f"Bearer {XAI_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={"expires_after": {"seconds": 300}},  # 5 minute expiry
            )

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to get ephemeral token")

        return response.json()

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching ephemeral token: {str(e)}")

@app.websocket("/ws/xai-voice")
async def xai_voice_proxy(websocket: WebSocket):
    """
    WebSocket proxy for xAI Voice Agent API with ephemeral token authentication
    Handles secure client authentication and proxies messages between client and xAI

    WHY WE NEED THIS:
    - Browsers CANNOT send custom headers (like Authorization) when creating WebSocket connections
    - Backend proxy connects to xAI using ephemeral token provided by client
    - Frontend gets ephemeral token first, then connects to this proxy
    - Provides secure, scoped access without exposing API keys to client
    """
    await websocket.accept()

    ephemeral_token = None
    xai_ws_url = "wss://api.x.ai/v1/realtime"
    xai_ws = None

    try:
        # Wait for client to send ephemeral token
        try:
            init_message = await asyncio.wait_for(websocket.receive_json(), timeout=10.0)
            if init_message.type === 'auth' and init_message.token:
                ephemeral_token = init_message.token
                print("[xAI Voice Proxy] Received ephemeral token")
            else:
                await websocket.close(code=1008, reason="Authentication required")
                return
        except asyncio.TimeoutError:
            await websocket.close(code=1008, reason="Authentication timeout")
            return

        # Connect to xAI Voice API with ephemeral token
        xai_ws = await websockets.connect(
            xai_ws_url,
            extra_headers={"Authorization": f"Bearer {ephemeral_token}"}
        )

        print("[xAI Voice Proxy] Connected to xAI Voice API with ephemeral token")

        # Create tasks for bidirectional message forwarding
        async def forward_to_xai():
            """Forward messages from frontend → xAI"""
            try:
                while True:
                    data = await websocket.receive_text()
                    await xai_ws.send(data)
            except WebSocketDisconnect:
                print("[xAI Voice Proxy] Client disconnected")
                raise
            except Exception as e:
                print(f"[xAI Voice Proxy] Error forwarding to xAI: {e}")
                raise

        async def forward_to_client():
            """Forward messages from xAI → frontend"""
            try:
                while True:
                    data = await xai_ws.recv()
                    if isinstance(data, str):
                        await websocket.send_text(data)
                    else:
                        await websocket.send_bytes(data)
            except websockets.exceptions.ConnectionClosed:
                print("[xAI Voice Proxy] xAI connection closed")
                raise
            except Exception as e:
                print(f"[xAI Voice Proxy] Error forwarding to client: {e}")
                raise

        # Run both forwarding tasks concurrently
        try:
            await asyncio.gather(
                forward_to_xai(),
                forward_to_client(),
                return_exceptions=True
            )
        except Exception as e:
            print(f"[xAI Voice Proxy] Task error: {e}")

    except Exception as e:
        print(f"[xAI Voice Proxy] Error: {e}")
        import traceback
        traceback.print_exc()
        try:
            await websocket.close(code=1011, reason=f"Proxy error: {str(e)}")
        except:
            pass
    finally:
        if xai_ws:
            try:
                await xai_ws.close()
            except:
                pass
        try:
            await websocket.close()
        except:
            pass

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
