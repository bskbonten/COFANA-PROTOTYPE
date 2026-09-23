<template>
  <div class="min-h-screen flex flex-col bg-cream-50 dark:bg-espresso-900 transition-colors duration-300">
    <!-- Top Bar -->
    <header class="border-b border-espresso-800/10 dark:border-cream-100/10 bg-white/70 dark:bg-espresso-800/70 backdrop-blur-sm sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-espresso-800 dark:bg-cream-100 rounded-xl flex items-center justify-center shadow-sm">
            <span class="font-serif text-cream-100 dark:text-espresso-800 text-base font-bold">C</span>
          </div>
          <div>
            <span class="font-serif font-bold text-xl text-espresso-800 dark:text-cream-100 tracking-wide block leading-none">COFANA</span>
            <span class="text-[10px] uppercase tracking-wider text-espresso-700/60 dark:text-cream-200/50">Coffee Management System</span>
          </div>
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-coffee-DEFAULT/10 text-coffee-DEFAULT dark:bg-accent/15 dark:text-accent border border-coffee-DEFAULT/20 dark:border-accent/20">
            <span class="w-1.5 h-1.5 rounded-full bg-coffee-DEFAULT dark:bg-accent animate-pulse"></span>
            Demo Project
          </span>

          <!-- Theme toggle -->
          <button
            @click="themeStore.toggleTheme()"
            class="p-2 rounded-lg text-espresso-700 dark:text-cream-200 hover:bg-espresso-800/10 dark:hover:bg-cream-100/10 transition-colors"
            :aria-label="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <Sun v-if="themeStore.isDark" :size="18" />
            <Moon v-else :size="18" />
          </button>
        </div>
      </div>
    </header>

    <!-- Main Showcase Content -->
    <main class="flex-1 py-12 sm:py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Exhibition Hero -->
        <div class="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-sage-DEFAULT/15 text-sage-dark dark:text-sage-light mb-6 border border-sage-DEFAULT/20">
            <span>PUBLIC EXHIBITION & INTERACTIVE DEMO</span>
          </div>

          <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-espresso-800 dark:text-cream-100 tracking-tight leading-[1.15] mb-4">
            Smart Coffee Business Management
          </h1>

          <p class="text-base sm:text-lg text-espresso-700/80 dark:text-cream-200/70 font-normal leading-relaxed max-w-2xl mx-auto mb-8">
            A modern coffee shop system that connects customer ordering with business management.
          </p>

          <p class="text-xs uppercase tracking-widest text-espresso-700/50 dark:text-cream-200/40 font-medium">
            Select a demo mode below to explore the application
          </p>
        </div>

        <!-- Two Primary Demo Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <!-- Option A: Customer Store Demo -->
          <div class="card p-7 sm:p-9 flex flex-col justify-between hover:shadow-card-hover transition-all duration-300 border-2 hover:border-coffee-DEFAULT/30 dark:hover:border-accent/40 group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-coffee-DEFAULT/5 dark:bg-accent/5 rounded-bl-full pointer-events-none -mr-6 -mt-6"></div>

            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-coffee-DEFAULT/10 text-coffee-DEFAULT dark:bg-accent/15 dark:text-accent">
                  <Coffee :size="13" />
                  Customer Experience
                </span>
                <span class="text-xs text-espresso-700/50 dark:text-cream-200/40 font-mono">Storefront</span>
              </div>

              <h2 class="font-serif font-bold text-2xl sm:text-3xl text-espresso-800 dark:text-cream-100 mb-3 group-hover:text-coffee-DEFAULT dark:group-hover:text-accent transition-colors">
                Coffee Store Demo
              </h2>

              <p class="text-sm text-espresso-700/80 dark:text-cream-200/70 leading-relaxed mb-6">
                Experience the customer side of COFANA. Browse curated drinks, customize sweetness and ice, manage the cart, and simulate instant checkout.
              </p>

              <!-- Feature Breakdown Checklist -->
              <div class="bg-cream-50/80 dark:bg-espresso-900/60 rounded-xl p-5 border border-espresso-800/5 dark:border-cream-100/5 mb-8">
                <p class="text-xs font-semibold uppercase tracking-wider text-espresso-800 dark:text-cream-100 mb-3 flex items-center gap-1.5">
                  <CheckCircle :size="14" class="text-coffee-DEFAULT dark:text-accent" />
                  What you can test:
                </p>
                <ul class="space-y-2 text-xs sm:text-sm text-espresso-700/80 dark:text-cream-200/70">
                  <li class="flex items-start gap-2.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-coffee-DEFAULT dark:bg-accent mt-2 shrink-0"></span>
                    <span><strong>Browse coffee menu</strong> with category filters & search</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-coffee-DEFAULT dark:bg-accent mt-2 shrink-0"></span>
                    <span><strong>View product details</strong> with rich notes & images</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-coffee-DEFAULT dark:bg-accent mt-2 shrink-0"></span>
                    <span><strong>Customize drinks</strong> (Normal / Less / No Ice & Sugar)</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-coffee-DEFAULT dark:bg-accent mt-2 shrink-0"></span>
                    <span><strong>Add to cart</strong> with real-time price & volume counter</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-coffee-DEFAULT dark:bg-accent mt-2 shrink-0"></span>
                    <span><strong>Checkout</strong> with QRIS or Cash on pickup</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-coffee-DEFAULT dark:bg-accent mt-2 shrink-0"></span>
                    <span><strong>Order confirmation</strong> with unique reference number</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Primary Action -->
            <RouterLink
              to="/store"
              class="btn-primary w-full py-4 text-sm font-semibold tracking-wider uppercase shadow-md hover:shadow-lg flex items-center justify-center gap-2 group-hover:bg-coffee-DEFAULT transition-colors"
            >
              <span>EXPLORE COFFEE STORE</span>
              <ArrowRight :size="16" class="group-hover:translate-x-1 transition-transform" />
            </RouterLink>
          </div>

          <!-- Option B: Admin Dashboard Demo -->
          <div class="card p-7 sm:p-9 flex flex-col justify-between hover:shadow-card-hover transition-all duration-300 border-2 hover:border-sage-DEFAULT/30 dark:hover:border-sage-light/40 group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-sage-DEFAULT/5 dark:bg-sage-DEFAULT/10 rounded-bl-full pointer-events-none -mr-6 -mt-6"></div>

            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-sage-DEFAULT/15 text-sage-dark dark:text-sage-light">
                  <LayoutDashboard :size="13" />
                  Business Management
                </span>
                <span class="text-xs text-espresso-700/50 dark:text-cream-200/40 font-mono">Back Office</span>
              </div>

              <h2 class="font-serif font-bold text-2xl sm:text-3xl text-espresso-800 dark:text-cream-100 mb-3 group-hover:text-sage-dark dark:group-hover:text-sage-light transition-colors">
                Admin Dashboard Demo
              </h2>

              <p class="text-sm text-espresso-700/80 dark:text-cream-200/70 leading-relaxed mb-6">
                Explore the business owner portal. Inspect real-time sales revenue, process customer orders, adjust inventory supplies, and manage products.
              </p>

              <!-- Feature Breakdown Checklist -->
              <div class="bg-cream-50/80 dark:bg-espresso-900/60 rounded-xl p-5 border border-espresso-800/5 dark:border-cream-100/5 mb-8">
                <p class="text-xs font-semibold uppercase tracking-wider text-espresso-800 dark:text-cream-100 mb-3 flex items-center gap-1.5">
                  <CheckCircle :size="14" class="text-sage-DEFAULT dark:text-sage-light" />
                  What you can test:
                </p>
                <ul class="space-y-2 text-xs sm:text-sm text-espresso-700/80 dark:text-cream-200/70">
                  <li class="flex items-start gap-2.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-sage-DEFAULT dark:bg-sage-light mt-2 shrink-0"></span>
                    <span><strong>Live Dashboard</strong> with revenue, orders & bestsellers</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-sage-DEFAULT dark:bg-sage-light mt-2 shrink-0"></span>
                    <span><strong>Sales Analytics</strong> with 7-day revenue & order trends</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-sage-DEFAULT dark:bg-sage-light mt-2 shrink-0"></span>
                    <span><strong>Order Management</strong> with live status transitions</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-sage-DEFAULT dark:bg-sage-light mt-2 shrink-0"></span>
                    <span><strong>Product CRUD</strong> with price, stock, active toggle</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-sage-DEFAULT dark:bg-sage-light mt-2 shrink-0"></span>
                    <span><strong>Inventory Supplies</strong> with auto-threshold tracking</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-sage-DEFAULT dark:bg-sage-light mt-2 shrink-0"></span>
                    <span><strong>Store Settings</strong> & Light/Dark theme persistence</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Primary Action -->
            <RouterLink
              to="/admin/login"
              class="btn-primary w-full py-4 text-sm font-semibold tracking-wider uppercase shadow-md hover:shadow-lg flex items-center justify-center gap-2 bg-espresso-800 hover:bg-espresso-700 dark:bg-cream-100 dark:text-espresso-800 dark:hover:bg-cream-200 transition-colors"
            >
              <span>EXPLORE ADMIN DASHBOARD</span>
              <ArrowRight :size="16" class="group-hover:translate-x-1 transition-transform" />
            </RouterLink>
          </div>
        </div>

        <!-- Demonstration Notice & Live Metrics Strip -->
        <div class="card p-6 sm:p-7 max-w-5xl mx-auto bg-white dark:bg-espresso-800">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-coffee-DEFAULT dark:text-accent">Exhibition Notice</span>
              <h3 class="font-serif font-bold text-lg text-espresso-800 dark:text-cream-100 mt-0.5">
                Full-Featured Frontend Architecture
              </h3>
              <p class="text-xs sm:text-sm text-espresso-700/70 dark:text-cream-200/60 mt-1 max-w-xl">
                COFANA operates completely on the frontend with realistic demo data, Pinia state stores, and LocalStorage persistence. No external backend setup is required.
              </p>
            </div>

            <!-- Mini stats pill -->
            <div class="flex items-center gap-4 sm:gap-6 border-t md:border-t-0 md:border-l border-espresso-800/10 dark:border-cream-100/10 pt-4 md:pt-0 md:pl-6 shrink-0">
              <div>
                <p class="text-[10px] text-espresso-700/60 dark:text-cream-200/50 uppercase tracking-wider">Catalogue</p>
                <p class="font-serif font-bold text-lg text-espresso-800 dark:text-cream-100">{{ productStore.products.length }} Items</p>
              </div>
              <div class="h-8 w-px bg-espresso-800/10 dark:bg-cream-100/10"></div>
              <div>
                <p class="text-[10px] text-espresso-700/60 dark:text-cream-200/50 uppercase tracking-wider">Demo Orders</p>
                <p class="font-serif font-bold text-lg text-espresso-800 dark:text-cream-100">{{ orderStore.orders.length }} Records</p>
              </div>
              <div class="h-8 w-px bg-espresso-800/10 dark:bg-cream-100/10"></div>
              <div>
                <p class="text-[10px] text-espresso-700/60 dark:text-cream-200/50 uppercase tracking-wider">Admin Demo</p>
                <p class="font-mono text-xs font-bold text-sage-dark dark:text-sage-light">Active</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tech Stack Badges -->
        <div class="mt-12 text-center">
          <p class="text-[11px] font-semibold uppercase tracking-widest text-espresso-700/50 dark:text-cream-200/40 mb-3">
            Technology Stack
          </p>
          <div class="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-xs text-espresso-800 dark:text-cream-100 font-medium">
            <span class="px-3 py-1 rounded-md bg-white dark:bg-espresso-800 border border-espresso-800/10 dark:border-cream-100/10 shadow-sm">Vue 3 Composition API</span>
            <span class="px-3 py-1 rounded-md bg-white dark:bg-espresso-800 border border-espresso-800/10 dark:border-cream-100/10 shadow-sm">Vite 8</span>
            <span class="px-3 py-1 rounded-md bg-white dark:bg-espresso-800 border border-espresso-800/10 dark:border-cream-100/10 shadow-sm">Pinia Stores</span>
            <span class="px-3 py-1 rounded-md bg-white dark:bg-espresso-800 border border-espresso-800/10 dark:border-cream-100/10 shadow-sm">Vue Router 4</span>
            <span class="px-3 py-1 rounded-md bg-white dark:bg-espresso-800 border border-espresso-800/10 dark:border-cream-100/10 shadow-sm">Tailwind CSS</span>
            <span class="px-3 py-1 rounded-md bg-white dark:bg-espresso-800 border border-espresso-800/10 dark:border-cream-100/10 shadow-sm">LocalStorage Sync</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Showcase Footer -->
    <footer class="border-t border-espresso-800/10 dark:border-cream-100/10 py-6 text-center text-xs text-espresso-700/60 dark:text-cream-200/50">
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© 2026 COFANA. Built for Exhibition & Showcase Demonstration.</p>
        <div class="flex items-center gap-4 text-xs">
          <RouterLink to="/store" class="hover:text-espresso-800 dark:hover:text-cream-100 transition-colors">
            Coffee Store
          </RouterLink>
          <span class="text-espresso-800/20 dark:text-cream-100/20">·</span>
          <RouterLink to="/menu" class="hover:text-espresso-800 dark:hover:text-cream-100 transition-colors">
            Menu
          </RouterLink>
          <span class="text-espresso-800/20 dark:text-cream-100/20">·</span>
          <RouterLink to="/admin/login" class="hover:text-espresso-800 dark:hover:text-cream-100 transition-colors">
            Admin Login
          </RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import {
  Coffee, LayoutDashboard, CheckCircle, ArrowRight, Sun, Moon
} from '@lucide/vue'
import { useThemeStore } from '../stores/themeStore'
import { useProductStore } from '../stores/productStore'
import { useOrderStore } from '../stores/orderStore'

const themeStore = useThemeStore()
const productStore = useProductStore()
const orderStore = useOrderStore()
</script>
