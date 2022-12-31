import { v4 as uuid } from 'uuid'

export type Card = {
  id: uuid
  name: string
  question: string
  answer: string
}

export type Deck = {
  id: uuid
  name: string
  cards: Card[]
}

/** A list of deck-names */
export type DeckList = string[]
