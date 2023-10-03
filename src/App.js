import React from 'react';
import NavBar from './components/Navbar';
import StreamView from './components/StreamView';

const App = () => {
  return (
    <div className='flex flex-col h-screen dark:bg-zinc-800 text-zinc-900 dark:text-zinc-400 transition-colors duration-500 scrollbar-hide'>
      <NavBar/>
      <StreamView />
    </div>
  );
}

export default App;