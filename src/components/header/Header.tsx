import { siteConfig } from '../../../config/site'

interface SiteHeader {
  children: React.ReactNode
}

export function SiteHeader(props: SiteHeader) {
  const { children } = props
  return (
    <header className="sticky top-0 z-40 w-screen bg-background">
      <div className="flex h-16 items-center space-x-4 px-8 sm:justify-between sm:space-x-0">
        {/* <Link href="/" className="flex items-center space-x-2"> */}
        <span className="inline-block text-3xl">{siteConfig.name}</span>
        {/* </Link> */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4">{children}</nav>
        </div>
      </div>
    </header>
  )
}
