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
    const { isLoggedIn, loadAll } = get()
    if (isLoggedIn()) return false
    if (!(await userExists(cred))) return false
    set(state => ({ ...state, credentials: cred }))
    return await loadAll()
  },
  logout: async (): Promise<boolean> => {
    const { resetAll } = get()
    if (!get().isLoggedIn()) return false
    set(state => ({ ...state, decks: null, credentials: null }))
    resetAll()
    return true
  },
  loadAll: async (): Promise<boolean> => {
    const { loadDecks, loadLogs, loadStats } = get()
    const successes = await Promise.all([loadDecks(), loadLogs(), loadStats()])
    return successes.every(b => b == true)
  },
  resetAll: (): void => {
    const { resetDecks, resetLogs, resetStats } = get()
    resetDecks()
    resetLogs()
    resetStats()
  },
})
