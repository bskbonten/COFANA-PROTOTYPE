import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storageGet, storageSet, KEYS } from '../utils/storage'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoggedIn = ref(false)
  const role = ref(null)

  // Restore session from LocalStorage on app boot
  function restoreSession() {
    const saved = storageGet(KEYS.AUTH, null)
    if (saved && saved.isLoggedIn) {
      user.value = saved.user
      isLoggedIn.value = true
      role.value = saved.role
    }
  }

  function login(email, password) {
    // Demo credentials
    if (email === 'admin@cofana.com' && password === 'cofana123') {
      const userData = { email, name: 'Admin', avatar: null }
      user.value = userData
      isLoggedIn.value = true
      role.value = 'admin'
      storageSet(KEYS.AUTH, { user: userData, isLoggedIn: true, role: 'admin' })
      return { success: true }
    }
    return { success: false, message: 'Invalid email or password.' }
  }

  function logout() {
    user.value = null
    isLoggedIn.value = false
    role.value = null
    storageSet(KEYS.AUTH, { isLoggedIn: false })
  }

  const isAdmin = computed(() => role.value === 'admin' && isLoggedIn.value)

  return { user, isLoggedIn, role, isAdmin, restoreSession, login, logout }
})
