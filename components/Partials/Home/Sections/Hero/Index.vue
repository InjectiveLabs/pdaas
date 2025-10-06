<script setup lang="ts">
import { TradeSubPage } from '@/types'
</script>

<template>
  <div class="lg:h-screen flex flex-col lg:justify-center max-lg:pt-10 relative z-30">
    <div class="max-w-4xl mx-auto w-full text-center flex flex-col items-center">
      <h1 class="font-semibold mb-10 lg:mb-8">
        <p class="text-4xl lg:text-7xl">
          {{ $t('home.openFinance') + ' ' }}
        </p>
        <p class="text-blue-500 text-4xl lg:text-[128px] font-bold lg:leading-none">
          {{ $t('home.reimagined') }}
        </p>
      </h1>

      <p class="text-lg">
        {{ $t('home.description') }}
      </p>

      <div class="flex justify-center gap-4 my-14 lg:my-10">
        <NuxtLink :to="{ name: TradeSubPage.Spot, params: { slug: 'inj-usdt' } }">
          <AppButton class="w-full font-semibold">
            {{ $t('home.startTrading') }}
          </AppButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
