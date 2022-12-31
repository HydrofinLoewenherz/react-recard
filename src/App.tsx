import React, { FC, useEffect, useMemo, useState } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Edit, Home, Learn, Login, Error, Root, deckLoader, learnLoader, Log } from './routes'
import { useStore } from './store/store'
import { recallLogin } from './store/user_storage'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// shows the component children if logged in, otherwise the login page
// see https://stackoverflow.com/a/68777827/10619052
const RequireLogin: FC<{ children: React.ReactElement }> = ({ children }) => {
  const isLoggedIn = useStore().isLoggedIn()
  if (!isLoggedIn) {
    return <Login />
  }
  return children
}

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: (
          <RequireLogin>
            <Home />
          </RequireLogin>
        ),
      },
      {
        path: '/edit/:deckId',
        element: (
          <RequireLogin>
            <Edit />
          </RequireLogin>
        ),
        loader: deckLoader,
      },
      {
        path: '/learn/:deckId',
        element: (
          <RequireLogin>
            <Learn />
          </RequireLogin>
        ),
        loader: learnLoader,
      },
      {
        path: '/logs',
        element: (
          <RequireLogin>
            <Log />
          </RequireLogin>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
])

export const App = () => {
  console.log(`app start`)
  const login = useStore(store => store.login)
  const isLoggedIn = useStore(store => store.isLoggedIn)
  const store = useStore()

  // try to auto log in user on page open
  useEffect(() => {
    const tryLogin = async () => {
      const credentials = recallLogin()
      if (!credentials) return false
      return await login(credentials)
    }

    if (!isLoggedIn()) {
      tryLogin().then(success => {
        if (success) {
          console.log(`auto-login success, logged in as ${store.credentials?.username}`)
        }
      })
    }
  }, [])

  // handle responsive page theme
  const themeMode = useStore().themeMode
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')
  // create theme based on set theme mode and system preferred scheme
  const theme = useMemo(() => {
    const mode = themeMode === 'auto' ? systemTheme : themeMode
    return createTheme({ palette: { mode: mode } })
  }, [themeMode, systemTheme])
  // auto detect preferred color scheme
  useEffect(() => {
    if (!window.matchMedia) {
      return
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setSystemTheme('dark')
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
