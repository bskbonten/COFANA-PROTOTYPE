<template>
  <div>
    <div v-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    <EmptyState
      v-else
      icon="coffee"
      title="No products found"
      description="Try adjusting your search or filter criteria."
    />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
import EmptyState from './EmptyState.vue'

defineProps({
  products: { type: Array, required: true }
})
</script>
