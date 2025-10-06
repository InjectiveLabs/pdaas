<script setup lang="ts">
import { MarketKey, TradingInterface, UiDerivativeMarket } from '@/types'

const jsonStore = useSharedJsonStore()

const derivativeMarket = inject(MarketKey) as Ref<UiDerivativeMarket>

const queryTradingMode = useQueryRef('interface', TradingInterface.Standard)

const options = computed(() => [
  {
    value: TradingInterface.Standard,
    disabled: false
  }
])

onMounted(() => {
  // Force Standard mode; Trading Bots is disabled in this build
  queryTradingMode.value = TradingInterface.Standard
})
</script>

<template>
  <div>
    <div class="h-header flex border-b">
      <AppButtonSelect
        v-for="{ value, disabled } in options"
        :key="value"
        v-model="queryTradingMode"
        v-bind="{ value, disabled }"
        class="font-bold text-sm flex justify-center items-center px-6 border-r last:border-r-0 text-coolGray-450 flex-1"
        active-classes="bg-brand-875 text-white"
      >
        {{ $t(`trade.${value}`) }}
      </AppButtonSelect>
    </div>
    <PartialsTradeFuturesFormStandard />
  </div>
</template>
