export type Card = {
  name: string
  question: string
  answer: string
}

export type Deck = {
  name: string
  cards: Card[]
}

/** A list of deck-names */
export type DeckList = string[]
