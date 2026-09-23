<template>
  <div class="flex items-center justify-center py-12">
    <div class="flex flex-col items-center gap-3">
      <div class="w-10 h-10 border-2 border-espresso-800/20 dark:border-cream-100/20 border-t-espresso-800 dark:border-t-cream-100 rounded-full animate-spin" />
      <p class="text-sm text-espresso-700/60 dark:text-cream-200/50">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: { type: String, default: 'Loading...' }
})
</script>
