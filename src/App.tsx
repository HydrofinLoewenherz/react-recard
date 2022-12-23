import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Deck, Home, Learn, Login, Error } from './routes'
import { useStore } from './store/store'
import { decrypt, encrypt, Session, userKey } from './store/store_'

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
])

export const App = () => {
  const loadCredentials = useStore(store => store.loadCredentials)
  useEffect(loadCredentials, [])
  useEffect(() => {
    type Deck = { name: string; cards: string[] }
    type UserData = { decks: Deck[] }

    const credentials = { username: 'user', password: 'po' }
    const decksKey = userKey('decks', credentials)
    const decks: Deck[] = [
      { name: 'deck_1', cards: ['hello', 'world'] },
      { name: 'deck_2', cards: ['more', 'cards', 'eyo'] },
    ]

    Session.save(decksKey, { decks }, credentials)

    // {"decks":[{"name":"deck_1","cards":["hello","world"]},{"name":"deck_2","cards":["more","cards","eyo"]}]}
    console.log(JSON.stringify(Session.load<UserData>(decksKey, credentials)))
  }, [])

  return <RouterProvider router={router} />
}
