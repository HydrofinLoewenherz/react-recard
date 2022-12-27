import { Credentials } from '../types'
import { AuthSlice, StateCreator } from '../types/store'
import { userExists } from './user_storage'

export const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  credentials: null,

  isLoggedIn: (): boolean => {
    const { credentials } = get()
    return credentials !== null
  },
  login: async (cred: Credentials): Promise<boolean> => {
    const { isLoggedIn, loadDecks } = get()
    if (isLoggedIn()) return false
    if (!(await userExists(cred))) return false
    set(state => ({ ...state, credentials: cred }))
    return await loadDecks()
  },
  logout: async (): Promise<boolean> => {
    if (!get().isLoggedIn()) return false
    set(state => ({ ...state, decks: null, credentials: null }))
    return true
  },
})
