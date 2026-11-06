/**
 * Soulful Audio Engine
 * Provides authentic, rich, soulful and meditative soundscapes for the 3D WebXR studio.
 * Features:
 * - High-fidelity soulful ambient audio tracks (Kai Engel - Neoclassical Piano Ambient, Placid Ambient Flow)
 * - Original procedural Web Audio synthesizer (warm Rhodes 9th chords, sub-bass, and Kashmiri Santoor plucks)
 * - Seamless looping, volume attenuation, and auto-resume on user gesture
 */

export const SOULFUL_TRACKS = [
  {
    id: 'soulful-piano',
    title: 'Meekness (Soulful Piano Ambient)',
    artist: 'Kai Engel',
    genre: 'Soulful Neoclassical Ambient',
    src: '/audio/soulful-piano-ambient.ogg',
    isProcedural: false
  },
  {
    id: 'soulful-flow',
    title: 'Placid Meditative Flow',
    artist: 'MusicLFiles',
    genre: 'Peaceful Ambient Chords',
    src: '/audio/soulful-flow.ogg',
    isProcedural: false
  },
  {
    id: 'kashmir-santoor-synth',
    title: 'Kashmiri Santoor & Rhodes Chords',
    artist: 'Farman Studio Synthesizer',
    genre: 'Procedural Modal Soundscape',
    src: '',
    isProcedural: true
  },
  {
    id: 'persian-folk-archive',
    title: 'Traditional Folk Recording (1931)',
    artist: 'Archive Collection',
    genre: 'Persian Classical',
    src: '/audio/persian-folk-1931.ogg',
    isProcedural: false
  },
  {
    id: 'urdu-anthem',
    title: 'Saare Jahan Se Achha',
    artist: 'Urdu Instrumental',
    genre: 'Instrumental Melody',
    src: '/audio/sare-jahan-urdu.ogg',
    isProcedural: false
  }
];

class SoulfulAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.filter = null;
    this.isPlaying = false;
    this.timer = null;
    this.chordStep = 0;
    this.volume = 0.55;
    this.currentTrackIndex = 0;
    this.audioElement = null;
    this.listeners = new Set();

    // Soulful contemplative chord progressions (frequencies in Hz)
    this.progressions = [
      { sub: 73.42, notes: [146.83, 174.61, 220.0, 261.63, 329.63] },
      { sub: 98.0, notes: [196.0, 174.61, 220.0, 261.63, 329.63] },
      { sub: 65.41, notes: [130.81, 164.81, 196.0, 246.94, 293.66] },
      { sub: 87.31, notes: [174.61, 220.0, 261.63, 329.63, 493.88] },
      { sub: 55.0, notes: [110.0, 130.81, 164.81, 196.0, 246.94] },
      { sub: 58.27, notes: [116.54, 146.83, 174.61, 220.0, 261.63] }
    ];

    this.plucks = [329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99];
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    const state = {
      isPlaying: this.isPlaying,
      currentTrack: SOULFUL_TRACKS[this.currentTrackIndex],
      trackIndex: this.currentTrackIndex,
      volume: this.volume
    };
    this.listeners.forEach((l) => l(state));
  }

  initSynth() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(850, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      this.masterGain.connect(this.filter);
      this.filter.connect(this.ctx.destination);
    } catch {
      // ignore
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
    this.notify();
  }

  start() {
    const track = SOULFUL_TRACKS[this.currentTrackIndex];
    this.isPlaying = true;

    if (track.isProcedural) {
      if (this.audioElement) {
        this.audioElement.pause();
      }
      this.initSynth();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.playStep();
    } else {
      // Stop synth loop if running
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
      }
      if (!this.audioElement) {
        this.audioElement = new Audio();
        this.audioElement.loop = true;
      }
      const targetSrc = track.src;
      if (!this.audioElement.src.endsWith(targetSrc)) {
        this.audioElement.src = targetSrc;
      }
      this.audioElement.volume = this.volume;
      this.audioElement.play().catch(() => {
        // Fallback to procedural synth if file playback is blocked
        this.initSynth();
        this.playStep();
      });
    }

    this.notify();
  }

  stop() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
    }
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % SOULFUL_TRACKS.length;
    if (this.isPlaying) {
      this.start();
    } else {
      this.notify();
    }
  }

  selectTrack(index) {
    if (index >= 0 && index < SOULFUL_TRACKS.length) {
      this.currentTrackIndex = index;
      if (this.isPlaying) {
        this.start();
      } else {
        this.notify();
      }
    }
  }

  playStep() {
    if (!this.isPlaying || !this.ctx) return;
    const now = this.ctx.currentTime;
    const currentChord = this.progressions[this.chordStep % this.progressions.length];
    this.chordStep++;

    // Sub-Bass
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

    // Warm Rhodes electric piano pad
    currentChord.notes.forEach((freq, i) => {
      try {
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime((i % 2 === 0 ? 3 : -3), now);

        const attack = 0.8 + i * 0.15;
        const decay = 4.8;
        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.055, now + attack);
        noteGain.gain.exponentialRampToValueAtTime(0.0008, now + attack + decay);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + attack + decay + 0.5);
      } catch {
        // ignore
      }
    });

    // Kashmiri Santoor / Harp pluck
    if (Math.random() > 0.3) {
      const pluckFreq = this.plucks[Math.floor(Math.random() * this.plucks.length)];
      try {
        const pluckOsc = this.ctx.createOscillator();
        const pluckGain = this.ctx.createGain();
        pluckOsc.type = 'sine';
        pluckOsc.frequency.setValueAtTime(pluckFreq, now + 1.2);
        pluckGain.gain.setValueAtTime(0, now + 1.2);
        pluckGain.gain.linearRampToValueAtTime(0.08, now + 1.25);
        pluckGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        pluckOsc.connect(pluckGain);
        pluckGain.connect(this.masterGain);
        pluckOsc.start(now + 1.2);
        pluckOsc.stop(now + 3.3);
      } catch {
        // ignore
      }
    }

    // Loop interval
    const intervalMs = 5400;
    this.timer = setTimeout(() => {
      this.playStep();
    }, intervalMs);
  }
}

const soulfulAudio = new SoulfulAudioEngine();
export default soulfulAudio;
