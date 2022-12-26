import { Credentials } from '../types'
import { AuthSlice, StateCreator } from '../types/store'
import { userExists } from './user_storage'

export const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  credentials: null,

  isLoggedIn: () => {
    return get().credentials !== null
  },
  login: (cred: Credentials) => {
    if (get().isLoggedIn()) return false
    if (!userExists(cred)) return false
    set(state => ({ ...state, credentials: cred }))
    return true
  },
  logout: () => {
    if (!get().isLoggedIn()) return false
    set(state => ({ ...state, credentials: null }))
    return true
  },
})
