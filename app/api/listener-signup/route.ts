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

    // Send notification email to admin
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
        console.log(`Listener signup notification email sent to ${recipientEmail}: ${sanitizedEmail}`);
      } catch (emailError) {
        console.error('Failed to send listener signup notification email:', emailError);
      }
    }

    // Send confirmation email to user
    let confirmationEmailSent = false;
    if (resend) {
      try {
        const result = await resend.emails.send({
          from: 'EmPulse <noreply@mothership-ai.com>',
          to: sanitizedEmail,
          subject: 'You\'re on the EmPulse Waitlist! 🎵',
          html: `
            <h2 style="color: #ffb800;">You're on the EmPulse Waitlist!</h2>
            <p>Thanks for joining! We're building something different—a music platform that actually pays artists fairly and helps you discover music by how it makes you feel.</p>
            
            <h3>What's Next?</h3>
            <ul>
              <li><strong>Try the Live Beta:</strong> <a href="https://blue7.dev" style="color: #ffb800;">blue7.dev</a> - Experience mood-based discovery right now!</li>
              <li><strong>Stay Updated:</strong> We'll send you updates on launch, features, and early access opportunities.</li>
              ${betaTester ? '<li><strong>Beta Tester:</strong> We\'ll reach out soon with beta testing opportunities and feedback requests.</li>' : ''}
              ${alsoArtist ? '<li><strong>Artist Interest:</strong> Since you\'re also an artist, check out <a href="https://empulse.music/artists" style="color: #ffb800;">our artist page</a> to learn about earning 4-6x more per stream.</li>' : ''}
            </ul>
            
            <h3>What Makes EmPulse Different?</h3>
            <ul>
              <li>🎵 <strong>Mood-Based Discovery:</strong> Two sliders for mood and energy - find music by feeling, not algorithms</li>
              <li>💰 <strong>Artist-First Economics:</strong> Artists earn $0.004-$0.006 per stream (4-6x industry average)</li>
              <li>🧠 <strong>Wellness Built In:</strong> Mood tracking, journaling, and affirmations integrated into the listening experience</li>
            </ul>
            
            <p><strong>Current Status:</strong></p>
            <ul>
              <li>1,247 artists on the platform</li>
              <li>3,891 listeners</li>
              <li>MVP 100% complete - live beta at <a href="https://blue7.dev" style="color: #ffb800;">blue7.dev</a></li>
              <li>Public launch: Q1 2026</li>
            </ul>
            
            <p>Questions? Contact us at <a href="mailto:michellellvnw@gmail.com" style="color: #ffb800;">michellellvnw@gmail.com</a></p>
            
            <p style="margin-top: 30px; color: #666; font-size: 12px;">
              You're receiving this because you joined the EmPulse waitlist. 
              <br>EmPulse - Music That Knows How You Feel
            </p>
          `,
        });
        confirmationEmailSent = true;
        console.log(`Listener signup confirmation email sent to ${sanitizedEmail}:`, result);
      } catch (emailError) {
        console.error('Failed to send listener signup confirmation email:', emailError);
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
