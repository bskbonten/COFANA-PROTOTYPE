<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />

    <main class="flex-1 py-10 sm:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="font-serif font-bold text-3xl sm:text-4xl text-espresso-800 dark:text-cream-100 mb-8">
          Shopping Cart
        </h1>

        <!-- If cart has items -->
        <div v-if="cartStore.cartItems.length > 0" class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <!-- Cart Items List -->
          <div class="lg:col-span-8 card p-6">
            <div class="flex items-center justify-between pb-4 border-b border-espresso-800/10 dark:border-cream-100/10 mb-2">
              <span class="text-xs font-semibold uppercase tracking-wider text-espresso-700/60 dark:text-cream-200/50">
                Item details
              </span>
              <button
                @click="handleClearCart"
                class="text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
              >
                Clear Cart
              </button>
            </div>

            <div class="divide-y divide-espresso-800/10 dark:border-cream-100/10">
              <CartItem
                v-for="item in cartStore.cartItems"
                :key="item.cartId"
                :item="item"
              />
            </div>

            <div class="pt-6 mt-4 border-t border-espresso-800/10 dark:border-cream-100/10 flex items-center justify-between">
              <RouterLink
                to="/menu"
                class="inline-flex items-center gap-2 text-sm font-medium text-coffee-DEFAULT dark:text-accent hover:underline"
              >
                <ArrowLeft :size="16" />
                <span>Continue Shopping</span>
              </RouterLink>
              <span class="text-xs text-espresso-700/60 dark:text-cream-200/50">
                {{ cartStore.totalItems }} total item{{ cartStore.totalItems > 1 ? 's' : '' }}
              </span>
            </div>
          </div>

          <!-- Order Summary Sidebar -->
          <div class="lg:col-span-4 sticky top-24">
            <OrderSummary :show-items="false">
              <div class="mt-6">
                <RouterLink
                  to="/checkout"
                  class="btn-primary w-full py-3.5 text-center text-sm"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight :size="16" />
                </RouterLink>
              </div>

              <!-- Promo info badge -->
              <div v-if="cartStore.subtotal >= 50000" class="mt-4 p-3 bg-sage-DEFAULT/10 rounded-lg text-xs text-sage-dark dark:text-sage-light flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-sage-DEFAULT shrink-0"></span>
                <span>Special Rp5.000 order discount applied!</span>
              </div>
              <div v-else class="mt-4 text-xs text-espresso-700/60 dark:text-cream-200/50 text-center">
                Add {{ formatRupiah(50000 - cartStore.subtotal) }} more to get a Rp5.000 discount!
              </div>
            </OrderSummary>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="py-16 text-center card max-w-2xl mx-auto p-8">
          <EmptyState
            icon="cart"
            title="Your cart is empty"
            description="Looks like you haven't added any coffees or snacks to your cart yet."
          >
            <div class="mt-6">
              <RouterLink to="/menu" class="btn-primary text-sm px-8 py-3">
                Browse Menu
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
import { RouterLink } from 'vue-router'
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import CartItem from '../../components/CartItem.vue'
import OrderSummary from '../../components/OrderSummary.vue'
import EmptyState from '../../components/EmptyState.vue'
import { useCartStore } from '../../stores/cartStore'
import { useToast } from '../../composables/useToast'
import { formatRupiah } from '../../utils/currency'

const cartStore = useCartStore()
const { toast } = useToast()

function handleClearCart() {
  cartStore.clearCart()
  toast.info('Cart cleared')
}
</script>
