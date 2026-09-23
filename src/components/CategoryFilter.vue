<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="cat in categories"
      :key="cat"
      @click="$emit('update:modelValue', cat)"
      class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-espresso-800 focus:ring-offset-2"
      :class="modelValue === cat
        ? 'bg-espresso-800 text-cream-100 shadow-sm'
        : 'bg-white dark:bg-espresso-800 text-espresso-700 dark:text-cream-200 border border-espresso-800/15 dark:border-cream-100/10 hover:bg-espresso-800/10 dark:hover:bg-cream-100/10'"
    >
      {{ cat }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  categories: { type: Array, required: true },
  modelValue: { type: String, required: true }
})

defineEmits(['update:modelValue'])
</script>
