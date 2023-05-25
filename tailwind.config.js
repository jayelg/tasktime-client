/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: 'jit',
  // purge: {
  //   options: { 
  //     safelist: ['bg-teal-500', 'hover:bg-teal-100','bg-amber-500', 'hover:bg-amber-100','bg-lime-500', 'hover:bg-lime-100','bg-orange-500', 'hover:bg-orange-100','bg-emerald-500', 'hover:bg-emerald-100','bg-indigo-500', 'hover:bg-indigo-100',], // 'amber','lime','orange','emerald','indigo'
  //   },
  // },
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        // structure: large inset edge blue, inset drop shadow, edge highlight, edge shadow
        'cutout': 'inset 0 0 70px 0 rgb(0 0 0 / 0.25),inset 6px 2px 10px 6px rgb(0 0 0 / 0.15),1px 1px 1px 0 rgb(255 255 255 / 0.75),-1px -1px 1px 0 rgb(0 0 0 / 0.75)',
        'tile':'6px 2px 10px 6px rgb(0 0 0 / 0.15),inset -1px -1px 1px 0 rgb(0 0 0 / 0.75),inset 1px 1px 1px 0 rgb(255 255 255 / 0.75)',
        'tileHover':'0 0 10px 6px rgb(255 255 255 / 0.20),inset -1px -1px 1px 0 rgb(0 0 0 / 0.75),inset 1px 1px 1px 0 rgb(255 255 255 / 0.75)',
        'addTileHover':'inset 0 0 20px 0 rgb(0 0 0 / 0.2),1px 1px 1px 0 rgb(255 255 255 / 0.75),-1px -1px 1px 0 rgb(0 0 0 / 0.75)',
      },
      transitionProperty: {
        'tile': 'height, opacity, color, background-color, border-color, text-decoration-color, fill, stroke',
        'bucket': 'width, opacity, color, background-color, border-color, text-decoration-color, fill, stroke',
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
  },
  plugins: [],
}}