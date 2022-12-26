import { StateCreator as StateCreator_ } from 'zustand'
import { Credentials } from './auth'
import { Deck } from './deck'

export interface AuthSlice {
  credentials: Credentials | null
  isLoggedIn: () => boolean
  login: (cred: Credentials) => boolean
  logout: () => boolean
}

export interface DeckSlice {
  decks: Deck[] | null
  loadDecks: () => Promise<boolean>
  saveDecks: () => Promise<boolean>
  setDeck: (deck: Deck) => boolean
  removeDeck: (name: string) => boolean
  findDeck: (name: string) => Deck | null
}

export type Store = AuthSlice & DeckSlice

export type StateCreator<T> = StateCreator_<Store, [], [], T>
