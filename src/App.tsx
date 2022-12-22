import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Deck } from './routes/Deck'
import { Error } from './routes/Error'
import { Home } from './routes/Home'
import { Login } from './routes/Login'

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
])

export const App = () => {
  return <RouterProvider router={router} />
}
