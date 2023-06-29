/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'plus': ['Plus Jakarta Sans', 'sans-serif'],
        'icons': ['var(--icons-font)', 'sans-serif'],
      },
      colors:{
        'bg-mnui': '#6D6D6D',
        'nm-highlight': '#FFFFFF',
        'nm-dm-highlight': '#27272D',
        'nm-fill': '#F1F5F9',
        'nm-dm-fill': '#1B1B1D',
        'nm-shadow': '#D3D9E6',
        'nm-dm-shadow': '#0C0D0F',
        'nm-gray': '#ECEEF8',
        'nm-bg-black': '#000000',
        'nm-remark': '#E4E7EB',
        'nm-dm-remark': '#919EAD',
        'nm-selected': '#19BCF3',
        'nm-dm-icons': '#616973',
        'nm-formular-field': '#FAFCFE',
        'nm-dm-formular-field': '#121212',
        'nm-gradient-top': '#19D8F3',
        'nm-gradient-bot': '#197FF3',
        'nm-black': '#121212',
        'nm-blue-light': '#F1F9FF',
      },
      boxShadow:{
        'relief-12': '-6px -4px 12px #FFFFFF, 6px 4px 12px rgba(9, 20, 36, 0.15)',
        'dm-relief-12': '-6px -4px 12px #27272D, 6px 4px 12px #0C0D0F',
        'relief-16': '-6px -4px 16px #FFFFFF, 8px 6px 16px #D3D9E6',
        'dm-relief-16': '-6px -4px 16px #27272D, 8px 6px 16px #0C0D0F',
        'relief-32': '-12px -8px 32px #FFFFFF, 16px 12px 32px #D3D9E6',
        'dm-relief-32': '-12px -8px 32px #24262B, 16px 12px 32px #0C0D0F',
        'inset': '6px 4px 12px 0px rgba(9, 20, 36, 0.15) inset, -6px -4px 12px 0px #FFF inset'
      }
    },
  },
}
