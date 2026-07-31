// src/utils/audio.js
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Futuristic Sci-Fi Startup Sound Effect (Whoosh + Synthesized Synth Pad)
  playStartupSound() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Master Gain Node
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, now);
      masterGain.gain.exponentialRampToValueAtTime(0.4, now + 0.3);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);
      masterGain.connect(this.ctx.destination);

      // Sci-Fi Chords: E Harmonic Frequencies
      const frequencies = [220, 277.18, 329.63, 440, 554.37, 659.25, 880];

      frequencies.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(freq * 0.5, now);
        osc.frequency.exponentialRampToValueAtTime(freq, now + 0.6);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.2, now + 2.2);

        oscGain.gain.setValueAtTime(0.01, now);
        oscGain.gain.linearRampToValueAtTime(0.12, now + 0.4);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(150, now);
        filter.frequency.exponentialRampToValueAtTime(4500, now + 1.2);
        filter.frequency.exponentialRampToValueAtTime(300, now + 3.2);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 3.3);
      });

      // High Shimmer Chime Effect
      const shimmer = this.ctx.createOscillator();
      const shimmerGain = this.ctx.createGain();
      shimmer.type = "sine";
      shimmer.frequency.setValueAtTime(1046.5, now + 0.6); // C6
      shimmer.frequency.exponentialRampToValueAtTime(2093, now + 1.8); // C7

      shimmerGain.gain.setValueAtTime(0.001, now);
      shimmerGain.gain.linearRampToValueAtTime(0.15, now + 1.0);
      shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      shimmer.connect(shimmerGain);
      shimmerGain.connect(masterGain);
      shimmer.start(now + 0.5);
      shimmer.stop(now + 2.9);

      // Play local MP3 whoosh if available
      try {
        const audio = new Audio("/src/assets/sound/whoosh.mp3");
        audio.volume = 0.6;
        audio.play().catch(() => {});
      } catch (err) {
        // Fallback handled by Web Audio API
      }
    } catch (e) {
      console.warn("Audio play notice:", e);
    }
  }

  // Soft UI Click Sound
  playClickSound() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(1040, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }
}

export const soundFx = new SoundSystem();
