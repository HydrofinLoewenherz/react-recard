import { ThemeSlice, StateCreator } from '../types/store'

export const createThemeSlice: StateCreator<ThemeSlice> = (set, get) => ({
  themeMode: 'auto',
  toggleThemeMode: () => {
    const { themeMode } = get()
    let nextMode = themeMode
    switch (themeMode) {
      case 'light':
        nextMode = 'dark'
        break
      case 'dark':
        nextMode = 'auto'
        break
      case 'auto':
        nextMode = 'light'
        break
    }
    set(state => ({ ...state, themeMode: nextMode }))
  },
  setThemeMode: themeMode => {
    set(state => ({ ...state, themeMode }))
  },
})
