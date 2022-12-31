import { Deck } from '../types'
import { DeckSlice, StateCreator } from '../types/store'
import * as API from '../api/recard'
import { v4 as uuid } from 'uuid'

export const createDeckSlice: StateCreator<DeckSlice> = (set, get) => ({
  decks: null,
  loadDecks: async (): Promise<boolean> => {
    const { credentials } = get()
    if (credentials === null) return false

    const deckNames = await API.deckList(credentials)
    if (deckNames === null) {
      set(state => ({ ...state, decks: [] }))
      return true
    }

    const decks_ = await Promise.all(deckNames.map(name => API.deck(name, credentials)))
    const decks = decks_.filter(deck => deck !== null) as Deck[]

    set(state => ({ ...state, decks }))
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

    const index = decks.findIndex(deck_ => deck_.id === deck.id)
    if (index === -1) {
      decks.push(deck)
    } else {
      if (deck.id === undefined) {
        deck.id = uuid()
      }
      decks.splice(index, 1, deck)
    }

    // Without the `slice`-call the state-change wouldn't be registered,
    // since it'd still be the same array, only the data inside the array changed
    set(state => ({ ...state, decks: decks.slice() }))
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

    // Without the `slice`-call the state-change wouldn't be registered,
    // since it'd still be the same array, only the data inside the array changed
    set(state => ({ ...state, decks: decks.slice() }))
    return true
  },
  findDeck: (id: typeof uuid): Deck | null => {
    const { decks } = get()
    return decks !== null ? decks.find(deck => deck.id === id) ?? null : null
  },
})
