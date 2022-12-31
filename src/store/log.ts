import { Credentials } from '../types'
import { CardLog } from '../types/log'
import { LogSlice, StateCreator } from '../types/store'
import { Local, StoreKey, userKey } from './storage'

const logKey = (type: string, cred: Credentials): StoreKey => {
  return userKey(`logs__${type}`, cred)
}

export const createLogSlice: StateCreator<LogSlice> = (set, get) => ({
  cardLogs: [],
  log: (deckId, cardId, success) => {
    const { cardLogs } = get()
    cardLogs.push({ deckId, cardId, time: new Date().getTime(), success })
    // `slice` is called for the same reason as here `[src/store/deck.ts:48]`
    set(state => ({ ...state, cardLogs: cardLogs.slice() }))
    return true
  },
  saveLogs: async (): Promise<boolean> => {
    const { credentials, cardLogs } = get()
    if (credentials === null) return false
    Local.save(logKey('card', credentials), cardLogs, credentials.aesKey)
    return true
  },
  loadLogs: async (): Promise<boolean> => {
    const { credentials } = get()
    if (credentials === null) return false
    const cardLogs = Local.load<CardLog[]>(logKey('card', credentials), credentials.aesKey)
    if (cardLogs === null) return false
    set(state => ({ ...state, cardLogs }))
    return true
  },
})
