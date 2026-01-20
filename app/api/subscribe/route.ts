import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';
import { sanitizeEmail, sanitizeText, escapeHtml } from '@/lib/sanitize';

// Initialize Resend with API key from environment
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Email routing based on source
const getRecipientEmail = (source: string): string => {
  // All emails go to michellellvnw@gmail.com
  return process.env.GENERAL_EMAIL || process.env.INVESTOR_EMAIL || process.env.ARTIST_EMAIL || process.env.LISTENER_EMAIL || 'michellellvnw@gmail.com';
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

    // Send confirmation email to user
    let confirmationEmailSent = false;
    if (resend) {
      try {
        const result = await resend.emails.send({
          from: 'EmPulse <noreply@mothership-ai.com>',
          to: sanitizedEmail,
          subject: 'Welcome to EmPulse! 🎵',
          html: `
            <h2 style="color: #ffb800;">Welcome to EmPulse!</h2>
            <p>Thanks for joining the EmPulse community! We're building something different—a music platform that actually pays artists fairly and helps you discover music by how it makes you feel.</p>
            
            <h3>What's Next?</h3>
            <ul>
              <li><strong>Try the Live Beta:</strong> <a href="https://blue7.dev" style="color: #ffb800;">blue7.dev</a> - Experience mood-based discovery right now!</li>
              <li><strong>Stay Updated:</strong> We'll send you updates on launch, features, and early access opportunities.</li>
              <li><strong>Join the Movement:</strong> We're at the intersection of streaming, wellness, and creator economy.</li>
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
            
            <hr>
            <p><small>EmPulse Music | NextEleven Studios LLC<br>
            <a href="https://empulse.music" style="color: #ffb800;">empulse.music</a></small></p>
          `,
        });
        if (result.data) {
          confirmationEmailSent = true;
          console.log(`✅ Confirmation email sent to ${sanitizedEmail} (ID: ${result.data.id})`);
        } else if (result.error) {
          console.error('❌ Resend API error:', result.error);
        }
      } catch (emailError) {
        console.error('❌ Failed to send confirmation email:', emailError);
        // Log the full error for debugging
        if (emailError instanceof Error) {
          console.error('Error details:', emailError.message, emailError.stack);
        }
      }
    } else {
      console.warn('⚠️ Resend API key not configured - confirmation email not sent');
    }

    // Send email notification to admin with sanitized content
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
        console.error('Failed to send notification email:', emailError);
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
