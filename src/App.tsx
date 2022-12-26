import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Deck, Home, Learn, Login, Error, DeckList } from './routes'
import { useStore } from './store/store'
import { decrypt, encrypt, Session, userKey } from './store/storage'
import { recallLogin } from './store/user_storage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/deck',
    element: <Deck />,
  },
  {
    path: '/learn',
    element: <Learn />,
  },
  {
    path: '/decks',
    element: <DeckList />,
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
