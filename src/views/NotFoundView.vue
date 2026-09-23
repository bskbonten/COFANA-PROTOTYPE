<template>
  <div class="min-h-screen flex flex-col bg-cream-50 dark:bg-espresso-900">
    <Navbar />

    <main class="flex-1 flex items-center justify-center py-16 px-4">
      <div class="card p-8 sm:p-12 max-w-md w-full text-center">
        <div class="w-20 h-20 rounded-2xl bg-espresso-800/10 dark:bg-cream-100/10 flex items-center justify-center mx-auto mb-6">
          <Coffee :size="36" class="text-espresso-800/60 dark:text-cream-100/60" />
        </div>

        <p class="font-mono text-sm font-bold text-coffee-DEFAULT dark:text-accent mb-2">404 ERROR</p>
        <h1 class="font-serif font-bold text-2xl sm:text-3xl text-espresso-800 dark:text-cream-100 mb-3">
          Page Not Found
        </h1>
        <p class="text-sm text-espresso-700/70 dark:text-cream-200/60 leading-relaxed mb-8">
          The cup you're looking for seems to have run empty. The page does not exist or has been moved.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink to="/" class="btn-primary text-sm px-6 py-2.5">
            Back to Home
          </RouterLink>
          <RouterLink to="/menu" class="btn-secondary text-sm px-6 py-2.5">
            Browse Menu
          </RouterLink>
        </div>
      </div>
    </main>

    <Footer class="mt-auto" />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { Coffee } from '@lucide/vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>
