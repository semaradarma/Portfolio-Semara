import React, { useEffect, useMemo, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
  const [engineLoaded, setEngineLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        const { initParticlesEngine } = await import("@tsparticles/react");
        await initParticlesEngine(loadSlim);
        if (isMounted) setEngineLoaded(true);
      } catch (e) {
        console.warn("Particles init notice:", e);
      }
    };
    init();
    return () => { isMounted = false; };
  }, []);

  const options = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 30,
      particles: {
        color: { value: ["#7c3aed", "#6366f1"] },
        links: {
          color: "#7c3aed",
          distance: 110,
          enable: true,
          opacity: 0.25,
          width: 1,
        },
        move: { enable: true, speed: 0.8, outModes: { default: "bounce" } },
        number: { value: 22 },
        opacity: { value: 0.35 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2.5 } },
      },
      interactivity: {
        events: {
          onHover: { enable: false },
          resize: true,
        },
      },
      detectRetina: false,
    }),
    []
  );

  if (!engineLoaded) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 -z-10 pointer-events-none"
    />
  );
}
