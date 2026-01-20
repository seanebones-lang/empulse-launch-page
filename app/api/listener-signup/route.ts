import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';
import { sanitizeEmail, escapeHtml } from '@/lib/sanitize';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Get recipient email for listener signups
const getListenerRecipientEmail = (): string => {
  return process.env.LISTENER_EMAIL || process.env.GENERAL_EMAIL || 'michellellvnw@gmail.com';
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

    const { email, betaTester, alsoArtist } = await request.json();

    // Validate and sanitize email
    let sanitizedEmail: string;
    try {
      sanitizedEmail = sanitizeEmail(email);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Invalid email address' },
        { status: 400 }
      );
    }

    const recipientEmail = getListenerRecipientEmail();

    // Send notification email with sanitized content
    if (resend) {
      try {
        await resend.emails.send({
          from: 'EmPulse <noreply@mothership-ai.com>',
          to: recipientEmail,
          subject: `New Listener Signup: ${escapeHtml(sanitizedEmail)}`,
          html: `
            <h2>New Listener Signup</h2>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(sanitizedEmail)}">${escapeHtml(sanitizedEmail)}</a></p>
            <p><strong>Wants to Beta Test:</strong> ${betaTester ? 'Yes' : 'No'}</p>
            <p><strong>Also an Artist:</strong> ${alsoArtist ? 'Yes' : 'No'}</p>
            <p><strong>Date:</strong> ${escapeHtml(new Date().toLocaleString())}</p>
            <hr>
            <p><small>This is an automated notification from the EmPulse website.</small></p>
          `,
        });
        console.log(`Listener signup email sent to ${recipientEmail}: ${sanitizedEmail}`);
      } catch (emailError) {
        console.error('Failed to send listener signup email:', emailError);
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
      }
    }

    // Log signup
    console.log('New listener signup:', { email: sanitizedEmail, betaTester, alsoArtist });

    return NextResponse.json(
      { success: true, message: 'Signup successful' },
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
    console.error('Listener signup error:', error);
    // Don't expose internal error details
    return NextResponse.json(
      { error: 'Signup failed. Please try again later.' },
      { status: 500 }
    );
  }
}
