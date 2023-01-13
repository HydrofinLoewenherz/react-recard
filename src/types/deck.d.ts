export type Card = {
  id: string
  name: string
  question: string
  answer: string
}

export type Deck = {
  id: string
  name: string
  cards: Card[]
}

/** A list of deck-ids */
export type DeckList = string[]
