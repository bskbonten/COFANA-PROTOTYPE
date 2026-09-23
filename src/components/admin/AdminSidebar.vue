<template>
  <!-- Desktop sidebar -->
  <aside
    class="hidden lg:flex flex-col w-64 min-h-screen bg-espresso-800 dark:bg-espresso-900 fixed top-0 left-0 z-30"
  >
    <!-- Brand -->
    <div class="px-6 py-5 border-b border-cream-100/10">
      <RouterLink to="/admin/dashboard" class="flex items-center gap-2.5">
        <div class="w-8 h-8 bg-cream-100/20 rounded-lg flex items-center justify-center">
          <span class="font-serif text-cream-100 text-sm font-bold">C</span>
        </div>
        <div>
          <p class="font-serif font-bold text-cream-100 tracking-wide leading-none">COFANA</p>
          <p class="text-cream-100/40 text-[10px] mt-0.5 uppercase tracking-wider">Admin Portal</p>
        </div>
      </RouterLink>
    </div>

    <!-- Nav -->
    <nav class="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin">
      <ul class="space-y-1">
        <li v-for="item in navItems" :key="item.to">
          <RouterLink
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
            :class="isActive(item.to)
              ? 'bg-cream-100/15 text-cream-100 font-semibold'
              : 'text-cream-100/60 hover:bg-cream-100/10 hover:text-cream-100'"
          >
            <component :is="item.icon" :size="18" class="shrink-0" />
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>

      <!-- Quick External / Exhibition Links -->
      <div class="pt-4 mt-4 border-t border-cream-100/10">
        <p class="px-3 text-[10px] uppercase tracking-wider text-cream-100/40 font-semibold mb-2">Exhibition Links</p>
        <ul class="space-y-1">
          <li>
            <RouterLink
              to="/"
              class="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-cream-100/70 hover:bg-cream-100/10 hover:text-cream-100 transition-colors"
            >
              <ArrowLeft :size="15" class="shrink-0 text-coffee-light dark:text-accent" />
              <span>Showcase Hub</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/store"
              class="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-cream-100/70 hover:bg-cream-100/10 hover:text-cream-100 transition-colors"
            >
              <Coffee :size="15" class="shrink-0 text-coffee-light dark:text-accent" />
              <span>Customer Storefront</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Footer -->
    <div class="px-3 py-4 border-t border-cream-100/10">
      <button
        @click="handleLogout"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-cream-100/60 hover:text-cream-100 hover:bg-cream-100/10 w-full transition-all duration-200"
      >
        <LogOut :size="18" class="shrink-0" />
        Sign Out
      </button>
    </div>
  </aside>

  <!-- Mobile sidebar overlay -->
  <Transition name="fade">
    <div
      v-if="mobileOpen"
      class="lg:hidden fixed inset-0 z-40 bg-espresso-800/70 backdrop-blur-sm"
      @click="$emit('update:mobileOpen', false)"
    />
  </Transition>

  <!-- Mobile sidebar panel -->
  <Transition name="slide-right">
    <aside
      v-if="mobileOpen"
      class="lg:hidden fixed top-0 left-0 z-50 flex flex-col w-64 min-h-screen bg-espresso-800 dark:bg-espresso-900"
    >
      <div class="px-6 py-5 border-b border-cream-100/10 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 bg-cream-100/20 rounded-lg flex items-center justify-center">
            <span class="font-serif text-cream-100 text-sm font-bold">C</span>
          </div>
          <span class="font-serif font-bold text-cream-100 tracking-wide">COFANA</span>
        </div>
        <button
          @click="$emit('update:mobileOpen', false)"
          class="p-1.5 text-cream-100/60 hover:text-cream-100 transition-colors"
          aria-label="Close menu"
        >
          <X :size="18" />
        </button>
      </div>

      <nav class="flex-1 px-3 py-4 overflow-y-auto">
        <ul class="space-y-1">
          <li v-for="item in navItems" :key="item.to">
            <RouterLink
              :to="item.to"
              @click="$emit('update:mobileOpen', false)"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
              :class="isActive(item.to)
                ? 'bg-cream-100/15 text-cream-100 font-semibold'
                : 'text-cream-100/60 hover:bg-cream-100/10 hover:text-cream-100'"
            >
              <component :is="item.icon" :size="18" class="shrink-0" />
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>

        <div class="pt-4 mt-4 border-t border-cream-100/10">
          <p class="px-3 text-[10px] uppercase tracking-wider text-cream-100/40 font-semibold mb-2">Exhibition Links</p>
          <ul class="space-y-1">
            <li>
              <RouterLink
                to="/"
                @click="$emit('update:mobileOpen', false)"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-cream-100/70 hover:bg-cream-100/10 hover:text-cream-100 transition-colors"
              >
                <ArrowLeft :size="15" class="shrink-0 text-coffee-light dark:text-accent" />
                <span>Showcase Hub</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/store"
                @click="$emit('update:mobileOpen', false)"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-cream-100/70 hover:bg-cream-100/10 hover:text-cream-100 transition-colors"
              >
                <Coffee :size="15" class="shrink-0 text-coffee-light dark:text-accent" />
                <span>Customer Storefront</span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </nav>

      <div class="px-3 py-4 border-t border-cream-100/10">
        <button
          @click="handleLogout"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-cream-100/60 hover:text-cream-100 hover:bg-cream-100/10 w-full transition-all duration-200"
        >
          <LogOut :size="18" class="shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {
  LayoutDashboard, Package, Receipt, BarChart2, Settings,
  Database, LogOut, X, ArrowLeft, Coffee
} from '@lucide/vue'
import { useAuthStore } from '../../stores/authStore'
import { useToast } from '../../composables/useToast'

defineProps({
  mobileOpen: { type: Boolean, default: false }
})
defineEmits(['update:mobileOpen'])

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { toast } = useToast()

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: Receipt },
  { to: '/admin/inventory', label: 'Inventory', icon: Database },
  { to: '/admin/sales', label: 'Sales', icon: BarChart2 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

function isActive(path) {
  return route.path.startsWith(path)
}

function handleLogout() {
  authStore.logout()
  toast.info('Signed out successfully')
  router.push({ name: 'admin-login' })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-right-enter-active { transition: transform 0.25s ease-out; }
.slide-right-leave-active { transition: transform 0.2s ease-in; }
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(-100%); }
</style>
