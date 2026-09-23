<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />

    <main class="flex-1 py-10 sm:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Back action -->
        <div class="mb-6">
          <RouterLink
            to="/cart"
            class="inline-flex items-center gap-2 text-sm font-medium text-espresso-700/70 dark:text-cream-200/70 hover:text-espresso-800 dark:hover:text-cream-100 transition-colors"
          >
            <ArrowLeft :size="16" />
            <span>Return to Cart</span>
          </RouterLink>
        </div>

        <h1 class="font-serif font-bold text-3xl sm:text-4xl text-espresso-800 dark:text-cream-100 mb-8">
          Checkout
        </h1>

        <!-- If cart is empty -->
        <div v-if="cartStore.cartItems.length === 0" class="card p-8 max-w-lg mx-auto text-center">
          <EmptyState
            icon="cart"
            title="Your cart is empty"
            description="Please add items to your cart before proceeding to checkout."
          >
            <div class="mt-6">
              <RouterLink to="/menu" class="btn-primary text-sm px-6 py-2.5">
                Browse Menu
              </RouterLink>
            </div>
          </EmptyState>
        </div>

        <!-- Checkout Form & Summary Grid -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <!-- Form Section -->
          <div class="lg:col-span-7 space-y-6">
            <!-- Customer Information Card -->
            <div class="card p-6">
              <h2 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100 mb-4 pb-2 border-b border-espresso-800/10 dark:border-cream-100/10">
                1. Customer Information
              </h2>

              <div class="space-y-4">
                <div>
                  <label class="form-label">Full Name <span class="text-red-500">*</span></label>
                  <input
                    v-model="customer.name"
                    type="text"
                    class="form-input"
                    placeholder="e.g. Budi Pratama"
                    :class="{ 'border-red-500 focus:ring-red-500': errors.name }"
                  />
                  <p v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
                </div>

                <div>
                  <label class="form-label">WhatsApp Number <span class="text-red-500">*</span></label>
                  <input
                    v-model="customer.phone"
                    type="tel"
                    class="form-input"
                    placeholder="e.g. 08123456789"
                    :class="{ 'border-red-500 focus:ring-red-500': errors.phone }"
                  />
                  <p v-if="errors.phone" class="text-xs text-red-500 mt-1">{{ errors.phone }}</p>
                </div>

                <div>
                  <label class="form-label">Order Notes (Optional)</label>
                  <textarea
                    v-model="customer.notes"
                    rows="2"
                    class="form-textarea w-full"
                    placeholder="e.g. Please separate the milk, deliver to Table 4, etc."
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Payment Method Card -->
            <div class="card p-6">
              <h2 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100 mb-4 pb-2 border-b border-espresso-800/10 dark:border-cream-100/10">
                2. Payment Method
              </h2>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- QRIS option -->
                <div
                  @click="paymentMethod = 'QRIS'"
                  class="p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-3"
                  :class="paymentMethod === 'QRIS'
                    ? 'border-espresso-800 bg-espresso-800/5 dark:border-cream-100 dark:bg-cream-100/10'
                    : 'border-espresso-800/15 dark:border-cream-100/15 hover:border-espresso-800/40'"
                >
                  <input
                    type="radio"
                    name="payment"
                    value="QRIS"
                    v-model="paymentMethod"
                    class="mt-1 text-espresso-800 focus:ring-espresso-800"
                  />
                  <div>
                    <div class="flex items-center gap-2">
                      <QrCode :size="18" class="text-coffee-DEFAULT dark:text-accent" />
                      <p class="font-semibold text-sm text-espresso-800 dark:text-cream-100">QRIS Instant</p>
                    </div>
                    <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-1">
                      GoPay, OVO, Dana, BCA Mobile & all digital banking.
                    </p>
                  </div>
                </div>

                <!-- Cash option -->
                <div
                  @click="paymentMethod = 'Cash'"
                  class="p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-3"
                  :class="paymentMethod === 'Cash'
                    ? 'border-espresso-800 bg-espresso-800/5 dark:border-cream-100 dark:bg-cream-100/10'
                    : 'border-espresso-800/15 dark:border-cream-100/15 hover:border-espresso-800/40'"
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Cash"
                    v-model="paymentMethod"
                    class="mt-1 text-espresso-800 focus:ring-espresso-800"
                  />
                  <div>
                    <div class="flex items-center gap-2">
                      <Banknote :size="18" class="text-coffee-DEFAULT dark:text-accent" />
                      <p class="font-semibold text-sm text-espresso-800 dark:text-cream-100">Cash on Pickup</p>
                    </div>
                    <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-1">
                      Pay directly at the cashier bar counter when taking your order.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary Section -->
          <div class="lg:col-span-5 sticky top-24">
            <div class="card p-6">
              <h2 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100 mb-4 pb-2 border-b border-espresso-800/10 dark:border-cream-100/10">
                Order Review
              </h2>

              <!-- Items list -->
              <div class="divide-y divide-espresso-800/10 dark:divide-cream-100/10 max-h-72 overflow-y-auto scrollbar-thin pr-1 mb-4">
                <div
                  v-for="item in cartStore.cartItems"
                  :key="item.cartId"
                  class="py-3 flex items-center justify-between gap-3 text-sm"
                >
                  <div class="flex items-center gap-3 min-w-0">
                    <img :src="item.image" :alt="item.name" class="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <div class="min-w-0">
                      <p class="font-medium text-espresso-800 dark:text-cream-100 truncate">{{ item.name }}</p>
                      <p class="text-[11px] text-espresso-700/50 dark:text-cream-200/50">
                        Qty: {{ item.qty }}
                        <span v-if="item.ice || item.sugar">· {{ item.ice }} / {{ item.sugar }}</span>
                      </p>
                    </div>
                  </div>
                  <span class="font-semibold text-espresso-800 dark:text-cream-100 shrink-0">
                    {{ formatRupiah(item.price * item.qty) }}
                  </span>
                </div>
              </div>

              <!-- Price breakdown -->
              <div class="space-y-2 pt-3 border-t border-espresso-800/10 dark:border-cream-100/10 text-sm">
                <div class="flex justify-between text-espresso-700/70 dark:text-cream-200/60">
                  <span>Subtotal</span>
                  <span>{{ formatRupiah(cartStore.subtotal) }}</span>
                </div>
                <div v-if="cartStore.discount > 0" class="flex justify-between text-sage-DEFAULT font-medium">
                  <span>Discount</span>
                  <span>-{{ formatRupiah(cartStore.discount) }}</span>
                </div>
                <div class="flex justify-between text-base font-bold text-espresso-800 dark:text-cream-100 pt-2 border-t border-espresso-800/10 dark:border-cream-100/10">
                  <span>Total Amount</span>
                  <span class="font-serif text-xl">{{ formatRupiah(cartStore.totalPrice) }}</span>
                </div>
              </div>

              <!-- CTA -->
              <button
                @click="handlePlaceOrder"
                :disabled="isSubmitting"
                class="btn-primary w-full py-4 text-sm mt-6 font-semibold tracking-wider uppercase shadow-md hover:shadow-lg disabled:opacity-60"
              >
                <Check :size="18" v-if="!isSubmitting" />
                <span v-if="isSubmitting">PROCESSING ORDER...</span>
                <span v-else>PLACE ORDER</span>
              </button>

              <p class="text-[11px] text-center text-espresso-700/50 dark:text-cream-200/40 mt-3">
                By placing this order you agree to COFANA pickup policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer class="mt-auto" />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { ArrowLeft, Check, QrCode, Banknote } from '@lucide/vue'
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import EmptyState from '../../components/EmptyState.vue'
import { useCartStore } from '../../stores/cartStore'
import { useOrderStore } from '../../stores/orderStore'
import { useToast } from '../../composables/useToast'
import { formatRupiah } from '../../utils/currency'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const { toast } = useToast()

