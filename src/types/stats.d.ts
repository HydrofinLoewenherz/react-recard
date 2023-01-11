export type CardStats = {
  cardId: string
  correctCount: number
  wrongCount: number
  viewDurationSecs: number
}

export type DeckStats = {
  deckId: string
  learnedCount: number
  fullyLearnedCount: number
  perfectRunCount: number
}

export type DeckSession = {
  sessionId: string
  deckId: string
  start: Date
  end: Date | null
  correctCount: number
  currentCardIndex: number | null
}
