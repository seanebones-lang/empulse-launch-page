import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

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
    const { email, source } = await request.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const recipientEmail = getRecipientEmail(source || 'general');
    const sourceLabel = getSourceLabel(source || 'general');

    // Send email notification
    if (resend) {
      try {
        await resend.emails.send({
          from: 'EmPulse <noreply@mothership-ai.com>',
          to: recipientEmail,
          subject: `New ${sourceLabel} Lead: ${email}`,
          html: `
            <h2>New ${sourceLabel} Lead</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Source:</strong> ${source || 'general'}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <hr>
            <p><small>This is an automated notification from the EmPulse website.</small></p>
          `,
        });
        console.log(`Email sent to ${recipientEmail} for ${sourceLabel} lead: ${email}`);
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
    console.log(`New subscription: ${email} (source: ${source}) → ${recipientEmail}`);

    return NextResponse.json(
      { success: true, message: 'Subscribed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Subscription failed' },
      { status: 500 }
    );
  }
}
