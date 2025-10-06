<script lang="ts" setup>
import { MainPage } from '@/types'
const route = useRoute()
</script>

<template>
  <footer :class="['relative z-[3] w-full py-8', route.name === MainPage.Index ? '' : 'bg-brand-900 border-t border-t-coolGray-900']">
    <div class="w-full mx-auto lg:w-4/5 px-8 lg:px-0 text-center text-coolGray-600 text-xs">
      <!-- footer removed intentionally -->
    </div>
  </footer>
</template>
