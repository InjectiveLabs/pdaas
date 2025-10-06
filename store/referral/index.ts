import { defineStore } from 'pinia'
import { ZERO_IN_BASE } from '@shared/utils/constant'
import { FEE_RECIPIENT } from '@/app/utils/constants'
import type { ReferralDetails } from '@injectivelabs/sdk-ts'

type ReferralStoreState = {
  feeRecipient: string
  referralDetails: ReferralDetails
}

const initialStateFactory = (): ReferralStoreState => ({
  feeRecipient: FEE_RECIPIENT,
  referralDetails: {
    invitees: [],
    referrerCode: '',
    referrerAddress: '',
    totalCommission: ZERO_IN_BASE,
    totalTradingVolume: ZERO_IN_BASE
  }
})

export const useReferralStore = defineStore('referral', {
  state: (): ReferralStoreState => initialStateFactory(),
  getters: {
    isReferrer: (state) => !!state.referralDetails.referrerCode,
    hasBeenReferred: (state) => state.feeRecipient !== FEE_RECIPIENT
  },
  actions: {
    // Disable all referral actions in this build
    async registerInvitee() { },
    async createReferralLink() { },

    async checkCodeAvailability() { return '' },

    async fetchUserReferrer() { const referralStore = useReferralStore(); referralStore.$patch({ feeRecipient: FEE_RECIPIENT }) },

    async fetchUserReferralDetails() { const referralStore = useReferralStore(); referralStore.$patch({ referralDetails: { invitees: [], referrerCode: '', referrerAddress: '', totalCommission: ZERO_IN_BASE, totalTradingVolume: ZERO_IN_BASE } as any }) }
  }
})
