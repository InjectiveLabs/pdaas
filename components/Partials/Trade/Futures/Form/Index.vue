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
    <PartialsTradeFuturesFormStandard />
  </div>
</template>
