import * as React from 'react'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)!

  return (
    <div className="cursor-pointer" onClick={() => toggleTheme()}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}
