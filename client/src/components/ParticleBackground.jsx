import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      style={{
        position: "fixed",       // fixed so it stays even when scrolling
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        // zIndex: -9999,           // way behind everything else
        pointerEvents: "none",   // let clicks pass through
      }}
      options={{
        fpsLimit: 180,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: {
            repulse: { distance: 100 },
            attract: { distance: 100, duration: 0.4, factor: 5 },
          },
        },
        particles: {
          number: { value: 100, density: { enable: true, area: 800 } },
          color: { value: "#3b75f2ff" },
          links: {
            enable: true,
            color: "#59D2FE",
            distance: 150,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.75,
            outModes: { default: "bounce" },
            angle: { offset: 90, value: 360 },
          },
          opacity: { value: 0.75 },
          shape: { type: "circle" },
          size: { value: { min: 0.25, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  );
}
