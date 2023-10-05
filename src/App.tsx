import React, { Suspense, useEffect, useState } from 'react'

import Section from './components/common/Section'
import { MainPublicNav } from './components/header/MainPublicNav'
import { SiteHeader } from './components/header/Header'
import { useLocation, Routes, Route, useNavigate } from 'react-router-dom'
import AvatarDropDown from './components/header/AvatarDropDown'
import { publicRoutes } from './pages/routes'
import Loading from 'components/common/Loading'
import { useTransition, animated } from '@react-spring/web'
import { LaunchButton } from 'components/header/LaunchButton'

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(
    localStorage.getItem('jwt') !== null
  )
  const location = useLocation()
  const navigate = useNavigate()
  const isAppPath = /^\/app(\/|$)/.test(location.pathname.toLowerCase()) // ie. does the path start with app or app/*

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (token) {
      fetch(`http://localhost:3011/auth/login/callback/?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setUserLoggedIn(true)
            localStorage.setItem('jwt', data.access_token)
            navigate('/app')
          } else {
            navigate('/')
            // add toast or dialog with server error
            console.log('error')
          }
        })
        .catch((error) => {
          throw error
        })
    }
  }, [])

  const pageTransitions = useTransition(location, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    keys: (location) => location.pathname
  })

  return (
    <div className="min-h-screen bg-background font-sans antialiased transition-colors duration-500">
      {/* relative flex min-h-screen min-w-full flex-col */}
      <SiteHeader>
        {isAppPath ? (
          <MainPublicNav userLoggedIn={false} />
        ) : (
          <MainPublicNav userLoggedIn={userLoggedIn} />
        )}
        <LaunchButton userLoggedIn={userLoggedIn} />
        {userLoggedIn ? (
          <AvatarDropDown
            setUserLoggedIn={setUserLoggedIn}
            firstName={'John'}
            lastName={'Grant'}
          />
        ) : null}
      </SiteHeader>
      <Section>
        {pageTransitions((style) => (
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
              </Routes>
            </Suspense>
          </animated.div>
        ))}
      </Section>
    </div>
  )
}

export default App
