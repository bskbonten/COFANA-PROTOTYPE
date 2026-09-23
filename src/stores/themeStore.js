import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { storageGet, storageSet, KEYS } from '../utils/storage'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  function init() {
    const saved = storageGet(KEYS.THEME, null)
    // If no saved preference, respect OS setting
    if (saved !== null) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  function applyTheme() {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    applyTheme()
    storageSet(KEYS.THEME, isDark.value ? 'dark' : 'light')
  }

  function setTheme(dark) {
    isDark.value = dark
    applyTheme()
    storageSet(KEYS.THEME, dark ? 'dark' : 'light')
  }

  return { isDark, init, toggleTheme, setTheme }
})
