import { StateCreator as StateCreator_ } from 'zustand'
import { Credentials } from './auth'
import { Deck } from './deck'
import { CardLog } from './log'
import { v4 as uuid } from 'uuid'
import { CardStats } from './stats'

export interface AuthSlice {
  credentials: Credentials | null
  isLoggedIn: () => boolean
  login: (cred: Credentials) => Promise<boolean>
  logout: () => Promise<boolean>
  loadAll: () => Promise<boolean>
  resetAll: () => void
}

export interface DeckSlice {
  decks: Deck[] | null
  loadDecks: () => Promise<boolean>
  saveDecks: () => Promise<boolean>
  resetDecks: () => void
  setDeck: (deck: Deck) => boolean
  removeDeck: (id: uuid) => boolean
  findDeck: (id: uuid) => Deck | null
}

export interface LogSlice {
  cardLogs: CardLog[]
  log: (deckId: uuid, cardId: uuid, success: boolean) => boolean
  saveLogs: () => Promise<boolean>
  loadLogs: () => Promise<boolean>
  resetLogs: () => void
}

export interface StatsSlice {
  cardStats: CardStats[]
  deckStats: DeckStats[]
  deckSessions: DeckSession[]
  getCardStats: (id: string) => CardStats | null
  getDeckStats: (id: string) => DeckStats | null
  getDeckSession: (id: string) => DeckSession | null
  setCardStats: (stats: CardStats) => void
  setDeckStats: (stats: DeckStats) => void
  setDeckSession: (session: DeckSession) => void
  updateCardStats: (id: string, fn: (stats: CardStats) => void) => void
  updateDeckStats: (id: string, fn: (stats: DeckStats) => void) => void
  updateDeckSession: (id: string, fn: (session: DeckSession) => void) => void
  saveStats: () => Promise<boolean>
  loadStats: () => Promise<boolean>
  resetStats: () => void
}

export interface ThemeSlice {
  themeMode: PaletteMode | 'auto'
  toggleThemeMode: () => void
  setThemeMode: (themeMode: PaletteMode | 'auto') => void
}

export type Store = AuthSlice & DeckSlice & LogSlice & ThemeSlice & StatsSlice

export type StateCreator<T> = StateCreator_<Store, [], [], T>
