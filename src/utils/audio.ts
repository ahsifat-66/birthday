/**
 * Happy Birthday Song Synthesizer & Audio Player
 * Self-contained: Plays a romantic celestial music-box rendition of "Happy Birthday To You"
 * with full chord harmonization, plus supports custom audio file playback if uploaded.
 */

// Note frequencies in Hz
const NOTE_FREQ: Record<string, number> = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, Bb3: 233.08, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, Bb4: 466.16, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, Bb5: 932.33, C6: 1046.50
};

interface MelodyNote {
  note: string;
  duration: number; // in beats
}

interface ChordSegment {
  timeInBeats: number;
  notes: string[];
}

// "Happy Birthday To You" melody (Key of F Major)
const HAPPY_BIRTHDAY_MELODY: MelodyNote[] = [
  // Measure 0 (pickup)
  { note: 'C4', duration: 0.75 },
  { note: 'C4', duration: 0.25 },
  // Measure 1
  { note: 'D4', duration: 1.0 },
  { note: 'C4', duration: 1.0 },
  { note: 'F4', duration: 1.0 },
  // Measure 2
  { note: 'E4', duration: 2.0 },
  { note: 'C4', duration: 0.75 },
  { note: 'C4', duration: 0.25 },
  // Measure 3
  { note: 'D4', duration: 1.0 },
  { note: 'C4', duration: 1.0 },
  { note: 'G4', duration: 1.0 },
  // Measure 4
  { note: 'F4', duration: 2.0 },
  { note: 'C4', duration: 0.75 },
  { note: 'C4', duration: 0.25 },
  // Measure 5: "Happy Birthday dear my love"
  { note: 'C5', duration: 1.0 },
  { note: 'A4', duration: 1.0 },
  { note: 'F4', duration: 1.0 },
  // Measure 6
  { note: 'E4', duration: 1.0 },
  { note: 'D4', duration: 1.0 },
  { note: 'Bb4', duration: 0.75 },
  { note: 'Bb4', duration: 0.25 },
  // Measure 7
  { note: 'A4', duration: 1.0 },
  { note: 'F4', duration: 1.0 },
  { note: 'G4', duration: 1.0 },
  // Measure 8
  { note: 'F4', duration: 2.5 },
];

// Romantic lush chord accompaniment
const CHORD_PROGRESSION: ChordSegment[] = [
  { timeInBeats: 0, notes: ['F3', 'A3', 'C4'] },
  { timeInBeats: 3, notes: ['C3', 'G3', 'Bb3', 'E4'] },
  { timeInBeats: 6, notes: ['C3', 'G3', 'Bb3', 'E4'] },
  { timeInBeats: 9, notes: ['F3', 'A3', 'C4'] },
  { timeInBeats: 12, notes: ['F3', 'A3', 'C4', 'Eb4'] },
  { timeInBeats: 15, notes: ['Bb3', 'D4', 'F4'] },
  { timeInBeats: 18, notes: ['F3', 'A3', 'C4'] },
  { timeInBeats: 20, notes: ['C3', 'G3', 'Bb3', 'E4'] },
  { timeInBeats: 21, notes: ['F3', 'A3', 'C4', 'F4'] },
];

class SoundController {
  private ctx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private isSfxMuted: boolean = false;
  private musicGain: GainNode | null = null;
  private songLoopTimeout: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private isUsingCustomAudio: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Toggle background song
  public toggleMusic(): boolean {
    this.initContext();

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

  // Play a music box / celesta tone
  private playBellTone(freq: number, time: number, duration: number, volume: number = 0.08) {
    if (!this.ctx || !this.musicGain) return;

    // Fundamental note (celestial sine)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Warm music box envelope
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.4);

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + duration * 1.5);

    // 2nd harmonic (adds sweet chime sparkle)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, time);

    gain2.gain.setValueAtTime(0.001, time);
    gain2.gain.linearRampToValueAtTime(volume * 0.35, time + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.0001, time + duration * 0.8);

    osc2.connect(gain2);
    gain2.connect(this.musicGain);

    osc2.start(time);
    osc2.stop(time + duration * 0.9);
  }

  // Play warm soft chord pad note
  private playChordNote(freq: number, time: number, duration: number, volume: number = 0.035) {
    if (!this.ctx || !this.musicGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Start Happy Birthday song (loops continuously)
  public startMusic() {
    this.initContext();

    if (this.isUsingCustomAudio && this.customAudio) {
      this.customAudio.play().then(() => {
        this.isMusicPlaying = true;
      }).catch(() => {
        this.playSynthesizedHappyBirthday();
      });
      return;
    }

    this.playSynthesizedHappyBirthday();
  }

  private playSynthesizedHappyBirthday() {
    if (!this.ctx) return;
    this.isMusicPlaying = true;

    // Master music gain node with smooth fade-in
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.musicGain.gain.exponentialRampToValueAtTime(0.24, this.ctx.currentTime + 1.2);
    this.musicGain.connect(this.ctx.destination);

    const tempoBPM = 104; // Gentle romantic tempo
    const secondsPerBeat = 60 / tempoBPM;
    const startTime = this.ctx.currentTime + 0.1;

    let currentBeat = 0;

    // 1. Schedule chords
    CHORD_PROGRESSION.forEach((chord) => {
      const chordTime = startTime + chord.timeInBeats * secondsPerBeat;
      chord.notes.forEach((noteName) => {
        const freq = NOTE_FREQ[noteName];
        if (freq) {
          this.playChordNote(freq, chordTime, 2.8 * secondsPerBeat, 0.04);
        }
      });
    });

    // 2. Schedule Happy Birthday Melody
    HAPPY_BIRTHDAY_MELODY.forEach((m) => {
      const noteTime = startTime + currentBeat * secondsPerBeat;
      const freq = NOTE_FREQ[m.note];
      if (freq) {
        this.playBellTone(freq, noteTime, m.duration * secondsPerBeat, 0.09);
      }
      currentBeat += m.duration;
    });

    // Total song duration in ms + romantic pause
    const totalDurationMs = (currentBeat * secondsPerBeat + 2.5) * 1000;

    // Schedule next loop
    this.songLoopTimeout = window.setTimeout(() => {
      if (this.isMusicPlaying) {
        this.playSynthesizedHappyBirthday();
      }
    }, totalDurationMs);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.songLoopTimeout) {
      clearTimeout(this.songLoopTimeout);
      this.songLoopTimeout = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, this.ctx.currentTime);
      this.musicGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
    }
  }

  // Allow uploading / selecting custom Happy Birthday song
  public loadCustomAudioFile(file: File) {
    const url = URL.createObjectURL(file);
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    this.customAudio = new Audio(url);
    this.customAudio.loop = true;
    this.isUsingCustomAudio = true;

    if (this.isMusicPlaying) {
      this.stopMusic();
      this.startMusic();
    }
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

  // Interactive SFX: Soft release pop
  public playSoftRelease() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(659.25, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
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
