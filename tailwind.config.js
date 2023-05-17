module.exports = {
  content: ['./layouts/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /rounded-(t|b|r|l||tr|tl|br|bl)-(none|sm||md|lg|xl|2xl|3xl|full)/,
    },
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        }
      },
      animation: {
        'spin-slow': 'spin 1.5s linear infinite',
        'spin-slower': 'spin 2.5s linear infinite',
        'fade-in-slow': 'fade-in 0.8s ease'
      },
      borderWidth: {
        '0.5': '0.5px'
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      inset: {
        '005': '0.05rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '31': '7.75rem',
        '33': '8.25rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '0.15': '15%',
        '0.125': '12.5%',
        '1/5': '20%',
        '1/6': '10%'
      },
      height: {
        '15': '3.75rem',
        '17': '4.25rem',
        '18': '4.5rem',
        '19': '4.75rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '42': '10.5rem'
      },
      width: {
        '18': '4.5rem',
        '30': '7.5rem',
        '70': '17.5rem',
        '75vw': '75vw'
      },
      scale: {
        '55': '.55',
        '60': '.6',
        '65': '.65',
        '70': '.7',
        '85': '.85',
        '115': '1.15',
        '120': '1.2'
      },
      rotate: {
        '44': '68.4deg',
        '12': '154.8deg',
        '24': '226.8deg'
      },
      padding: {
        '1/2': '50%'
      },
      transitionProperty: {
        'visibility': 'visibility',
        'textColor': 'textColor'
      },
      boxShadow: {
        round: '0 0px 30px -15px rgba(0, 0, 0, 0.25)',
        color: '0 0px 20px 0px rgba(250, 250, 250, 0.5)',
        colorbottom: '0 0px 40px 0px rgba(250, 250, 250, 0.1)',
        button: '0 0px 8px 0px rgba(250, 250, 250, 0.4)',
        dark: '0 0px 8px 0px rgba(0, 0, 0, 0.1)',
        white: "rgba(250, 250, 250, 0.25) 10px 10px 50px",
        subtleWhite: '0 1px 7px 0px rgba(250, 250, 250, 0.2)',
      },
      fontFamily: {
        'plus': ['Plus Jakarta Sans', 'sans-serif'],
        // 'plus': ['var(--font-plus)', 'sans-serif'],
        'icons': ['iconSet1'],
        title: ["Anton", "sans-serif"],
        anton: ["anton", "sans-serif"],
        sans: ["Alterwave", "sans-serif"],
        prompt: ["Prompt", "sans-serif"],
        lighters: ["Lighters", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        thin: ["Alterwave", "sans-serif"],
        fire: ["FiraSans", "sans-serif"]
      },
      fontSize: {
        's': '0.5rem',
      },
      colors: {
        grey: {
          content: '#54575C',
          sidebar: '#EDEDF5',
          icon: '#9B9B9B',
          dark: '#F3F6FF',
          bone: '#F9FAFB',
          panel: '#E9ECF6',
          lightest: '#F8F9FD',
        },
        'background': '#111111',
        'white': '#ffffff',
        'tahiti': '#3ab7bf',
      },
    },
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1800px'
    }
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
      backgroundImage: ['hover'],
      grayscale: ['hover'],
      zIndex: ['hover'],
      opactiy: ['last', 'disabled'],
      backgroundColor: ['checked']
    },
  },
  plugins: [],
}
