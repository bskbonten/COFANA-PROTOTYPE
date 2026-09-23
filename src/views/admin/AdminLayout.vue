<template>
  <div class="min-h-screen bg-cream-50/50 dark:bg-espresso-900 transition-colors duration-300 flex">
    <!-- Sidebar -->
    <AdminSidebar v-model:mobileOpen="mobileSidebarOpen" />

    <!-- Main Wrapper -->
    <div class="flex-1 flex flex-col min-w-0 lg:pl-64">
      <AdminHeader
        :title="currentTitle"
        :subtitle="currentSubtitle"
        @toggle-mobile-sidebar="mobileSidebarOpen = !mobileSidebarOpen"
      />

      <main class="flex-1 p-4 sm:p-6 lg:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AdminSidebar from '../../components/admin/AdminSidebar.vue'
import AdminHeader from '../../components/admin/AdminHeader.vue'

const route = useRoute()
const mobileSidebarOpen = ref(false)

const titles = {
  'admin-dashboard': { title: 'Dashboard', subtitle: 'Overview of your store performance' },
  'admin-products': { title: 'Products', subtitle: 'Manage catalogue, pricing and stock levels' },
  'admin-orders': { title: 'Orders', subtitle: 'Track, filter and process incoming orders' },
  'admin-inventory': { title: 'Inventory', subtitle: 'Raw ingredients and operational supplies' },
  'admin-sales': { title: 'Sales Analytics', subtitle: 'Revenue metrics and sales trends' },
  'admin-settings': { title: 'Store Settings', subtitle: 'Store details and system preferences' },
}

const currentTitle = computed(() => {
  return titles[route.name]?.title || 'Admin'
})

const currentSubtitle = computed(() => {
  return titles[route.name]?.subtitle || ''
})
</script>
