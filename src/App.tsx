import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Deck, Home, Learn, Login, Error, Root, deckLoader } from './routes'
import { useStore } from './store/store'
import { recallLogin } from './store/user_storage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/deck/:deckName',
        element: <Deck />,
        loader: deckLoader,
      },
      {
        path: '/learn',
        element: <Learn />,
      },
    ],
  },
])

export const App = () => {
  const login = useStore(store => store.login)
  const isLoggedIn = useStore(store => store.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn()) return
    const creds = recallLogin()
    if (creds === null) return
    if (!login(creds)) console.error('invalid login')
  }, [])

  return <RouterProvider router={router} />
}
