<script setup lang="ts">
import { BigNumberInBase, BigNumber } from '@injectivelabs/utils'

const appStore = useAppStore()
const accountStore = useAccountStore()
const {
  stakedAmountInUsd,
  aggregatedSubaccountTotalBalanceInUsd,
  aggregatedSubaccountUnrealizedPnlInUsd
} = useBalance()

const { valueToBigNumber: spotEquityInBigNumber } = useSharedBigNumberFormatter(
  computed(() =>
    aggregatedSubaccountTotalBalanceInUsd.value.minus(
      aggregatedSubaccountUnrealizedPnlInUsd.value
    )
  )
)

const { aggregatedSubaccountTotalTradable } = useBalance()

const totalVolume = computed(
  () => new BigNumberInBase(accountStore.accountStats?.volume || 0)
)

const allTimePnl = computed(
  () => new BigNumberInBase(accountStore.accountStats?.pnl || 0)
)

</script>

<template>
  <div class="border rounded-xl p-4">
    <h4 class="font-semibold text-coolGray-200 text-lg mb-6">
      {{ $t('portfolio.keyStats.title') }}
    </h4>

    <ul class="flex flex-col gap-4">
      <li class="flex justify-between gap-4 text-base py-3 border-b border-coolGray-800">
        <span class="text-coolGray-300 font-semibold text-base">
          {{ $t('portfolio.home.tradableBalance.title') }}
        </span>

        <span class="text-white font-semibold text-base">
          ${{ Number(aggregatedSubaccountTotalBalanceInUsd.toFixed(2)).toLocaleString() }}
        </span>
      </li>

      <li class="flex justify-between gap-4 text-base py-3 border-b border-coolGray-800">
        <span class="text-coolGray-300 font-semibold text-base">
          {{ $t('portfolio.keyStats.allTimePnl') }}
        </span>

        <span
          class="font-semibold text-base"
          :class="[
            appStore.userState.preferences.isHideBalances
              ? 'text-gray-200'
              : allTimePnl.isZero()
                ? 'text-gray-200'
                : allTimePnl.gt(0)
                  ? 'text-green-500'
                  : 'text-red-500'
          ]"
        >
          ${{ Number(allTimePnl.toNumber().toFixed(2)).toLocaleString() }}
        </span>
      </li>

      <li class="flex justify-between gap-4 text-base py-3 border-b border-coolGray-800">
        <span class="text-coolGray-300 font-semibold text-base">
          {{ $t('portfolio.keyStats.totalVolume') }}
        </span>

        <span class="text-white font-semibold text-base">
          ${{ Number(totalVolume.toNumber().toFixed(2)).toLocaleString() }}
        </span>
      </li>

      <li class="flex justify-between gap-4 text-base py-3 border-b border-coolGray-800">
        <span class="text-coolGray-300 font-semibold text-base">
          {{ $t('portfolio.keyStats.totalEquity') }}
        </span>

        <span class="text-white font-semibold text-base">
          ${{ Number(aggregatedSubaccountTotalBalanceInUsd.toFixed(2)).toLocaleString() }}
        </span>
      </li>

      <li class="flex justify-between gap-4 text-base py-3 border-b border-coolGray-800">
        <span class="text-coolGray-300 font-semibold text-base">
          {{ $t('portfolio.keyStats.perpsAccountEquity') }}
        </span>

        <span class="text-white font-semibold text-base">
          ${{ Number(aggregatedSubaccountUnrealizedPnlInUsd.toFixed(2)).toLocaleString() }}
        </span>
      </li>

      <li class="flex justify-between gap-4 text-base py-3 border-b border-coolGray-800">
        <span class="text-coolGray-300 font-semibold text-base">
          {{ $t('portfolio.keyStats.spotAccountEquity') }}
        </span>

        <span class="text-white font-semibold text-base">
          ${{ Number(spotEquityInBigNumber.toFixed(2)).toLocaleString() }}
        </span>
      </li>

      <li class="flex justify-between gap-4 text-base py-3 border-b border-coolGray-800">
        <span class="text-coolGray-300 font-semibold text-base">
          {{ $t('portfolio.keyStats.stakingAccount') }}
        </span>

        <span class="text-white font-semibold text-base">
          ${{ Number(stakedAmountInUsd.toFixed(2)).toLocaleString() }}
        </span>
      </li>
    </ul>
  </div>
</template>
