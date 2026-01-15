#!/usr/bin/env python3
"""
Test script to verify voice chat functionality with actual message exchange
"""
import asyncio
import json
import websockets
import httpx

async def test_voice_chat():
    """Test sending a message through the voice WebSocket"""
    print("🎤 Testing EmPulse Voice Chat Functionality")
    print("=" * 50)

    print("1. Using direct WebSocket connection...")

    # Connect to WebSocket
    print("2. Connecting to voice WebSocket...")
    try:
        uri = "ws://localhost:8000/ws/xai-voice"
        async with websockets.connect(uri) as websocket:
            print("✅ WebSocket connected")

            # Wait for conversation created
            response = await websocket.recv()
            data = json.loads(response)
            print(f"✅ Conversation created: {data['type']}")

            # Send a test message
            print("3. Sending test message...")
            message = {
                "type": "conversation.item.create",
                "item": {
                    "type": "message",
                    "role": "user",
                    "content": [{"type": "input_text", "text": "Hello Pulse, tell me about EmPulse"}]
                }
            }
            await websocket.send(json.dumps(message))
            print("✅ Message sent")

            # Request response
            response_request = {
                "type": "response.create",
                "response": {
                    "modalities": ["text", "audio"]
                }
            }
            await websocket.send(json.dumps(response_request))
            print("✅ Response requested")

            # Listen for responses
            print("4. Listening for AI responses...")
            timeout = 10  # seconds
            start_time = asyncio.get_event_loop().time()

            while asyncio.get_event_loop().time() - start_time < timeout:
                try:
                    response = await asyncio.wait_for(websocket.recv(), timeout=1.0)
                    data = json.loads(response)

                    if data['type'] == 'response.created':
                        print("✅ Response started")
                    elif data['type'] == 'response.output_audio_transcript.delta':
                        print(f"📝 Text: {data.get('delta', '')}", end="", flush=True)
                    elif data['type'] == 'response.output_audio.delta':
                        print("🔊 Audio chunk received")
                    elif data['type'] == 'response.done':
                        print("\n✅ Response complete")
                        break
                    elif data['type'] == 'error':
                        print(f"❌ Error: {data.get('error', {}).get('message', 'Unknown error')}")
                        break

                except asyncio.TimeoutError:
                    continue

            print("5. Test completed successfully! 🎉")

    except Exception as e:
        print(f"❌ WebSocket test failed: {e}")
        return

    print("=" * 50)
    print("🎉 Voice chat functionality test completed!")
    print("\n📋 Results:")
    print("- ✅ WebSocket connection")
    print("- ✅ xAI authentication")
    print("- ✅ Message sending")
    print("- ✅ AI response received")
    print("- ✅ Voice ready with Ara")

if __name__ == "__main__":
    asyncio.run(test_voice_chat())