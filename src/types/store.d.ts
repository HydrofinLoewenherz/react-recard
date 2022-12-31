import { StateCreator as StateCreator_ } from 'zustand'
import { Credentials } from './auth'
import { Deck } from './deck'
import { CardLog } from './log'
import { v4 as uuid } from 'uuid'

export interface AuthSlice {
  credentials: Credentials | null
  isLoggedIn: () => boolean
  login: (cred: Credentials) => Promise<boolean>
  logout: () => Promise<boolean>
}

export interface DeckSlice {
  decks: Deck[] | null
  loadDecks: () => Promise<boolean>
  saveDecks: () => Promise<boolean>
  setDeck: (deck: Deck) => boolean
  removeDeck: (name: string) => boolean
  findDeck: (id: uuid) => Deck | null
}

export interface LogSlice {
  cardLogs: CardLog[]
  log: (cardId: uuid, success: boolean) => boolean
}

export type Store = AuthSlice & DeckSlice & LogSlice

export type StateCreator<T> = StateCreator_<Store, [], [], T>
