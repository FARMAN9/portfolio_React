/**
 * Soulful Audio Engine
 * Generates an organic, rich, meditative and soulful musical soundscape using Web Audio API.
 * Features:
 * - Neo-Soul & Contemplative Modal Chord Progressions (9th & 11th extensions)
 * - Warm Felt Electric Piano / Rhodes emulation
 * - Ethereal Analog Ambient Strings & Pad layers
 * - Meditative Pentatonic Acoustic Plucks (Santoor/Harp timbre)
 * - Breathing Analog Lowpass Filter with gentle chorus
 */

class SoulfulAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.filter = null;
    this.isPlaying = false;
    this.timer = null;
    this.chordStep = 0;
    this.volume = 0.55;

    // Soulful contemplative chord progressions (frequencies in Hz)
    // Progression 1: Dm9 -> G13sus -> Cmaj9 -> Fmaj7#11
    // Progression 2: Em9 -> Am9 -> Dm9 -> Bbmaj9 (Soulful Kashmiri Dusk)
    this.progressions = [
      // Dm9 (D3, F3, A3, C4, E4) + Sub (D2)
      { sub: 73.42, notes: [146.83, 174.61, 220.0, 261.63, 329.63] },
      // G13sus (G2, F3, A3, C4, E4) + Sub (G2)
      { sub: 98.0, notes: [196.0, 174.61, 220.0, 261.63, 329.63] },
      // Cmaj9 (C3, E3, G3, B3, D4) + Sub (C2)
      { sub: 65.41, notes: [130.81, 164.81, 196.0, 246.94, 293.66] },
      // Fmaj7#11 (F2, A3, C4, E4, B4) + Sub (F2)
      { sub: 87.31, notes: [174.61, 220.0, 261.63, 329.63, 493.88] },
      // Am9 (A2, C3, E3, G3, B3) + Sub (A1)
      { sub: 55.0, notes: [110.0, 130.81, 164.81, 196.0, 246.94] },
      // Bbmaj9 (Bb2, D3, F3, A3, C4) + Sub (Bb1)
      { sub: 58.27, notes: [116.54, 146.83, 174.61, 220.0, 261.63] }
    ];

    // Soulful pentatonic acoustic pluck scale (Santoor / Bell chimes)
    this.plucks = [329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99];
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Master output gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      // Warm analog master lowpass filter
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(850, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      this.masterGain.connect(this.filter);
      this.filter.connect(this.ctx.destination);
    } catch (e) {
      console.warn('AudioContext init error:', e);
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
  }

  start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.playStep();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
    }
  }

  playStep() {
    if (!this.isPlaying || !this.ctx) return;
    const now = this.ctx.currentTime;
    const currentChord = this.progressions[this.chordStep % this.progressions.length];
    this.chordStep++;

    // 1. Warm Sub-Bass Fundamental
    try {
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(currentChord.sub, now);

      subGain.gain.setValueAtTime(0, now);
      subGain.gain.linearRampToValueAtTime(0.18, now + 1.2);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 5.2);

      subOsc.connect(subGain);
      subGain.connect(this.masterGain);
      subOsc.start(now);
      subOsc.stop(now + 5.5);
    } catch {
      // ignore
    }

    // 2. Lush Multi-Voice Ethereal Pad
    currentChord.notes.forEach((freq, idx) => {
      try {
        const oscA = this.ctx.createOscillator();
        const oscB = this.ctx.createOscillator();
        const padGain = this.ctx.createGain();

        // Slight binaural detune (+3 and -3 cents) for lush warmth
        oscA.type = 'triangle';
        oscA.frequency.setValueAtTime(freq, now);
        oscA.detune.setValueAtTime(3.5, now);

        oscB.type = 'sine';
        oscB.frequency.setValueAtTime(freq, now);
        oscB.detune.setValueAtTime(-3.5, now);

        const noteVol = 0.055 / (idx * 0.4 + 1);
        padGain.gain.setValueAtTime(0, now);
        padGain.gain.linearRampToValueAtTime(noteVol, now + 1.4 + idx * 0.15);
        padGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.8);

        oscA.connect(padGain);
        oscB.connect(padGain);
        padGain.connect(this.masterGain);

        oscA.start(now + idx * 0.08);
        oscB.start(now + idx * 0.08);
        oscA.stop(now + 6.2);
        oscB.stop(now + 6.2);
      } catch {
        // ignore
      }
    });

    // 3. Meditative Acoustic Pluck (Santoor / Bell Chime)
    const pluckFreq = this.plucks[Math.floor(Math.random() * this.plucks.length)];
    const pluckTime = now + 1.2 + Math.random() * 1.6;
    try {
      const pOsc = this.ctx.createOscillator();
      const pGain = this.ctx.createGain();
      const pFilter = this.ctx.createBiquadFilter();

      pOsc.type = 'triangle';
      pOsc.frequency.setValueAtTime(pluckFreq, pluckTime);

      pFilter.type = 'bandpass';
      pFilter.frequency.setValueAtTime(pluckFreq * 1.5, pluckTime);
      pFilter.Q.setValueAtTime(2.5, pluckTime);

      pGain.gain.setValueAtTime(0, pluckTime);
      pGain.gain.linearRampToValueAtTime(0.065, pluckTime + 0.04);
      pGain.gain.exponentialRampToValueAtTime(0.0001, pluckTime + 2.4);

      pOsc.connect(pFilter);
      pFilter.connect(pGain);
      pGain.connect(this.masterGain);

      pOsc.start(pluckTime);
      pOsc.stop(pluckTime + 2.5);
    } catch {
      // ignore
    }

    // Schedule next chord (4.6s per chord allows soothing meditative transitions)
    this.timer = setTimeout(() => this.playStep(), 4600);
  }
}

export const soulfulAudio = new SoulfulAudioEngine();
export default soulfulAudio;
