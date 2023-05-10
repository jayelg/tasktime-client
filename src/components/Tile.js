import React from 'react';

const Tile = ({task={name:"No task"}}) => {
    return (
        <div className={`flex justify-center items-center bg-zinc-300 rounded-xl w-auto h-20 m-1 shadow-tile`}>
            <input placeholder='New Task' className={` placeholder:text-zinc-600 outline-0 bg-transparent border-none inline text-center mx-auto justify-center h-6 px-4`} />
        </div>
    )
}

export default Tile;