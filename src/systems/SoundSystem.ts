// @ts-ignore
import fantasyRealmsMusic from '../assets/fantasy realms.mp3';

class SoundSystem {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private musicInterval: any = null;
  private currentTheme: string | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private audioEl: HTMLAudioElement | null = null;

  constructor() {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (this.audioEl) {
            try {
              this.audioEl.pause();
            } catch (e) {}
          }
          if (this.ctx && this.ctx.state === 'running') {
            this.ctx.suspend().catch(() => {});
          }
        } else {
          if (this.enabled) {
            if (this.audioEl && this.currentTheme === 'fantasy') {
              this.audioEl.play().catch(e => console.warn("Blocked visibility resume:", e));
            }
            if (this.ctx && this.ctx.state === 'suspended') {
              this.ctx.resume().catch(() => {});
            }
          }
        }
      });
    }
  }

  private init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    // Resume context if suspended (common in browser security models)
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (!val) {
      this.stopMusic();
    } else if (this.currentTheme) {
      this.startMusic(this.currentTheme);
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  public playMoney() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // First high coin ring
    this.playCoinTone(now, 987.77); // B5
    // Second higher coin ring slightly delayed
    this.playCoinTone(now + 0.07, 1318.51); // E6
  }

  private playCoinTone(time: number, freq: number) {
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.05, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);

    osc.start(time);
    osc.stop(time + 0.2);
  }

  public playLevelUp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // C major chord arpeggio rising: C4 -> E4 -> G4 -> C5
    const notes = [261.63, 329.63, 392.00, 523.25];
    
    notes.forEach((freq, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.07);

      gain.gain.setValueAtTime(0.04, now + index * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.07 + 0.25);

      osc.start(now + index * 0.07);
      osc.stop(now + index * 0.07 + 0.27);
    });
  }

  public playFail() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(65, now + 0.4);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc.start();
    osc.stop(now + 0.42);
  }

  public playDeath() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Somber low minor triad chord (A minor: A2, C3, E3)
    const freqs = [110.00, 130.81, 164.81];
    
    freqs.forEach((freq) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.start(now);
      osc.stop(now + 1.9);
    });
  }

  public startMusic(theme: string) {
    this.currentTheme = theme;
    if (!this.enabled) return;
    this.stopMusic();

    if (theme === 'fantasy') {
      try {
        this.audioEl = new Audio(fantasyRealmsMusic);
        this.audioEl.loop = true;
        this.audioEl.volume = 0.20; // soft volume
        this.audioEl.play().catch(err => {
          console.warn("Audio play blocked by browser. Will play after user interaction:", err);
        });
      } catch (e) {
        console.error("Failed to start audio element:", e);
      }
      return;
    }

    this.init();
    if (!this.ctx) return;

    if (this.musicInterval) {
      clearInterval(this.musicInterval);
    }

    // Set up filter for lofi warm feeling
    if (!this.filterNode) {
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(800, this.ctx.currentTime); // warm low-pass cut
      this.filterNode.connect(this.ctx.destination);
    }

    let step = 0;
    
    // Notes frequencies (D minor -> C major -> F major -> A minor)
    const arpeggios = [
      // D minor
      146.83, 174.61, 220.00, 293.66,
      // C major
      130.81, 164.81, 196.00, 261.63,
      // F major
      174.61, 220.00, 261.63, 349.23,
      // A minor
      110.00, 130.81, 164.81, 220.00
    ];

    const tempo = 450; // ms per note

    this.musicInterval = setInterval(() => {
      if (!this.ctx || !this.enabled) return;
      if (this.ctx.state === 'suspended') return;

      const now = this.ctx.currentTime;

      // 1. Play lute/harp note (triangle wave with exponential decay)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      if (this.filterNode) {
        gain.connect(this.filterNode);
      } else {
        gain.connect(this.ctx.destination);
      }

      osc.type = 'triangle';
      // Add subtle pitch variation for detuned lofi vibe
      const pitchDetune = (Math.random() - 0.5) * 8; // detune in cents
      osc.frequency.setValueAtTime(arpeggios[step % arpeggios.length], now);
      osc.detune.setValueAtTime(pitchDetune, now);

      gain.gain.setValueAtTime(0.015, now); // soft volume
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2); // long ring

      osc.start(now);
      osc.stop(now + 1.3);

      // 2. Play soft lofi hip-hop beat (soft kick on steps 0, 4, 8, 12)
      if (step % 4 === 0) {
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.connect(kickGain);
        kickGain.connect(this.ctx.destination);

        kickOsc.frequency.setValueAtTime(80, now);
        kickOsc.frequency.exponentialRampToValueAtTime(0.01, now + 0.15); // pitch slide down for thump

        kickGain.gain.setValueAtTime(0.04, now);
        kickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

        kickOsc.start(now);
        kickOsc.stop(now + 0.16);
      }

      // 3. Play soft shaker / brush snare on steps 2, 6, 10, 14
      if (step % 4 === 2) {
        // Generate a tiny white noise burst for snare
        const bufferSize = this.ctx.sampleRate * 0.05; // 50ms burst
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noiseNode = this.ctx.createBufferSource();
        noiseNode.buffer = buffer;

        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(1000, now);

        const noiseGain = this.ctx.createGain();
        noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        noiseGain.gain.setValueAtTime(0.006, now); // extremely soft brush snare
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

        noiseNode.start(now);
        noiseNode.stop(now + 0.05);
      }

      step++;
    }, tempo);
  }

  public stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.audioEl) {
      try {
        this.audioEl.pause();
      } catch (e) {
        console.warn("Failed to pause HTML5 audio:", e);
      }
      this.audioEl = null;
    }
  }
}

export const gameAudio = new SoundSystem();
