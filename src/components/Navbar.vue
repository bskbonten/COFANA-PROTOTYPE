<template>
  <header class="sticky top-0 z-40 bg-cream-50/95 dark:bg-espresso-900/95 backdrop-blur-sm border-b border-espresso-800/10 dark:border-cream-100/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Brand / Logo -> /store -->
        <div class="flex items-center gap-4">
          <RouterLink to="/store" class="flex items-center gap-2.5 group">
            <div class="w-8 h-8 bg-espresso-800 rounded-lg flex items-center justify-center">
              <span class="font-serif text-cream-100 text-sm font-bold">C</span>
            </div>
            <span class="font-serif font-bold text-xl text-espresso-800 dark:text-cream-100 tracking-wide">COFANA</span>
          </RouterLink>

          <!-- Back to Showcase link -->
          <RouterLink
            to="/"
            class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-espresso-700/70 dark:text-cream-200/70 hover:text-espresso-800 dark:hover:text-cream-100 bg-espresso-800/5 dark:bg-cream-100/5 border border-espresso-800/10 dark:border-cream-100/10 hover:bg-espresso-800/10 transition-colors"
            title="Return to Exhibition Showcase"
          >
            <ArrowLeft :size="12" />
            <span>Showcase Hub</span>
          </RouterLink>
        </div>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-8">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm font-medium text-espresso-700 dark:text-cream-200 hover:text-espresso-800 dark:hover:text-cream-100 transition-colors"
            :class="{ 'text-espresso-800 dark:text-cream-100 border-b-2 border-espresso-800 dark:border-cream-100 pb-0.5': isActive(link.to) }"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Right side actions -->
        <div class="flex items-center gap-3">
          <!-- Theme toggle -->
          <button
            @click="themeStore.toggleTheme()"
            class="p-2 rounded-lg text-espresso-700 dark:text-cream-200 hover:bg-espresso-800/10 dark:hover:bg-cream-100/10 transition-colors"
            :aria-label="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <Sun v-if="themeStore.isDark" :size="18" />
            <Moon v-else :size="18" />
          </button>

          <!-- Cart icon -->
          <RouterLink to="/cart" class="relative p-2 rounded-lg text-espresso-700 dark:text-cream-200 hover:bg-espresso-800/10 dark:hover:bg-cream-100/10 transition-colors" aria-label="View cart">
            <ShoppingCart :size="20" />
            <span
              v-if="cartStore.totalItems > 0"
              class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-espresso-800 dark:bg-accent text-cream-100 text-xs font-bold rounded-full flex items-center justify-center"
            >
              {{ cartStore.totalItems > 99 ? '99+' : cartStore.totalItems }}
            </span>
          </RouterLink>

          <!-- Mobile menu button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 rounded-lg text-espresso-700 dark:text-cream-200 hover:bg-espresso-800/10 transition-colors"
            :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          >
            <X v-if="isMobileMenuOpen" :size="20" />
            <Menu v-else :size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <MobileMenu v-if="isMobileMenuOpen" :links="navLinks" @close="isMobileMenuOpen = false" />
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ShoppingCart, Menu, X, Sun, Moon, ArrowLeft } from '@lucide/vue'
import { useCartStore } from '../stores/cartStore'
import { useThemeStore } from '../stores/themeStore'
import MobileMenu from './MobileMenu.vue'

const cartStore = useCartStore()
const themeStore = useThemeStore()
const route = useRoute()
const isMobileMenuOpen = ref(false)

const navLinks = [
  { to: '/store', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/cart', label: 'Cart' },
]

function isActive(path) {
  if (path === '/store') return route.path === '/store'
  return route.path.startsWith(path)
}
</script>

<style scoped>
.slide-down-enter-active { transition: all 0.2s ease-out; }
.slide-down-leave-active { transition: all 0.15s ease-in; }
.slide-down-enter-from,
.slide-down-leave-to { transform: translateY(-8px); opacity: 0; }
</style>
