import React, { useState } from 'react';
import NavBar from './components/Navbar';
import BucketView from './components/BucketView';
import GetBucketColour from './components/GetBucketColour';

// Tasks < one to many > task streams
// taskStreams < one to many > tasks
// relationships are linked by both task and taskstream objects point to their parent.
// The rationale is that tasks can be broken down into further tasks and can also be broken down into concurrent streams of work

// const project = { // Like a task and parent to top level task streams
//   id: 0, 
//   name: `Project`,
//   creator: "user",
//   dateCreated: "",
//   dueDate: "",
//   Description: "",
// };

let taskStreamCounter = 1;
let taskCounter = 1

const templateTask = {
  id: taskCounter, 
  parentTaskStream: 0,
  name: ``,
  creator: "user",
  dateCreated: "",
  dueDate: "",
  Description: "",
  objects: [],
  isVisible: false,
};

const App = () => {

  const [tasks,setTasks] = useState([{...templateTask}]);

  const handleNewTask = (parentStream) => {
    const activatedTask = tasks[tasks.length - 1];
    activatedTask.isVisible = true;
    activatedTask.parentTaskStream = parentStream;
    const hiddenTask = { ...templateTask };
    taskCounter++;
    hiddenTask.id = taskCounter;
    setTasks([...tasks,hiddenTask]);
  }

  const updateTaskProperty = (id, property, value) => {
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        return { ...task, [property]: value };
      }
      return task;
    }))

  }

  const [taskStreams,setTaskStream] = useState([
    {
      id: 0,
      parentTask: 0,
      name: `Tasks`,
      isVisible: true,
      bgColour: GetBucketColour(),
    },
    {
      id: 1,
      parentTask: 0,
      name: `Add Stream`,
      isVisible: false,
      bgColour: 'bg-zinc-500',
    },
  ]);

  const initializeTaskStream = (parentTask) => { // logic is broken redo
    //
    const lastItem = taskStreams[taskStreams.length - 1];
    lastItem.id = taskStreamCounter;
    lastItem.parentTask = parentTask;
    lastItem.name = 'New Stream';
    lastItem.isVisible = true;
    lastItem.bgColour = GetBucketColour();
    taskStreamCounter++;
    const initialTasks = [templateTask, templateTask];
    initialTasks[0].id = taskCounter;
    initialTasks[0].parentTask = lastItem.id; 
    taskCounter++;
    initialTasks[1].id = taskCounter
    initialTasks[1].parentTask = lastItem.id; 
    setTaskStream([...taskStreams.slice(0,-1),lastItem,]); // need to add new add button item. maybe handle that another way to reduce confusion
    
    setTasks([...tasks,...initialTasks]);
  };

  const appCallBackFunctions = {handleNewTask, updateTaskProperty, initializeTaskStream}; // added functions to object to manage passing props 

  return (
    <div className='w-screen bg-zinc-300 dark:bg-zinc-900 h-auto'>
      <NavBar/>
      <BucketView taskStreams={taskStreams} tasks={tasks} appCallBackFunctions={appCallBackFunctions}></BucketView>
    </div>
  );
}

export default App;


