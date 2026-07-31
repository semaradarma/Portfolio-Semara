import React, { useEffect, useMemo, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
  const [engineLoaded, setEngineLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { initParticlesEngine } = await import("@tsparticles/react");
      await initParticlesEngine(loadSlim);
      setEngineLoaded(true);
    };
    init();
  }, []);

  const options = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        color: { value: ["#7c3aed", "#14b8a6"] },
        links: {
          color: "#7c3aed",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: { enable: true, speed: 1.2, outModes: { default: "bounce" } },
        number: { value: 50 },
        opacity: { value: 0.4 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          resize: true,
        },
        modes: { repulse: { distance: 100, duration: 0.4 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (!engineLoaded) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 -z-10"
    />
  );
}
