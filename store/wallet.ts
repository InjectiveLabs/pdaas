import { defineStore } from 'pinia'
import { faucetService } from '@shared/Service'
import { Wallet } from '@injectivelabs/wallet-base'
import { DEFAULT_BLOCK_TIMEOUT_HEIGHT } from '@injectivelabs/utils'
import { walletStrategy, msgBroadcaster } from '@shared/WalletService'
import {
  ErrorType,
  WalletException,
  GeneralException,
  UnspecifiedErrorCode
} from '@injectivelabs/exceptions'
import { TRADING_MESSAGES } from '@/app/data/trade'
import { isCountryRestricted } from '@/app/data/geoip'
import { traceUserDetails } from '@/app/services/tracer'
import { Modal } from '@/types'

type WalletStoreState = {}

const initialStateFactory = (): WalletStoreState => ({})

export const useWalletStore = defineStore('wallet', {
  state: (): WalletStoreState => initialStateFactory(),
  getters: {},

  actions: {
    async init() {
      const sharedWalletStore = useSharedWalletStore()
      const _sharedGeoStore = useSharedGeoStore()

      if (!sharedWalletStore.wallet) {
        return
      }

      await sharedWalletStore.init()

      await traceUserDetails({
        address: sharedWalletStore.address,
        wallet: sharedWalletStore.wallet,
        geoContinent: _sharedGeoStore.geoContinent,
        geoCountry: _sharedGeoStore.geoCountry,
        ipAddress: _sharedGeoStore.ipAddress,
        browserCountry: _sharedGeoStore.browserCountry,
        vpnDetected: _sharedGeoStore.vpnDetected,
        vpnCheckedTimestamp: _sharedGeoStore.vpnCheckedTimestamp
      })
    },

    async connectAddressOrPrivatekey({
      wallet,
      addressOrPk
    }: {
      wallet?: Wallet
      addressOrPk: string
    }) {
      const SharedWalletStore = useSharedWalletStore()

      if (!wallet) {
        await SharedWalletStore.connectAddress(addressOrPk)

        return
      }

      if (wallet === Wallet.PrivateKey) {
        await SharedWalletStore.connectPrivateKey(addressOrPk)
      }
    },

    async connect({ wallet, address }: { wallet: Wallet; address?: string }) {
      const walletStore = useWalletStore()
      const accountStore = useAccountStore()
      const jsonStore = useSharedJsonStore()
      const modalStore = useSharedModalStore()
      const sharedWalletStore = useSharedWalletStore()

      // EVM wallets
      if (wallet === Wallet.Metamask) {
        await sharedWalletStore.connectEvmWallet('metamask')
      }
      if (wallet === Wallet.OkxWallet) {
        await sharedWalletStore.connectEvmWallet('okx-wallet')
      }
      if (wallet === Wallet.TrustWallet) {
        await sharedWalletStore.connectEvmWallet('trust-wallet')
      }
      if (wallet === Wallet.Rainbow) {
        await sharedWalletStore.connectEvmWallet('rainbow')
      }
      if (wallet === Wallet.BitGet) {
        await sharedWalletStore.connectEvmWallet('BitGet')
      }
      if (wallet === Wallet.Phantom) {
        await sharedWalletStore.connectEvmWallet('phantom')
      }

      // Cosmos wallets
      if (wallet === Wallet.Keplr) {
        await sharedWalletStore.connectCosmosWallet('keplr')
      }
      if (wallet === Wallet.Leap) {
        await sharedWalletStore.connectCosmosWallet('leap')
      }
      if (wallet === Wallet.Ninji) {
        await sharedWalletStore.connectCosmosWallet('ninji')
      }
      if (wallet === Wallet.OWallet) {
        await sharedWalletStore.connectCosmosWallet('owallet')
      }
      if (wallet === Wallet.Cosmostation) {
        await sharedWalletStore.connectCosmosWallet('cosmostation')
      }

      if (wallet === Wallet.Ledger && address) {
        await sharedWalletStore.connectLedger({
          wallet: Wallet.Ledger as unknown as 'ledger' | 'ledger-legacy',
          address
        })
      }
      if (wallet === Wallet.LedgerLegacy && address) {
        await sharedWalletStore.connectLedger({
          wallet: Wallet.LedgerLegacy as unknown as 'ledger' | 'ledger-legacy',
          address
        })
      }

      // Ledger/Trezor handled below

      if (wallet === Wallet.TrezorBip32 && address) {
        await sharedWalletStore.connectTrezor({
          wallet: Wallet.TrezorBip32 as unknown as 'trezor-bip32' | 'trezor-bip44',
          address
        })
      }
      if (wallet === Wallet.TrezorBip44 && address) {
        await sharedWalletStore.connectTrezor({
          wallet: Wallet.TrezorBip44 as unknown as 'trezor-bip32' | 'trezor-bip44',
          address
        })
      }

      // WalletConnect handled separately
      if (wallet === Wallet.WalletConnect) {
        await sharedWalletStore.connectWalletConnect()
        await msgBroadcaster.setOptions({
          txTimeout: DEFAULT_BLOCK_TIMEOUT_HEIGHT * 5
        })
      }

      accountStore.updateSubaccount(sharedWalletStore.defaultSubaccountId || '')
      modalStore.closeModal(Modal.Connect)

      if (sharedWalletStore.isUserConnected) {
        const someAddressInWalletIsBlackListed =
          sharedWalletStore.addresses.some(
            (address) =>
              jsonStore.blacklistedAddresses.find(
                (blacklistedAddress) =>
                  blacklistedAddress.toLowerCase() === address.toLowerCase()
              ) !== undefined
          )

        if (someAddressInWalletIsBlackListed) {
          walletStore.disconnect()

          throw new WalletException(
            new Error('Connected account address is restricted.'),
            {
              code: UnspecifiedErrorCode,
              type: ErrorType.WalletError
            }
          )
        }
      }
    },

    async validateGeo() {
      const sharedGeoStore = useSharedGeoStore()

      await sharedGeoStore.fetchVpnLocation()

      if (isCountryRestricted(sharedGeoStore.country)) {
        throw new GeneralException(
          new Error('This action is not allowed in your country')
        )
      }
    },

    async validateGas() {
      const accountStore = useAccountStore()
      const sharedWalletStore = useSharedWalletStore()

      if (!sharedWalletStore.isEip712 || accountStore.hasSufficientGas) {
        return
      }

      await faucetService.fundInjectiveAddress(
        sharedWalletStore.injectiveAddress
      )
      await accountStore.fetchSignerInjBalance()

      if (accountStore.hasSufficientGas) {
        return
      }

      throw new GeneralException(
        new Error(
          'Due to extremely high usage, gas-free transactions are currently unavailable. You need INJ to cover the transaction.'
        )
      )
    },

    async validate() {
      const walletStore = useWalletStore()
      const sharedWalletStore = useSharedWalletStore()

      await sharedWalletStore.fetchWeb3GatewayStatus()
      await walletStore.validateGas()

      const isAutoSignEnabled = !!sharedWalletStore.isAutoSignEnabled

      await sharedWalletStore.validateAndQueue()

      if (isAutoSignEnabled) {
        await sharedWalletStore.validateAutoSign(TRADING_MESSAGES)
      }
    },

    async disconnect() {
      const appStore = useAppStore()
      const spotStore = useSpotStore()
      const authZStore = useAuthZStore()
      const pointsStore = usePointsStore()
      const accountStore = useAccountStore()
      const exchangeStore = useExchangeStore()
      const activityStore = useActivityStore()
      const positionStore = usePositionStore()
      const campaignStore = useCampaignStore()
      const referralStore = useReferralStore()
      const derivativeStore = useDerivativeStore()
      const leaderboardStore = useLeaderboardStore()
      const gridStrategyStore = useGridStrategyStore()
      const sharedWalletStore = useSharedWalletStore()

      if (sharedWalletStore.wallet === Wallet.WalletConnect) {
        await msgBroadcaster.setOptions({
          txTimeout: DEFAULT_BLOCK_TIMEOUT_HEIGHT
        })
      }

      appStore.reset()
      pointsStore.reset()
      sharedWalletStore.logout()
      spotStore.resetSubaccount()
      derivativeStore.resetSubaccount()
      gridStrategyStore.cancelGridStrategiesStream()

      exchangeStore.$patch({ feeDiscountAccountInfo: undefined })
      accountStore.$reset()
      activityStore.$reset()
      positionStore.$reset()
      referralStore.$reset()
      authZStore.$reset()
      campaignStore.reset()
      gridStrategyStore.$patch({ strategies: [] })
      leaderboardStore.$patch({
        pnlLeaderboard: {
          ...leaderboardStore.pnlLeaderboard,
          accountRow: undefined
        },
        competitionLeaderboard: {
          ...leaderboardStore.competitionLeaderboard,
          accountRow: undefined
        }
      })
    },

    async signArbitraryData(address: string, message: string) {
      const sharedWalletStore = useSharedWalletStore()

      if (
        sharedWalletStore.wallet === Wallet.Magic ||
        sharedWalletStore.wallet === Wallet.Turnkey
      ) {
        return await walletStrategy.signEip712TypedData(
          message,
          sharedWalletStore.address
        )
      }

      return await walletStrategy.signArbitrary(address, message)
    }
  }
})
