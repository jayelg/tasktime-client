import { lazy } from 'react'

export type PublicRoutes = typeof publicRoutes

interface iRoutes {
  title: string
  href: string
  component: React.LazyExoticComponent<() => JSX.Element>
  mainNav: boolean
}

export const publicRoutes: Array<iRoutes> = [
  {
    title: 'Home',
    href: '/',
    component: lazy(() => import('./home/index.page')),
    mainNav: false
  },
  {
    title: 'Features',
    href: '/features',
    component: lazy(() => import('./features/index.page')),
    mainNav: true
  },
  {
    title: 'Documentation',
    href: '/docs',
    component: lazy(() => import('./docs/index.page')),
    mainNav: true
  },
  {
    title: 'App',
    href: '/app',
    component: lazy(() => import('./app/index.page')),
    mainNav: false
  }
]

export const mainNavRoutes = publicRoutes.filter((route) => route.mainNav)
