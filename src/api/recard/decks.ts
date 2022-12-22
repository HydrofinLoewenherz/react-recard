import { Deck } from "./types";
import {useAuthStore} from "../../store/auth";

// TODO encrypt with password (encrypt in prods)

interface UserData {
  username: string,
  decks: string[]
}

const EmptyUserData = (username: string): UserData => ({
  username: username,
  decks: []
})

export const user = async (): Promise<UserData> => {
  const authStore = useAuthStore()
  if (!authStore.hasCredentials()) {
    return Promise.reject("not authenticated")
  }

  const storage = localStorage.getItem(`recard_user_${authStore.username}`)
  return storage === null ? EmptyUserData(authStore.username as string) : JSON.parse(storage)
}

export const deck = async (name: string): Promise<Deck | null> => {
  const authStore = useAuthStore()
  if (!authStore.hasCredentials()) {
    return Promise.reject("not authenticated")
  }

  const storage = localStorage.getItem(`recard_user_${authStore.username}_deck_${name}`)
  return storage === null ? null : JSON.parse(storage)
}

export const setDeck = async (deck: Deck): Promise<void> => {
  const authStore = useAuthStore()
  if (!authStore.hasCredentials()) {
    return Promise.reject("not authenticated")
  }

  localStorage.setItem(`recard_user_${authStore.username}_deck_${deck.name}`, JSON.stringify(deck))
}

export const unsetDeck = async (name: string): Promise<void> => {
  const authStore = useAuthStore()
  if (!authStore.hasCredentials()) {
    return Promise.reject("not authenticated")
  }

  localStorage.unsetItem(`recard_user_${authStore.username}_deck_${deck.name}`)
}
