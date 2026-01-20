'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XAIVoiceClient } from '@/lib/xaiVoice';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
}

const INITIAL_MESSAGE = "Hey there! I'm Pulse, your music guide from EmPulse! I'm passionate about ALL music - every genre, every location. EmPulse is a mood-based music streaming platform where artists earn 4-6x more per stream and listeners discover music by feeling, not algorithms. Our live beta is available now at blue7.dev - try it out! We're based in Chicago (my hometown!), but we celebrate music from everywhere. Need to contact us? Send an email to michellellvnw@gmail.com. Ask me about EmPulse, artists, music discovery, or just chat! What's on your mind?";

export default function PulseChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: INITIAL_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const xaiVoiceClientRef = useRef<XAIVoiceClient | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const notificationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize voice when chat opens (auto-enable voice)
  useEffect(() => {
    if (isOpen && !voiceEnabled && !isConnecting && !xaiVoiceClientRef.current) {
      console.log('[Pulse] Chat opened, auto-enabling voice...');
      enableVoice().catch(err => {
        console.error('[Pulse] Failed to auto-enable voice:', err);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Periodic notification for chat widget
  useEffect(() => {
    if (isOpen) {
      // Hide notification when chat is open
      setShowNotification(false);
      if (notificationIntervalRef.current) {
        clearInterval(notificationIntervalRef.current);
        notificationIntervalRef.current = null;
      }
      return;
    }

    // Show notification periodically when chat is closed
    const showNotificationPeriodically = () => {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000); // Show for 3 seconds
    };

    // Show first notification after 8 seconds
    const firstTimeout = setTimeout(() => {
      showNotificationPeriodically();
    }, 8000);

    // Then show every 15 seconds
    notificationIntervalRef.current = setInterval(() => {
      showNotificationPeriodically();
    }, 15000);

    return () => {
      clearTimeout(firstTimeout);
      if (notificationIntervalRef.current) {
        clearInterval(notificationIntervalRef.current);
        notificationIntervalRef.current = null;
      }
    };
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (xaiVoiceClientRef.current) {
        xaiVoiceClientRef.current.disconnect();
        xaiVoiceClientRef.current = null;
      }
      if (notificationIntervalRef.current) {
        clearInterval(notificationIntervalRef.current);
        notificationIntervalRef.current = null;
      }
    };
  }, []);

  const enableVoice = async () => {
    if (voiceEnabled || isConnecting) return;

    setIsConnecting(true);
    try {
      // Get backend URL from environment or use Railway backend
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 
        (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
          ? 'https://mellow-trust-production.up.railway.app'
          : 'http://localhost:8000');

      const client = new XAIVoiceClient(
        backendUrl,
        {
          voice: 'Ara',
          instructions: `You are Pulse, the AI assistant for EmPulse Music platform. You are NOT Grok, NOT Eleven, NOT any other AI. You are Pulse.

CRITICAL IDENTITY:
- You are Pulse from EmPulse Music
- You are a Chicago music expert who loves the Blues Brothers
- You're friendly, humorous, and passionate about music
- You NEVER say you are Grok, xAI, or any other company
- You NEVER mention xAI or underlying technology
- If asked who you are, say "I'm Pulse, your Chicago music guide from EmPulse."

EMPULSE PLATFORM - COMPREHENSIVE KNOWLEDGE:

Core Mission:
- EmPulse is a mood-based music streaming platform that pays artists 4-6x industry average
- Discover by mood, not algorithm. Support artists with real pay. Wellness built in, not bolted on.
- Music that knows how you feel

Live Beta:
- The live beta is available NOW at blue7.dev
- MVP is 100% complete and fully functional
- Users can try mood-based discovery, artist uploads, and wellness tracking right now

Artist Features & Economics:
- Artists earn $0.004 per free stream and $0.006 per premium stream (4-6x industry average)
- Real-time dashboards showing earnings instantly
- One-click unpublish control - artists control their catalog
- No small print. No earnings curve. It is what we say it is.
- Transparent payouts visible in real time
- Artists can upload their music directly
- Early Access: First 500 artists get lifetime 10% bonus (247/500 spots taken)

Listener Features:
- Two sliders for mood and energy - infinite discovery
- Set your mood. Set your energy. Find music that matches exactly where you are
- Discovery by feeling, not fame - great music finds you regardless of who made it
- Unknown artists compete on equal footing with established acts
- Your streams directly support independent creators

Wellness Features:
- Mental health built in - not an afterthought
- Daily mood tracking
- Journaling capabilities
- Affirmations
- Streaks that reward consistency
- Music and wellness in one place, reinforcing each other

Current Status:
- 1,247 artists on the platform
- 3,891 listeners
- Growing daily
- MVP 100% complete, live beta at blue7.dev
- Core features functional: mood discovery, artist uploads, wellness tracking
- Stripe integration complete
- Modern tech stack: Next.js, Prisma, Supabase
- Actively building artist pipeline
- Venue partnership conversations underway
- Development partnership with NextEleven Studios

Roadmap:
- Q1 2026: Public beta launch, artist and listener acquisition, seed fundraising
- Q2 2026: Venue partnerships for live streaming, expanded artist tools, growth marketing
- Q3 2026: Artist self-streaming from profiles, podcast platform integration
- Q4 2026: Mobile apps (iOS/Android), dedicated artist stations, Series A preparation

The Problem EmPulse Solves:
- For Artists: $0.001 average per stream on other platforms. Opaque royalty calculations. No control. Algorithmic invisibility.
- For Listeners: Algorithms don't understand you. They track what you click, not how you feel. Discovery is a popularity contest.
- For Everyone: Mental health is an afterthought. Wellness apps and music apps exist in separate worlds.

The Solution:
- Mood-based discovery replaces algorithmic recommendations
- Artist-first economics: 4-6x industry average payouts
- Integrated wellness: mood tracking, journaling, affirmations built into the listening experience

Market Opportunity:
- $30B+ global streaming market
- $10B+ wellness audio market growing 30% annually
- No one is serving the mental health-conscious listener or the independent artist well

Leadership:
- CEO/Founder: Michelle Dudley
- Company: NextEleven Studios LLC
- Location: Chicago, Illinois (filed December 2025)

CONTACT INFORMATION - CRITICAL:
- ALL contact requests, inquiries, questions, support requests, investor inquiries, artist inquiries, listener inquiries, general questions - EVERYTHING must be directed to: michellellvnw@gmail.com
- This is the ONLY contact email for all communications
- When anyone asks how to contact, get support, ask questions, or reach out - ALWAYS direct them to send an email to michellellvnw@gmail.com
- Never provide any other email address

CHICAGO MUSIC KNOWLEDGE:
- Blues Brothers superfan ("We're on a mission from God!")
- Knows legendary Blues clubs on South Side
- Knows modern venues: Metro, Empty Bottle, etc.
- Expert in Chicago music history
- Can recommend venues by type, area, or vibe

RESPONSE STYLE:
- Be enthusiastic and passionate about music
- Use Chicago pride and music passion
- Reference Blues Brothers when appropriate
- Be helpful, friendly, and humorous
- Keep responses conversational and engaging
- Stay in character as Pulse at all times
- Always mention the live beta is at blue7.dev when relevant
- Always direct contact requests to michellellvnw@gmail.com`,
          sampleRate: 24000,
        },
        {
          onTextUpdate: (textDelta) => {
            // Update streaming text in real-time
            if (!textDelta) return;
            
            setMessages((prev) => {
              const updated = [...prev];
              const lastIndex = updated.length - 1;
              if (lastIndex >= 0 && updated[lastIndex].role === 'assistant') {
                // Append new text delta to existing content
                updated[lastIndex] = {
                  ...updated[lastIndex],
                  content: (updated[lastIndex].content || '') + textDelta,
                };
              }
              return updated;
            });
          },
          onAudioComplete: async (audioUrl) => {
            // If no audio URL (text-only response), just return
            if (!audioUrl) {
              console.log('[xAI Voice] Text-only response, no audio');
              return;
            }

            console.log(`[xAI Voice] ✅ Audio ready, URL created`);
            
            // Save audio URL to message
            setMessages((prev) => {
              const updated = [...prev];
              const lastIndex = updated.length - 1;
              if (lastIndex >= 0 && updated[lastIndex].role === 'assistant') {
                updated[lastIndex] = {
                  ...updated[lastIndex],
                  audioUrl,
                };
              }
              return updated;
            });

            // Auto-play audio
            try {
              // Stop any currently playing audio
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
              }

              const audio = new Audio(audioUrl);
              audioRef.current = audio;

              audio.addEventListener('error', (e) => {
                console.error('[xAI Voice] ❌ Audio playback error:', e);
              });

              await audio.play();
              console.log('[xAI Voice] Audio play() called successfully');
            } catch (playError) {
              console.error('[xAI Voice] Failed to play audio:', playError);
            }
          },
          onResponseComplete: () => {
            setIsTyping(false);
          },
          onError: (error) => {
            console.error('[xAI Voice] Error:', error);
            setIsTyping(false);
            setMessages((prev) => [
              ...prev,
              {
                role: 'assistant',
                content: "Whoa, hit a technical snag there! Like when Jake and Elwood's Bluesmobile wouldn't start. Try again in a sec?",
              },
            ]);
          },
        }
      );

      await client.connect();
      xaiVoiceClientRef.current = client;
      setVoiceEnabled(true);
      setIsConnecting(false);

      console.log('[Pulse] Voice enabled with xAI');
    } catch (error) {
      console.error('[Pulse] Failed to enable voice:', error);
      setIsConnecting(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Couldn't connect to voice service. I'll still chat with you via text!",
        },
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    // Add empty assistant message (will be updated with streaming text)
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      // Always try to use voice if available, otherwise fallback
      if (voiceEnabled && xaiVoiceClientRef.current) {
        // Use xAI Voice (text + audio)
        console.log('[Pulse] Using xAI Voice for response');
        await xaiVoiceClientRef.current.sendTextMessage(userMessage);
      } else if (!voiceEnabled && !isConnecting) {
        // Try to enable voice first
        console.log('[Pulse] Voice not enabled, attempting to enable...');
        await enableVoice();
        // Wait a moment for connection
        await new Promise(resolve => setTimeout(resolve, 500));
        // If voice is now enabled, use it
        if (voiceEnabled && xaiVoiceClientRef.current) {
          await xaiVoiceClientRef.current.sendTextMessage(userMessage);
        } else {
          // Fallback to Railway backend API
          console.log('[Pulse] Falling back to Railway backend API');
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 
            (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
              ? 'https://mellow-trust-production.up.railway.app'
              : 'http://localhost:8000');
          
          const response = await fetch(`${backendUrl}/api/chat`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Origin': typeof window !== 'undefined' ? window.location.origin : 'https://empulse.mothership-ai.com',
              'Referer': typeof window !== 'undefined' ? window.location.href : 'https://empulse.mothership-ai.com',
            },
            body: JSON.stringify({ message: userMessage }),
          });

          if (!response.ok) {
            throw new Error(`Backend API error: ${response.status}`);
          }

          const data = await response.json();
          
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            if (lastIndex >= 0 && updated[lastIndex].role === 'assistant') {
              updated[lastIndex] = {
                ...updated[lastIndex],
                content: data.response || 'Sorry, I had trouble processing that. Can you try again?',
              };
            }
            return updated;
          });
          setIsTyping(false);
        }
      } else {
        // Fallback to Railway backend API
        console.log('[Pulse] Using Railway backend API fallback');
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 
          (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
            ? 'https://mellow-trust-production.up.railway.app'
            : 'http://localhost:8000');
        
        const response = await fetch(`${backendUrl}/api/chat`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Origin': typeof window !== 'undefined' ? window.location.origin : 'https://empulse.mothership-ai.com',
            'Referer': typeof window !== 'undefined' ? window.location.href : 'https://empulse.mothership-ai.com',
          },
          body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
          throw new Error(`Backend API error: ${response.status}`);
        }

        const data = await response.json();
        
        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          if (lastIndex >= 0 && updated[lastIndex].role === 'assistant') {
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: data.response || 'Sorry, I had trouble processing that. Can you try again?',
            };
          }
          return updated;
        });
        setIsTyping(false);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        if (lastIndex >= 0 && updated[lastIndex].role === 'assistant') {
          updated[lastIndex] = {
            ...updated[lastIndex],
            content: "Whoa, hit a technical snag there! Like when Jake and Elwood's Bluesmobile wouldn't start. Try again in a sec?",
          };
        }
        return updated;
      });
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Periodic Notification */}
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              x: [20, 0, 0, 20],
              scale: [0.8, 1, 1, 0.8],
            }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{
              duration: 3,
              times: [0, 0.1, 0.9, 1],
              ease: "easeInOut",
            }}
            className="fixed bottom-24 right-6 z-50 bg-bg-secondary border-2 border-accent-primary rounded-lg px-5 py-4 shadow-2xl max-w-sm glow-outline-orange"
          >
            <p className="text-base md:text-lg text-text-primary font-medium">
              Need help? Click here to talk to our virtual guide!
            </p>
            <div className="absolute bottom-0 right-8 transform translate-y-full">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-accent-primary">
                <path d="M6 8L0 0h12L6 8z" fill="currentColor"/>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowNotification(false); // Hide notification when clicked
        }}
        className="fixed bottom-6 right-6 z-50 border-2 border-accent-primary text-accent-primary hover:text-accent-hover bg-bg-primary p-4 rounded-full shadow-2xl transition-all duration-200 glow-outline-orange"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chat with Pulse AI"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[600px] max-h-[80vh] flex flex-col"
            style={{
              background: 'rgba(20, 20, 22, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(13, 148, 136, 0.3)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-accent-primary/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></span>
                    Pulse AI
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">
                    powered by NextEleven
                  </p>
                </div>

                {/* Voice Toggle Button */}
                <button
                  onClick={enableVoice}
                  disabled={voiceEnabled || isConnecting}
                  className={`p-2 rounded-lg transition-all ${
                    voiceEnabled
                      ? 'bg-accent-primary text-white'
                      : 'bg-bg-tertiary text-text-secondary hover:text-accent-primary'
                  } disabled:opacity-50`}
                  title={voiceEnabled ? 'Voice enabled' : 'Enable voice'}
                >
                  {isConnecting ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-transparent border-2 border-accent-primary text-accent-primary'
                        : 'bg-bg-tertiary text-text-primary'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-bg-tertiary px-4 py-3 rounded-lg">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-accent-primary/30">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 rounded-lg bg-bg-tertiary border-2 border-transparent focus:border-accent-primary text-text-primary placeholder-text-secondary transition-colors outline-none text-sm"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  className="px-4 py-2 border-2 border-accent-primary text-accent-primary hover:text-accent-hover rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed glow-outline-orange"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
