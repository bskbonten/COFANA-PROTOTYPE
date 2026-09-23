<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        :aria-modal="true"
        :aria-labelledby="'dialog-title'"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-espresso-800/60 backdrop-blur-sm" @click="$emit('cancel')" />

        <!-- Dialog -->
        <div class="relative bg-white dark:bg-espresso-800 rounded-2xl shadow-modal max-w-sm w-full p-6 animate-slide-up">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <AlertTriangle :size="20" class="text-red-600 dark:text-red-400" />
            </div>
            <h3 id="dialog-title" class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100">
              {{ title }}
            </h3>
          </div>
          <p class="text-sm text-espresso-700/70 dark:text-cream-200/60 mb-6">{{ message }}</p>
          <div class="flex gap-3 justify-end">
            <button @click="$emit('cancel')" class="btn-secondary text-sm px-5 py-2.5">Cancel</button>
            <button @click="$emit('confirm')" class="btn-danger text-sm">{{ confirmLabel }}</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { AlertTriangle } from '@lucide/vue'

defineProps({
  isOpen: { type: Boolean, required: true },
  title: { type: String, default: 'Confirm Action' },
  message: { type: String, default: 'Are you sure?' },
  confirmLabel: { type: String, default: 'Delete' }
})

defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
