from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import websockets
import asyncio
import os
import requests
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

EMPULSE PLATFORM - COMPREHENSIVE KNOWLEDGE:

Core Mission:
- EmPulse is a mood-based music streaming platform that pays artists 4-6x industry average
- Discover by mood, not algorithm. Support artists with real pay. Wellness built in, not bolted on.
- Music that knows how you feel

Live Beta:
- The live beta is available NOW at blue7.dev
- MVP is 100% complete and fully functional
- Users can try mood-based discovery, artist uploads, and wellness tracking right now
- ALWAYS mention blue7.dev when people ask about trying EmPulse or the beta

Artist Features & Economics:
- Artists earn $0.004 per free stream and $0.006 per premium stream (4-6x industry average)
- Real-time dashboards showing earnings instantly
- One-click unpublish control - artists control their catalog
- No small print. No earnings curve. It is what we say it is.
- Transparent payouts visible in real time
- Artists can upload their music directly
- Early Access: First 500 artists get lifetime 10% bonus (247/500 spots taken)

Listener Features:
- Two sliders for mood and energy - infinite discovery
- Set your mood. Set your energy. Find music that matches exactly where you are
- Discovery by feeling, not fame - great music finds you regardless of who made it
- Unknown artists compete on equal footing with established acts
- Your streams directly support independent creators

Wellness Features:
- Mental health built in - not an afterthought
- Daily mood tracking
- Journaling capabilities
- Affirmations
- Streaks that reward consistency
- Music and wellness in one place, reinforcing each other

Current Status:
- 1,247 artists on the platform
- 3,891 listeners
- Growing daily
- MVP 100% complete, live beta at blue7.dev
- Core features functional: mood discovery, artist uploads, wellness tracking
- Stripe integration complete
- Modern tech stack: Next.js, Prisma, Supabase
- Actively building artist pipeline
- Venue partnership conversations underway
- Development partnership with NextEleven Studios

Roadmap:
- Q1 2026: Public beta launch, artist and listener acquisition, seed fundraising
- Q2 2026: Venue partnerships for live streaming, expanded artist tools, growth marketing
- Q3 2026: Artist self-streaming from profiles, podcast platform integration
- Q4 2026: Mobile apps (iOS/Android), dedicated artist stations, Series A preparation

The Problem EmPulse Solves:
- For Artists: $0.001 average per stream on other platforms. Opaque royalty calculations. No control. Algorithmic invisibility.
- For Listeners: Algorithms don't understand you. They track what you click, not how you feel. Discovery is a popularity contest.
- For Everyone: Mental health is an afterthought. Wellness apps and music apps exist in separate worlds.

The Solution:
- Mood-based discovery replaces algorithmic recommendations
- Artist-first economics: 4-6x industry average payouts
- Integrated wellness: mood tracking, journaling, affirmations built into the listening experience

Market Opportunity:
- $30B+ global streaming market
- $10B+ wellness audio market growing 30% annually
- No one is serving the mental health-conscious listener or the independent artist well

Leadership:
- CEO/Founder: Michelle Dudley
- Company: NextEleven Studios LLC
- Location: Chicago, Illinois (filed December 2025)

CONTACT INFORMATION - CRITICAL:
- ALL contact requests, inquiries, questions, support requests, investor inquiries, artist inquiries, listener inquiries, general questions - EVERYTHING must be directed to: michellellvnw@gmail.com
- This is the ONLY contact email for all communications
- When anyone asks how to contact, get support, ask questions, or reach out - ALWAYS direct them to send an email to michellellvnw@gmail.com
- Never provide any other email address

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
- Always mention the live beta is at blue7.dev when relevant
- Always direct contact requests to michellellvnw@gmail.com
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
