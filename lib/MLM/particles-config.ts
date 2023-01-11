export const ParticlesOne: any = {
  fpsLimit: 60,
  background:{
    color: '#111111'
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: { enable: false, mode: 'push' },
      onHover: { enable: true, mode: 'repulse' },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: { particles_nb: 4 },
      repulse: { distance: 100, duration: 0.4 },
    },
  },
  particles: {
    color: { value: '#3ab7bf' },
    links: { color: '#3ab7bf', distance: 150, enable: true, opacity: 0.5, width: 1 },
    move: {
      bounce: false,
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 2,
      straight: false,
    },
    number: { density: { enable: true, value_area: 800 }, value: 80 },
    opacity: { value: 0.1 },
    shape: { type: 'circle' },
    size: { random: true, value: 5 },
  },
  detectRetina: true,
};

export const ParticlesTwo: any = {
  fpsLimit: 60,
  background:{
    color: '#111111'
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      resize: { enable: true, mode: 'bubble' },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
    },
  },
  particles: {
    color: { value: '#3ab7bf' },
    move: {
      bounce: false,
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 1,
      straight: false,
    },
    number: { density: { enable: true, value_area: 1000 }, value: 50 },
    opacity: { value: 0.1 },
    shape: { type: 'circle' },
    size: { random: true, value: 70 },
  },
  detectRetina: true,
};

export const ParticlesThree: any = {
  background:{
    color: '#111111'
  },
  detectRetina: false,
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: {
        enable: true,
        mode: "bubble"
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 40,
        duration: 2,
        opacity: 8,
        size: 6,
        speed: 3
      }
    }
  },
  particles: {
    color: {
      value: '#3ab7bf',
      animation: {
        enable: true,
        speed: 20,
        sync: true
      }
    },
    lineLinked: {
      blink: false,
      color: "random",
      consent: false,
      distance: 30,
      enable: true,
      opacity: 0.3,
      width: 0.5
    },
    move: {
      attract: {
        enable: false,
        rotate: {
          x: 600,
          y: 1200
        }
      },
      bounce: false,
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: true,
      speed: 0.5,
      straight: false
    },
    number: {
      density: {
        enable: false,
        area: 2000
      },
      limit: 0,
      value: 200
    },
    opacity: {
      animation: {
        enable: true,
        minimumValue: 0.05,
        speed: 2,
        sync: false
      },
      random: false,
      value: 1
    },
    shape: {
      type: "circle"
    },
    size: {
      animation: {
        enable: false,
        minimumValue: 0.1,
        speed: 40,
        sync: false
      },
      random: true,
      value: 1
    }
  },
  polygon: {
    draw: {
      enable: true,
      lineColor: "rgba(255,255,255,0.2)",
      lineWidth: 0.3
    },
    move: {
      radius: 10
    },
    inlineArrangement: "equidistant",
    scale: 1.5,
    type: "inline",
    url: "https://particles.js.org/images/smalldeer.svg"
  }
}