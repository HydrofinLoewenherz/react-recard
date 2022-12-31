import { LogSlice, StateCreator } from '../types/store'

export const createLogSlice: StateCreator<LogSlice> = (set, get) => ({
  cardLogs: [],
  log: (deckId, cardId, success) => {
    const { cardLogs } = get()
    cardLogs.push({
      deckId,
      cardId,
      time: new Date().getTime(),
      success,
    })
    set(state => ({ ...state, cardLogs }))
    return true
  },
})
