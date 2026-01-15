import { NextRequest, NextResponse } from 'next/server';

// Proxy to Railway backend API for Pulse AI chatbot
// This route forwards requests to the real backend API

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://mellow-trust-production.up.railway.app';

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Forward to Railway backend API with Origin header for Pulse detection
    const origin = request.headers.get('origin') || request.headers.get('referer') || 'https://empulse.mothership-ai.com';
    const backendResponse = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': origin,
        'Referer': origin,
      },
      body: JSON.stringify({ message }),
    });

    if (!backendResponse.ok) {
      throw new Error(`Backend API error: ${backendResponse.status}`);
    }

    const data = await backendResponse.json();

    return NextResponse.json(
      { response: data.response },
      { status: 200 }
    );
  } catch (error) {
    console.error('Pulse chat error:', error);
    return NextResponse.json(
      { error: 'Chat failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
