import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';
import { sanitizeText } from '@/lib/sanitize';

// Proxy to Railway backend API for Pulse AI chatbot
// This route forwards requests to the real backend API

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://mellow-trust-production.up.railway.app';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 20 requests per IP per minute
    const identifier = getRateLimitIdentifier(request);
    const rateLimitResult = await rateLimit(identifier, 20, 60 * 1000);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const { message, history } = await request.json();

    // Validate and sanitize message
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    let sanitizedMessage: string;
    try {
      sanitizedMessage = sanitizeText(message, 1000); // Max 1000 characters
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Invalid message format' },
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
      body: JSON.stringify({ message: sanitizedMessage }),
    });

    if (!backendResponse.ok) {
      throw new Error(`Backend API error: ${backendResponse.status}`);
    }

    const data = await backendResponse.json();

    return NextResponse.json(
      { response: data.response },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
        },
      }
    );
  } catch (error) {
    console.error('Pulse chat error:', error);
    // Don't expose internal error details
    return NextResponse.json(
      { error: 'Chat failed. Please try again later.' },
      { status: 500 }
    );
  }
}