const isSubmitting = ref(false)
const paymentMethod = ref('QRIS')

const customer = reactive({
  name: '',
  phone: '',
  notes: ''
})

const errors = reactive({
  name: '',
  phone: ''
})

function validate() {
  errors.name = ''
  errors.phone = ''
  let valid = true

  if (!customer.name.trim()) {
    errors.name = 'Please provide your full name.'
    valid = false
  }

  const phoneRegex = /^[0-9+\-\s]{8,15}$/
  if (!customer.phone.trim()) {
    errors.phone = 'Please provide your WhatsApp number.'
    valid = false
  } else if (!phoneRegex.test(customer.phone.trim())) {
    errors.phone = 'Please enter a valid phone number (e.g. 08123456789).'
    valid = false
  }

  return valid
}

function handlePlaceOrder() {
  if (!validate()) return

  isSubmitting.value = true

  try {
    const newOrder = orderStore.createOrder({
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        notes: customer.notes.trim()
      },
      items: cartStore.cartItems,
      subtotal: cartStore.subtotal,
      discount: cartStore.discount,
      total: cartStore.totalPrice,
      payment: paymentMethod.value
    })

    cartStore.clearCart()
    toast.success('Order placed successfully!')
    router.push({ name: 'order-success', params: { id: newOrder.id } })
  } catch (err) {
    toast.error('Failed to create order. Please try again.')
    console.error(err)
  } finally {
    isSubmitting.value = false
  }
}
</script>
