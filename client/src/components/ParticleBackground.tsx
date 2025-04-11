import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import useThemeToggle from "../hooks/useThemeToggle";

interface ParticleBackgroundProps {
  id?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ id = "tsparticles" }) => {
  const { theme } = useThemeToggle();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    if (container) {
      console.log("Particles container loaded", container);
    }
  }, []);

  const getDarkModeColors = () => {
    return {
      background: {
        color: {
          value: "transparent",
        },
      },
      particles: {
        color: {
          value: "#6366f1", // Primary color
        },
        links: {
          color: "#8b5cf6", // Secondary color
          opacity: 0.3,
        },
      },
    };
  };

  const getLightModeColors = () => {
    return {
      background: {
        color: {
          value: "transparent",
        },
      },
      particles: {
        color: {
          value: "#4f46e5", // Darker primary color
        },
        links: {
          color: "#7c3aed", // Darker secondary color
          opacity: 0.2,
        },
      },
    };
  };

  if (!mounted) return null;

  return (
    <Particles
      id={id}
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        ...(theme === 'dark' ? getDarkModeColors() : getLightModeColors()),
        fpsLimit: 120,
        fullScreen: false,
        particles: {
          number: {
            value: 40,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: theme === 'dark' ? "#6366f1" : "#4f46e5",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false,
            },
          },
          links: {
            enable: true,
            distance: 150,
            color: theme === 'dark' ? "#8b5cf6" : "#7c3aed",
            opacity: theme === 'dark' ? 0.3 : 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      }}
      className="absolute inset-0 -z-10"
      canvasClassName="absolute inset-0"
    />
  );
};

export default ParticleBackground;