#!/bin/bash

echo "📧 EmPulse Email System Setup"
echo "================================"
echo ""

# Check if RESEND_API_KEY is provided as argument
if [ -z "$1" ]; then
  echo "Usage: ./setup-email.sh YOUR_RESEND_API_KEY"
  echo ""
  echo "To get your Resend API key:"
  echo "  1. Visit: https://resend.com/signup"
  echo "  2. Create account (free: 3,000 emails/month)"
  echo "  3. Go to API Keys → Create Key"
  echo "  4. Copy the key (starts with 're_')"
  echo ""
  echo "Then run: ./setup-email.sh re_your_key_here"
  exit 1
fi

RESEND_API_KEY=$1

echo "Setting up environment variables in Vercel..."
echo ""

# Set RESEND_API_KEY for all environments
echo "Setting RESEND_API_KEY for Production..."
echo "$RESEND_API_KEY" | npx vercel env add RESEND_API_KEY production

echo "Setting RESEND_API_KEY for Preview..."
echo "$RESEND_API_KEY" | npx vercel env add RESEND_API_KEY preview

echo "Setting RESEND_API_KEY for Development..."
echo "$RESEND_API_KEY" | npx vercel env add RESEND_API_KEY development

echo ""
echo "✅ Email system configured!"
echo ""
echo "Optional: Set custom email addresses (or use defaults):"
echo "  - GENERAL_EMAIL (default: empulse@mothership-ai.com)"
echo "  - INVESTOR_EMAIL (default: investors@empulse.music)"
echo "  - ARTIST_EMAIL (default: empulse@mothership-ai.com)"
echo "  - LISTENER_EMAIL (default: empulse@mothership-ai.com)"
echo ""
echo "🧪 Test by submitting a form on the website!"
