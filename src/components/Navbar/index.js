import React from 'react';
import ViewMenu from './ViewMenu';
import DarkModeToggle from './DarkModeToggle';

const NavBar = () => {
    return (
        <div className={`flex select-none w-full h-20 justify-between py-6 px-10 items-center `}>
            <header className='w-fit justify-start text-5xl text-zinc-800 dark:text-zinc-400'>tasktime</header>
            <div className='justify-end flex text-xl font-medium text-zinc-600 dark:text-zinc-400'>
                <ViewMenu/>
                <DarkModeToggle/>
            </div>
        </div>
    )
}

export default NavBar;