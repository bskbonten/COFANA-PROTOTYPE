<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />

    <main class="flex-1 py-12 sm:py-20 flex items-center justify-center">
      <div class="max-w-xl w-full mx-auto px-4 sm:px-6">
        <!-- Order details card -->
        <div v-if="order" class="card p-6 sm:p-8 text-center animate-slide-up">
          <!-- Success check icon -->
          <div class="w-16 h-16 rounded-full bg-sage-DEFAULT/15 text-sage-DEFAULT dark:bg-sage-DEFAULT/25 dark:text-sage-light flex items-center justify-center mx-auto mb-5">
            <Check :size="32" class="stroke-[3]" />
          </div>

          <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-coffee-DEFAULT/10 text-coffee-DEFAULT dark:bg-accent/15 dark:text-accent mb-2">
            Order Confirmed
          </span>

          <h1 class="font-serif font-bold text-3xl text-espresso-800 dark:text-cream-100 mb-2">
            Order Successful!
          </h1>
          <p class="text-sm text-espresso-700/70 dark:text-cream-200/60 max-w-sm mx-auto mb-8">
            Thank you for ordering from COFANA. We are already preparing your brew with utmost care.
          </p>

          <!-- Order Info Box -->
          <div class="bg-cream-50 dark:bg-espresso-900/60 rounded-xl p-5 text-left border border-espresso-800/5 dark:border-cream-100/5 space-y-4 mb-8">
            <div class="flex items-center justify-between pb-3 border-b border-espresso-800/10 dark:border-cream-100/10">
              <span class="text-xs text-espresso-700/60 dark:text-cream-200/50 uppercase tracking-wider">Order Reference</span>
              <span class="font-mono font-bold text-sm text-espresso-800 dark:text-cream-100 bg-espresso-800/5 dark:bg-cream-100/10 px-2 py-0.5 rounded">
                {{ order.id }}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div>
                <p class="text-espresso-700/60 dark:text-cream-200/50">Customer</p>
                <p class="font-medium text-espresso-800 dark:text-cream-100 mt-0.5">{{ order.customer?.name }}</p>
              </div>
              <div>
                <p class="text-espresso-700/60 dark:text-cream-200/50">Payment Method</p>
                <p class="font-medium text-espresso-800 dark:text-cream-100 mt-0.5">{{ order.payment }}</p>
              </div>
            </div>

            <div v-if="order.customer?.notes" class="text-xs">
              <p class="text-espresso-700/60 dark:text-cream-200/50">Order Notes</p>
              <p class="text-espresso-800 dark:text-cream-100 italic mt-0.5">{{ order.customer.notes }}</p>
            </div>

            <!-- Ordered items -->
            <div class="pt-3 border-t border-espresso-800/10 dark:border-cream-100/10">
              <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mb-2 font-medium">Items Summary</p>
              <div class="space-y-2">
                <div
                  v-for="(item, idx) in order.items"
                  :key="idx"
                  class="flex items-center justify-between text-xs sm:text-sm"
                >
                  <div class="text-espresso-800 dark:text-cream-100">
                    <span>{{ item.qty }}x {{ item.name }}</span>
                    <span v-if="item.ice || item.sugar" class="text-[11px] text-espresso-700/50 dark:text-cream-200/50 block">
                      {{ item.ice }} · {{ item.sugar }}
                    </span>
                  </div>
                  <span class="font-medium text-espresso-800 dark:text-cream-100">
                    {{ formatRupiah(item.price * item.qty) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Total -->
            <div class="pt-3 border-t border-espresso-800/10 dark:border-cream-100/10 flex items-center justify-between">
              <span class="font-semibold text-sm text-espresso-800 dark:text-cream-100">Total Paid</span>
              <span class="font-serif font-bold text-lg text-espresso-800 dark:text-cream-100">
                {{ formatRupiah(order.total) }}
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
            <RouterLink
              to="/menu"
              class="btn-primary w-full sm:w-auto px-8 py-3 text-sm"
            >
              BACK TO MENU
            </RouterLink>
            <RouterLink
              to="/"
              class="btn-secondary w-full sm:w-auto px-6 py-3 text-sm"
            >
              Home Page
            </RouterLink>
          </div>
        </div>

        <!-- Fallback if order not found -->
        <div v-else class="card p-8 text-center">
          <EmptyState
            icon="receipt"
            title="Order not found"
            description="The specified order number could not be retrieved from our system."
          >
            <div class="mt-6">
              <RouterLink to="/menu" class="btn-primary text-sm px-6 py-2.5">
                BACK TO MENU
              </RouterLink>
            </div>
          </EmptyState>
        </div>
      </div>
    </main>

    <Footer class="mt-auto" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Check } from '@lucide/vue'
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import EmptyState from '../../components/EmptyState.vue'
import { useOrderStore } from '../../stores/orderStore'
import { formatRupiah } from '../../utils/currency'

const route = useRoute()
const orderStore = useOrderStore()

const orderId = computed(() => route.params.id)
const order = computed(() => orderStore.getOrderById(orderId.value))
</script>
