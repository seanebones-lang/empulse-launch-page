import { NextRequest, NextResponse } from 'next/server';
import { emailTemplates, replaceTemplateVariables } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  try {
    const { email, type, variables } = await request.json();

    if (!email || !type) {
      return NextResponse.json(
        { error: 'Email and type are required' },
        { status: 400 }
      );
    }

    let template;
    let recipientEmail;

    switch (type) {
      case 'welcome':
        template = emailTemplates.welcome;
        recipientEmail = process.env.EMAIL_TO || 'empulse@mothership-ai.com';
        break;
      case 'artist':
        template = emailTemplates.artistWelcome;
        recipientEmail = process.env.EMAIL_TO || 'empulse@mothership-ai.com';
        break;
      case 'investor':
        template = emailTemplates.investorWelcome;
        recipientEmail = process.env.INVESTOR_EMAIL || 'investors@empulse.music';
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    // Replace template variables
    const html = variables
      ? replaceTemplateVariables(template.html, variables)
      : template.html;
    const subject = variables
      ? replaceTemplateVariables(template.subject, variables)
      : template.subject;

    // Send email
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      from: 'EmPulse <noreply@mothership-ai.com>',
      to: email,
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
