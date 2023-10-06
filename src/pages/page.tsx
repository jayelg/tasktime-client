import { animated, useTransition } from '@react-spring/web'
import Loading from 'components/common/Loading'
import { Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { appRoutes } from './app/appRoutes'
import NotFound from './notFound'
import { publicRoutes } from './routes'

interface PageProps {
  userLoggedIn: boolean
}

const Page = ({ userLoggedIn }: PageProps) => {
  const location = useLocation()

  const pageTransitions = useTransition(location, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    keys: (location) => location.pathname
  })

  return (
    <>
      {pageTransitions((style, item) => (
        <animated.div
          style={style}
          className="absolute left-8 top-[80px] h-full w-full"
        >
          <Suspense fallback={<Loading />}>
            <Routes>
              {publicRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.href}
                  element={<route.component />}
                />
              ))}

              {userLoggedIn &&
                appRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.href}
                    element={<route.component />}
                  />
                ))}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </animated.div>
      ))}
    </>
  )
}

export default Page
