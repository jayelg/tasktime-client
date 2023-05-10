import React from 'react';
import Tile from './Tile';
import { IconContext } from "react-icons";
import { HiPlusSm } from "react-icons/hi";

let taskCounter = 0;

const Bucket = (props) => {
    
    const handleClickNewTask = () => {
        taskCounter += 1;
        props.handleNewTask({
            id: taskCounter, 
            bucket: props.id,
            name: `New Task ${taskCounter}`,
            creator: "user",
            dateCreated: "",
            dueDate: "",
            Description: "",
          });
    }

    return (
            <div className={`justify-center rounded-2xl h-fit shadow-cutout m-4 overflow-hidden ${props.bgColour}`}>
                <div className={`flex justify-center h-8 px-4 py-1`}>
                    <input placeholder={props.name} className={`placeholder:text-zinc-300 outline-0 bg-transparent border-none inline text-center p-0 m-0 w-fit h-fit text-white`}/>
                </div>
                {props.tasks && props.tasks.map((task) => {
                        return task.bucket === props.id ? <Tile key={task.id} task={task} /> : null;
                    }
                )
                }
                <IconContext.Provider value={{ color: "white", className: "global-class-name" }}>
                <div onClick={handleClickNewTask} className={`flex justify-center h-6 text-white cursor-pointer`}>
                    <HiPlusSm />
                </div>
                </IconContext.Provider>
            </div>
    )
}

export default Bucket;