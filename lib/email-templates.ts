/**
 * Email marketing templates for EmPulse
 * These can be used with Resend, Mailchimp, ConvertKit, etc.
 */

export const emailTemplates = {
  welcome: {
    subject: 'Welcome to EmPulse! 🎵',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffb800;">Welcome to EmPulse!</h1>
          </div>
          
          <p>Hi there,</p>
          
          <p>Thanks for joining the EmPulse community! We're building something different—a music platform that actually pays artists fairly and helps you discover music by how it makes you feel.</p>
          
          <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #ffb800; margin-top: 0;">What's Next?</h2>
            <ul style="color: #b3b3b3;">
              <li>Try our live beta at <a href="https://blue7.dev" style="color: #ffb800;">blue7.dev</a></li>
              <li>Join our Discord community (link coming soon)</li>
              <li>Follow us on social media for updates</li>
            </ul>
          </div>
          
          <p>We'll keep you updated on launch dates, new features, and early access opportunities.</p>
          
          <p>Questions? Just reply to this email—we read every message.</p>
          
          <p style="margin-top: 30px;">
            Best,<br>
            The EmPulse Team
          </p>
          
          <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            EmPulse Music | NextEleven Studios LLC<br>
            <a href="https://empulse.music" style="color: #ffb800;">empulse.music</a>
          </p>
        </body>
      </html>
    `,
  },

  artistWelcome: {
    subject: 'Welcome, Artist! Your Music Deserves Better 🎸',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffb800;">Welcome to EmPulse, Artist!</h1>
          </div>
          
          <p>Hi there,</p>
          
          <p>You're on the list! We're excited to have you join the EmPulse artist community.</p>
          
          <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #ffb800; margin-top: 0;">What You Get:</h2>
            <ul style="color: #b3b3b3;">
              <li><strong style="color: #ffb800;">$0.004-$0.006 per stream</strong> (4-6x industry average)</li>
              <li>Real-time earnings dashboard</li>
              <li>One-click control over your catalog</li>
              <li>Mood-based discovery (no algorithm favoritism)</li>
            </ul>
          </div>
          
          <p><strong>Next Steps:</strong></p>
          <ol style="color: #b3b3b3;">
            <li>Try the beta at <a href="https://blue7.dev" style="color: #ffb800;">blue7.dev</a></li>
            <li>Upload your first track (coming soon)</li>
            <li>Join our artist Discord for updates</li>
          </ol>
          
          <p>We'll send you early access information as soon as it's ready.</p>
          
          <p style="margin-top: 30px;">
            Best,<br>
            Michelle & The EmPulse Team
          </p>
        </body>
      </html>
    `,
  },

  investorWelcome: {
    subject: 'EmPulse Pitch Deck & Investor Information 📊',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffb800;">Thank You for Your Interest</h1>
          </div>
          
          <p>Hi there,</p>
          
          <p>Thanks for requesting the EmPulse pitch deck. We're raising seed funding to scale our platform at the intersection of two massive markets: streaming ($30B+) and wellness audio ($10B+).</p>
          
          <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <a href="https://docs.google.com/presentation/d/1vlmuB3UMTtDOqlUgjuFP_XaNthbXw9pM/edit?usp=drive_link&ouid=116475369707600561774&rtpof=true&sd=true" 
               style="display: inline-block; background: #ffb800; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0;">
              View Pitch Deck
            </a>
          </div>
          
          <p><strong>Key Highlights:</strong></p>
          <ul style="color: #b3b3b3;">
            <li>MVP 100% complete, live beta</li>
            <li>Unique positioning: mood-based discovery + wellness integration</li>
            <li>Artist-first economics: 4-6x industry average payouts</li>
            <li>Active partnerships and artist pipeline</li>
          </ul>
          
          <p>Want to schedule a call? <a href="https://calendly.com/empulse" style="color: #ffb800;">Book a time here</a>.</p>
          
          <p style="margin-top: 30px;">
            Best,<br>
            Michelle Dudley<br>
            CEO, EmPulse Music<br>
            <a href="mailto:investors@empulse.music" style="color: #ffb800;">investors@empulse.music</a>
          </p>
        </body>
      </html>
    `,
  },

  productUpdate: {
    subject: 'EmPulse Update: {{feature_name}} is Live! 🚀',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffb800;">New Feature: {{feature_name}}</h1>
          </div>
          
          <p>Hi {{name}},</p>
          
          <p>We've got something new for you! {{feature_description}}</p>
          
          <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <a href="{{cta_link}}" 
               style="display: inline-block; background: #ffb800; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Try It Now
            </a>
          </div>
          
          <p>As always, we'd love your feedback. Reply to this email or join our Discord.</p>
          
          <p style="margin-top: 30px;">
            The EmPulse Team
          </p>
        </body>
      </html>
    `,
  },
};

/**
 * Helper function to replace template variables
 */
export function replaceTemplateVariables(
  template: string,
  variables: Record<string, string>
): string {
  let result = template;
  Object.entries(variables).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });
  return result;
}
