import React, { useState, useEffect } from 'react';

const Tile = (props) => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
          setIsVisible(true);
        }, props.isNew ? 0 : props.index * 150); // creates a cascading animation for the order of each item, new items skip the delay
      }, [props.index]);

    const handleUpdatedName = (e) => {
        if (e.key === 'Enter') {
            props.appCallBackFunctions.handleUpdatedName(props.thisItem._id, 'name', e.target.value);
        }
    }

    return (
        <div className={`${isVisible ? 'h-16 opacity-100' : 'h-0 opacity-0'} transition-tile duration-500 overflow-hidden mb-1 bg-zinc-300 dark:bg-zinc-900 z-10 hover:z-0 flex justify-center items-center hover:shadow-tileHover rounded-lg w-auto shadow-tile`}>
            <input placeholder={props.thisItem.name} onChange={(e) => handleUpdatedName(e)} className={`text-xl placeholder:text-zinc-600 outline-0 bg-transparent border-none inline text-center mx-auto justify-center h-5 px-4`} />
        </div>
    )
}

export default Tile;