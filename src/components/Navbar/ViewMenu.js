import React, { useState, useEffect } from 'react';

const views = [
  "Dashboard",
  "Stream",
  "Calender"
]

const ViewMenu = () => {

    const [isMobile, setIsMobile] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const renderViews = () => {
        if (isMobile) {
          return (
            <nav className='relative flex items-center '>
                <p
                    className={`cursor-pointer mx-2`}
                    onClick={toggleDropdown}
                >Views</p>
              {isDropdownOpen && (
                <div className='absolute right-0 top-8 mt-2 py-2 bg-zinc-400 rounded-md shadow-lg dark:bg-zinc-800 z-50'>
                  {views.map((view, index) => (
                    <button
                      key={index}
                      className='block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left'
                    >
                      {view}
                    </button>
                  ))}
                </div>
              )}
            </nav>
          );
        } else {
          return (
            <nav className='flex items-center'>
              {views.map((view, index) => (
                <p
                  key={index}
                  className='mx-2 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors duration-300 cursor-pointer'
                >
                  {view}
                </p>
              ))}
            </nav>
          );
        }
      };

    return renderViews();
    };

    export default ViewMenu;