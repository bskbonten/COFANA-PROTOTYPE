<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />

    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <!-- Text Content -->
          <div class="lg:col-span-7 flex flex-col items-start z-10">
            <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-coffee-DEFAULT/10 text-coffee-DEFAULT dark:bg-accent/15 dark:text-accent mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-coffee-DEFAULT dark:bg-accent"></span>
              Artisan Coffee Roasters
            </span>

            <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-espresso-800 dark:text-cream-100 uppercase leading-[1.1] mb-6">
              Good Coffee,<br />Better Moments.
            </h1>

            <p class="text-base sm:text-lg text-espresso-700/80 dark:text-cream-200/70 max-w-xl font-normal leading-relaxed mb-8">
              Crafted coffee for your everyday moments. Single-origin beans, perfectly extracted espresso, and warm hospitality poured into every single cup.
            </p>

            <div class="flex flex-wrap items-center gap-4">
              <RouterLink
                to="/menu"
                class="btn-primary text-base px-8 py-3.5 shadow-sm hover:shadow"
              >
                <span>ORDER NOW</span>
                <ArrowRight :size="18" />
              </RouterLink>

              <RouterLink
                to="/menu"
                class="btn-secondary text-base px-6 py-3.5"
              >
                Explore Menu
              </RouterLink>
            </div>

            <!-- Highlights -->
            <div class="grid grid-cols-3 gap-6 pt-12 mt-12 border-t border-espresso-800/10 dark:border-cream-100/10 w-full max-w-lg">
              <div>
                <p class="font-serif font-bold text-2xl text-espresso-800 dark:text-cream-100">100%</p>
                <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-1">Arabica & Robusta</p>
              </div>
              <div>
                <p class="font-serif font-bold text-2xl text-espresso-800 dark:text-cream-100">Fresh</p>
                <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-1">Daily Brewed</p>
              </div>
              <div>
                <p class="font-serif font-bold text-2xl text-espresso-800 dark:text-cream-100">&lt; 5 min</p>
                <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-1">Quick Pickup</p>
              </div>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="lg:col-span-5 relative">
            <div class="relative mx-auto max-w-md lg:max-w-none">
              <div class="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-espresso-800/10 dark:border-cream-100/10">
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80"
                  alt="COFANA Artisan Coffee"
                  class="w-full h-full object-cover object-center"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-espresso-900/60 via-transparent to-transparent"></div>

                <!-- Floating badge on image -->
                <div class="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/90 dark:bg-espresso-800/90 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-xs font-semibold uppercase tracking-wider text-coffee-DEFAULT dark:text-accent">Signature Blend</p>
                      <h4 class="font-serif font-bold text-base text-espresso-800 dark:text-cream-100">Es Kopi Susu COFANA</h4>
                    </div>
                    <span class="font-serif font-bold text-espresso-800 dark:text-cream-100 text-sm">Rp12.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Menu Section -->
    <section class="py-16 sm:py-24 bg-cream-100/50 dark:bg-espresso-800/40 border-y border-espresso-800/5 dark:border-cream-100/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span class="text-xs font-semibold uppercase tracking-wider text-coffee-DEFAULT dark:text-accent">Curated Selection</span>
            <h2 class="font-serif font-bold text-3xl sm:text-4xl text-espresso-800 dark:text-cream-100 mt-1">
              Popular Menu
            </h2>
          </div>
          <RouterLink
            to="/menu"
            class="inline-flex items-center gap-2 text-sm font-semibold text-coffee-DEFAULT dark:text-accent hover:underline group"
          >
            <span>View All Items</span>
            <ArrowRight :size="16" class="group-hover:translate-x-1 transition-transform" />
          </RouterLink>
        </div>

        <ProductGrid :products="featuredProducts" />
      </div>
    </section>

    <!-- About / Craft Section -->
    <section class="py-20 lg:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&q=80"
                alt="Coffee Beans"
                class="rounded-xl object-cover h-48 sm:h-64 w-full shadow-card"
              />
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80"
                alt="Coffee Cup"
                class="rounded-xl object-cover h-32 sm:h-40 w-full shadow-card"
              />
            </div>
            <div class="space-y-4 pt-6">
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&q=80"
                alt="Pour Over"
                class="rounded-xl object-cover h-32 sm:h-40 w-full shadow-card"
              />
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&q=80"
                alt="Cafe Atmosphere"
                class="rounded-xl object-cover h-48 sm:h-64 w-full shadow-card"
              />
            </div>
          </div>

          <div class="lg:pl-6">
            <span class="text-xs font-semibold uppercase tracking-wider text-coffee-DEFAULT dark:text-accent">Our Philosophy</span>
            <h2 class="font-serif font-bold text-3xl sm:text-4xl text-espresso-800 dark:text-cream-100 mt-2 mb-6">
              Rooted in Taste, Driven by Community
            </h2>
            <p class="text-espresso-700/80 dark:text-cream-200/70 leading-relaxed mb-4">
              At COFANA, we believe that exceptional coffee should be accessible every single day. We partner directly with sustainable local farmers across the Indonesian archipelago to source high-grade beans, roasting them in balanced small batches.
            </p>
            <p class="text-espresso-700/80 dark:text-cream-200/70 leading-relaxed mb-8">
              Whether you need an early morning pick-me-up or a quiet space to slow down, our brews are crafted to make every moment feel extraordinary.
            </p>

            <div class="flex items-center gap-6">
              <div>
                <p class="font-serif font-bold text-3xl text-espresso-800 dark:text-cream-100">10k+</p>
                <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-0.5">Cups Served</p>
              </div>
              <div class="h-8 w-px bg-espresso-800/10 dark:border-cream-100/10"></div>
              <div>
                <p class="font-serif font-bold text-3xl text-espresso-800 dark:text-cream-100">4.9/5</p>
                <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-0.5">Customer Rating</p>
              </div>
              <div class="h-8 w-px bg-espresso-800/10 dark:border-cream-100/10"></div>
              <div>
                <p class="font-serif font-bold text-3xl text-espresso-800 dark:text-cream-100">100%</p>
                <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-0.5">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer class="mt-auto" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from '@lucide/vue'
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import ProductGrid from '../../components/ProductGrid.vue'
import { useProductStore } from '../../stores/productStore'

const productStore = useProductStore()

const featuredProducts = computed(() => productStore.featuredProducts)
</script>
