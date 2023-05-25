import React from 'react';
import NavBar from './components/Navbar';
import BucketView from './components/BucketView';

const App = () => {
  return (
    <div className='flex flex-col h-screen min-w-auto dark:bg-zinc-900'>
      <NavBar/>
      <BucketView />
    </div>
  );
}

export default App;