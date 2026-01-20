import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit } from '@/lib/rateLimit';
import { getRateLimitIdentifier } from '@/lib/rateLimit';
import { sanitizeEmail, sanitizeText } from '@/lib/sanitize';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getInvestorRecipientEmail(): string {
  return process.env.INVESTOR_EMAIL || process.env.GENERAL_EMAIL || 'michellellvnw@gmail.com';
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 2 requests per IP per day (investment submissions are serious)
    const identifier = getRateLimitIdentifier(request);
    const rateLimitResult = await rateLimit(identifier, 2, 24 * 60 * 60 * 1000);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later or contact us directly.' },
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

    const formData = await request.formData();
    
    // Extract form fields
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string | null;
    const title = formData.get('title') as string | null;
    const investmentAmount = formData.get('investmentAmount') as string;
    const investmentType = formData.get('investmentType') as string;
    const accreditedInvestor = formData.get('accreditedInvestor') as string;
    const additionalInfo = formData.get('additionalInfo') as string | null;
    const agreeToTerms = formData.get('agreeToTerms') === 'true';
    const agreeToDisclosures = formData.get('agreeToDisclosures') === 'true';

    // Validate required fields
    if (!fullName || !email || !phone || !investmentAmount || !investmentType || !accreditedInvestor) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    if (!agreeToTerms || !agreeToDisclosures) {
      return NextResponse.json(
        { error: 'You must agree to the terms and disclosures' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    let sanitizedEmail: string;
    let sanitizedFullName: string;
    let sanitizedPhone: string;
    let sanitizedCompany: string | null = null;
    let sanitizedTitle: string | null = null;
    let sanitizedInvestmentAmount: string;
    let sanitizedAdditionalInfo: string | null = null;
    
    try {
      sanitizedEmail = sanitizeEmail(email);
      sanitizedFullName = sanitizeText(fullName, 200);
      sanitizedPhone = sanitizeText(phone, 50);
      sanitizedInvestmentAmount = sanitizeText(investmentAmount, 50);
      
      if (company) {
        sanitizedCompany = sanitizeText(company, 200);
      }
      if (title) {
        sanitizedTitle = sanitizeText(title, 200);
      }
      if (additionalInfo) {
        sanitizedAdditionalInfo = sanitizeText(additionalInfo, 2000);
      }
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Invalid input' },
        { status: 400 }
      );
    }

    // Extract uploaded files
    const files: Array<{ name: string; size: number; type: string }> = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('document_') && value instanceof File) {
        files.push({
          name: value.name,
          size: value.size,
          type: value.type,
        });
      }
    }

    const recipientEmail = getInvestorRecipientEmail();

    // Send notification email
    if (resend) {
      try {
        await resend.emails.send({
          from: 'EmPulse <noreply@mothership-ai.com>',
          to: recipientEmail,
          subject: `🚀 New Investor Investment Application: ${escapeHtml(sanitizedFullName)}`,
          html: `
            <h2>New Investor Investment Application</h2>
            
            <h3>Personal Information</h3>
            <p><strong>Full Name:</strong> ${escapeHtml(sanitizedFullName)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(sanitizedEmail)}">${escapeHtml(sanitizedEmail)}</a></p>
            <p><strong>Phone:</strong> ${escapeHtml(sanitizedPhone)}</p>
            ${sanitizedCompany ? `<p><strong>Company:</strong> ${escapeHtml(sanitizedCompany)}</p>` : ''}
            ${sanitizedTitle ? `<p><strong>Title:</strong> ${escapeHtml(sanitizedTitle)}</p>` : ''}
            
            <h3>Investment Details</h3>
            <p><strong>Investment Amount:</strong> ${escapeHtml(sanitizedInvestmentAmount)}</p>
            <p><strong>Investment Type:</strong> ${escapeHtml(investmentType)}</p>
            <p><strong>Accredited Investor:</strong> ${accreditedInvestor === 'yes' ? 'Yes' : 'No'}</p>
            
            ${sanitizedAdditionalInfo ? `
            <h3>Additional Information</h3>
            <p>${escapeHtml(sanitizedAdditionalInfo)}</p>
            ` : ''}
            
            ${files.length > 0 ? `
            <h3>Uploaded Documents (${files.length})</h3>
            <ul>
              ${files.map(file => `<li>${escapeHtml(file.name)} (${(file.size / 1024).toFixed(2)} KB, ${escapeHtml(file.type)})</li>`).join('')}
            </ul>
            <p><em>Note: Files are not attached to this email. Please check the system for file uploads.</em></p>
            ` : ''}
            
            <h3>Agreements</h3>
            <p><strong>Agreed to Terms:</strong> ${agreeToTerms ? 'Yes' : 'No'}</p>
            <p><strong>Agreed to Disclosures:</strong> ${agreeToDisclosures ? 'Yes' : 'No'}</p>
            
            <hr>
            <p><strong>Date:</strong> ${escapeHtml(new Date().toLocaleString())}</p>
            <p><strong>IP Address:</strong> ${escapeHtml(request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown')}</p>
            <hr>
            <p><small>This is an automated notification from the EmPulse investor investment form.</small></p>
            <p><small><strong>Next Steps:</strong> Review the application, prepare investment agreement documents, and contact the investor to complete the process.</small></p>
          `,
        });
        console.log(`Investor investment email sent to ${recipientEmail}: ${sanitizedEmail}`);
      } catch (emailError) {
        console.error('Failed to send investor investment email:', emailError);
        // Don't fail the request if email fails
      }
    }

    // Send confirmation email to investor
    if (resend) {
      try {
        await resend.emails.send({
          from: 'EmPulse <noreply@mothership-ai.com>',
          to: sanitizedEmail,
          subject: 'Thank You for Your Investment Interest - EmPulse',
          html: `
            <h2>Thank You for Your Investment Interest</h2>
            <p>Dear ${escapeHtml(sanitizedFullName)},</p>
            <p>Thank you for submitting your investment application to EmPulse. We have received your information and will review your application within 2-3 business days.</p>
            
            <h3>What Happens Next?</h3>
            <ol>
              <li>Our team will review your application and investment details</li>
              <li>We will contact you via email or phone to discuss your investment</li>
              <li>You will receive investment agreement documents for review and signature</li>
              <li>After signing, you will receive deposit instructions</li>
              <li>Once your deposit is confirmed, your investment will be processed</li>
            </ol>
            
            <h3>Your Investment Details</h3>
            <ul>
              <li><strong>Investment Amount:</strong> ${escapeHtml(sanitizedInvestmentAmount)}</li>
              <li><strong>Investment Type:</strong> ${escapeHtml(investmentType)}</li>
              <li><strong>Accredited Investor Status:</strong> ${accreditedInvestor === 'yes' ? 'Yes' : 'No'}</li>
            </ul>
            
            <p>If you have any questions, please don't hesitate to contact us at <a href="mailto:michellellvnw@gmail.com">michellellvnw@gmail.com</a>.</p>
            
            <p>Best regards,<br>
            The EmPulse Team</p>
            
            <hr>
            <p><small>EmPulse Music | NextEleven Studios LLC<br>
            <a href="https://empulse.music">empulse.music</a></small></p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the request if email fails
      }
    }

    // Log submission
    console.log('New investor investment application:', {
      email: sanitizedEmail,
      name: sanitizedFullName,
      amount: sanitizedInvestmentAmount,
      type: investmentType,
      accredited: accreditedInvestor,
      files: files.length,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Investment application submitted successfully' 
      },
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
    console.error('Investor investment submission error:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your application. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
