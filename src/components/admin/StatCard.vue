<template>
  <div class="card p-5 transition-all duration-200 hover:shadow-card-hover flex flex-col justify-between">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs font-medium uppercase tracking-wider text-espresso-700/60 dark:text-cream-200/60 mb-1">
          {{ title }}
        </p>
        <h3 class="font-serif font-bold text-2xl text-espresso-800 dark:text-cream-100">
          {{ value }}
        </h3>
      </div>
      <div
        class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        :class="iconBgClass"
      >
        <component :is="icon" :size="20" :class="iconColorClass" />
      </div>
    </div>

    <div v-if="subtitle || change !== undefined" class="mt-4 pt-3 border-t border-espresso-800/5 dark:border-cream-100/5 flex items-center justify-between text-xs">
      <span class="text-espresso-700/60 dark:text-cream-200/50">{{ subtitle }}</span>
      <span
        v-if="change !== undefined"
        class="font-medium"
        :class="change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'"
      >
        {{ change >= 0 ? '+' : '' }}{{ change }}%
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  subtitle: { type: String, default: '' },
  change: { type: Number, default: undefined },
  icon: { type: Object, required: true },
  color: { type: String, default: 'espresso' } // 'espresso' | 'coffee' | 'sage' | 'amber'
})

const iconBgClass = computed(() => {
  switch (props.color) {
    case 'coffee':
      return 'bg-coffee-DEFAULT/15 dark:bg-coffee-DEFAULT/25'
    case 'sage':
      return 'bg-sage-DEFAULT/15 dark:bg-sage-DEFAULT/25'
    case 'amber':
      return 'bg-amber-500/15 dark:bg-amber-500/25'
    case 'red':
      return 'bg-red-500/15 dark:bg-red-500/25'
    default:
      return 'bg-espresso-800/10 dark:bg-cream-100/10'
  }
})

const iconColorClass = computed(() => {
  switch (props.color) {
    case 'coffee':
      return 'text-coffee-DEFAULT dark:text-accent'
    case 'sage':
      return 'text-sage-DEFAULT dark:text-sage-light'
    case 'amber':
      return 'text-amber-600 dark:text-amber-400'
    case 'red':
      return 'text-red-600 dark:text-red-400'
    default:
      return 'text-espresso-800 dark:text-cream-100'
  }
})
</script>
