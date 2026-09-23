<template>
  <div class="min-h-screen bg-cream-50 dark:bg-espresso-900 transition-colors duration-300">
    <ToastContainer />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import ToastContainer from './components/ToastContainer.vue'
</script>
