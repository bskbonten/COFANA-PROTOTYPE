<template>
  <div class="bg-white dark:bg-espresso-800 rounded-xl p-5 shadow-card border border-espresso-800/5 dark:border-cream-100/5">
    <h3 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100 mb-4">Order Summary</h3>

    <!-- Items summary -->
    <div v-if="showItems" class="space-y-2 mb-4">
      <div
        v-for="item in cartStore.cartItems"
        :key="item.cartId"
        class="flex justify-between text-sm"
      >
        <span class="text-espresso-700/70 dark:text-cream-200/60">
          {{ item.name }} × {{ item.qty }}
        </span>
        <span class="text-espresso-800 dark:text-cream-100 font-medium">
          {{ formatRupiah(item.price * item.qty) }}
        </span>
      </div>
    </div>
    <div v-if="showItems" class="border-t border-espresso-800/5 dark:border-cream-100/5 mb-4" />

    <!-- Price breakdown -->
    <div class="space-y-2 text-sm">
      <div class="flex justify-between text-espresso-700/70 dark:text-cream-200/60">
        <span>Subtotal</span>
        <span>{{ formatRupiah(cartStore.subtotal) }}</span>
      </div>
      <div v-if="cartStore.discount > 0" class="flex justify-between text-sage-DEFAULT">
        <span>Discount</span>
        <span>-{{ formatRupiah(cartStore.discount) }}</span>
      </div>
    </div>

    <div class="border-t border-espresso-800/10 dark:border-cream-100/10 my-3" />

    <div class="flex justify-between font-semibold">
      <span class="text-espresso-800 dark:text-cream-100">Total</span>
      <span class="font-serif text-lg text-espresso-800 dark:text-cream-100">{{ formatRupiah(cartStore.totalPrice) }}</span>
    </div>

    <slot />
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'
import { formatRupiah } from '../utils/currency'

defineProps({
  showItems: { type: Boolean, default: false }
})

const cartStore = useCartStore()
</script>
