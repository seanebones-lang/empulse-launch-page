from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import websockets
import asyncio
import os
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

@app.get("/healthz")
async def health_check():
    """Health check endpoint for Railway"""
    return {"status": "ok", "service": "empulse-chatbot-backend"}

@app.websocket("/ws/xai-voice")
async def xai_voice_proxy(websocket: WebSocket):
    """
    WebSocket proxy for xAI Voice Agent API
    Handles authentication and proxies messages between client and xAI

    WHY WE NEED THIS:
    - Browsers CANNOT send custom headers (like Authorization) when creating WebSocket connections
    - Backend proxy connects to xAI with API key, then forwards all messages
    - Frontend connects to this proxy (no auth needed)
    """
    await websocket.accept()

    xai_api_key = os.getenv("XAI_API_KEY")
    if not xai_api_key:
        await websocket.close(code=1008, reason="XAI_API_KEY not configured")
        return

    xai_ws_url = "wss://api.x.ai/v1/realtime"
    xai_ws = None

    try:
        # Connect to xAI Voice API with auth header
        xai_ws = await websockets.connect(
            xai_ws_url,
            extra_headers={"Authorization": f"Bearer {xai_api_key}"}
        )

        print("[xAI Voice Proxy] Connected to xAI Voice API")

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
