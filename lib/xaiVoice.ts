/**
 * xAI Voice Agent Client
 * Handles WebSocket connection to xAI Voice API via backend proxy
 * Streams text responses and audio (Ara voice)
 */

export interface XAIVoiceConfig {
  voice: 'Eve' | 'Ara' | 'Rex' | 'Sal' | 'Leo';
  instructions: string;
  sampleRate: number;
}

export interface XAIVoiceCallbacks {
  onTextUpdate?: (textDelta: string) => void;
  onAudioComplete?: (audioUrl: string) => void;
  onResponseComplete?: () => void;
  onError?: (error: Error) => void;
}

export class XAIVoiceClient {
  private ws: WebSocket | null = null;
  private config: XAIVoiceConfig;
  private callbacks: XAIVoiceCallbacks;
  private audioChunks: string[] = [];
  private textBuffer: string = '';
  private backendUrl: string;
  private ephemeralToken: string | null = null;

  constructor(
    backendUrl: string,
    config: XAIVoiceConfig,
    callbacks: XAIVoiceCallbacks
  ) {
    this.backendUrl = backendUrl;
    this.config = config;
    this.callbacks = callbacks;
  }

  async connect(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        // First, get ephemeral token for secure client authentication
        await this.fetchEphemeralToken();

        // Connect to backend WebSocket proxy
        const wsUrl = this.backendUrl.replace('http://', 'ws://').replace('https://', 'wss://');
        this.ws = new WebSocket(`${wsUrl}/ws/xai-voice`);

        this.ws.onopen = async () => {
          console.log('[xAI Voice] WebSocket connected');

          // Send authentication message with ephemeral token
          if (this.ephemeralToken) {
            this.ws!.send(JSON.stringify({
              type: 'auth',
              token: this.ephemeralToken
            }));

            // Wait a moment for auth to be processed, then configure session
            setTimeout(() => {
              this.configureSession();
              resolve();
            }, 100);
          } else {
            reject(new Error('No ephemeral token available'));
          }
        };

        this.ws.onmessage = (event) => {
          this.handleMessage(event.data);
        };

        this.ws.onerror = (error) => {
          console.error('[xAI Voice] WebSocket error:', error);
          this.callbacks.onError?.(new Error('WebSocket connection failed'));
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('[xAI Voice] WebSocket closed');
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private async fetchEphemeralToken(): Promise<void> {
    try {
      const response = await fetch(`${this.backendUrl}/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get ephemeral token: ${response.status}`);
      }

      const data = await response.json();
      this.ephemeralToken = data.token || data.access_token || data;

      if (!this.ephemeralToken) {
        throw new Error('No token received from ephemeral token endpoint');
      }

      console.log('[xAI Voice] Ephemeral token acquired');
    } catch (error) {
      console.error('[xAI Voice] Failed to get ephemeral token:', error);
      throw error;
    }
  }

  private configureSession() {
    const sessionConfig = {
      type: 'session.update',
      session: {
        voice: this.config.voice,
        instructions: this.config.instructions,
        turn_detection: { type: 'server_vad' }, // Enable automatic speech detection
        audio: {
          input: {
            format: {
              type: 'audio/pcm',
              rate: this.config.sampleRate,
            },
          },
          output: {
            format: {
              type: 'audio/pcm',
              rate: this.config.sampleRate,
            },
          },
        },
        // Add tools for enhanced functionality
        tools: [
          {
            type: 'web_search', // Enable web search capability
          },
          {
            type: 'x_search', // Enable X (Twitter) search
            allowed_x_handles: ['elonmusk', 'xai'],
          },
        ],
      },
    };

    this.send(sessionConfig);
    console.log('[xAI Voice] Session configured with server VAD and tools');
  }

  async sendTextMessage(text: string): Promise<void> {
    // Reset buffers for new message
    this.audioChunks = [];
    this.textBuffer = '';

    // Send user message
    this.send({
      type: 'conversation.item.create',
      item: {
        type: 'message',
        role: 'user',
        content: [
          {
            type: 'input_text',
            text,
          },
        ],
      },
    });

    // Request response with text and audio
    this.send({
      type: 'response.create',
      response: {
        modalities: ['text', 'audio'],
      },
    });
  }

  private handleMessage(data: string) {
    try {
      const event = JSON.parse(data);

      switch (event.type) {
        case 'conversation.created':
          console.log('[xAI Voice] Conversation created');
          break;

        case 'session.updated':
          console.log('[xAI Voice] Session updated');
          break;

        case 'input_audio_buffer.speech_started':
          console.log('[xAI Voice] Speech started');
          break;

        case 'input_audio_buffer.speech_stopped':
          console.log('[xAI Voice] Speech stopped');
          break;

        case 'conversation.item.input_audio_transcription.completed':
          console.log('[xAI Voice] Audio transcription completed:', event.transcript);
          break;

        case 'response.created':
          console.log('[xAI Voice] Response started');
          this.audioChunks = []; // Reset audio chunks for new response
          this.textBuffer = '';
          break;

        case 'response.output_audio_transcript.delta':
          // Streaming text response
          const textDelta = event.delta || '';
          this.textBuffer += textDelta;
          this.callbacks.onTextUpdate?.(textDelta);
          break;

        case 'response.output_audio.delta':
          // Streaming audio chunks (base64 PCM16)
          if (event.delta) {
            this.audioChunks.push(event.delta);
          }
          break;

        case 'response.output_audio.done':
          // Audio streaming complete - decode and play
          this.processAudioChunks();
          break;

        case 'response.done':
          // Entire response complete
          console.log('[xAI Voice] Response complete');
          this.callbacks.onResponseComplete?.();
          break;

        case 'error':
          console.error('[xAI Voice] Error event:', event.error);
          this.callbacks.onError?.(new Error(event.error?.message || 'Unknown error'));
          break;

        default:
          // Log other events for debugging
          console.log('[xAI Voice] Unhandled event:', event.type);
          break;
      }
    } catch (error) {
      console.error('[xAI Voice] Error parsing message:', error);
    }
  }

  private async processAudioChunks() {
    if (this.audioChunks.length === 0) return;

    try {
      // Combine all base64 chunks
      const combinedBase64 = this.audioChunks.join('');

      // Decode base64 to PCM16 audio
      const audioBuffer = await this.decodePCM16Audio(combinedBase64);

      // Convert to WAV blob
      const audioBlob = this.audioBufferToBlob(audioBuffer);

      // Create URL for playback
      const audioUrl = URL.createObjectURL(audioBlob);

      this.callbacks.onAudioComplete?.(audioUrl);
    } catch (error) {
      console.error('[xAI Voice] Error processing audio:', error);
      this.callbacks.onError?.(error as Error);
    }
  }

  private async decodePCM16Audio(base64: string): Promise<AudioBuffer> {
    // Decode base64 to binary
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Convert PCM16 (16-bit signed) to Float32 for Web Audio API
    const pcm16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(pcm16.length);
    for (let i = 0; i < pcm16.length; i++) {
      float32[i] = pcm16[i] / 32768.0; // Convert to -1.0 to 1.0 range
    }

    // Create AudioBuffer
    const audioContext = new AudioContext({ sampleRate: this.config.sampleRate });
    const audioBuffer = audioContext.createBuffer(1, float32.length, this.config.sampleRate);
    audioBuffer.copyToChannel(float32, 0);

    return audioBuffer;
  }

  private audioBufferToBlob(audioBuffer: AudioBuffer): Blob {
    // Convert AudioBuffer to WAV blob
    const wav = this.audioBufferToWav(audioBuffer);
    return new Blob([wav], { type: 'audio/wav' });
  }

  private audioBufferToWav(audioBuffer: AudioBuffer): ArrayBuffer {
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;

    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;

    const data = new Float32Array(audioBuffer.length * numChannels);
    for (let i = 0; i < numChannels; i++) {
      const channelData = audioBuffer.getChannelData(i);
      for (let j = 0; j < audioBuffer.length; j++) {
        data[j * numChannels + i] = channelData[j];
      }
    }

    const dataLength = data.length * bytesPerSample;
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);

    // Write WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataLength, true);

    // Write audio data
    let offset = 44;
    for (let i = 0; i < data.length; i++) {
      const sample = Math.max(-1, Math.min(1, data[i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += 2;
    }

    return buffer;
  }

  private send(message: Record<string, unknown>) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
