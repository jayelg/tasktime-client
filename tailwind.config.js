/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        // structure: large inset edge blue, inset drop shadow, edge highlight, edge shadow
        'cutout': 'inset 0 0 70px 0 rgb(0 0 0 / 0.25),inset 6px 2px 10px 6px rgb(0 0 0 / 0.15),1px 1px 1px 0 rgb(255 255 255 / 0.75),-1px -1px 1px 0 rgb(0 0 0 / 0.75)',
        'tile': '6px 2px 10px 6px rgb(0 0 0 / 0.15),inset -1px -1px 1px 0 rgb(0 0 0 / 0.75),inset 1px 1px 1px 0 rgb(255 255 255 / 0.75)',
      },
    },
  },
  plugins: [],
}

