import { useStore } from '../../store/store'
import SHA256 from 'crypto-js/sha256'
import AES from 'crypto-js/aes'
import { isDev } from '../mode'
import { Deck, DeckList } from '../../types/deck'
import { RawCredentials, Credentials } from '../../types'
import { Local, StoreKey, userKey } from '../../store/storage'

export const deckKey = (name: string, cred: Credentials): StoreKey => {
  return userKey(`deck__${name}`, cred)
}

export const deckList = async (cred: Credentials): Promise<DeckList | null> => {
  const key = userKey('deck-list', cred)
  return Local.load(key, cred.aesKey)
}
export const setDeckList = async (names: string[], cred: Credentials): Promise<void> => {
  const key = userKey('deck-list', cred)
  Local.save(key, names, cred.aesKey)
}

export const deck = async (name: string, cred: Credentials): Promise<Deck | null> => {
  const key = deckKey(name, cred)
  return Local.load(key, cred.aesKey)
}

export const setDeck = async (name: string, cred: Credentials, deck: Deck): Promise<void> => {
  const key = deckKey(name, cred)
  Local.save(key, deck, cred.aesKey)
}

export const removeDeck = async (name: string, cred: Credentials): Promise<boolean> => {
  const key = deckKey(name, cred)
  return Local.remove(key)
}
