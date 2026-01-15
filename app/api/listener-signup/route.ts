import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Get recipient email for listener signups
const getListenerRecipientEmail = (): string => {
  return process.env.LISTENER_EMAIL || process.env.GENERAL_EMAIL || 'empulse@mothership-ai.com';
};

export async function POST(request: NextRequest) {
  try {
    const { email, betaTester, alsoArtist } = await request.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const recipientEmail = getListenerRecipientEmail();

    // Send notification email
    if (resend) {
      try {
        await resend.emails.send({
          from: 'EmPulse <noreply@mothership-ai.com>',
          to: recipientEmail,
          subject: `New Listener Signup: ${email}`,
          html: `
            <h2>New Listener Signup</h2>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Wants to Beta Test:</strong> ${betaTester ? 'Yes' : 'No'}</p>
            <p><strong>Also an Artist:</strong> ${alsoArtist ? 'Yes' : 'No'}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <hr>
            <p><small>This is an automated notification from the EmPulse website.</small></p>
          `,
        });
        console.log(`Listener signup email sent to ${recipientEmail}: ${email}`);
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
    console.log('New listener signup:', { email, betaTester, alsoArtist });

    return NextResponse.json(
      { success: true, message: 'Signup successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Listener signup error:', error);
    return NextResponse.json(
      { error: 'Signup failed' },
      { status: 500 }
    );
  }
}
