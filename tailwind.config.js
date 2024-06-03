/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        inputColor: '#B0B0B0',
        blue: '#252460',
        customBlue: '#0000ff',
        blueTransparent: 'rgba(209, 238, 241, 0.20)',
        darkTransparent: '#01020F',
        darkCard: '#171820',
        cyan: '#a40001',
        cyan600: '#a40001',
        yellow: '#FFB800',
        transparentDark: 'rgba(217, 217, 217, 0.4)',
        back100: '#AEAEAE',
        back500: '#56423D',
        orange300: '#FFCECE',
        red800: '#F00',
        green800: '#18AB00',
        green200: '#D6FFCF',
        Purple: '#FF00FF',
        Turquoise: '#40E0D0',
        sky200: 'rgba(12, 137, 147, 0.10)'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        IBMPlexMono: ['IBM Plex Mono', 'sans-serif'],
        Roboto: ['Roboto'],
        Inter: ['Inter'],
      },
      textShadow: {
        'md': '0px 3px 2px rgba(0, 0, 0, 0.00);',
      },
      boxShadow: {
        'md': '4px 4px 20px 0px #252460',
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },

}
