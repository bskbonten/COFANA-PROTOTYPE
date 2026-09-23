<template>
  <div class="space-y-6 max-w-4xl">
    <!-- Store Profile Card -->
    <div class="card p-6">
      <div class="flex items-center justify-between pb-4 border-b border-espresso-800/10 dark:border-cream-100/10 mb-6">
        <div>
          <h3 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100">
            Store Profile & Info
          </h3>
          <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-0.5">
            Public brand information shown across the customer portal
          </p>
        </div>
      </div>

      <form @submit.prevent="saveSettings" class="space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="form-label">Store Brand Name <span class="text-red-500">*</span></label>
            <input
              v-model="form.storeName"
              type="text"
              required
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Currency Symbol</label>
            <input
              v-model="form.currency"
              type="text"
              disabled
              class="form-input bg-espresso-800/5 dark:bg-cream-100/5 cursor-not-allowed text-espresso-700/70 dark:text-cream-200/70"
            />
          </div>
        </div>

        <div>
          <label class="form-label">Tagline & Description</label>
          <input
            v-model="form.description"
            type="text"
            class="form-input"
            placeholder="Good Coffee, Better Moments."
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="form-label">WhatsApp Contact Number</label>
            <input
              v-model="form.whatsapp"
              type="text"
              class="form-input"
              placeholder="+62 812-3456-7890"
            />
          </div>

          <div>
            <label class="form-label">Store Physical Address</label>
            <input
              v-model="form.address"
              type="text"
              class="form-input"
              placeholder="Jl. Kopi No. 88, Jakarta Selatan"
            />
          </div>
        </div>

        <div>
          <label class="form-label">Operating Schedule & Hours</label>
          <input
            v-model="form.openingHours"
            type="text"
            class="form-input"
            placeholder="Mon–Sat: 07:00 – 22:00 | Sun: 08:00 – 21:00"
          />
        </div>

        <div class="pt-4 border-t border-espresso-800/10 dark:border-cream-100/10 flex justify-end">
          <button
            type="submit"
            class="btn-primary text-sm px-6 py-2.5"
          >
            Save Store Info
          </button>
        </div>
      </form>
    </div>

    <!-- Interface & Theme Preferences -->
    <div class="card p-6">
      <div class="flex items-center justify-between pb-4 border-b border-espresso-800/10 dark:border-cream-100/10 mb-6">
        <div>
          <h3 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100">
            Appearance & System
          </h3>
          <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-0.5">
            Interface visual theme and system preferences
          </p>
        </div>
      </div>

      <div class="space-y-6">
        <div>
          <label class="form-label mb-3">Theme Mode</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Light Mode Option -->
            <div
              @click="themeStore.setTheme(false)"
              class="p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-3"
              :class="!themeStore.isDark
                ? 'border-espresso-800 bg-espresso-800/5 dark:border-cream-100 dark:bg-cream-100/10'
                : 'border-espresso-800/15 dark:border-cream-100/15 hover:border-espresso-800/30'"
            >
              <div class="w-9 h-9 rounded-lg bg-cream-100 flex items-center justify-center text-espresso-800 shadow-sm">
                <Sun :size="20" />
              </div>
              <div>
                <p class="font-semibold text-sm text-espresso-800 dark:text-cream-100">Light Mode</p>
                <p class="text-xs text-espresso-700/60 dark:text-cream-200/50">Warm cream & espresso palette</p>
              </div>
            </div>

            <!-- Dark Mode Option -->
            <div
              @click="themeStore.setTheme(true)"
              class="p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-3"
              :class="themeStore.isDark
                ? 'border-espresso-800 bg-espresso-800/5 dark:border-cream-100 dark:bg-cream-100/10'
                : 'border-espresso-800/15 dark:border-cream-100/15 hover:border-espresso-800/30'"
            >
              <div class="w-9 h-9 rounded-lg bg-espresso-900 flex items-center justify-center text-cream-100 shadow-sm">
                <Moon :size="20" />
              </div>
              <div>
                <p class="font-semibold text-sm text-espresso-800 dark:text-cream-100">Dark Mode</p>
                <p class="text-xs text-espresso-700/60 dark:text-cream-200/50">Cozy espresso night theme</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Reset demo data action -->
        <div class="pt-6 border-t border-espresso-800/10 dark:border-cream-100/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 class="font-medium text-sm text-espresso-800 dark:text-cream-100">Reset Demo Data</h4>
            <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-0.5">
              Restore default products, orders, and inventory to their initial states.
            </p>
          </div>
          <button
            type="button"
            @click="confirmResetDemo"
            class="btn-secondary text-xs px-4 py-2 border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 shrink-0"
          >
            Reset All Data
          </button>
        </div>
      </div>
    </div>

    <!-- Confirm reset modal -->
    <ConfirmDialog
      :is-open="isResetConfirmOpen"
      title="Reset All Demo Data?"
      message="This will clear your current LocalStorage and restore initial mock products, inventory, and orders."
      confirm-label="Reset Now"
      @confirm="executeResetDemo"
      @cancel="isResetConfirmOpen = false"
    />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { Sun, Moon } from '@lucide/vue'
import ConfirmDialog from '../../components/ConfirmDialog.vue'
import { useThemeStore } from '../../stores/themeStore'
import { useToast } from '../../composables/useToast'
import { storageGet, storageSet, storageRemove, KEYS } from '../../utils/storage'
import { DEFAULT_SETTINGS } from '../../data/defaults'

const themeStore = useThemeStore()
const { toast } = useToast()

const form = reactive({
  storeName: 'COFANA',
  description: 'Good Coffee, Better Moments.',
  openingHours: 'Mon–Sat: 07:00 – 22:00 | Sun: 08:00 – 21:00',
  whatsapp: '+62 812-3456-7890',
  currency: 'IDR (Rp)',
  address: 'Jl. Kopi No. 88, Jakarta Selatan'
})

const isResetConfirmOpen = ref(false)

onMounted(() => {
  const saved = storageGet(KEYS.SETTINGS, DEFAULT_SETTINGS)
  if (saved) {
    Object.assign(form, saved)
  }
})

function saveSettings() {
  storageSet(KEYS.SETTINGS, { ...form })
  toast.success('Store settings saved successfully')
}

function confirmResetDemo() {
  isResetConfirmOpen.value = true
}

function executeResetDemo() {
  storageRemove(KEYS.PRODUCTS)
  storageRemove(KEYS.ORDERS)
  storageRemove(KEYS.INVENTORY)
  storageRemove(KEYS.SETTINGS)
  toast.info('Data reset. Reloading application...')
  setTimeout(() => {
    window.location.reload()
  }, 600)
}
</script>
