import { useState } from 'react'
import './App.css'

import { Recard } from './components/Recard'

export const App = () => {
  return (
    <div className='App'>
      <h1>recard</h1>
      <Recard question='Hello' answer='World' />
    </div>
  )
}
