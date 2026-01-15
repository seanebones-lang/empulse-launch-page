import { NextRequest, NextResponse } from 'next/server';

// Mock responses for Pulse AI chatbot
// In production, this would integrate with OpenAI, Anthropic Claude, or similar AI service

const PULSE_PERSONALITY = {
  traits: [
    "Chicago music expert",
    "Blues Brothers superfan",
    "Knows every venue in Chicago",
    "Expert in Chicago music history",
    "Friendly and humorous",
    "Knowledgeable about EmPulse mission and features"
  ],
  knowledge: {
    empulse: {
      mission: "EmPulse pays artists 4-6x industry average ($0.004-$0.006 per stream), enables mood-based discovery, and integrates mental wellness features.",
      features: ["Mood-based discovery sliders", "Real-time artist dashboards", "Wellness tracking", "Journaling", "Affirmations"],
      pricing: "Free tier: $0.004/stream, Premium: $0.006/stream",
      launch: "Q1 2026 public launch, beta live at blue7.dev",
    },
    contact: {
      general: "contact@empulse.music",
      investors: "investors@empulse.music",
      founder: "Michelle Dudley, CEO/Founder",
    }
  }
};

// Simple keyword matching for demo purposes
// In production, replace with actual AI API call
function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Blues Brothers quotes
  if (lowerMessage.includes('blues brothers') || lowerMessage.includes('mission from god')) {
    return "Ah, a fellow Blues Brothers fan! \"We're on a mission from God!\" Love that movie. Did you know Chicago's music scene that inspired the Blues Brothers is still thriving? I can tell you about great venues if you're interested!";
  }

  // EmPulse-related
  if (lowerMessage.includes('empulse') || lowerMessage.includes('how does it work')) {
    return "EmPulse is revolutionary! Instead of algorithms that push popularity, we use dual mood/energy sliders so you discover music by *feeling*, not by name. Artists get paid 4-6x the industry average ($0.004-$0.006 per stream), see earnings in real-time, and have full control. Plus, we've got mental wellness features built right in—mood tracking, journaling, affirmations. Music and mental health, together at last! Want to know more about any specific part?";
  }

  if (lowerMessage.includes('artist') && (lowerMessage.includes('pay') || lowerMessage.includes('earn'))) {
    return "Artists on EmPulse earn $0.004 per free stream and $0.006 per premium stream. That's 4-6x what Spotify pays! Plus, they see every cent in real-time on their dashboard. No 60-90 day wait, no mystery math. Just transparent, fair pay. Want to sign up as an artist?";
  }

  // Chicago venues/music
  if (lowerMessage.includes('chicago') || lowerMessage.includes('venue')) {
    return "Chicago! The heart of American music! From the legendary Blues clubs on the South Side to modern venues like Metro and Empty Bottle, this city's got it all. Looking for a specific type of venue or area? I know 'em all—from dive bars to concert halls!";
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('michelle') || lowerMessage.includes('reach out')) {
    return "Want to get in touch? For general inquiries: contact@empulse.music. For investor stuff: investors@empulse.music. Michelle Dudley (our CEO/Founder) reviews everything personally. Or I can help you right here—what do you need?";
  }

  // Beta/Join
  if (lowerMessage.includes('beta') || lowerMessage.includes('try') || lowerMessage.includes('join')) {
    return "The EmPulse beta is live right now at blue7.dev! You can try mood-based discovery, check out the wellness features, and see how different it feels. We're launching publicly in Q1 2026, but early access is available now. Give it a spin!";
  }

  // General/fallback
  return "Great question! I'm here to help with anything about EmPulse, Chicago music, venues, or just to chat about tunes. If you need to speak with Michelle directly or have specific questions I can't answer, I can guide you to the right contact form. What else would you like to know?";
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // In production, this would call an AI API:
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4",
    //   messages: [
    //     { role: "system", content: PULSE_SYSTEM_PROMPT },
    //     ...history,
    //     { role: "user", content: message }
    //   ]
    // });

    // For now, using mock response
    const response = generateResponse(message);

    return NextResponse.json(
      { response },
      { status: 200 }
    );
  } catch (error) {
    console.error('Pulse chat error:', error);
    return NextResponse.json(
      { error: 'Chat failed' },
      { status: 500 }
    );
  }
}
