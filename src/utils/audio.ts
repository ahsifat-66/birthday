/**
 * Procedural Web Audio API Cosmic Soundscape & Interactive Chimes
 * Self-contained: No external audio assets required, zero CORS issues, instant playback.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private isSfxMuted: boolean = false;
  private musicGain: GainNode | null = null;
  private timerId: number | null = null;
  private activeOscillators: OscillatorNode[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Toggle ambient cosmic soundscape
  public toggleMusic(): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public getMusicStatus(): boolean {
    return this.isMusicPlaying;
  }

  public toggleSfx(): boolean {
    this.isSfxMuted = !this.isSfxMuted;
    return !this.isSfxMuted;
  }

  public getSfxStatus(): boolean {
    return !this.isSfxMuted;
  }

  // Lush ambient cosmic pad & gentle celestial bells
  private startMusic() {
    if (!this.ctx) return;
    this.isMusicPlaying = true;

    // Master music gain node with fade-in
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.musicGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 3);
    this.musicGain.connect(this.ctx.destination);

    // Ethereal chord frequencies (F major 9 / D minor 11 cosmic harmony)
    const baseChord = [174.61, 220.00, 261.63, 329.63, 392.00]; // F3, A3, C4, E4, G4

    baseChord.forEach((freq, idx) => {
      if (!this.ctx || !this.musicGain) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle detune for lush celestial chorus
      osc.detune.setValueAtTime((idx - 2) * 4, this.ctx.currentTime);

      oscGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      if (panner) {
        panner.pan.setValueAtTime((idx / 2 - 1) * 0.5, this.ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(panner);
        panner.connect(this.musicGain);
      } else {
        osc.connect(oscGain);
        oscGain.connect(this.musicGain);
      }

      osc.start();
      this.activeOscillators.push(osc);
    });

    // Schedule gentle starlight arpeggios
    const pentatonic = [349.23, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
    const playCelestialNote = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;
      
      const noteFreq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
      const bellOsc = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();

      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(noteFreq, this.ctx.currentTime);

      bellGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      bellGain.gain.exponentialRampToValueAtTime(0.035, this.ctx.currentTime + 0.15);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.8);

      bellOsc.connect(bellGain);
      bellGain.connect(this.musicGain);

      bellOsc.start();
      bellOsc.stop(this.ctx.currentTime + 2.9);

      // Next note in 1.8 to 4.5 seconds
      const nextDelay = 1800 + Math.random() * 2700;
      this.timerId = window.setTimeout(playCelestialNote, nextDelay);
    };

    this.timerId = window.setTimeout(playCelestialNote, 1200);
  }

  private stopMusic() {
    this.isMusicPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, this.ctx.currentTime);
      this.musicGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
    }
    setTimeout(() => {
      this.activeOscillators.forEach(osc => {
        try { osc.stop(); } catch {}
      });
      this.activeOscillators = [];
    }, 1300);
  }

  // Interactive SFX: Sweet starlight shimmer chime
  public playChime(pitchMultiplier: number = 1.0) {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const baseFreq = 587.33 * pitchMultiplier; // D5
    const freqs = [baseFreq, baseFreq * 1.25, baseFreq * 1.5, baseFreq * 2];

    freqs.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.04);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + i * 0.04 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + i * 0.04 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + i * 0.04);
      osc.stop(this.ctx.currentTime + i * 0.04 + 0.65);
    });
  }

  // Interactive SFX: Soft cosmic release pop
  public playSoftRelease() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(659.25, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  // Interactive SFX: Celebration fanfare chime
  public playCelebrationChime() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.08 + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.95);
    });
  }
}

export const soundManager = new SoundController();
