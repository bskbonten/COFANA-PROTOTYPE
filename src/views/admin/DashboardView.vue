<template>
  <div class="space-y-6">
    <!-- Greeting banner -->
    <div class="card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-espresso-800 to-coffee-DEFAULT text-cream-100 dark:from-espresso-800 dark:to-espresso-700 shadow-md">
      <div>
        <p class="text-xs font-semibold tracking-wider uppercase text-cream-100/70">Store Operations & Performance</p>
        <h2 class="font-serif font-bold text-2xl sm:text-3xl text-cream-100 mt-1">
          {{ greeting }}, Admin 👋
        </h2>
        <p class="text-xs sm:text-sm text-cream-100/80 mt-1">
          Today's business summary calculated live from store orders and catalogue state.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <RouterLink
          to="/admin/products"
          class="px-4 py-2 bg-cream-100 text-espresso-800 text-xs font-semibold rounded-lg hover:bg-cream-200 transition-colors shadow-sm"
        >
          Manage Menu
        </RouterLink>
        <RouterLink
          to="/admin/orders"
          class="px-4 py-2 bg-white/10 text-cream-100 border border-cream-100/20 text-xs font-semibold rounded-lg hover:bg-white/20 transition-colors"
        >
          View Orders
        </RouterLink>
      </div>
    </div>

    <!-- 6 Dynamic Metric Cards (Including all 5 required metrics) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <!-- 1. Today's Revenue -->
      <StatCard
        title="Today's Revenue"
        :value="formatRupiah(dashboardStore.todayRevenue)"
        :subtitle="`${dashboardStore.todayCompletedOrders} completed today`"
        :icon="DollarSign"
        color="coffee"
      />

      <!-- 2. Total Sales (All-time completed) -->
      <StatCard
        title="Total Sales"
        :value="formatRupiah(dashboardStore.totalSales)"
        :subtitle="`${dashboardStore.completedOrdersCount} orders completed`"
        :icon="TrendingUp"
        color="coffee"
      />

      <!-- 3. Total Orders -->
      <StatCard
        title="Total Orders"
        :value="dashboardStore.totalOrders"
        :subtitle="`${dashboardStore.todayOrders} submitted today`"
        :icon="Receipt"
        color="sage"
      />

      <!-- 4. Completed Orders -->
      <StatCard
        title="Completed Orders"
        :value="dashboardStore.completedOrdersCount"
        :subtitle="`${dashboardStore.todayCompletedOrders} completed today`"
        :icon="CheckCircle"
        color="sage"
      />

      <!-- 5. Products Sold -->
      <StatCard
        title="Products Sold"
        :value="`${dashboardStore.productsSold} pcs`"
        :subtitle="`${dashboardStore.todayProductsSold} sold today`"
        :icon="Coffee"
        color="amber"
      />

      <!-- 6. Active Products & Stock Alert -->
      <StatCard
        title="Active Menu"
        :value="`${dashboardStore.totalProducts} items`"
        :subtitle="`${dashboardStore.lowStockCount} low stock supplies`"
        :icon="Package"
        color="espresso"
      />
    </div>

    <!-- Charts & Best Sellers Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Sales Chart: Last 7 Days Performance -->
      <div class="lg:col-span-8">
        <SalesChart
          title="Revenue & Orders Trend"
          subtitle="Real-time 7-day daily breakdown calculated from order records"
          :data="dashboardStore.revenueChart"
        />
      </div>

      <!-- Best-selling products -->
      <div class="lg:col-span-4">
        <div class="card p-5 h-full flex flex-col">
          <div class="flex items-center justify-between pb-3 border-b border-espresso-800/10 dark:border-cream-100/10 mb-4">
            <h3 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100">
              Best Sellers
            </h3>
            <span class="text-xs text-espresso-700/60 dark:text-cream-200/50">By quantity sold</span>
          </div>

          <div v-if="dashboardStore.bestSellingProducts.length > 0" class="space-y-3.5 flex-1">
            <div
              v-for="(prod, idx) in dashboardStore.bestSellingProducts"
              :key="prod.productId"
              class="flex items-center justify-between gap-3 text-sm"
            >
              <div class="flex items-center gap-2.5 min-w-0">
                <span class="w-6 h-6 rounded-full bg-espresso-800/10 dark:bg-cream-100/10 text-espresso-800 dark:text-cream-100 text-xs font-bold flex items-center justify-center shrink-0">
                  {{ idx + 1 }}
                </span>
                <span class="font-medium text-espresso-800 dark:text-cream-100 truncate">{{ prod.name }}</span>
              </div>
              <div class="text-right shrink-0">
                <p class="font-semibold text-espresso-800 dark:text-cream-100 text-xs">{{ prod.qty }} sold</p>
                <p class="text-[10px] text-espresso-700/60 dark:text-cream-200/50">{{ formatRupiah(prod.revenue) }}</p>
              </div>
            </div>
          </div>
          <div v-else class="flex-1 flex items-center justify-center text-xs text-espresso-700/60 dark:text-cream-200/50 py-8">
            No sales data available.
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Orders Section -->
    <div class="card p-5">
      <div class="flex items-center justify-between pb-4 border-b border-espresso-800/10 dark:border-cream-100/10 mb-4">
        <div>
          <h3 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100">
            Recent Orders
          </h3>
          <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-0.5">
            Latest transactions across store channels
          </p>
        </div>
        <RouterLink
          to="/admin/orders"
          class="text-xs font-semibold text-coffee-DEFAULT dark:text-accent hover:underline inline-flex items-center gap-1"
        >
          <span>View All Orders ({{ dashboardStore.totalOrders }})</span>
          <ArrowRight :size="14" />
        </RouterLink>
      </div>

      <!-- Orders table -->
      <div class="overflow-x-auto scrollbar-thin">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-espresso-800/10 dark:border-cream-100/10 text-xs font-semibold uppercase tracking-wider text-espresso-700/60 dark:text-cream-200/50">
              <th class="pb-3 pr-4">Order ID</th>
              <th class="pb-3 px-4">Customer</th>
              <th class="pb-3 px-4">Time</th>
              <th class="pb-3 px-4">Items</th>
              <th class="pb-3 px-4">Total</th>
              <th class="pb-3 px-4">Payment</th>
              <th class="pb-3 pl-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-espresso-800/5 dark:divide-cream-100/5">
            <tr
              v-for="order in dashboardStore.recentOrders"
              :key="order.id"
              class="hover:bg-espresso-800/5 dark:hover:bg-cream-100/5 transition-colors"
            >
              <td class="py-3 pr-4 font-mono font-bold text-xs text-espresso-800 dark:text-cream-100">
                {{ order.id }}
              </td>
              <td class="py-3 px-4 font-medium text-espresso-800 dark:text-cream-100">
                {{ order.customer?.name }}
              </td>
              <td class="py-3 px-4 text-xs text-espresso-700/60 dark:text-cream-200/50">
                {{ formatTime(order.createdAt) }}
              </td>
              <td class="py-3 px-4 text-xs text-espresso-700/70 dark:text-cream-200/60">
                {{ order.items.reduce((s, i) => s + (i.qty || 0), 0) }} items
              </td>
              <td class="py-3 px-4 font-semibold text-espresso-800 dark:text-cream-100 text-xs">
                {{ formatRupiah(order.total) }}
              </td>
              <td class="py-3 px-4 text-xs">
                <span class="px-2 py-0.5 rounded bg-espresso-800/5 dark:bg-cream-100/10 text-espresso-800 dark:text-cream-100">
                  {{ order.payment }}
                </span>
              </td>
              <td class="py-3 pl-4 text-right">
                <StatusBadge :status="order.status" type="order" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  DollarSign, Receipt, Package, CheckCircle, TrendingUp, Coffee, ArrowRight
} from '@lucide/vue'
import StatCard from '../../components/admin/StatCard.vue'
import SalesChart from '../../components/admin/SalesChart.vue'
import StatusBadge from '../../components/StatusBadge.vue'
import { useDashboardStore } from '../../stores/dashboardStore'
import { formatRupiah } from '../../utils/currency'

const dashboardStore = useDashboardStore()

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
})

function formatTime(isoStr) {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}
</script>
