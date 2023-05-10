import React, { useState } from 'react';
import NavBar from './components/Navbar';
import BucketList from './components/BucketList';

const App = () => {
  const [tasks,setTasks] = useState([]);

  const handleNewTask = (task) => {
    setTasks([...tasks,task]);
  }

  const [buckets,setBuckets] = useState([]);

  const handleNewBucket = (newBucket) => {
      setBuckets([...buckets,newBucket]);
  }

  return (
    <div className='w-screen bg-zinc-300 h-screen'>
      <NavBar/>
      <BucketList buckets={buckets} tasks={tasks} handleNewTask={handleNewTask} handleNewBucket={handleNewBucket}></BucketList>
    </div>
  );
}

export default App;
