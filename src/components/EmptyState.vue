<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div class="w-16 h-16 rounded-2xl bg-espresso-800/10 dark:bg-cream-100/10 flex items-center justify-center mb-4">
      <component :is="iconComponent" :size="28" class="text-espresso-800/40 dark:text-cream-100/40" />
    </div>
    <h3 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100 mb-2">{{ title }}</h3>
    <p class="text-sm text-espresso-700/60 dark:text-cream-200/50 max-w-xs">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ShoppingCart, Package, Receipt, Coffee, Database, Search } from '@lucide/vue'

const props = defineProps({
  icon: { type: String, default: 'package' },
  title: { type: String, default: 'Nothing here' },
  description: { type: String, default: '' }
})

const iconComponent = computed(() => {
  switch (props.icon) {
    case 'cart': return ShoppingCart
    case 'receipt': return Receipt
    case 'coffee': return Coffee
    case 'database': return Database
    case 'search': return Search
    default: return Package
  }
})
</script>
