import React from 'react';
import NavBar from './components/Navbar';
import BucketView from './components/BucketView';

const App = () => {
  return (
    <div className='w-screen bg-zinc-300 dark:bg-zinc-900 h-auto'>
      <NavBar/>
      <BucketView />
    </div>
  );
}

export default App;