<template>
  <div class="relative">
    <Search :size="16" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-700/40 dark:text-cream-200/40 pointer-events-none" />
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="search"
      :placeholder="placeholder"
      class="form-input pl-10"
    />
  </div>
</template>

<script setup>
import { Search } from '@lucide/vue'

defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Search...' }
})

defineEmits(['update:modelValue'])
</script>
