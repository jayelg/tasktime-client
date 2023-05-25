// Generates a random tailwind bakground colour property to use in item styling
// bg-teal-500 bg-amber-500 bg-lime-500 bg-orange-500 bg-emerald-500 bg-indigo-500
// bg-teal-300 bg-amber-300 bg-lime-300 bg-orange-300 bg-emerald-300 bg-indigo-300
// selection:bg-teal-500 selection:bg-amber-500 selection:bg-lime-500 selection:bg-orange-500 selection:bg-emerald-500 selection:bg-indigo-500
// selection:bg-teal-300 selection:bg-amber-300 selection:bg-lime-300 selection:bg-orange-300 selection:bg-emerald-300 selection:bg-indigo-300
// colour should be kept in redux statee
// maybe create an object containing all variants?



const inputColours = [`teal`,'amber','lime','orange','emerald','indigo'];
let i = 0;
const colours = () => {
    for (const colour in inputColours) {

    }
}

// random colour
// const GetColour = () => colours[Math.floor(Math.random() * colours.length)];



const GetColour = () => {
    console.log("i = " + i);
    const colour = inputColours[i];
    i < inputColours.length ? i++ : i=0;
    console.log(i);
    console.log(colour);
    return colour;
}

export default GetColour;