<template>
  <article
    class="group bg-white dark:bg-espresso-800 rounded-xl overflow-hidden shadow-card hover:shadow-card-hover border border-espresso-800/5 dark:border-cream-100/5 transition-all duration-300 flex flex-col"
  >
    <!-- Image -->
    <RouterLink :to="`/menu/${product.id}`" class="block overflow-hidden relative aspect-[4/3]">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-espresso-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span class="absolute top-3 left-3 bg-cream-50 dark:bg-espresso-700 text-espresso-700 dark:text-cream-200 text-xs font-medium px-2.5 py-1 rounded-full">
        {{ product.category }}
      </span>
    </RouterLink>

    <!-- Content -->
    <div class="p-4 flex flex-col flex-1 gap-2">
      <RouterLink :to="`/menu/${product.id}`">
        <h3 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100 group-hover:text-coffee-DEFAULT dark:group-hover:text-accent transition-colors leading-tight">
          {{ product.name }}
        </h3>
      </RouterLink>

      <p class="text-sm text-espresso-700/70 dark:text-cream-200/60 leading-relaxed line-clamp-2 flex-1">
        {{ product.description }}
      </p>

      <div class="flex items-center justify-between mt-auto pt-3 border-t border-espresso-800/5 dark:border-cream-100/5">
        <span class="font-serif font-bold text-espresso-800 dark:text-cream-100 text-lg">
          {{ formatRupiah(product.price) }}
        </span>
        <button
          @click.prevent="handleAddToCart"
          class="flex items-center gap-1.5 px-3 py-2 bg-espresso-800 dark:bg-cream-100 text-cream-100 dark:text-espresso-800 text-sm font-medium rounded-lg hover:bg-espresso-700 dark:hover:bg-cream-200 transition-colors focus:outline-none focus:ring-2 focus:ring-espresso-800 focus:ring-offset-1"
          :aria-label="`Add ${product.name} to cart`"
        >
          <Plus :size="14" />
          Add
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { Plus } from '@lucide/vue'
import { useCartStore } from '../stores/cartStore'
import { useToast } from '../composables/useToast'
import { formatRupiah } from '../utils/currency'

const props = defineProps({
  product: { type: Object, required: true }
})

const cartStore = useCartStore()
const { toast } = useToast()

function handleAddToCart() {
  cartStore.addToCart(props.product)
  toast.success(`${props.product.name} added to cart`)
}
</script>
