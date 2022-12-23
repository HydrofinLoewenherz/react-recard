export interface Card {
  name: string
  question: string
  answer: string
}

export interface Deck {
  name: string
  cards: Card[]
}
