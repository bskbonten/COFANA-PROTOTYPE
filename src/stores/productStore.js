import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storageGet, storageSet, KEYS } from '../utils/storage'
import { DEFAULT_PRODUCTS } from '../data/defaults'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const searchQuery = ref('')
  const selectedCategory = ref('All')
  const sorting = ref('default')
  const selectedProduct = ref(null)

  const categories = ['All', 'Coffee', 'Non-Coffee', 'Food']

  // Initialize from LocalStorage or defaults
  function init() {
    const saved = storageGet(KEYS.PRODUCTS, null)
    products.value = saved && saved.length > 0 ? saved : [...DEFAULT_PRODUCTS]
    if (!saved) persist()
  }

  function persist() {
    storageSet(KEYS.PRODUCTS, products.value)
  }

  // Filtered + sorted products for display
  const filteredProducts = computed(() => {
    let list = products.value.filter(p => p.active)

    if (selectedCategory.value !== 'All') {
      list = list.filter(p => p.category === selectedCategory.value)
    }

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }

    switch (sorting.value) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price)
      case 'name-asc': return [...list].sort((a, b) => a.name.localeCompare(b.name))
      default: return list
    }
  })

  const featuredProducts = computed(() =>
    products.value.filter(p => p.active && p.featured).slice(0, 6)
  )

  // All products for admin (includes inactive)
  const allProducts = computed(() => products.value)

  function getProductById(id) {
    return products.value.find(p => p.id === id) || null
  }

  function addProduct(product) {
    const newProduct = {
      ...product,
      id: 'p' + Date.now(),
      active: product.active ?? true,
      featured: product.featured ?? false,
    }
    products.value.push(newProduct)
    persist()
    return newProduct
  }

  function updateProduct(id, updates) {
    const idx = products.value.findIndex(p => p.id === id)
    if (idx > -1) {
      products.value[idx] = { ...products.value[idx], ...updates }
      persist()
    }
  }

  function deleteProduct(id) {
    products.value = products.value.filter(p => p.id !== id)
    persist()
  }

  function toggleActive(id) {
    const product = products.value.find(p => p.id === id)
    if (product) {
      product.active = !product.active
      persist()
    }
  }

  return {
    products,
    allProducts,
    filteredProducts,
    featuredProducts,
    searchQuery,
    selectedCategory,
    sorting,
    selectedProduct,
    categories,
    init,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleActive,
  }
})
