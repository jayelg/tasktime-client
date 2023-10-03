import React, { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode preference is enabled by the user
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
  }, []);

  useEffect(() => {
    // Toggle dark mode on the root element
    const rootElement = window.document.documentElement;
    if (darkMode) {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div
      onClick={() => setDarkMode(!darkMode)}
      className={`px-4 py-2 cursor-pointer ${darkMode ? 'text-zinc-300' : 'text-zinc-800'}`}
    >
      {darkMode ? <FaToggleOn/> : <FaToggleOff/>}
    </div>
  );
}

export default DarkModeToggle;