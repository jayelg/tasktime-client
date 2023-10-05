import React from "react"
import Link from "next/link"

interface BreadcrumbProps {
  projectSlug: string
  itemSlugs?: (string | undefined)[]
}

const Breadcrumb = ({ projectSlug, itemSlugs }: BreadcrumbProps) => {
  const segments = Array.isArray(itemSlugs) ? itemSlugs : [itemSlugs]
  return (
    <div className="flex">
      <h1 className="text-md mx-2 font-bold leading-tight tracking-tighter hover:underline md:text-lg">
        {projectSlug}
      </h1>
      {segments?.map((segment, index) => (
        <React.Fragment key={index}>
          <Link
            href={{
              pathname: "/App/[projectSlug]/Tasks/[...itemSlugs]",
              query: { itemSlugs: segments.slice(0, index + 1) },
            }}
            as={`/App/${projectSlug}/Tasks/${segments
              .slice(0, index + 1)
              .join("/")}`}
            passHref
          >
            <h1 className="text-md mx-2 font-bold leading-tight tracking-tighter hover:underline md:text-lg">
              {segment}
            </h1>
          </Link>
          {index < segments.length - 1 && "/"}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Breadcrumb
