import iRoutes from 'pages/routes.interface'
import { lazy } from 'react'

export type PublicAppRoutes = typeof appRoutes

export const appRoutes: Array<iRoutes> = [
  {
    title: 'App',
    href: '/app',
    component: lazy(() => import('./')),
    mainNav: false
  },
  {
    title: 'Projects',
    href: '/app/projects',
    component: lazy(() => import('./projects')),
    mainNav: true
  },
  {
    title: 'Dashboard',
    href: '/app/dashboard',
    component: lazy(() => import('./dashboard')),
    mainNav: true
  },
  {
    title: 'Planner',
    href: '/app/planner',
    component: lazy(() => import('./planner')),
    mainNav: true
  }
]

export const mainAppNavRoutes = appRoutes.filter((route) => route.mainNav)
