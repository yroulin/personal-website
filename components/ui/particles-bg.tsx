"use client";

import { useEffect, useCallback } from "react";

type ParticlesWindow = Window &
  typeof globalThis & {
    particlesJS?: (id: string, config: unknown) => void;
    pJSDom?: Array<{ pJS: { fn: { vendors: { destroypJS: () => void } } } }>;
  };

export default function ParticlesComponent({ paused = false }: { paused?: boolean }) {
  const destroyParticles = useCallback(() => {
    const oldCanvas = document.querySelector("#particles-js canvas");
    if (oldCanvas) oldCanvas.remove();

    const particlesWindow = window as ParticlesWindow;
    if (particlesWindow.pJSDom?.length) {
      particlesWindow.pJSDom.forEach((particle) => {
        particle.pJS.fn.vendors.destroypJS();
      });
      particlesWindow.pJSDom = [];
    }
  }, []);

  const initParticles = useCallback(() => {
    destroyParticles();

    const particlesWindow = window as ParticlesWindow;
    if (!particlesWindow.particlesJS) return;

    particlesWindow.particlesJS("particles-js", {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
        opacity: {
          value: 0.25,
          random: true,
          anim: { enable: true, speed: 0.5, opacity_min: 0.08 },
        },
        size: {
          value: 2,
          random: true,
          anim: { enable: false },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.15,
          width: 0.8,
        },
        move: { enable: true, speed: 0.8, random: true, out_mode: "bounce" },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 180, line_linked: { opacity: 0.2 } },
          push: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });
  }, [destroyParticles]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (paused) {
      destroyParticles();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => initParticles();

    return () => {
      destroyParticles();
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, [destroyParticles, initParticles, paused]);

  return (
    <div
      id="particles-js"
      className="fixed inset-0 -z-10 bg-black"
    />
  );
}
