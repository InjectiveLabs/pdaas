// Disabled leaderboard data fetchers
import type { LeaderboardType } from '@/types'

export const fetchPnlLeaderboard = async (
  resolution: string,
  account?: string
) => {
  return
}

export const fetchCompetitionLeaderboard = async ({
  type,
  account,
  duration
}: {
  account?: string
  type: LeaderboardType
  duration: {
    endDate: string
    startDate: string
  }
}) => {
  return
}
