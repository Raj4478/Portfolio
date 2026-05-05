import { useCallback, useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
  const [particleCount, setParticleCount] = useState(70);

  useEffect(() => {
    // Reduce particles on mobile for performance
    if (window.innerWidth < 768) setParticleCount(25);
    else if (window.innerWidth < 1024) setParticleCount(45);
  }, []);

  const init = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={init}
      className="absolute inset-0 z-0"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: window.innerWidth > 768, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { quantity: 1 },
          },
        },
        particles: {
          color: { value: ["#4f8ef7", "#a78bfa", "#34d399"] },
          links: {
            color: "#4f8ef730",
            distance: 130,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: true,
            speed: 0.5,
            straight: false,
          },
          number: { density: { enable: true }, value: particleCount },
          opacity: { value: { min: 0.1, max: 0.4 } },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 2 } },
        },
        detectRetina: true,
      }}
    />
  );
}
