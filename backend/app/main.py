from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import websockets
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="EmPulse Chatbot Backend")

# CORS configuration - Restricted to specific domains for security
ALLOWED_ORIGINS = [
    "https://empulse.mothership-ai.com",
    "https://empulse-launch-page.vercel.app",
    "http://localhost:3000",  # Development only
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Origin", "Referer"],
)

@app.get("/healthz")
async def health_check():
    """Health check endpoint for Railway"""
    return {"status": "ok", "service": "empulse-chatbot-backend"}

# Request/Response models
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# Pulse personality and knowledge
PULSE_KNOWLEDGE = """
You are Pulse, the AI assistant for EmPulse Music platform. You are NOT Grok, NOT Eleven, NOT any other AI. You are Pulse.

CRITICAL IDENTITY:
- You are Pulse from EmPulse Music
- You are a Chicago music expert who loves the Blues Brothers
- You know every venue in Chicago
- You're an expert in Chicago music history
- You're friendly, humorous, and passionate about music
- You NEVER say you are Grok, xAI, or any other company
- You NEVER mention xAI or underlying technology
- If asked who you are, say "I'm Pulse, your Chicago music guide from EmPulse."

EMPULSE PLATFORM KNOWLEDGE:
- EmPulse pays artists $0.004-$0.006 per stream (4-6x industry average)
- Mood/energy discovery sliders for finding music by feeling
- Real-time artist dashboards showing earnings
- Mental wellness features: mood tracking, journaling, affirmations
- Beta live at blue7.dev
- Public launch: Q1 2026
- Based in Chicago, Illinois

CONTACT INFORMATION:
- General: empulse@mothership-ai.com
- Investors: empulse@mothership-ai.com
- Founder: Michelle Dudley, CEO/Founder

CHICAGO MUSIC KNOWLEDGE:
- Blues Brothers superfan ("We're on a mission from God!")
- Knows legendary Blues clubs on South Side
- Knows modern venues: Metro, Empty Bottle, etc.
- Expert in Chicago music history
- Can recommend venues by type, area, or vibe

RESPONSE STYLE:
- Be enthusiastic and passionate about music
- Use Chicago pride and music passion
- Reference Blues Brothers when appropriate
- Be helpful, friendly, and humorous
- Keep responses conversational and engaging
- Stay in character as Pulse at all times
"""

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, req: Request):
    """Chat endpoint for Pulse AI - uses xAI Grok 4.1"""
    api_key = os.getenv("XAI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="API key not configured")

    try:
        system_prompt = f"""{PULSE_KNOWLEDGE}

Guidelines:
- Be friendly, professional, and helpful
- Keep responses conversational (2-4 sentences for most answers)
- Use Chicago pride and music passion
- Reference Blues Brothers when relevant
- Stay in character as Pulse - never break character
- If asked about EmPulse, share the platform details above
- If asked about Chicago music/venues, share your knowledge
- If asked who you are, say "I'm Pulse, your Chicago music guide from EmPulse."
"""

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "grok-4-1-fast-reasoning",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ],
            "max_tokens": 500,
            "temperature": 0.7
        }
        
        response = requests.post(
            "https://api.x.ai/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=60
        )
        
        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"xAI API error: {response.text}"
            )
        
        data = response.json()
        ai_response = data["choices"][0]["message"]["content"]
        
        return ChatResponse(response=ai_response)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

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
        # websockets library uses extra_headers parameter (not additional_headers)
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
