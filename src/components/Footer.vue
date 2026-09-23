<template>
  <footer class="bg-espresso-800 dark:bg-espresso-900 text-cream-100/80 border-t border-cream-100/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-cream-100/20 rounded-lg flex items-center justify-center">
              <span class="font-serif text-cream-100 text-sm font-bold">C</span>
            </div>
            <span class="font-serif font-bold text-xl text-cream-100 tracking-wide">COFANA</span>
          </div>
          <p class="font-serif italic text-cream-100/60 text-sm mb-4">Good Coffee, Better Moments.</p>
          <p class="text-sm text-cream-100/60 leading-relaxed max-w-sm mb-4">
            {{ settings.description || 'Crafted coffee for your everyday moments. Quality beans, expert hands, and a warm welcome every visit.' }}
          </p>
          <RouterLink
            to="/"
            class="inline-flex items-center gap-1.5 text-xs font-medium text-coffee-light dark:text-accent hover:underline"
          >
            <span>← Return to Public Exhibition Showcase</span>
          </RouterLink>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="text-cream-100 font-semibold text-sm tracking-wide uppercase mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in links" :key="link.to">
              <RouterLink :to="link.to" class="text-sm text-cream-100/60 hover:text-cream-100 transition-colors">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-cream-100 font-semibold text-sm tracking-wide uppercase mb-4">Visit Us</h4>
          <ul class="space-y-3 text-sm text-cream-100/60">
            <li class="flex items-start gap-2">
              <Clock :size="14" class="mt-0.5 shrink-0 text-cream-100/40" />
              <span>{{ settings.openingHours || 'Mon–Sat: 07:00 – 22:00' }}</span>
            </li>
            <li class="flex items-start gap-2">
              <Phone :size="14" class="mt-0.5 shrink-0 text-cream-100/40" />
              <span>{{ settings.whatsapp || '+62 812-3456-7890' }}</span>
            </li>
            <li class="flex items-start gap-2">
              <MapPin :size="14" class="mt-0.5 shrink-0 text-cream-100/40" />
              <span>{{ settings.address || 'Jl. Kopi No. 88, Jakarta Selatan' }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-cream-100/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-cream-100/40">© 2026 COFANA. Built for Exhibition & Showcase Demonstration.</p>
        <div class="flex items-center gap-3 text-xs text-cream-100/40">
          <RouterLink to="/" class="hover:text-cream-100 transition-colors">Showcase</RouterLink>
          <span>·</span>
          <RouterLink to="/store" class="hover:text-cream-100 transition-colors">Store</RouterLink>
          <span>·</span>
          <RouterLink to="/admin/login" class="hover:text-cream-100 transition-colors">Admin Demo</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Clock, Phone, MapPin } from '@lucide/vue'
import { storageGet, KEYS } from '../utils/storage'
import { DEFAULT_SETTINGS } from '../data/defaults'

const settings = computed(() => storageGet(KEYS.SETTINGS, DEFAULT_SETTINGS) || DEFAULT_SETTINGS)

const links = [
  { to: '/', label: 'Showcase Hub' },
  { to: '/store', label: 'Coffee Storefront' },
  { to: '/menu', label: 'Our Menu' },
  { to: '/cart', label: 'Cart' },
  { to: '/admin/login', label: 'Admin Portal' },
]
</script>
