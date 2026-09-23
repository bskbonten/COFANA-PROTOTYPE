<template>
  <div class="card p-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <div>
        <h3 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100">
          {{ title }}
        </h3>
        <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-0.5">
          {{ subtitle }}
        </p>
      </div>
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1.5 text-xs text-espresso-700/70 dark:text-cream-200/60">
          <span class="w-2.5 h-2.5 rounded-full bg-coffee-DEFAULT dark:bg-accent inline-block"></span>
          Revenue
        </span>
        <span class="inline-flex items-center gap-1.5 text-xs text-espresso-700/70 dark:text-cream-200/60">
          <span class="w-2.5 h-2.5 rounded-full bg-sage-DEFAULT inline-block"></span>
          Orders
        </span>
      </div>
    </div>

    <!-- Chart container -->
    <div class="h-64 flex items-end gap-2 sm:gap-4 pt-8 pb-2 px-1 border-b border-espresso-800/10 dark:border-cream-100/10">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="flex-1 flex flex-col items-center h-full justify-end group relative"
      >
        <!-- Hover Tooltip -->
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-14 z-20 pointer-events-none bg-espresso-800 dark:bg-espresso-700 text-cream-100 text-[11px] py-1.5 px-2.5 rounded-lg shadow-xl whitespace-nowrap text-center">
          <p class="font-bold">{{ formatRupiah(item.revenue) }}</p>
          <p class="text-[10px] text-cream-100/75 mt-0.5">{{ item.orders }} order{{ item.orders !== 1 ? 's' : '' }}</p>
        </div>

        <!-- Dual Bars (Revenue + Orders) -->
        <div class="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-[calc(100%-24px)]">
          <!-- Revenue Bar -->
          <div
            class="w-full max-w-[20px] rounded-t-md bg-coffee-DEFAULT dark:bg-accent group-hover:brightness-110 transition-all duration-300"
            :style="{ height: `${getRevenueHeight(item.revenue)}%` }"
            :title="`Revenue: ${formatRupiah(item.revenue)}`"
          ></div>
          <!-- Orders Bar -->
          <div
            class="w-full max-w-[10px] rounded-t-sm bg-sage-DEFAULT dark:bg-sage-light group-hover:brightness-110 transition-all duration-300"
            :style="{ height: `${getOrdersHeight(item.orders)}%` }"
            :title="`Orders: ${item.orders}`"
          ></div>
        </div>

        <!-- Label -->
        <span class="text-[10px] sm:text-[11px] font-medium text-espresso-700/60 dark:text-cream-200/50 mt-2 truncate w-full text-center">
          {{ item.label }}
        </span>
      </div>
    </div>

    <!-- Chart Summary Footer -->
    <div class="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-espresso-700/60 dark:text-cream-200/50">
      <span>Period Highest: <strong class="text-espresso-800 dark:text-cream-100">{{ formatRupiah(maxRevenue) }}</strong></span>
      <span>Period Revenue: <strong class="text-espresso-800 dark:text-cream-100">{{ formatRupiah(totalRevenue) }}</strong></span>
      <span>Period Orders: <strong class="text-espresso-800 dark:text-cream-100">{{ totalOrdersCount }} orders</strong></span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatRupiah } from '../../utils/currency'

const props = defineProps({
  title: { type: String, default: 'Revenue Trend' },
  subtitle: { type: String, default: 'Last 7 days performance' },
  data: {
    type: Array,
    default: () => []
  }
})

const maxRevenue = computed(() => {
  if (!props.data.length) return 100000
  const max = Math.max(...props.data.map(d => d.revenue || 0))
  return max > 0 ? max : 100000
})

const maxOrders = computed(() => {
  if (!props.data.length) return 10
  const max = Math.max(...props.data.map(d => d.orders || 0))
  return max > 0 ? max : 10
})

const totalRevenue = computed(() => {
  return props.data.reduce((sum, d) => sum + (d.revenue || 0), 0)
})

const totalOrdersCount = computed(() => {
  return props.data.reduce((sum, d) => sum + (d.orders || 0), 0)
})

function getRevenueHeight(revenue) {
  if (!revenue || maxRevenue.value === 0) return 4
  const pct = Math.round((revenue / maxRevenue.value) * 100)
  return Math.max(pct, 6) // minimum 6% height so bar is visible
}

function getOrdersHeight(orders) {
  if (!orders || maxOrders.value === 0) return 4
  const pct = Math.round((orders / maxOrders.value) * 100)
  return Math.max(pct, 6)
}
</script>
