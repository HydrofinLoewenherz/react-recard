import {Deck} from "./types";
import {useAuthStore} from "../../store/auth";
import SHA256 from "crypto-js/sha256"
import AES from "crypto-js/aes"
import {isDev} from "../mode";

const useEncryption = !isDev()

//<editor-fold desc="local storage access">
const read = <T>(key: string): (T | null) => {
  const authStore = useAuthStore()
  if (!authStore.hasCredentials()) {
    return null
  }

  const store = localStorage.getItem(`recard_user-${authStore.username}_${key}`)
  if (store === null) {
    return null
  }

  const decrypted = AES.decrypt(store, SHA256(authStore.password as string))
  return JSON.parse(useEncryption ? decrypted.toString() : store)
}
const write = <T>(key: string, data: T | null): boolean => {
  const authStore = useAuthStore()
  if (!authStore.hasCredentials()) {
    return false
  }

  if (data === null) {
    localStorage.removeItem(`recard_user-${authStore.username}_${key}`)
  } else {
    const encrypted = AES.encrypt(JSON.stringify(data), SHA256(authStore.password as string))
    localStorage.setItem(`recard_user-${authStore.username}_${key}`, useEncryption ? encrypted.toString() : JSON.stringify(data))
  }
  return true
}
//</editor-fold>


interface UserData {
  username: string,
  decks: string[]
}

const EmptyUserData = (username: string): UserData => ({
  username: username,
  decks: []
})

export const user = async (): Promise<UserData | null> => {
  const authStore = useAuthStore()
  if (authStore.username === null) {
    return null
  }
  return read(`data`) || EmptyUserData(authStore.username)
}

export const deck = async (name: string): Promise<Deck | null> => {
  return read(`deck-${name}`)
}

export const setDeck = async (deck: Deck): Promise<void> => {
  write(`deck-${deck.name}`, deck)
}

export const unsetDeck = async (name: string): Promise<void> => {
  write(`deck-${name}`, null)
}
