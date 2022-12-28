import React, {FC, useEffect} from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Deck, Home, Learn, Login, Error, Root, deckLoader, learnLoader} from './routes'
import { useStore } from './store/store'
import { recallLogin } from './store/user_storage'

// shows the component children if logged in, otherwise the login page
// see https://stackoverflow.com/a/68777827/10619052
const RequireLogin: FC<{ children: React.ReactElement }> = ({ children }) => {
  const isLoggedIn = useStore().isLoggedIn()
  if (!isLoggedIn) {
    return <Login />
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    action: async (ctx) => { console.log(`action`, ctx) },
    children: [
      {
        path: '/',
        element: <RequireLogin><Home /></RequireLogin>,
      },
      {
        path: '/deck/:deckName',
        element: <RequireLogin><Deck /></RequireLogin>,
        loader: deckLoader,
      },
      {
        path: '/learn/:deckName',
        element: <RequireLogin><Learn /></RequireLogin>,
        loader: learnLoader,
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
      tryLogin().then((success) => {
        if (success) {
          console.log(`auto-login success, logged in as ${store.credentials?.username}`)
        }
      })
    }
  }, [])

  return <RouterProvider router={router} />
}
