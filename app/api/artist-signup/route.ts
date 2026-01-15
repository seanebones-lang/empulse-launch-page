import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const { artistName, yourName, email, musicLink, betaAccess } = await request.json();

    // Validate required fields
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (!artistName || !yourName) {
      return NextResponse.json(
        { error: 'Artist name and your name are required' },
        { status: 400 }
      );
    }

    // If Resend is configured, add to audience and send notification
    if (resend && process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });

        // Send notification email to Michelle
        if (process.env.NOTIFICATION_EMAIL) {
          await resend.emails.send({
            from: 'EmPulse <noreply@empulse.music>',
            to: process.env.NOTIFICATION_EMAIL,
            subject: 'New Artist Signup',
            html: `
              <h2>New Artist Signup</h2>
              <p><strong>Artist/Band Name:</strong> ${artistName}</p>
              <p><strong>Contact Name:</strong> ${yourName}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${musicLink ? `<p><strong>Music Link:</strong> <a href="${musicLink}">${musicLink}</a></p>` : ''}
              <p><strong>Beta Access Requested:</strong> ${betaAccess ? 'Yes' : 'No'}</p>
            `,
          });
        }
      } catch (resendError) {
        console.error('Resend API error:', resendError);
      }
    }

    // Log for manual processing
    console.log('New artist signup:', { artistName, yourName, email, musicLink, betaAccess });

    return NextResponse.json(
      { success: true, message: 'Signup successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Artist signup error:', error);
    return NextResponse.json(
      { error: 'Signup failed' },
      { status: 500 }
    );
  }
}
