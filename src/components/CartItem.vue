<template>
  <div class="flex items-start gap-4 py-4 border-b border-espresso-800/5 dark:border-cream-100/5 last:border-0">
    <!-- Image -->
    <img
      :src="item.image"
      :alt="item.name"
      class="w-16 h-16 rounded-lg object-cover shrink-0"
    />

    <!-- Details -->
    <div class="flex-1 min-w-0">
      <h4 class="font-medium text-espresso-800 dark:text-cream-100 text-sm">{{ item.name }}</h4>
      <div v-if="item.ice || item.sugar" class="text-xs text-espresso-700/50 dark:text-cream-200/50 mt-0.5">
        <span v-if="item.ice">Ice: {{ item.ice }}</span>
        <span v-if="item.ice && item.sugar" class="mx-1">·</span>
        <span v-if="item.sugar">Sugar: {{ item.sugar }}</span>
      </div>
      <p class="text-sm font-medium text-espresso-800 dark:text-cream-100 mt-1">
        {{ formatRupiah(item.price) }}
      </p>

      <div class="flex items-center justify-between mt-2">
        <QuantitySelector
          :quantity="item.qty"
          @increase="cartStore.increaseQuantity(item.cartId)"
          @decrease="cartStore.decreaseQuantity(item.cartId)"
        />
        <button
          @click="handleRemove"
          class="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
          aria-label="Remove item"
        >
          <Trash2 :size="14" />
        </button>
      </div>
    </div>

    <!-- Subtotal -->
    <div class="text-right shrink-0">
      <span class="font-semibold text-espresso-800 dark:text-cream-100 text-sm">
        {{ formatRupiah(item.price * item.qty) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { Trash2 } from '@lucide/vue'
import { useCartStore } from '../stores/cartStore'
import { useToast } from '../composables/useToast'
import { formatRupiah } from '../utils/currency'
import QuantitySelector from './QuantitySelector.vue'

const props = defineProps({
  item: { type: Object, required: true }
})

const cartStore = useCartStore()
const { toast } = useToast()

function handleRemove() {
  cartStore.removeFromCart(props.item.cartId)
  toast.info('Item removed from cart')
}
</script>
