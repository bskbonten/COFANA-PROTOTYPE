import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

// Import stores for initialization
import { useAuthStore } from './stores/authStore'
import { useProductStore } from './stores/productStore'
import { useCartStore } from './stores/cartStore'
import { useOrderStore } from './stores/orderStore'
import { useInventoryStore } from './stores/inventoryStore'
import { useThemeStore } from './stores/themeStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize stores (load from LocalStorage / seed defaults)
const auth = useAuthStore()
const products = useProductStore()
const cart = useCartStore()
const orders = useOrderStore()
const inventory = useInventoryStore()
const theme = useThemeStore()

auth.restoreSession()
products.init()
cart.init()
orders.init()
inventory.init()
theme.init()

app.mount('#app')
