import React from "react";
import Particles from "react-tsparticles";

function Particle() {
  return (
    <Particles
      id="tsparticles"
      params={{
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#ffffff",
            },
          },
          color: {
            value: ["#ffffff"],
          },
          opacity: {
            value: 0.6,
            anim: {
              enable: false,
              speed: 0.5,
              opacity_min: 0.3,
            },
          },
          size: {
            value: 3,
            random: true,
          },
          line_linked: {
            enable: true,
            distance: 120,
            color: "#ffffff", // Change link color to white
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
          },
        },
        interactivity: {
          events: {
            onclick: {
              enable: false,
              mode: "push",
            },
            onhover: {
              enable: false,
              mode: "repulse",
            },
          },
          modes: {
            push: {
              particles_nb: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
}

export default Particle;
