import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Configurable base path for GitHub Pages deployment (e.g. https://USERNAME.github.io/cofana/)
// Defaults to './' so assets resolve correctly in any GitHub repository name or custom domain
export default defineConfig({
  plugins: [vue()],
  base: process.env.VITE_BASE_PATH || './',
})
