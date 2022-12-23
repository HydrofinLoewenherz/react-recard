import { useStore } from '../../store/store'
import SHA256 from 'crypto-js/sha256'
import AES from 'crypto-js/aes'
import { isDev } from '../mode'
import { Deck } from '../../types/deck'
import { Credentials } from '../../types'

const useEncryption = !isDev()

//<editor-fold desc="local storage access">
const read = <T>({ username, password }: Credentials, key: string): T | null => {
  const item = localStorage.getItem(`recard_user-${username}_${key}`)
  if (item === null) {
    return null
  }

  const decrypted = AES.decrypt(item, SHA256(password as string))
  return JSON.parse(useEncryption ? decrypted.toString() : item)
}
const write = <T>({ username, password }: Credentials, key: string, data: T | null): boolean => {
  if (data === null) {
    localStorage.removeItem(`recard_user-${username}_${key}`)
  } else {
    const encrypted = AES.encrypt(JSON.stringify(data), SHA256(password as string))
    localStorage.setItem(`recard_user-${username}_${key}`, useEncryption ? encrypted.toString() : JSON.stringify(data))
  }
  return true
}
//</editor-fold>

interface UserData {
  username: string
  decks: string[]
}

const EmptyUserData = (username: string): UserData => ({
  username: username,
  decks: [],
})

export const decks = async (credentials: Credentials): Promise<UserData | null> => {
  return read(credentials, `data`) || EmptyUserData(credentials.username)
}

export const deck = async (credentials: Credentials, name: string): Promise<Deck | null> => {
  return read(credentials, `deck-${name}`)
}

export const setDeck = async (credentials: Credentials, deck: Deck): Promise<void> => {
  write(credentials, `deck-${deck.name}`, deck)
}

export const unsetDeck = async (credentials: Credentials, name: string): Promise<void> => {
  write(credentials, `deck-${name}`, null)
}
