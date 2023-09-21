export const ParticlesTwo = {
  fpsLimit: 60,
  background: {
    color: '#F8F9FD'
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
    color: { value: ['#92C4E9', '#26EC75', '#FFDC62', '#FF8762', '#FF3838'] },
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
    opacity: { value: 0.2 },
    shape: { type: 'circle' },
    size: { random: true, value: 70 },
  },
  detectRetina: true,
};