import create, { StateCreator as StateCreator_ } from 'zustand'
import { Store } from '../types/store'
import { createAuthSlice } from './auth'
import { createDeckSlice } from './deck'
import { devtools } from 'zustand/middleware'

export const useStore = create<Store>()(
  devtools((...args) => ({
    ...createAuthSlice(...args),
    ...createDeckSlice(...args),
  })),
)
