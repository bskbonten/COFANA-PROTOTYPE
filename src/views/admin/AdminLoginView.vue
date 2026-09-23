<template>
  <div class="min-h-screen flex items-center justify-center bg-cream-100/60 dark:bg-espresso-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-6 animate-slide-up">
      <!-- Header -->
      <div class="text-center">
        <RouterLink to="/" class="inline-flex items-center gap-2 mb-4 group" title="Return to Showcase">
          <div class="w-10 h-10 bg-espresso-800 dark:bg-cream-100 rounded-xl flex items-center justify-center shadow-md">
            <span class="font-serif text-cream-100 dark:text-espresso-800 text-lg font-bold">C</span>
          </div>
          <span class="font-serif font-bold text-2xl text-espresso-800 dark:text-cream-100 tracking-wider">
            COFANA
          </span>
        </RouterLink>

        <!-- Demo Badge -->
        <div class="mb-2">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-coffee-DEFAULT/10 text-coffee-DEFAULT dark:bg-accent/15 dark:text-accent border border-coffee-DEFAULT/20 dark:border-accent/20">
            <span class="w-1.5 h-1.5 rounded-full bg-coffee-DEFAULT dark:bg-accent animate-pulse"></span>
            COFANA ADMIN DEMO
          </span>
        </div>

        <h2 class="font-serif font-bold text-2xl sm:text-3xl text-espresso-800 dark:text-cream-100">
          Management Portal
        </h2>
        <p class="mt-2 text-xs sm:text-sm text-espresso-700/70 dark:text-cream-200/60 max-w-sm mx-auto">
          Use the demo credentials below to explore the management system.
        </p>
      </div>

      <!-- Demo Credentials Banner -->
      <div class="card p-4 bg-cream-50 dark:bg-espresso-800/90 border border-coffee-DEFAULT/20 dark:border-accent/20">
        <div class="flex items-start justify-between gap-3">
          <div class="text-xs space-y-1">
            <p class="font-semibold text-espresso-800 dark:text-cream-100">Exhibition Demo Credentials:</p>
            <p class="text-espresso-700/80 dark:text-cream-200/70">
              Email: <code class="font-mono font-bold text-coffee-DEFAULT dark:text-accent">admin@cofana.com</code>
            </p>
            <p class="text-espresso-700/80 dark:text-cream-200/70">
              Password: <code class="font-mono font-bold text-coffee-DEFAULT dark:text-accent">cofana123</code>
            </p>
          </div>

          <button
            type="button"
            @click="fillDemo"
            class="px-3 py-1.5 rounded-lg bg-coffee-DEFAULT/15 dark:bg-accent/20 text-coffee-DEFAULT dark:text-accent font-semibold text-xs hover:bg-coffee-DEFAULT/25 transition-colors shrink-0"
          >
            Use Demo Account
          </button>
        </div>
      </div>

      <!-- Login Card -->
      <div class="card p-7 sm:p-8 shadow-modal border border-espresso-800/10 dark:border-cream-100/10">
        <!-- Error Alert -->
        <div
          v-if="errorMessage"
          class="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2"
        >
          <AlertCircle :size="16" class="shrink-0" />
          <span>{{ errorMessage }}</span>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="form-label">Email Address</label>
            <input
              v-model="email"
              type="email"
              autocomplete="email"
              required
              class="form-input"
              placeholder="admin@cofana.com"
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="form-label !mb-0">Password</label>
            </div>
            <input
              v-model="password"
              type="password"
              autocomplete="current-password"
              required
              class="form-input"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="btn-primary w-full py-3.5 text-sm font-semibold tracking-wider uppercase shadow hover:shadow-md disabled:opacity-60 mt-2"
          >
            <span v-if="isLoading">LOGGING IN...</span>
            <span v-else>LOGIN TO DASHBOARD</span>
          </button>
        </form>
      </div>

      <!-- Navigation links -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-espresso-700/70 dark:text-cream-200/60 pt-2">
        <RouterLink
          to="/"
          class="hover:text-espresso-800 dark:hover:text-cream-100 transition-colors inline-flex items-center gap-1.5 font-medium"
        >
          <ArrowLeft :size="14" />
          <span>Back to Showcase Hub</span>
        </RouterLink>
        <span class="hidden sm:inline text-espresso-800/20 dark:text-cream-100/20">·</span>
        <RouterLink
          to="/store"
          class="hover:text-espresso-800 dark:hover:text-cream-100 transition-colors inline-flex items-center gap-1.5"
        >
          <span>Explore Coffee Storefront →</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { AlertCircle, ArrowLeft } from '@lucide/vue'
import { useAuthStore } from '../../stores/authStore'
import { useToast } from '../../composables/useToast'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { toast } = useToast()

const email = ref('admin@cofana.com')
const password = ref('cofana123')
const errorMessage = ref('')
const isLoading = ref(false)

function fillDemo() {
  email.value = 'admin@cofana.com'
  password.value = 'cofana123'
  toast.info('Demo credentials populated into login form')
}

function handleLogin() {
  errorMessage.value = ''
  isLoading.value = true

  const result = authStore.login(email.value.trim(), password.value)

  if (result.success) {
    toast.success('Welcome back, Admin!')
    const redirect = route.query.redirect || '/admin/dashboard'
    router.push(redirect)
  } else {
    errorMessage.value = result.message || 'Invalid email or password.'
  }

  isLoading.value = false
}
</script>
