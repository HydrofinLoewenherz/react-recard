import { Deck } from "./types";

// TODO save decks to username and encrypt with password (encrypt in prods)

export const decks = async (): Promise<string[]> => {
  return [] // TODO implement me!
}

export const deck = async (name: string): Promise<Deck | null> => {
  return null // TODO implement me!
}

export const setDeck = async (deck: Deck): Promise<void> => {
  // TODO implement me!
}

export const unsetDeck = async (name: string): Promise<void> => {
  // TODO implement me!
}
