<template>
  <div class="md:hidden bg-cream-50 dark:bg-espresso-900 border-t border-espresso-800/10 dark:border-cream-100/5">
    <nav class="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        @click="$emit('close')"
        class="px-4 py-3 rounded-lg text-sm font-medium text-espresso-700 dark:text-cream-200 hover:bg-espresso-800/10 dark:hover:bg-cream-100/10 transition-colors"
        :class="{ 'bg-espresso-800/10 dark:bg-cream-100/10 text-espresso-800 dark:text-cream-100': isActive(link.to) }"
      >
        {{ link.label }}
      </RouterLink>

      <div class="pt-2 mt-2 border-t border-espresso-800/10 dark:border-cream-100/10 flex flex-col gap-1">
        <RouterLink
          to="/"
          @click="$emit('close')"
          class="px-4 py-2.5 rounded-lg text-xs font-semibold text-coffee-DEFAULT dark:text-accent hover:bg-espresso-800/10 dark:hover:bg-cream-100/10 transition-colors flex items-center gap-2"
        >
          <ArrowLeft :size="14" />
          <span>← Back to Showcase Hub</span>
        </RouterLink>

        <RouterLink
          to="/admin/login"
          @click="$emit('close')"
          class="px-4 py-2.5 rounded-lg text-xs font-semibold text-espresso-700/70 dark:text-cream-200/70 hover:bg-espresso-800/10 dark:hover:bg-cream-100/10 transition-colors flex items-center gap-2"
        >
          <LayoutDashboard :size="14" />
          <span>Admin Portal</span>
        </RouterLink>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { ArrowLeft, LayoutDashboard } from '@lucide/vue'

const props = defineProps({
  links: { type: Array, required: true }
})

const emit = defineEmits(['close'])
const route = useRoute()

function isActive(path) {
  if (path === '/store') return route.path === '/store'
  return route.path.startsWith(path)
}
</script>
