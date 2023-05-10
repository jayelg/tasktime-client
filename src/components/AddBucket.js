import React from 'react';
import { IconContext } from "react-icons";
import { HiPlusSm } from "react-icons/hi";

let bucketCounter = 0;

const colours = [`bg-teal-500`,'bg-amber-500','bg-lime-500','bg-orange-600','bg-emerald-600','bg-indigo-600'];
let colourCounter = -1;
const getBgColour = () => {
    colourCounter < colours.length-1 ? colourCounter++ : colourCounter = 0;
    return colours[colourCounter];
}

const AddBucket = (props) => {

    const handleClickNewBucket = () => {
        bucketCounter += 1;
        console.log('clicked')
        props.handleNewBucket({
            id: bucketCounter,
            name: `Bucket ${bucketCounter}`,
            colour: getBgColour(),
          });
    }

    return (
            <div className={`  bg-amber-500  bg-emerald-600 justify-center rounded-2xl h-fit shadow-cutout m-4 overflow-hidden bg-zinc-600`}>
                <IconContext.Provider value={{ color: "white", className: "global-class-name" }}>
                <div onClick={handleClickNewBucket} className={`flex justify-center h-12 text-white cursor-pointer`}>
                    <HiPlusSm className={`h-auto min-h-full`} />
                </div>
                </IconContext.Provider>
            </div>
    )
}

export default AddBucket;