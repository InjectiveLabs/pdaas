<script setup lang="ts">
import { dataCyTag } from '@shared/utils'
import {
  MarketKey,
  UiSpotMarket,
  TradingInterface,
  SpotMarketCyTags
} from '@/types'

const jsonStore = useSharedJsonStore()

const spotMarket = inject(MarketKey) as Ref<UiSpotMarket>

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
    <div>
      <PartialsTradeSpotFormStandard />
    </div>
  </div>
</template>
