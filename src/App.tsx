import { useState } from 'react'
import './App.css'

import { Recard } from './components/Recard'

export const App = () => {
  return (
    <div className='App'>
      <h1>recard</h1>
      <Recard question='What is the meaning of life?' answer='$\int_a^b x dx = 42$' />
    </div>
  )
}
