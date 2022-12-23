import create from 'zustand'
import { Deck } from '../types'
import { DeckSlice, StateCreator, Store } from '../types/store'
import * as API from '../api/recard'

export const createDeckSlice: StateCreator<DeckSlice> = (set, get) => ({
  decks: null,
  reloadDecks: async () => {
    set(state => ({ ...state, decks: null }))

    const { username, password } = get()
    if (username === null || password === null) return

    const decks = await API.decks({ username, password })
    if (decks === null) return

    set(state => ({ ...state, decks: decks.decks }))
  },
})
