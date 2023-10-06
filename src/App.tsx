import React, { useEffect, useState } from 'react'

import Section from './components/common/Section'
import { MainNav } from './components/header/MainNav'
import { SiteHeader } from './components/header/Header'
import AvatarDropDown from './components/header/AvatarDropDown'
import { LaunchButton } from 'components/header/LaunchButton'
import Page from 'pages/page'
import { useNavigate } from 'react-router-dom'

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(
    localStorage.getItem('jwt') !== null
  )

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

  return (
    <div className="min-h-screen bg-background font-sans antialiased transition-colors duration-500">
      {/* relative flex min-h-screen min-w-full flex-col */}
      <SiteHeader>
        <MainNav isAppPath={isAppPath} userLoggedIn={userLoggedIn} />
        {!isAppPath || !userLoggedIn ? (
          <LaunchButton userLoggedIn={userLoggedIn} />
        ) : null}
        {userLoggedIn ? (
          <AvatarDropDown
            setUserLoggedIn={setUserLoggedIn}
            firstName={'John'}
            lastName={'Grant'}
          />
        ) : null}
      </SiteHeader>
      <Section>
        <Page userLoggedIn={userLoggedIn} />
      </Section>
    </div>
  )
}

export default App
