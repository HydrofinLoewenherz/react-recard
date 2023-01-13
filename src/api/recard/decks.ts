import { Deck, DeckList } from '../../types/deck'
import { Credentials } from '../../types'
import { Local, StoreKey, userKey } from '../../store/storage'
import { Buffer } from 'buffer'

export const deckKey = (uuid: string, cred: Credentials): StoreKey => {
  return userKey(`deck__${uuid}`, cred)
}

export const deckList = async (cred: Credentials): Promise<DeckList | null> => {
  const key = userKey('deck-list', cred)
  return Local.load(key, cred.aesKey)
}
export const setDeckList = async (uuids: string[], cred: Credentials): Promise<void> => {
  const key = userKey('deck-list', cred)
  Local.save(key, uuids, cred.aesKey)
}

export const deck = async (uuid: string, cred: Credentials): Promise<Deck | null> => {
  const key = deckKey(uuid, cred)
  return Local.load(key, cred.aesKey)
}

export const setDeck = async (uuid: string, cred: Credentials, deck: Deck): Promise<void> => {
  const key = deckKey(uuid, cred)
  Local.save(key, deck, cred.aesKey)
}

export const removeDeck = async (uuid: string, cred: Credentials): Promise<boolean> => {
  const key = deckKey(uuid, cred)
  return Local.remove(key)
}

export const serializeDeck = (deck: Deck): string => {
  const str = JSON.stringify(deck)
  return Buffer.from(str).toString('base64')
}

export const deserializeDeck = (data: string): Deck | null => {
  try {
    const buffer = Buffer.from(data, 'base64').toString()
    return JSON.parse(buffer) as Deck
  } catch (e) {
    return null
  }
}
