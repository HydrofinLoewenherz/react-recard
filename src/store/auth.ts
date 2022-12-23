import create from 'zustand';
import SHA256 from "crypto-js/sha256"
import {read} from "fs";

export interface Credentials {
  username: string,
  password: string,
}

const save = (credentials: Credentials | null) => {
  if (!credentials) {
    sessionStorage.removeItem(`recard_auth_credentials`)
    return
  }
  sessionStorage.setItem(`recard_auth_credentials`, JSON.stringify(credentials))
}

const load = (): Credentials | null => {
  const storage = sessionStorage.getItem(`recard_auth_credentials`)
  return storage ? JSON.parse(storage) : null
}

interface AuthStoreState {
  username: string | null,
  password: string | null,
  hasCredentials: () => boolean
  loadCredentials: () => void
  setCredentials: (credentials: Credentials, keepCredentials: boolean) => void
  unsetCredentials: () => void
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  username: null,
  password: null,

  hasCredentials: () => {
    return get().username !== null && get().password !== null
  },

  loadCredentials: () => {
    const credentials = load()
    if (!credentials) return
    set((state) => ({
      ...state,
      ...credentials,
    }))
  },

  setCredentials: (credentials: Credentials, keepCredentials: boolean = true) => {
    if (keepCredentials) save(credentials)
    set((state) => ({
      ...state,
      ...credentials,
    }))
  },

  unsetCredentials: () => {
    save(null)
    set((state) => ({
      ...state,
      username: null,
      password: null,
    }))
  }
}));

// map of hashed username to hashed username + password
type KnownCredentials = Record<string, string>

export const isKnown = (credentials: Credentials): boolean => {
  const storage = localStorage.getItem(`recard_auth_known-credentials`)
  if (storage === null) {
    return false
  }
  const known: KnownCredentials = JSON.parse(storage)
  const entry = known[SHA256(credentials.username).toString()]
  return entry === SHA256(`${credentials.username}_${credentials.password}`).toString()
}
export const exists = (username: string): boolean => {
  const storage = localStorage.getItem(`recard_auth_known-credentials`)
  if (storage === null) {
    return false
  }
  const known: KnownCredentials = JSON.parse(storage)
  return known[SHA256(username).toString()] !== undefined
}
export const setKnown = (credentials: Credentials) => {
  const storage = localStorage.getItem(`recard_auth_known-credentials`)
  const known: KnownCredentials = storage === null ? {} : JSON.parse(storage)
  known[SHA256(credentials.username).toString()] = SHA256(`${credentials.username}_${credentials.password}`).toString()
  localStorage.setItem(`recard_auth_known-credentials`, JSON.stringify(known))
}
