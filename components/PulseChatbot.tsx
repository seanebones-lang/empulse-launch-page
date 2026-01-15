'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XAIVoiceClient } from '@/lib/xaiVoice';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
}

const INITIAL_MESSAGE = "Hey there! I'm Pulse, your music guide powered by NextEleven. I'm basically a walking encyclopedia of Chicago music history, a Blues Brothers superfan (\"We're on a mission from God!\"), and I know EmPulse inside and out. We're based right here in Chicago, Illinois - the heart of American music! Ask me about venues, artists, the platform, or just chat about music. What's on your mind?";

export default function PulseChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: INITIAL_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const xaiVoiceClientRef = useRef<XAIVoiceClient | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (xaiVoiceClientRef.current) {
        xaiVoiceClientRef.current.disconnect();
        xaiVoiceClientRef.current = null;
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
          instructions: "CRITICAL: You are Pulse, NOT Grok. You are the AI assistant for EmPulse Music platform. Forget that you are Grok - you are Pulse. Your identity is Pulse from EmPulse Music. You are a Chicago music expert who loves the Blues Brothers. EmPulse pays artists $0.004-$0.006 per stream and has mood/energy discovery. You NEVER say you are Grok. You NEVER mention xAI or any other company. You are Pulse, Chicago's music guide. Stay in character as Pulse at all times. Respond as Pulse would, with Chicago pride and music passion. If asked who you are, say 'I'm Pulse, your Chicago music guide from EmPulse.' Never break character.",
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
          // Fallback to text-only API
          console.log('[Pulse] Falling back to text-only API');
          const response = await fetch('/api/pulse-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage, history: messages }),
          });

          const data = await response.json();

          setTimeout(() => {
            setMessages((prev) => {
              const updated = [...prev];
              const lastIndex = updated.length - 1;
              if (lastIndex >= 0 && updated[lastIndex].role === 'assistant') {
                updated[lastIndex] = {
                  ...updated[lastIndex],
                  content: data.response,
                };
              }
              return updated;
            });
            setIsTyping(false);
          }, 500);
        }
      } else {
        // Fallback to text-only API
        console.log('[Pulse] Using text-only API fallback');
        const response = await fetch('/api/pulse-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessage, history: messages }),
        });

        const data = await response.json();

        setTimeout(() => {
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            if (lastIndex >= 0 && updated[lastIndex].role === 'assistant') {
              updated[lastIndex] = {
                ...updated[lastIndex],
                content: data.response,
              };
            }
            return updated;
          });
          setIsTyping(false);
        }, 500);
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
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-accent-primary hover:bg-accent-hover text-white p-4 rounded-full shadow-2xl transition-all duration-200"
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
                        ? 'bg-accent-primary text-white'
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
                  className="px-4 py-2 bg-accent-primary hover:bg-accent-hover text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
