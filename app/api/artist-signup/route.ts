import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';
import { sanitizeEmail, sanitizeText, sanitizeUrl, escapeHtml } from '@/lib/sanitize';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Get recipient email for artist signups
const getArtistRecipientEmail = (): string => {
  return process.env.ARTIST_EMAIL || process.env.GENERAL_EMAIL || 'michellellvnw@gmail.com';
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 3 requests per IP per day
    const identifier = getRateLimitIdentifier(request);
    const rateLimitResult = await rateLimit(identifier, 3, 24 * 60 * 60 * 1000);
    
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

    const { artistName, yourName, email, musicLink, betaAccess } = await request.json();

    // Validate and sanitize inputs
    let sanitizedEmail: string;
    let sanitizedArtistName: string;
    let sanitizedYourName: string;
    let sanitizedMusicLink: string | null = null;
    
    try {
      sanitizedEmail = sanitizeEmail(email);
      sanitizedArtistName = sanitizeText(artistName, 200);
      sanitizedYourName = sanitizeText(yourName, 200);
      
      if (!sanitizedArtistName || !sanitizedYourName) {
        return NextResponse.json(
          { error: 'Artist name and your name are required' },
          { status: 400 }
        );
      }
      
      if (musicLink) {
        sanitizedMusicLink = sanitizeUrl(musicLink);
      }
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Invalid input' },
        { status: 400 }
      );
    }

    const recipientEmail = getArtistRecipientEmail();

    // Send notification email with sanitized content
    if (resend) {
      try {
        await resend.emails.send({
          from: 'EmPulse <noreply@mothership-ai.com>',
          to: recipientEmail,
          subject: `New Artist Signup: ${escapeHtml(sanitizedArtistName)}`,
          html: `
            <h2>New Artist Signup</h2>
            <p><strong>Artist/Band Name:</strong> ${escapeHtml(sanitizedArtistName)}</p>
            <p><strong>Contact Name:</strong> ${escapeHtml(sanitizedYourName)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(sanitizedEmail)}">${escapeHtml(sanitizedEmail)}</a></p>
            ${sanitizedMusicLink ? `<p><strong>Music Link:</strong> <a href="${escapeHtml(sanitizedMusicLink)}" target="_blank" rel="noopener noreferrer">${escapeHtml(sanitizedMusicLink)}</a></p>` : '<p><strong>Music Link:</strong> Not provided</p>'}
            <p><strong>Beta Access Requested:</strong> ${betaAccess ? 'Yes' : 'No'}</p>
            <p><strong>Date:</strong> ${escapeHtml(new Date().toLocaleString())}</p>
            <hr>
            <p><small>This is an automated notification from the EmPulse website.</small></p>
          `,
        });
        console.log(`Artist signup email sent to ${recipientEmail}: ${sanitizedArtistName} (${sanitizedEmail})`);
      } catch (emailError) {
        console.error('Failed to send artist signup email:', emailError);
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

    // Log for manual processing
    console.log('New artist signup:', { artistName: sanitizedArtistName, yourName: sanitizedYourName, email: sanitizedEmail, musicLink: sanitizedMusicLink, betaAccess });

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
    console.error('Artist signup error:', error);
    // Don't expose internal error details
    return NextResponse.json(
      { error: 'Signup failed. Please try again later.' },
      { status: 500 }
    );
  }
}
