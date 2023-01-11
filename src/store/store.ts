import create from 'zustand'
import { Store } from '../types/store'
import { createAuthSlice } from './auth'
import { createDeckSlice } from './deck'
import { createLogSlice } from './log'
import { devtools } from 'zustand/middleware'
import { createThemeSlice } from './theme'
import { createStatsSlice } from './stats'

export const useStore = create<Store>()(
  devtools((...args) => ({
    ...createAuthSlice(...args),
    ...createDeckSlice(...args),
    ...createLogSlice(...args),
    ...createThemeSlice(...args),
    ...createStatsSlice(...args),
  })),
)
