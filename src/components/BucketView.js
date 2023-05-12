import React from 'react';
import TaskStream from './TaskStream';

const BucketView = (props) => {

    const handleNewTaskStreamName = (e) => {
        if (e.key === 'Enter') {
            props.appCallBackFunctions.initializeTaskStream(props.task.id, 'name', e.target.value);
        }
    }

    return (
        <div className='
            grid  p-6 
            xs:grid-cols-1 xs:max-w-screen-xs sm:justify-center
            sm:grid-cols-1 sm:max-w-screen-sm
            md:grid-cols-2 md:max-w-screen-md
            lg:grid-cols-3 lg:max-w-screen-lg
            xl:grid-cols-4 xl:max-w-screen-xl xl:justify-items-center	
            2xl:grid-cols-5 2xl:max-w-screen-2xl 2xl:justify-items-center
            h-auto overflow-hidden'>
            {props.taskStreams.map((taskStream) => (
                <div className={`justify-center h-fit overflow-hidden max-w-xs`}>
                    {/* Header area */}
                    <div className={`flex justify-center h-8 px-4 py-1`}>
                            <input placeholder={`${taskStream?.name}`} className={`font-extrabold text-xl placeholder:text-zinc-800 outline-0 bg-transparent border-none inline text-center p-0 m-0 w-fit h-fit text-zinc-800`}/>
                    </div>
                    <div  className={`justify-center rounded-xl h-fit shadow-cutout m-4 overflow-hidden max-w-xs ${taskStream?.bgColour} transition-bucket transition-colors duration-300`}>
                        <TaskStream key={taskStream?.id} id={taskStream?.id} name={taskStream?.name} tasks={props.tasks} parentTask={taskStream?.parentTask} isVisible={taskStream?.isVisible} appCallBackFunctions={props.appCallBackFunctions}/>
                    </div>
                </div>
            )
            )}
        </div>
    )
}

export default BucketView;