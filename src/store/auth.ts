import create from 'zustand';

export interface Credentials {
  username: string | null,
  password: string | null,
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

interface AuthStoreState extends Credentials{
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
