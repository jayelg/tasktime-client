// Generates a random tailwind bakground colour property to use in item styling

const colours = [`bg-teal-500`,'bg-amber-500','bg-lime-500','bg-orange-500','bg-emerald-500','bg-indigo-500'];

const GetColour = () => colours[Math.floor(Math.random() * colours.length)];

export default GetColour;