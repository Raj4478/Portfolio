import { useCallback, useEffect, useState } from "react";

// Lazy-load particles only after page is fully painted
export default function ParticleBackground() {
  const [Comp, setComp] = useState(null);
  const [failed, setFailed] = useState(false);
  const [count, setCount] = useState(50);

  useEffect(() => {
    if (window.innerWidth < 768) setCount(20);
    else if (window.innerWidth < 1024) setCount(35);

    // Dynamically import so it never blocks the initial render
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const [{ default: Particles }, { loadSlim }] = await Promise.all([
          import("@tsparticles/react"),
          import("@tsparticles/slim"),
        ]);
        if (!cancelled) setComp({ Particles, loadSlim });
      } catch (e) {
        if (!cancelled) setFailed(true);
      }
    }, 800); // slight delay so hero renders first

    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  const init = useCallback(async (engine) => {
    if (Comp) await Comp.loadSlim(engine);
  }, [Comp]);

  if (failed || !Comp) return null;

  const { Particles } = Comp;
  const isMobile = window.innerWidth < 768;

  return (
    <Particles
      id="tsparticles"
      init={init}
      className="absolute inset-0 z-0"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: isMobile ? 30 : 60,
        interactivity: {
          events: {
            onHover: { enable: !isMobile, mode: "repulse" },
            onClick: { enable: !isMobile, mode: "push" },
          },
          modes: {
            repulse: { distance: 90, duration: 0.4 },
            push: { quantity: 1 },
          },
        },
        particles: {
          color: { value: ["#4f8ef7", "#a78bfa", "#34d399"] },
          links: {
            color: "#4f8ef730",
            distance: 120,
            enable: !isMobile,
            opacity: 0.18,
            width: 1,
          },
          move: {
            enable: true,
            speed: isMobile ? 0.3 : 0.5,
            outModes: { default: "bounce" },
            random: true,
            straight: false,
          },
          number: { density: { enable: true }, value: count },
          opacity: { value: { min: 0.1, max: 0.35 } },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 2 } },
        },
        detectRetina: true,
      }}
    />
  );
}
