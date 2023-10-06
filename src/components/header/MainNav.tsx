import * as React from 'react'
import { mainNavRoutes } from '../../pages/routes'
import { cn } from '../../lib/utils'
import { Link } from 'react-router-dom'
import { mainAppNavRoutes } from 'pages/app/appRoutes'

interface MainNavProps {
  isAppPath: boolean
  userLoggedIn: boolean
}

export function MainNav({ isAppPath, userLoggedIn }: MainNavProps) {
  const routes = isAppPath && userLoggedIn ? mainAppNavRoutes : mainNavRoutes

  return (
    <div className="mx-4 flex gap-6 md:gap-10">
      <nav className="flex gap-6">
        {routes.map((item, index) => (
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
