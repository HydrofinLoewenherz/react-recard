import { StateCreator as StateCreator_ } from 'zustand'

export interface AuthSlice {
  username: string | null
  password: string | null
  hasCredentials: () => boolean
  loadCredentials: () => void
  setCredentials: (credentials: Credentials, keepCredentials: boolean) => void
  unsetCredentials: () => void
}

export interface DeckSlice {
  decks: Deck[] | null
  reloadDecks: () => Promise<void>
}

export type Store = AuthSlice & DeckSlice

export type StateCreator<T> = StateCreator_<Store, [], [], T>
