import { Credentials } from '../types'
import { CardStats, DeckSession, DeckStats } from '../types/stats'
import { StateCreator, StatsSlice } from '../types/store'
import { Local, StoreKey, userKey } from './storage'

const statsKey = (type: string, cred: Credentials): StoreKey => {
  return userKey(`stats__${type}`, cred)
}

export const createStatsSlice: StateCreator<StatsSlice> = (set, get) => ({
  cardStats: [],
  deckStats: [],
  deckSessions: [],
  getCardStats: (id: string): CardStats | null => {
    const { cardStats } = get()
    return cardStats.find(stats => stats.cardId === id) ?? null
  },
  getDeckStats: (id: string): DeckStats | null => {
    const { deckStats } = get()
    return deckStats.find(stats => stats.deckId === id) ?? null
  },
  getDeckSession: (id: string): DeckSession | null => {
    const { deckSessions } = get()
    return deckSessions.find(session => session.sessionId === id) ?? null
  },
  setCardStats: (stats: CardStats): void => {
    const { cardStats, saveStats } = get()
    const idx = cardStats.findIndex(stats_ => stats_.cardId === stats.cardId)
    if (idx === -1) {
      set(({ cardStats, ...store }) => ({ ...store, cardStats: [...cardStats, stats] }))
    } else {
      cardStats[idx] = stats
      set(({ cardStats, ...store }) => ({ ...store, cardStats: cardStats.slice() }))
    }
    saveStats()
  },
  setDeckStats: (stats: DeckStats): void => {
    const { deckStats, saveStats } = get()
    const idx = deckStats.findIndex(stats_ => stats_.deckId === stats.deckId)
    if (idx === -1) {
      set(({ deckStats, ...store }) => ({ ...store, deckStats: [...deckStats, stats] }))
    } else {
      deckStats[idx] = stats
      set(({ deckStats, ...store }) => ({ ...store, deckStats: deckStats.slice() }))
    }
    saveStats()
  },
  setDeckSession: (session: DeckSession): void => {
    const { deckSessions, saveStats } = get()
    const idx = deckSessions.findIndex(session_ => session_.sessionId === session.sessionId)
    if (idx === -1) {
      set(({ deckSessions, ...store }) => ({ ...store, deckSessions: [...deckSessions, session] }))
    } else {
      deckSessions[idx] = session
      set(({ deckSessions, ...store }) => ({ ...store, deckSessions: deckSessions.slice() }))
    }
    saveStats()
  },
  updateCardStats: (id: string, fn: (stats: CardStats) => void): void => {
    const { cardStats, setCardStats } = get()
    const idx = cardStats.findIndex(stats => stats.cardId === id)
    if (idx === -1) {
      const stats_ = <CardStats>{
        cardId: id,
        correctCount: 0,
        wrongCount: 0,
        viewDurationSecs: 0,
      }
      fn(stats_)
      setCardStats(stats_)
    } else {
      const stats_ = cardStats[idx]
      fn(stats_)
      setCardStats(stats_)
    }
  },
  updateDeckStats: (id: string, fn: (stats: DeckStats) => void): void => {
    const { deckStats, setDeckStats } = get()
    const idx = deckStats.findIndex(stats => stats.deckId === id)
    if (idx === -1) {
      const stats_ = <DeckStats>{
        deckId: id,
        fullyLearnedCount: 0,
        learnedCount: 0,
        perfectRunCount: 0,
      }
      fn(stats_)
      setDeckStats(stats_)
    } else {
      const stats_ = deckStats[idx]
      fn(stats_)
      setDeckStats(stats_)
    }
  },
  updateDeckSession: (id: string, fn: (session: DeckSession) => void): void => {
    const { deckSessions, setDeckSession } = get()
    const idx = deckSessions.findIndex(session => session.sessionId === id)
    if (idx === -1) {
      const session_ = <DeckSession>{
        sessionId: id,
        correctCount: 0,
        currentCardIndex: 0,
        deckId: '',
        start: new Date(),
        end: null,
      }
      fn(session_)
      setDeckSession(session_)
    } else {
      const stats_ = deckSessions[idx]
      fn(stats_)
      setDeckSession(stats_)
    }
  },
  saveStats: async (): Promise<boolean> => {
    const { credentials, cardStats, deckStats, deckSessions } = get()
    if (credentials === null) return false

    Local.save(statsKey('card', credentials), cardStats, credentials.aesKey)
    Local.save(statsKey('deck', credentials), deckStats, credentials.aesKey)
    Local.save(statsKey('sessions', credentials), deckSessions, credentials.aesKey)

    return true
  },
  loadStats: async (): Promise<boolean> => {
    const { credentials } = get()
    if (credentials === null) return false

    const cardStats = Local.load<CardStats[]>(statsKey('card', credentials), credentials.aesKey)
    const deckStats = Local.load<DeckStats[]>(statsKey('deck', credentials), credentials.aesKey)
    const deckSessions = Local.load<DeckSession[]>(statsKey('sessions', credentials), credentials.aesKey)
    if (cardStats === null || deckStats === null || deckSessions === null) return false

    set(state => ({ ...state, cardStats, deckStats, deckSessions }))
    return true
  },
  resetStats: (): void => {
    set(state => ({ ...state, cardStats: [], deckStats: [], deckSessions: [] }))
  },
})
