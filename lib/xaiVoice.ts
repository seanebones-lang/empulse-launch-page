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
    return new Promise((resolve, reject) => {
      try {
        // Connect to backend WebSocket proxy
        // Properly construct WebSocket URL from backend URL
        let wsUrl: string;
        try {
          const url = new URL(this.backendUrl);
          const wsProtocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
          wsUrl = `${wsProtocol}//${url.host}/ws/xai-voice`;
          console.log('[xAI Voice] Using backend proxy:', wsUrl);
        } catch (e) {
          // Fallback if URL parsing fails
          console.error('[xAI Voice] Failed to parse backend URL:', e);
          const wsProtocol = this.backendUrl.startsWith('https') ? 'wss:' : 'ws:';
          wsUrl = this.backendUrl.replace('http://', 'ws://').replace('https://', 'wss://') + '/ws/xai-voice';
          console.log('[xAI Voice] Using fallback proxy URL:', wsUrl);
        }
        
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          console.log('[xAI Voice] WebSocket connected');
          this.configureSession();
          resolve();
        };

        this.ws.onmessage = async (event) => {
          await this.handleMessage(event.data);
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

  private configureSession() {
    const sessionConfig = {
      type: 'session.update',
      session: {
        voice: this.config.voice,
        instructions: this.config.instructions,
        turn_detection: { type: null }, // Manual turn detection
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
      },
    };

    console.log('[xAI Voice] Sending session config:', JSON.stringify(sessionConfig, null, 2));
    this.send(sessionConfig);
  }

  async sendTextMessage(text: string): Promise<void> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket not connected');
    }

    // Reset buffers for new message
    this.audioChunks = [];
    this.textBuffer = '';

    // Step 1: Send user message (per xAI Voice Agent API docs)
    const message = {
      type: 'conversation.item.create',
      item: {
        type: 'message',
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: text,
          },
        ],
      },
    };

    console.log('[xAI Voice] Sending text message:', text.substring(0, 50));
    this.send(message);

    // Step 2: Request response with text and audio (per docs)
    const responseRequest = {
      type: 'response.create',
      response: {
        modalities: ['text', 'audio'],
      },
    };

    console.log('[xAI Voice] Requesting response with text and audio');
    this.send(responseRequest);
  }

  private async handleMessage(data: string) {
    try {
      const event = JSON.parse(data);
      console.log('[xAI Voice] Received event:', event.type);

      switch (event.type) {
        case 'session.updated':
          console.log('[xAI Voice] ✅ Session configured successfully');
          break;

        case 'conversation.created':
          console.log('[xAI Voice] ✅ Conversation created');
          break;

        case 'conversation.item.added':
          console.log('[xAI Voice] Message added to conversation');
          break;

        case 'response.created':
          console.log('[xAI Voice] Response started, ID:', event.response?.id);
          this.audioChunks = []; // Reset audio chunks for new response
          this.textBuffer = '';
          break;

        case 'response.output_item.added':
          console.log('[xAI Voice] Response item added');
          break;

        case 'response.output_audio_transcript.delta':
          const textDelta = event.delta || '';
          if (textDelta) {
            this.textBuffer += textDelta;
            console.log('[xAI Voice] Text delta:', textDelta);
            this.callbacks.onTextUpdate?.(textDelta);
          }
          break;

        case 'response.output_audio_transcript.done':
          console.log('[xAI Voice] Text transcript complete');
          break;

        case 'response.output_audio.delta':
          const audioDelta = event.delta || '';
          if (audioDelta) {
            this.audioChunks.push(audioDelta);
          }
          break;

        case 'response.output_audio.done':
          console.log('[xAI Voice] Audio complete, total chunks:', this.audioChunks.length);
          if (this.audioChunks.length > 0) {
            await this.processAudioChunks();
          } else {
            console.warn('[xAI Voice] No audio chunks received');
            // No audio, but response is done - notify completion
            this.callbacks.onResponseComplete?.();
          }
          break;

        case 'response.done':
          console.log('[xAI Voice] ✅ Response complete');
          // ALWAYS notify response is complete to stop loading state
          // This ensures loading stops even if audio processing hasn't finished
          this.callbacks.onResponseComplete?.();
          break;

        default:
          // Log unknown message types for debugging (but ignore input_audio_buffer events)
          if (event.type && !event.type.includes('input_audio_buffer')) {
            console.log('[xAI Voice] Unhandled event type:', event.type);
          }
          break;
      }
    } catch (error) {
      console.error('[xAI Voice] Error parsing message:', error);
    }
  }

  private async processAudioChunks() {
    if (this.audioChunks.length === 0) {
      console.warn('[xAI Voice] No audio chunks to process');
      // No audio, but response is done - notify completion
      this.callbacks.onResponseComplete?.();
      return;
    }

    try {
      // Combine all base64 chunks
      const combinedBase64 = this.audioChunks.join('');
      console.log('[xAI Voice] Processing audio, total length:', combinedBase64.length);

      // Decode base64 to PCM16 audio
      const audioBuffer = await this.decodePCM16Audio(combinedBase64);
      console.log('[xAI Voice] Decoded audio buffer, duration:', audioBuffer.duration, 'seconds');

      // Convert to WAV blob (now async)
      const audioBlob = await this.audioBufferToBlob(audioBuffer);

      // Create URL for playback
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log('[xAI Voice] Created audio URL for playback');

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

    // Convert to Int16Array (PCM16, little-endian)
    const samples = new Int16Array(bytes.buffer);

    // Convert to Float32Array (normalized to -1 to 1)
    const floatSamples = new Float32Array(samples.length);
    for (let i = 0; i < samples.length; i++) {
      floatSamples[i] = samples[i] / 32768.0;
    }

    // Create AudioBuffer - use getChannelData().set() for better browser compatibility
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioBuffer = audioContext.createBuffer(1, floatSamples.length, this.config.sampleRate);
    audioBuffer.getChannelData(0).set(floatSamples);

    return audioBuffer;
  }

  private audioBufferToBlob(audioBuffer: AudioBuffer): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const offlineContext = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      );

      const source = offlineContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineContext.destination);
      source.start();

      offlineContext.startRendering().then((renderedBuffer) => {
        // Convert to WAV
        const wav = this.audioBufferToWav(renderedBuffer);
        const blob = new Blob([wav], { type: 'audio/wav' });
        resolve(blob);
      }).catch(reject);
    });
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
