import create from 'zustand'
import { Deck } from '../types'
import { DeckSlice, StateCreator, Store } from '../types/store'
import * as API from '../api/recard'

export const createDeckSlice: StateCreator<DeckSlice> = (set, get) => ({
  decks: null,
  loadDecks: async (): Promise<boolean> => {
    const { credentials } = get()
    if (credentials === null) return false

    set(state => ({ ...state, decks: null }))

    const deckNames = await API.deckList(credentials)
    if (deckNames === null) return false

    const newDecks_ = await Promise.all(deckNames.map(name => API.deck(name, credentials)))
    const newDecks = newDecks_.filter(deck => deck !== null) as Deck[]

    set(state => ({ ...state, decks: newDecks }))
    return true
  },
  saveDecks: async (): Promise<boolean> => {
    const { decks, credentials } = get()
    if (decks === null || credentials === null) return false

    const names = decks.reduce<string[]>((acc, next) => [...acc, next.name], [])
    await API.setDeckList(names, credentials)
    await Promise.all(decks.map(deck => API.setDeck(deck.name, credentials, deck)))

    return true
  },
  setDeck: (deck: Deck): boolean => {
    const { decks } = get()
    if (decks === null) return false

    const index = decks.findIndex(deck_ => deck_.name === deck.name)
    if (index === -1) {
      decks.push(deck)
    } else {
      decks.splice(index, 1, deck)
    }
    return true
  },
  removeDeck: (name: string): boolean => {
    const { decks } = get()
    if (decks === null) return false

    const index = decks.findIndex(deck => deck.name === name)
    if (index === -1) {
      return false
    }

    decks.splice(index, 1)
    return true
  },
  findDeck: (name: string): Deck | null => {
    const { decks } = get()
    return decks !== null ? decks.find(deck => deck.name === name) ?? null : null
  },
})
