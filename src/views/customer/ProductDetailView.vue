<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />

    <main class="flex-1 py-10 sm:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Back action -->
        <div class="mb-8">
          <RouterLink
            to="/menu"
            class="inline-flex items-center gap-2 text-sm font-medium text-espresso-700/70 dark:text-cream-200/70 hover:text-espresso-800 dark:hover:text-cream-100 transition-colors"
          >
            <ArrowLeft :size="16" />
            <span>Back to Menu</span>
          </RouterLink>
        </div>

        <!-- Product Found -->
        <div v-if="product" class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <!-- Image -->
          <div class="lg:col-span-6">
            <div class="aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden shadow-card border border-espresso-800/10 dark:border-cream-100/10 bg-white dark:bg-espresso-800">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Product Details & Customization -->
          <div class="lg:col-span-6 flex flex-col">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-coffee-DEFAULT/10 text-coffee-DEFAULT dark:bg-accent/15 dark:text-accent w-fit mb-3">
              {{ product.category }}
            </span>

            <h1 class="font-serif font-bold text-3xl sm:text-4xl text-espresso-800 dark:text-cream-100 mb-3">
              {{ product.name }}
            </h1>

            <p class="font-serif font-bold text-2xl sm:text-3xl text-coffee-DEFAULT dark:text-accent mb-6">
              {{ formatRupiah(product.price) }}
            </p>

            <div class="prose dark:prose-invert text-espresso-700/80 dark:text-cream-200/70 text-sm leading-relaxed mb-8">
              {{ product.description }}
            </div>

            <!-- Customization (Beverages only) -->
            <div v-if="product.category !== 'Food'" class="space-y-6 pt-6 border-t border-espresso-800/10 dark:border-cream-100/10 mb-8">
              <!-- Ice Level -->
              <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-espresso-700/70 dark:text-cream-200/60 mb-2.5">
                  Ice Level
                </label>
                <div class="grid grid-cols-3 gap-2.5">
                  <button
                    v-for="opt in ['Normal', 'Less Ice', 'No Ice']"
                    :key="opt"
                    type="button"
                    @click="selectedIce = opt"
                    class="py-2.5 px-3 rounded-lg text-xs font-medium border text-center transition-all duration-200"
                    :class="selectedIce === opt
                      ? 'bg-espresso-800 text-cream-100 border-espresso-800 dark:bg-cream-100 dark:text-espresso-800 dark:border-cream-100 shadow-sm'
                      : 'border-espresso-800/20 dark:border-cream-100/20 text-espresso-700 dark:text-cream-200 hover:bg-espresso-800/5 dark:hover:bg-cream-100/5'"
                  >
                    {{ opt }}
                  </button>
                </div>
              </div>

              <!-- Sugar Level -->
              <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-espresso-700/70 dark:text-cream-200/60 mb-2.5">
                  Sweetness
                </label>
                <div class="grid grid-cols-3 gap-2.5">
                  <button
                    v-for="opt in ['Normal', 'Less Sugar', 'No Sugar']"
                    :key="opt"
                    type="button"
                    @click="selectedSugar = opt"
                    class="py-2.5 px-3 rounded-lg text-xs font-medium border text-center transition-all duration-200"
                    :class="selectedSugar === opt
                      ? 'bg-espresso-800 text-cream-100 border-espresso-800 dark:bg-cream-100 dark:text-espresso-800 dark:border-cream-100 shadow-sm'
                      : 'border-espresso-800/20 dark:border-cream-100/20 text-espresso-700 dark:text-cream-200 hover:bg-espresso-800/5 dark:hover:bg-cream-100/5'"
                  >
                    {{ opt }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Quantity & Add to Cart -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-espresso-800/10 dark:border-cream-100/10">
              <div class="flex items-center justify-between sm:justify-start gap-4">
                <span class="text-xs font-semibold uppercase tracking-wider text-espresso-700/70 dark:text-cream-200/60">
                  Quantity
                </span>
                <QuantitySelector
                  :quantity="quantity"
                  @increase="quantity++"
                  @decrease="quantity > 1 ? quantity-- : null"
                />
              </div>

              <button
                @click="handleAddToCart"
                class="btn-primary flex-1 py-3.5 text-sm"
              >
                <Plus :size="18" />
                <span>Add to Cart — {{ formatRupiah(product.price * quantity) }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Product Not Found Fallback -->
        <div v-else class="text-center py-20">
          <EmptyState
            icon="coffee"
            title="Product not found"
            description="The product you are looking for does not exist or has been removed from our menu."
          >
            <div class="mt-6">
              <RouterLink to="/menu" class="btn-primary text-sm px-6 py-2.5">
                Back to Menu
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
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { ArrowLeft, Plus } from '@lucide/vue'
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import QuantitySelector from '../../components/QuantitySelector.vue'
import EmptyState from '../../components/EmptyState.vue'
import { useProductStore } from '../../stores/productStore'
import { useCartStore } from '../../stores/cartStore'
import { useToast } from '../../composables/useToast'
import { formatRupiah } from '../../utils/currency'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const { toast } = useToast()

const productId = computed(() => route.params.id)
const product = computed(() => productStore.getProductById(productId.value))

const quantity = ref(1)
const selectedIce = ref('Normal')
const selectedSugar = ref('Normal')

function handleAddToCart() {
  if (!product.value) return

  cartStore.addToCart(product.value, {
    qty: quantity.value,
    ice: product.value.category === 'Food' ? null : selectedIce.value,
    sugar: product.value.category === 'Food' ? null : selectedSugar.value
  })

  toast.success(`Added ${quantity.value}x ${product.value.name} to cart`)
}
</script>
