import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useOrderStore } from './orderStore'
import { useProductStore } from './productStore'
import { useInventoryStore } from './inventoryStore'

export const useDashboardStore = defineStore('dashboard', () => {
  const orderStore = useOrderStore()
  const productStore = useProductStore()
  const inventoryStore = useInventoryStore()

  function isToday(dateStr) {
    if (!dateStr) return false
    const d = new Date(dateStr)
    const now = new Date()
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    )
  }

  function isThisWeek(dateStr) {
    if (!dateStr) return false
    const d = new Date(dateStr)
    const now = new Date()
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - now.getDay())
    weekStart.setHours(0, 0, 0, 0)
    return d >= weekStart
  }

  function isThisMonth(dateStr) {
    if (!dateStr) return false
    const d = new Date(dateStr)
    const now = new Date()
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
  }

  // --- TODAY'S METRICS ---
  const todayRevenue = computed(() => {
    return orderStore.orders
      .filter(o => o.status === 'Completed' && isToday(o.createdAt))
      .reduce((sum, o) => sum + (o.total || 0), 0)
  })

  const todayOrders = computed(() => {
    return orderStore.orders.filter(o => isToday(o.createdAt)).length
  })

  const todayCompletedOrders = computed(() => {
    return orderStore.orders.filter(o => o.status === 'Completed' && isToday(o.createdAt)).length
  })

  const todayProductsSold = computed(() => {
    return orderStore.orders
      .filter(o => o.status === 'Completed' && isToday(o.createdAt))
      .reduce((sum, o) => sum + o.items.reduce((s, i) => s + (i.qty || 0), 0), 0)
  })

  // --- OVERALL / LIFETIME STORE METRICS ---
  const totalSales = computed(() => {
    return orderStore.orders
      .filter(o => o.status === 'Completed')
      .reduce((sum, o) => sum + (o.total || 0), 0)
  })

  const totalOrders = computed(() => {
    return orderStore.orders.length
  })

  const completedOrdersCount = computed(() => {
    return orderStore.orders.filter(o => o.status === 'Completed').length
  })

  const productsSold = computed(() => {
    return orderStore.orders
      .filter(o => o.status === 'Completed')
      .reduce((sum, o) => sum + o.items.reduce((s, i) => s + (i.qty || 0), 0), 0)
  })

  const avgOrderValue = computed(() => {
    const count = completedOrdersCount.value
    if (count === 0) return 0
    return Math.round(totalSales.value / count)
  })

  const totalProducts = computed(() => {
    return productStore.products.filter(p => p.active).length
  })

  const lowStockCount = computed(() => {
    return inventoryStore.lowStockItems.length
  })

  // --- PERIOD METRICS ---
  const weekRevenue = computed(() => {
    return orderStore.orders
      .filter(o => o.status === 'Completed' && isThisWeek(o.createdAt))
      .reduce((sum, o) => sum + (o.total || 0), 0)
  })

  const weekOrders = computed(() => {
    return orderStore.orders.filter(o => isThisWeek(o.createdAt)).length
  })

  const monthRevenue = computed(() => {
    return orderStore.orders
      .filter(o => o.status === 'Completed' && isThisMonth(o.createdAt))
      .reduce((sum, o) => sum + (o.total || 0), 0)
  })

  const monthOrders = computed(() => {
    return orderStore.orders.filter(o => isThisMonth(o.createdAt)).length
  })

  // --- BEST SELLING PRODUCTS ---
  const bestSellingProducts = computed(() => {
    const counts = {}
    orderStore.orders
      .filter(o => o.status === 'Completed')
      .forEach(o => {
        o.items.forEach(item => {
          if (!counts[item.productId]) {
            counts[item.productId] = { name: item.name, qty: 0, revenue: 0 }
          }
          counts[item.productId].qty += item.qty
          counts[item.productId].revenue += item.price * item.qty
        })
      })
    return Object.entries(counts)
      .map(([id, data]) => ({ productId: id, ...data }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5)
  })

  // --- REVENUE TREND (LAST 7 DAYS) ---
  const revenueChart = computed(() => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const label = i === 0 ? 'Today' : d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' })
      const dayStr = d.toDateString()

      const matchingOrders = orderStore.orders.filter(
        o => o.status === 'Completed' && new Date(o.createdAt).toDateString() === dayStr
      )
      const allDayOrders = orderStore.orders.filter(
        o => new Date(o.createdAt).toDateString() === dayStr
      )

      const revenue = matchingOrders.reduce((sum, o) => sum + (o.total || 0), 0)
      days.push({
        label,
        revenue,
        orders: allDayOrders.length,
        completedOrders: matchingOrders.length
      })
    }
    return days
  })

  // --- RECENT ORDERS (LAST 6) ---
  const recentOrders = computed(() => {
    return [...orderStore.orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6)
  })

  return {
    // Today
    todayRevenue,
    todayOrders,
    todayCompletedOrders,
    todayProductsSold,

    // All-time / Lifetime
    totalSales,
    totalOrders,
    completedOrdersCount,
    productsSold,
    avgOrderValue,

    // Product & Inventory
    totalProducts,
    lowStockCount,

    // Time ranges
    weekRevenue,
    weekOrders,
    monthRevenue,
    monthOrders,

    // Charts & tables
    bestSellingProducts,
    revenueChart,
    recentOrders,

    // Date helpers
    isToday,
    isThisWeek,
    isThisMonth,
  }
})
