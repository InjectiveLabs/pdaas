// Leaderboard store disabled in this build.
import type { PnlLeaderboard, VolLeaderboard } from '@injectivelabs/sdk-ts'

type LeaderboardStoreState = {
  pnlLeaderboard?: PnlLeaderboard
  competitionLeaderboard?: PnlLeaderboard | VolLeaderboard
  historicalPnl: {
    time: number
    value: number
  }[]

  historicalVolume: {
    time: number
    value: number
  }[]

  historicalBalance: {
    time: number
    value: number
  }[]
}

const initialStateFactory = (): LeaderboardStoreState => ({
  pnlLeaderboard: undefined,
  competitionLeaderboard: undefined,
  historicalBalance: [],
  historicalPnl: [],
  historicalVolume: []
})

export const useLeaderboardStore = defineStore('leaderboard', {
  state: (): LeaderboardStoreState => initialStateFactory(),
  actions: {
    // no-op placeholders to avoid runtime errors if referenced
    async fetchPnlLeaderboard() { },
    async fetchCompetitionLeaderboard() { },

    async fetchHistoricalBalance() { },

    async fetchHistoricalPnl() { },

    async fetchHistoricalVolume() { }
  }
})
