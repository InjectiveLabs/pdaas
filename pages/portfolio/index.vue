<script lang="ts" setup>
import { Status, StatusType } from '@injectivelabs/utils'

const accountStore = useAccountStore()

const { $onError } = useNuxtApp()

const status = reactive(new Status(StatusType.Loading))

onMounted(() => {
  accountStore
    .fetchAccountStats()
    .catch($onError)
    .finally(() => status.setIdle())
})
</script>

<template>
  <div class="p-4">
    <h1 class="portfolio-title">{{ $t('navigation.portfolio') }}</h1>

    <PartialsPortfolioPortfolioFeeDiscounts />

    <AppHocLoading v-bind="{ status }">
      <PartialsPortfolioPortfolioKeyStats />
    </AppHocLoading>
  </div>
</template>
