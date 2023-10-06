export default interface iRoutes {
  title: string
  href: string
  component: React.LazyExoticComponent<() => JSX.Element>
  mainNav: boolean
}
