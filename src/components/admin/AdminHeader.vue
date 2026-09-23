<template>
  <header class="sticky top-0 z-20 bg-white/95 dark:bg-espresso-800/95 backdrop-blur-sm border-b border-espresso-800/10 dark:border-cream-100/10 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <!-- Mobile sidebar toggle -->
      <button
        @click="$emit('toggle-mobile-sidebar')"
        class="lg:hidden p-2 rounded-lg text-espresso-700 dark:text-cream-200 hover:bg-espresso-800/10 dark:hover:bg-cream-100/10 transition-colors"
        aria-label="Toggle navigation menu"
      >
        <Menu :size="20" />
      </button>

      <div>
        <h1 class="font-serif font-bold text-xl text-espresso-800 dark:text-cream-100 leading-tight">
          {{ title }}
        </h1>
        <p v-if="subtitle" class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-0.5">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <!-- Right controls -->
    <div class="flex items-center gap-2.5 sm:gap-3">
      <!-- Showcase Hub link -->
      <RouterLink
        to="/"
        class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-espresso-700 dark:text-cream-200 bg-espresso-800/5 dark:bg-cream-100/5 border border-espresso-800/10 dark:border-cream-100/10 hover:bg-espresso-800/10 transition-colors"
        title="Return to Public Exhibition Showcase"
      >
        <ArrowLeft :size="13" />
        <span class="hidden sm:inline">Showcase</span>
      </RouterLink>

      <!-- View customer store -->
      <RouterLink
        to="/store"
        class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-coffee-DEFAULT dark:text-accent bg-coffee-DEFAULT/10 dark:bg-accent/10 border border-coffee-DEFAULT/20 dark:border-accent/20 hover:bg-coffee-DEFAULT/15 transition-colors"
        title="Visit live customer storefront"
      >
        <Coffee :size="13" />
        <span class="hidden sm:inline">Storefront</span>
      </RouterLink>

      <!-- Theme toggle -->
      <button
        @click="themeStore.toggleTheme()"
        class="p-2 rounded-lg text-espresso-700 dark:text-cream-200 hover:bg-espresso-800/10 dark:hover:bg-cream-100/10 transition-colors"
        :aria-label="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <Sun v-if="themeStore.isDark" :size="18" />
        <Moon v-else :size="18" />
      </button>

      <!-- Admin avatar/info -->
      <div class="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-espresso-800/10 dark:border-cream-100/10">
        <div class="w-8 h-8 rounded-full bg-coffee-DEFAULT text-cream-100 flex items-center justify-center font-bold text-xs shadow-sm">
          A
        </div>
        <div class="hidden md:block text-left">
          <p class="text-xs font-semibold text-espresso-800 dark:text-cream-100 leading-none">Admin</p>
          <p class="text-[10px] text-espresso-700/60 dark:text-cream-200/50 mt-0.5">Demo Account</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Menu, Sun, Moon, ArrowLeft, Coffee } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import { useThemeStore } from '../../stores/themeStore'

defineProps({
  title: { type: String, default: 'Admin Dashboard' },
  subtitle: { type: String, default: '' },
})

defineEmits(['toggle-mobile-sidebar'])

const themeStore = useThemeStore()
</script>
