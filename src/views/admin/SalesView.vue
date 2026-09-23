<template>
  <div class="space-y-6">
    <!-- Quick All-Time KPI Strip -->
    <div class="card p-4 sm:p-5 bg-gradient-to-r from-espresso-800 to-coffee-DEFAULT text-cream-100 dark:from-espresso-800 dark:to-espresso-700">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p class="text-[11px] font-semibold tracking-wider uppercase text-cream-100/70">Store All-Time Summary</p>
          <div class="flex flex-wrap items-baseline gap-x-6 gap-y-2 mt-1">
            <div>
              <span class="text-xs text-cream-100/75">Total Sales: </span>
              <strong class="font-serif text-xl sm:text-2xl text-cream-100">{{ formatRupiah(dashboardStore.totalSales) }}</strong>
            </div>
            <div>
              <span class="text-xs text-cream-100/75">Today's Revenue: </span>
              <strong class="font-serif text-xl sm:text-2xl text-cream-100">{{ formatRupiah(dashboardStore.todayRevenue) }}</strong>
            </div>
            <div>
              <span class="text-xs text-cream-100/75">Total Orders: </span>
              <strong class="text-base text-cream-100">{{ dashboardStore.totalOrders }}</strong>
            </div>
          </div>
        </div>

        <RouterLink
          to="/admin/orders"
          class="self-start sm:self-center px-3.5 py-1.5 rounded-lg bg-cream-100 text-espresso-800 text-xs font-semibold hover:bg-cream-200 transition-colors shadow-sm"
        >
          Manage All Orders
        </RouterLink>
      </div>
    </div>

    <!-- Filter & Range Selector Bar -->
    <div class="card p-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100">
            Sales & Revenue Analytics
          </h3>
          <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-0.5">
            Real-time calculations for transaction volume, items sold and revenue trends
          </p>
        </div>

        <!-- Period selector tabs -->
        <div class="flex rounded-lg bg-espresso-800/10 dark:bg-cream-100/10 p-1 w-fit">
          <button
            v-for="p in periods"
            :key="p.id"
            @click="activePeriod = p.id"
            class="px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-200"
            :class="activePeriod === p.id
              ? 'bg-white dark:bg-espresso-800 text-espresso-800 dark:text-cream-100 shadow-sm'
              : 'text-espresso-700/70 dark:text-cream-200/60 hover:text-espresso-800 dark:hover:text-cream-100'"
          >
            {{ p.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Dynamic Metric Cards for Selected Period -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard
        title="Period Revenue"
        :value="formatRupiah(currentMetrics.revenue)"
        :subtitle="periodLabel"
        :icon="DollarSign"
        color="coffee"
      />
      <StatCard
        title="Total Orders"
        :value="currentMetrics.totalOrders"
        :subtitle="`${currentMetrics.cancelled} cancelled`"
        :icon="Receipt"
        color="sage"
      />
      <StatCard
        title="Completed Orders"
        :value="currentMetrics.completedOrders"
        :subtitle="`${completionRate}% success rate`"
        :icon="CheckCircle"
        color="sage"
      />
      <StatCard
        title="Products Sold"
        :value="`${currentMetrics.itemsSold} pcs`"
        subtitle="Total cups & food"
        :icon="Coffee"
        color="amber"
      />
      <StatCard
        title="Avg. Order Value"
        :value="formatRupiah(currentMetrics.aov)"
        subtitle="Per completed order"
        :icon="TrendingUp"
        color="espresso"
      />
    </div>

    <!-- Sales Chart: Last 7 Days (or Selected Period) -->
    <SalesChart
      :title="`Revenue & Orders Over Time (${periodLabel})`"
      :subtitle="`Computed live from ${orderStore.orders.length} order records`"
      :data="chartData"
    />

    <!-- Product Sales Breakdown -->
    <div class="card p-5">
      <div class="flex items-center justify-between pb-4 border-b border-espresso-800/10 dark:border-cream-100/10 mb-4">
        <div>
          <h3 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100">
            Top Performing Products
          </h3>
          <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-0.5">
            Menu contributions to completed revenue for {{ periodLabel }}
          </p>
        </div>
        <span class="text-xs font-medium text-espresso-700/60 dark:text-cream-200/50">
          {{ productRankings.length }} items sold
        </span>
      </div>

      <div v-if="productRankings.length > 0" class="overflow-x-auto scrollbar-thin">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="bg-espresso-800/5 dark:bg-cream-100/5 border-b border-espresso-800/10 dark:border-cream-100/10 text-xs font-semibold uppercase tracking-wider text-espresso-700/60 dark:text-cream-200/50">
              <th class="py-3 px-4">Rank</th>
              <th class="py-3 px-4">Product Name</th>
              <th class="py-3 px-4">Units Sold</th>
              <th class="py-3 px-4">Revenue Generated</th>
              <th class="py-3 px-4 text-right">Share of Revenue</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-espresso-800/5 dark:divide-cream-100/5">
            <tr
              v-for="(item, idx) in productRankings"
              :key="item.name"
              class="hover:bg-espresso-800/5 dark:hover:bg-cream-100/5 transition-colors"
            >
              <td class="py-3 px-4 font-mono font-bold text-xs text-espresso-700/70 dark:text-cream-200/60">
                #{{ idx + 1 }}
              </td>
              <td class="py-3 px-4 font-medium text-espresso-800 dark:text-cream-100">
                {{ item.name }}
              </td>
              <td class="py-3 px-4 text-xs font-semibold text-espresso-800 dark:text-cream-100">
                {{ item.qty }} pcs
              </td>
              <td class="py-3 px-4 text-xs font-bold text-coffee-DEFAULT dark:text-accent">
                {{ formatRupiah(item.revenue) }}
              </td>
              <td class="py-3 px-4 text-xs text-right">
                <div class="flex items-center justify-end gap-2">
                  <div class="w-20 bg-espresso-800/10 dark:bg-cream-100/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      class="bg-coffee-DEFAULT dark:bg-accent h-full rounded-full transition-all duration-300"
                      :style="{ width: `${item.share}%` }"
                    ></div>
                  </div>
                  <span class="w-9 font-medium text-espresso-700/80 dark:text-cream-200/70">{{ item.share }}%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="py-8 text-center text-xs text-espresso-700/60 dark:text-cream-200/50">
        No sales recorded in this period.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { DollarSign, Receipt, CheckCircle, TrendingUp, Coffee } from '@lucide/vue'
import StatCard from '../../components/admin/StatCard.vue'
import SalesChart from '../../components/admin/SalesChart.vue'
import { useOrderStore } from '../../stores/orderStore'
import { useDashboardStore } from '../../stores/dashboardStore'
import { formatRupiah } from '../../utils/currency'

const orderStore = useOrderStore()
const dashboardStore = useDashboardStore()

const periods = [
  { id: '7days', label: 'Last 7 Days' },
  { id: 'today', label: 'Today' },
  { id: '30days', label: 'Last 30 Days' }
]

const activePeriod = ref('7days')

const periodLabel = computed(() => {
  switch (activePeriod.value) {
    case 'today': return "Today's sales"
    case '7days': return 'Last 7 days'
    case '30days': return 'Last 30 days'
    default: return ''
  }
})

// Filter completed orders based on selected period
const filteredCompletedOrders = computed(() => {
  const now = new Date()
  return orderStore.orders.filter(o => {
    if (o.status !== 'Completed') return false
    const d = new Date(o.createdAt)
    if (activePeriod.value === 'today') {
      return d.toDateString() === now.toDateString()
    }
    const daysDiff = (now - d) / (1000 * 60 * 60 * 24)
    if (activePeriod.value === '7days') return daysDiff <= 7
    if (activePeriod.value === '30days') return daysDiff <= 30
    return true
  })
})

const currentMetrics = computed(() => {
  const completed = filteredCompletedOrders.value
  const revenue = completed.reduce((sum, o) => sum + (o.total || 0), 0)
  const aov = completed.length > 0 ? Math.round(revenue / completed.length) : 0
  const itemsSold = completed.reduce((sum, o) => sum + o.items.reduce((s, i) => s + (i.qty || 0), 0), 0)

  // Total orders & Cancelled in the same time frame
  const now = new Date()
  const periodAllOrders = orderStore.orders.filter(o => {
    const d = new Date(o.createdAt)
    if (activePeriod.value === 'today') return d.toDateString() === now.toDateString()
    const daysDiff = (now - d) / (1000 * 60 * 60 * 24)
    if (activePeriod.value === '7days') return daysDiff <= 7
    return daysDiff <= 30
  })

  const cancelled = periodAllOrders.filter(o => o.status === 'Cancelled').length

  return {
    revenue,
    completedOrders: completed.length,
    totalOrders: periodAllOrders.length,
    aov,
    itemsSold,
    cancelled
  }
})

const completionRate = computed(() => {
  if (currentMetrics.value.totalOrders === 0) return 100
  return Math.round((currentMetrics.value.completedOrders / currentMetrics.value.totalOrders) * 100)
})

// Daily chart data for the period
const chartData = computed(() => {
  const daysCount = activePeriod.value === 'today' ? 1 : activePeriod.value === '7days' ? 7 : 30
  const res = []

  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const label = (daysCount === 1 || i === 0)
      ? 'Today'
      : d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' })
    const dayStr = d.toDateString()

    const dayCompleted = orderStore.orders.filter(
      o => o.status === 'Completed' && new Date(o.createdAt).toDateString() === dayStr
    )
    const dayAll = orderStore.orders.filter(
      o => new Date(o.createdAt).toDateString() === dayStr
    )
    const rev = dayCompleted.reduce((sum, o) => sum + (o.total || 0), 0)

    res.push({
      label,
      revenue: rev,
      orders: dayAll.length,
      completedOrders: dayCompleted.length
    })
  }

  return res
})

// Product performance rankings
const productRankings = computed(() => {
  const map = {}
  const totalRev = currentMetrics.value.revenue || 1

  filteredCompletedOrders.value.forEach(o => {
    o.items.forEach(i => {
      if (!map[i.name]) {
        map[i.name] = { name: i.name, qty: 0, revenue: 0 }
      }
      map[i.name].qty += (i.qty || 0)
      map[i.name].revenue += (i.price || 0) * (i.qty || 0)
    })
  })

  return Object.values(map)
    .sort((a, b) => b.revenue - a.revenue)
    .map(p => ({
      ...p,
      share: Math.round((p.revenue / totalRev) * 100)
    }))
})
</script>
