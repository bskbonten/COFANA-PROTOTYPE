<template>
  <div class="flex items-center gap-2">
    <button
      @click="$emit('decrease')"
      class="w-8 h-8 rounded-lg bg-espresso-800/10 dark:bg-cream-100/10 flex items-center justify-center hover:bg-espresso-800/20 dark:hover:bg-cream-100/20 transition-colors focus:outline-none focus:ring-2 focus:ring-espresso-800"
      :aria-label="`Decrease quantity`"
    >
      <Minus :size="14" />
    </button>
    <span class="w-8 text-center font-medium text-espresso-800 dark:text-cream-100 text-sm">{{ quantity }}</span>
    <button
      @click="$emit('increase')"
      class="w-8 h-8 rounded-lg bg-espresso-800 dark:bg-cream-100 text-cream-100 dark:text-espresso-800 flex items-center justify-center hover:bg-espresso-700 dark:hover:bg-cream-200 transition-colors focus:outline-none focus:ring-2 focus:ring-espresso-800"
      :aria-label="`Increase quantity`"
    >
      <Plus :size="14" />
    </button>
  </div>
</template>

<script setup>
import { Minus, Plus } from '@lucide/vue'

defineProps({
  quantity: { type: Number, required: true }
})

defineEmits(['increase', 'decrease'])
</script>
