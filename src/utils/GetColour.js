// Generates a random tailwind bakground colour property to use in item styling
// below tailwind classes are listed to ensure they are included in webpack build
// bg-teal-500 bg-amber-500 bg-lime-500 bg-orange-500 bg-emerald-500 bg-indigo-500
// bg-teal-400 bg-amber-400 bg-lime-400 bg-orange-400 bg-emerald-400 bg-indigo-400
// focus:bg-teal-500 focus:bg-amber-500 focus:bg-lime-500 focus:bg-orange-500 focus:bg-emerald-500 focus:bg-indigo-500
// focus:bg-teal-400 focus:bg-amber-400 focus:bg-lime-400 focus:bg-orange-400 focus:bg-emerald-400 focus:bg-indigo-400
// dark:focus:text-teal-400 dark:focus:text-amber-400 dark:focus:text-lime-400 dark:focus:text-orange-400 dark:focus:text-emerald-400 dark:focus:text-indigo-400
// selection:bg-teal-500 selection:bg-amber-500 selection:bg-lime-500 selection:bg-orange-500 selection:bg-emerald-500 selection:bg-indigo-500  
// colour should be kept in redux state
// 
// Todo: create more util functions to provide different tailwind colour classes eg. bg-{colour}-500, text-{colour} etc.



// i will not persist right now, I'll update to take the previous colour and grab the next.

const inputColours = ['teal', 'amber', 'lime', 'orange', 'emerald', 'indigo'];

const GetColour = (previousColour) => {
  const currentIndex = inputColours.indexOf(previousColour);
  const nextIndex = currentIndex !== -1 && currentIndex < inputColours.length - 1 ? currentIndex + 1 : 0;
  return inputColours[nextIndex];
};

export default GetColour;