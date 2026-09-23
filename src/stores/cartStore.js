import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storageGet, storageSet, KEYS } from '../utils/storage'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])

  // Load from LocalStorage
  function init() {
    cartItems.value = storageGet(KEYS.CART, [])
  }

  function persist() {
    storageSet(KEYS.CART, cartItems.value)
  }

  const totalItems = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.qty, 0)
  )

  const subtotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  )

  // Apply a simple discount logic (10% off if subtotal > 50000)
  const discount = computed(() => {
    return subtotal.value >= 50000 ? 5000 : 0
  })

  const totalPrice = computed(() => subtotal.value - discount.value)

  function addToCart(product, options = {}) {
    const { ice = 'Normal', sugar = 'Normal', qty = 1 } = options

    // Find existing item with same id + customization
    const existing = cartItems.value.find(
      item =>
        item.productId === product.id &&
        item.ice === ice &&
        item.sugar === sugar
    )

    if (existing) {
      existing.qty += qty
    } else {
      cartItems.value.push({
        cartId: `ci_${product.id}_${Date.now()}`,
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        ice: product.category === 'Food' ? null : ice,
        sugar: product.category === 'Food' ? null : sugar,
        qty,
      })
    }
    persist()
  }

  function removeFromCart(cartId) {
    cartItems.value = cartItems.value.filter(item => item.cartId !== cartId)
    persist()
  }

  function increaseQuantity(cartId) {
    const item = cartItems.value.find(i => i.cartId === cartId)
    if (item) {
      item.qty++
      persist()
    }
  }

  function decreaseQuantity(cartId) {
    const item = cartItems.value.find(i => i.cartId === cartId)
    if (item) {
      if (item.qty <= 1) {
        removeFromCart(cartId)
      } else {
        item.qty--
        persist()
      }
    }
  }

  function clearCart() {
    cartItems.value = []
    persist()
  }

  return {
    cartItems,
    totalItems,
    subtotal,
    discount,
    totalPrice,
    init,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  }
})
