/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  // mode: 'jit',
  // purge: {
  //   options: { 
  //     safelist: ['bg-teal-500', 'hover:bg-teal-100','bg-amber-500', 'hover:bg-amber-100','bg-lime-500', 'hover:bg-lime-100','bg-orange-500', 'hover:bg-orange-100','bg-emerald-500', 'hover:bg-emerald-100','bg-indigo-500', 'hover:bg-indigo-100',], // 'amber','lime','orange','emerald','indigo'
  //   },
  // },
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        // structure: large inset edge blue, inset drop shadow, edge highlight, edge shadow
        'cutout': 'inset 0 0 70px 0 rgb(0 0 0 / 0.25),inset 6px 2px 10px 6px rgb(0 0 0 / 0.15),1px 1px 1px 0 rgb(255 255 255 / 0.75),-1px -1px 1px 0 rgb(0 0 0 / 0.75)',
        'cutoutDark': 'inset 0 0 70px 0 rgb(0 0 0 / 0.25),inset 6px 2px 10px 6px rgb(0 0 0 / 0.15)',
        'tile':'6px 2px 10px 6px rgb(0 0 0 / 0.15),inset -1px -1px 1px 0 rgb(0 0 0 / 0.75),inset 1px 1px 1px 0 rgb(255 255 255 / 0.75)',
        'tileDark':'6px 2px 10px 6px rgb(0 0 0 / 0.15)',
        'tileHover':'0 0 10px 6px rgb(255 255 255 / 0.20),inset -1px -1px 1px 0 rgb(0 0 0 / 0.75),inset 1px 1px 1px 0 rgb(255 255 255 / 0.75)',
        'addTileHover':'inset 0 0 20px 0 rgb(0 0 0 / 0.2),1px 1px 1px 0 rgb(255 255 255 / 0.75),-1px -1px 1px 0 rgb(0 0 0 / 0.75)',
      },
      transitionProperty: {
        'tile': 'min-height, height, opacity, background-color, box-shadow',
        'stream': 'min-height, height, width, opacity, color, background-color, border-color, text-decoration-color, fill, stroke, box-shadow',
      },
      transitionDuration: {
        '1500': '1500ms',
      },
      minHeight: {
        '16': '4rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      scrollbar: {
        width: '6px',
        trackColor: 'transparent',
        thumbColor: 'rgba(156, 163, 175, 0.5)',
        thumbBorderRadius: '3px',
      },
      linearGradientColors: {
        'fade-left': ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1) 100%'],
        'fade-right': ['rgba(255, 255, 255, 1) 0%', 'rgba(255, 255, 255, 0)'],
      },
      clipPath: {
        frame: 'polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)',
      },
  },
  variants: {
    extend: {
      scrollbar: ['rounded'],
      backgroundImage: ['before', 'after'],
    },
  },
},
plugins: [
  require('tailwind-scrollbar-hide'),
  require('tailwind-clip-path'),
  plugin(function ({ addUtilities }) {
    const gradientFadeLeft = {
      '.gradient-fade-left': {
        '--mask-gradient': 'linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
        '--mask-position': 'left',
      },
    };

    const gradientFadeRight = {
      '.gradient-fade-right': {
        '--mask-gradient': 'linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
        '--mask-position': 'right',
      },
    };

    addUtilities([gradientFadeLeft, gradientFadeRight], {
      variants: ['before', 'after'],
    });
  }),

  plugin(function ({ addBase }) {
    addBase({
      '.mask': {
        maskImage: 'var(--mask-gradient)',
        maskSize: 'var(--mask-size, 100% 100%)',
        maskRepeat: 'var(--mask-repeat, no-repeat)',
        maskPosition: 'var(--mask-position, left)',
      },
    });
  }),
],
};