import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';
import { sanitizeEmail, sanitizeText, escapeHtml } from '@/lib/sanitize';

// Initialize Resend with API key from environment
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Email routing based on source
const getRecipientEmail = (source: string): string => {
  if (source?.includes('investor') || source?.includes('investors')) {
    return process.env.INVESTOR_EMAIL || 'investors@empulse.music';
  }
  if (source?.includes('artist') || source?.includes('artists')) {
    return process.env.ARTIST_EMAIL || 'empulse@mothership-ai.com';
  }
  if (source?.includes('listener') || source?.includes('listeners')) {
    return process.env.LISTENER_EMAIL || 'empulse@mothership-ai.com';
  }
  // Default to general email
  return process.env.GENERAL_EMAIL || 'empulse@mothership-ai.com';
};

const getSourceLabel = (source: string): string => {
  if (source?.includes('investor')) return 'Investor';
  if (source?.includes('artist')) return 'Artist';
  if (source?.includes('listener')) return 'Listener';
  if (source?.includes('home')) return 'Home Page';
  if (source?.includes('exit-intent')) return 'Exit Intent';
  return 'General';
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 requests per IP per hour
    const identifier = getRateLimitIdentifier(request);
    const rateLimitResult = await rateLimit(identifier, 5, 60 * 60 * 1000);
    
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

    const { email, source } = await request.json();

    // Validate and sanitize inputs
    let sanitizedEmail: string;
    let sanitizedSource: string;
    
    try {
      sanitizedEmail = sanitizeEmail(email);
      sanitizedSource = sanitizeText(source || 'general', 100);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Invalid input' },
        { status: 400 }
      );
    }

    const recipientEmail = getRecipientEmail(sanitizedSource);
    const sourceLabel = getSourceLabel(sanitizedSource);

    // Send email notification with sanitized content
    if (resend) {
      try {
        await resend.emails.send({
          from: 'EmPulse <noreply@mothership-ai.com>',
          to: recipientEmail,
          subject: `New ${escapeHtml(sourceLabel)} Lead: ${escapeHtml(sanitizedEmail)}`,
          html: `
            <h2>New ${escapeHtml(sourceLabel)} Lead</h2>
            <p><strong>Email:</strong> ${escapeHtml(sanitizedEmail)}</p>
            <p><strong>Source:</strong> ${escapeHtml(sanitizedSource)}</p>
            <p><strong>Date:</strong> ${escapeHtml(new Date().toLocaleString())}</p>
            <hr>
            <p><small>This is an automated notification from the EmPulse website.</small></p>
          `,
        });
        console.log(`Email sent to ${recipientEmail} for ${sourceLabel} lead: ${sanitizedEmail}`);
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Continue - we'll still log it
      }
    }

    // Add to Resend audience if configured
    if (resend && process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
      } catch (resendError) {
        console.error('Resend audience error:', resendError);
        // Continue even if audience add fails
      }
    }

    // Log subscription
    console.log(`New subscription: ${sanitizedEmail} (source: ${sanitizedSource}) → ${recipientEmail}`);

    return NextResponse.json(
      { success: true, message: 'Subscribed successfully' },
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
    console.error('Subscription error:', error);
    // Don't expose internal error details
    return NextResponse.json(
      { error: 'Subscription failed. Please try again later.' },
      { status: 500 }
    );
  }
}
