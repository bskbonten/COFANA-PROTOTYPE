import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storageGet, storageSet, KEYS } from '../utils/storage'
import { getInitialOrders } from '../data/defaults'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const selectedOrder = ref(null)

  function init() {
    const saved = storageGet(KEYS.ORDERS, null)

    // Check if saved orders exist and have recent orders
    if (!saved || !Array.isArray(saved) || saved.length < 15) {
      orders.value = getInitialOrders()
      persist()
      return
    }

    // Check if saved orders have any orders from today
    const now = new Date()
    const hasTodayOrder = saved.some(o => {
      if (!o.createdAt) return false
      const d = new Date(o.createdAt)
      return (
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()
      )
    })

    // If existing local storage orders are from an earlier test session with no orders today,
    // refresh with realistic demo orders so the live dashboard never appears blank.
    if (!hasTodayOrder) {
      orders.value = getInitialOrders()
      persist()
    } else {
      orders.value = saved
    }
  }

  function persist() {
    storageSet(KEYS.ORDERS, orders.value)
  }

  function generateOrderId() {
    let max = 0
    orders.value.forEach(o => {
      const num = parseInt(o.id.replace('CFN-', ''), 10)
      if (!isNaN(num) && num > max) max = num
    })
    return 'CFN-' + String(max + 1).padStart(5, '0')
  }

  function createOrder({ customer, items, subtotal, discount, total, payment }) {
    const order = {
      id: generateOrderId(),
      customer,
      items: items.map(i => ({ ...i })), // snapshot
      subtotal,
      discount,
      total,
      payment,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }
    orders.value = [order, ...orders.value]
    persist()
    return order
  }

  function updateOrderStatus(id, status) {
    const idx = orders.value.findIndex(o => o.id === id)
    if (idx > -1) {
      orders.value[idx] = { ...orders.value[idx], status }
      orders.value = [...orders.value] // trigger reactivity
      persist()
    }
  }

  function getOrderById(id) {
    return orders.value.find(o => o.id === id) || null
  }

  const ORDER_STATUSES = ['Pending', 'Processing', 'Ready', 'Completed', 'Cancelled']

  // Only completed orders count towards sales/revenue
  const completedOrders = computed(() =>
    orders.value.filter(o => o.status === 'Completed')
  )

  return {
    orders,
    selectedOrder,
    ORDER_STATUSES,
    completedOrders,
    init,
    createOrder,
    updateOrderStatus,
    getOrderById,
    persist,
  }
})
