import * as React from 'react'
import { mainNavRoutes } from '../../pages/routes'
import { cn } from '../../lib/utils'
import { Link } from 'react-router-dom'

interface MainPublicNavProps {
  userLoggedIn: boolean
}

export function MainPublicNav({ userLoggedIn }: MainPublicNavProps) {
  return (
    <div className="mx-4 flex gap-6 md:gap-10">
      <nav className="flex gap-6">
        {mainNavRoutes.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={cn(
              'flex items-center text-sm font-medium text-muted-foreground cursor-pointer opacity-80 hover:text-accent-foreground transition-colors duration-300'
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
