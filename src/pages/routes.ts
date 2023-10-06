import { lazy } from 'react'
import iRoutes from './routes.interface'

export type PublicRoutes = typeof publicRoutes

export const publicRoutes: Array<iRoutes> = [
  {
    title: 'Home',
    href: '/',
    component: lazy(() => import('./home')),
    mainNav: false
  },
  {
    title: 'Features',
    href: '/features',
    component: lazy(() => import('./features')),
    mainNav: true
  },
  {
    title: 'Documentation',
    href: '/docs',
    component: lazy(() => import('./docs')),
    mainNav: true
  }
]

export const mainNavRoutes = publicRoutes.filter((route) => route.mainNav)
