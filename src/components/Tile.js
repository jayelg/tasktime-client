import React from 'react';

const Tile = (props) => {

    const handleUpdatedName = (e) => {
        if (e.key === 'Enter') {
            props.appCallBackFunctions.handleUpdatedName(props.task.id, 'name', e.target.value);
        }
    }

    return (
        <div className={`${props.task?.isVisible ? 'h-16 opacity-100' : 'h-0 opacity-0'} transition-tile duration-1000 overflow-hidden mb-1 bg-zinc-300 dark:bg-zinc-900 z-10 hover:z-0 flex justify-center items-center hover:shadow-tileHover rounded-lg w-auto shadow-tile`}>
            <input placeholder='New Task' onChange={(e) => handleUpdatedName(e)} className={`${props.task?.isVisible ? ' text-xl placeholder:text-zinc-600 outline-0 bg-transparent border-none inline text-center mx-auto justify-center h-5 px-4' : 'hidden'}`} />
        </div>
    )
}

export default Tile;