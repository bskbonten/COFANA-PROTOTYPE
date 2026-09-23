<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="flex items-center gap-3 px-4 py-3 rounded-lg shadow-modal text-sm font-medium pointer-events-auto max-w-xs"
          :class="toastClass(toast.type)"
        >
          <component :is="toastIcon(toast.type)" :size="16" class="shrink-0" />
          <span>{{ toast.message }}</span>
          <button @click="removeToast(toast.id)" class="ml-auto shrink-0 opacity-70 hover:opacity-100 transition-opacity">
            <X :size="14" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { CheckCircle, XCircle, Info, AlertTriangle, X } from '@lucide/vue'
import { useToast } from '../composables/useToast'

const { toasts, removeToast } = useToast()

function toastClass(type) {
  switch (type) {
    case 'success': return 'bg-espresso-800 text-cream-100'
    case 'error': return 'bg-red-600 text-white'
    case 'warning': return 'bg-amber-500 text-white'
    case 'info': return 'bg-coffee-DEFAULT text-white'
    default: return 'bg-espresso-800 text-cream-100'
  }
}

function toastIcon(type) {
  switch (type) {
    case 'success': return CheckCircle
    case 'error': return XCircle
    case 'warning': return AlertTriangle
    default: return Info
  }
}
</script>

<style scoped>
.toast-enter-active { transition: all 0.3s ease; }
.toast-leave-active { transition: all 0.2s ease; }
.toast-enter-from { transform: translateX(100%); opacity: 0; }
.toast-leave-to { transform: translateX(100%); opacity: 0; }
</style>
