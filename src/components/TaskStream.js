import React from 'react';
import Tile from './Tile';
import { IconContext } from "react-icons";
import { HiPlusSm } from "react-icons/hi";

const TaskStream = (props) => {
    
    const handleClickNewTask = () => {
        props.appCallBackFunctions.handleNewTask(props.id);
    }

    const handleClickNewTaskStream = () => {
        props.appCallBackFunctions.initializeTaskStream(props.parentTask);
    }


    const handleOnClick = () => {
        props.isVisible ? handleClickNewTask() : handleClickNewTaskStream();
    }

    return (
        <div className={`justify-center h-fit overflow-hidden max-w-xs m-1`}>

                {props.tasks && props.tasks.map((task) => {
                        return task.parentTaskStream === props.id ? <Tile key={task.id} task={task} appCallBackFunctions={props.appCallBackFunctions}/> : null;
                    }
                )
                }

                <div onClick={handleOnClick} className={`flex justify-center h-fit text-white cursor-pointer`}>
                    <IconContext.Provider value={{ color: "black", size:"2em"}}>
                        <HiPlusSm/>
                    </IconContext.Provider>
                </div>
        </div>
    )
}

export default TaskStream;