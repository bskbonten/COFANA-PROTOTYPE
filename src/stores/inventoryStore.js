import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storageGet, storageSet, KEYS } from '../utils/storage'
import { DEFAULT_INVENTORY } from '../data/defaults'

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref([])

  function init() {
    const saved = storageGet(KEYS.INVENTORY, null)
    items.value = saved && saved.length > 0 ? saved : [...DEFAULT_INVENTORY]
    if (!saved) persist()
  }

  function persist() {
    storageSet(KEYS.INVENTORY, items.value)
  }

  function getStatus(item) {
    if (item.quantity <= 0) return 'Out of Stock'
    if (item.quantity <= item.minStock) return 'Low Stock'
    return 'In Stock'
  }

  const inventoryWithStatus = computed(() =>
    items.value.map(item => ({ ...item, status: getStatus(item) }))
  )

  const lowStockItems = computed(() =>
    inventoryWithStatus.value.filter(i => i.status === 'Low Stock' || i.status === 'Out of Stock')
  )

  function addInventory(item) {
    const newItem = { ...item, id: 'inv' + Date.now() }
    items.value.push(newItem)
    persist()
    return newItem
  }

  function updateStock(id, quantity) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.quantity = Math.max(0, quantity)
      persist()
    }
  }

  function updateItem(id, updates) {
    const idx = items.value.findIndex(i => i.id === id)
    if (idx > -1) {
      items.value[idx] = { ...items.value[idx], ...updates }
      persist()
    }
  }

  function deleteInventory(id) {
    items.value = items.value.filter(i => i.id !== id)
    persist()
  }

  return {
    items,
    inventoryWithStatus,
    lowStockItems,
    init,
    addInventory,
    updateStock,
    updateItem,
    deleteInventory,
    getStatus,
  }
})
