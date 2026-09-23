/**
 * Safe LocalStorage utilities for COFANA
 * Handles parsing errors and missing data gracefully
 */

const PREFIX = 'cofana_'

export function storageGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function storageSet(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch (e) {
    console.warn('COFANA: Failed to write to LocalStorage', e)
  }
}

export function storageRemove(key) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch { /* silent */ }
}

export const KEYS = {
  PRODUCTS: 'products',
  CART: 'cart',
  ORDERS: 'orders',
  INVENTORY: 'inventory',
  AUTH: 'auth',
  THEME: 'theme',
  SETTINGS: 'settings',
}
