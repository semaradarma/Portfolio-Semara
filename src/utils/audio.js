// src/utils/audio.js
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.initialized = false;
    this.setupAutoUnlock();
  }

  setupAutoUnlock() {
    if (typeof window === "undefined") return;
    const unlock = () => {
      this.init();
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("click", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("keydown", unlock, { passive: true });
  }

  init() {
    if (this.muted) return;
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      this.initialized = true;
    } catch (e) {
      console.warn("Audio init error:", e);
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playStartupSound() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Master Gain Node
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, now);
      masterGain.gain.exponentialRampToValueAtTime(0.3, now + 0.3);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
      masterGain.connect(this.ctx.destination);

      // Sci-Fi Chords
      const frequencies = [220, 329.63, 440, 554.37, 880];

      frequencies.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(freq * 0.5, now);
        osc.frequency.exponentialRampToValueAtTime(freq, now + 0.5);

        oscGain.gain.setValueAtTime(0.01, now);
        oscGain.gain.linearRampToValueAtTime(0.1, now + 0.3);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(200, now);
        filter.frequency.exponentialRampToValueAtTime(3500, now + 1.0);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 2.3);
      });
    } catch (e) {
      console.warn("Startup sound notice:", e);
    }
  }

  playClickSound() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== "running") return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  playDoorOpenSound() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;

      // 1. Mechanical Latch Unlock Click (Audible snap)
      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      clickOsc.type = "triangle";
      clickOsc.frequency.setValueAtTime(320, now);
      clickOsc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
      clickGain.gain.setValueAtTime(0.3, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      clickOsc.connect(clickGain);
      clickGain.connect(this.ctx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.08);

      // 2. Heavy Resonant Whoosh & Riser (Audible mid-low range)
      const whooshOsc = this.ctx.createOscillator();
      const whooshGain = this.ctx.createGain();
      whooshOsc.type = "sawtooth";
      whooshOsc.frequency.setValueAtTime(90, now + 0.05);
      whooshOsc.frequency.exponentialRampToValueAtTime(280, now + 0.9);
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(250, now + 0.05);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.8);

      whooshGain.gain.setValueAtTime(0.01, now + 0.05);
      whooshGain.gain.linearRampToValueAtTime(0.35, now + 0.35);
      whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      whooshOsc.connect(filter);
      filter.connect(whooshGain);
      whooshGain.connect(this.ctx.destination);
      whooshOsc.start(now + 0.05);
      whooshOsc.stop(now + 1.4);

      // 3. Ethereal Celestial Harmonic Chord Chime (Swells with glowing portal)
      const chords = [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];
      chords.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + 0.2 + idx * 0.06);
        oscGain.gain.setValueAtTime(0.001, now + 0.2 + idx * 0.06);
        oscGain.gain.linearRampToValueAtTime(0.18, now + 0.45 + idx * 0.06);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
        osc.connect(oscGain);
        oscGain.connect(this.ctx.destination);
        osc.start(now + 0.2 + idx * 0.06);
        osc.stop(now + 2.2);
      });
    } catch (e) {
      console.warn("Door sound effect notice:", e);
    }
  }

  playArrivalSound() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;

      // Soft crystalline welcoming chords
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.15 + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + 1.6);
      });
    } catch (e) {
      console.warn("Arrival sound notice:", e);
    }
  }
}

export const soundFx = new SoundSystem();
