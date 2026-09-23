<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />

    <main class="flex-1 py-10 sm:py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center max-w-2xl mx-auto mb-10">
          <span class="text-xs font-semibold uppercase tracking-wider text-coffee-DEFAULT dark:text-accent">Handcrafted Daily</span>
          <h1 class="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-espresso-800 dark:text-cream-100 mt-2 mb-3">
            Our Menu
          </h1>
          <p class="text-sm sm:text-base text-espresso-700/70 dark:text-cream-200/60 leading-relaxed">
            From signature espresso blends to artisanal teas and warm pastries, explore our complete selection below.
          </p>
        </div>

        <!-- Filter, Search & Sort Bar -->
        <div class="card p-4 sm:p-5 mb-10">
          <div class="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            <!-- Categories -->
            <CategoryFilter
              :categories="productStore.categories"
              v-model="productStore.selectedCategory"
            />

            <!-- Search & Sort wrapper -->
            <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <!-- Search -->
              <div class="w-full sm:w-64">
                <SearchBar
                  v-model="productStore.searchQuery"
                  placeholder="Search menu..."
                />
              </div>

              <!-- Sort -->
              <div class="w-full sm:w-48">
                <select
                  v-model="productStore.sorting"
                  class="form-select text-sm py-2"
                  aria-label="Sort products"
                >
                  <option value="default">Default Sorting</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Results count indicator -->
        <div class="flex items-center justify-between text-xs text-espresso-700/60 dark:text-cream-200/50 mb-6 px-1">
          <span>Showing {{ productStore.filteredProducts.length }} items</span>
          <span v-if="productStore.searchQuery || productStore.selectedCategory !== 'All'">
            Filtered by:
            <span v-if="productStore.selectedCategory !== 'All'" class="font-medium text-espresso-800 dark:text-cream-100 mr-2">
              {{ productStore.selectedCategory }}
            </span>
            <span v-if="productStore.searchQuery" class="italic">
              "{{ productStore.searchQuery }}"
            </span>
          </span>
        </div>

        <!-- Product Grid -->
        <ProductGrid :products="productStore.filteredProducts" />
      </div>
    </main>

    <Footer class="mt-auto" />
  </div>
</template>

<script setup>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import ProductGrid from '../../components/ProductGrid.vue'
import CategoryFilter from '../../components/CategoryFilter.vue'
import SearchBar from '../../components/SearchBar.vue'
import { useProductStore } from '../../stores/productStore'

const productStore = useProductStore()
</script>
