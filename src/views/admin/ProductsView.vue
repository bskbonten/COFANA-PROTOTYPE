<template>
  <div class="space-y-6">
    <!-- Action and Filter Bar -->
    <div class="card p-5">
      <div class="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <!-- Search and Category filters -->
        <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-1 max-w-xl">
          <div class="relative flex-1">
            <Search :size="16" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-700/40 dark:text-cream-200/40 pointer-events-none" />
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search products..."
              class="form-input pl-10 text-sm"
            />
          </div>

          <select
            v-model="selectedCategory"
            class="form-select sm:w-44 text-sm"
          >
            <option value="All">All Categories</option>
            <option value="Coffee">Coffee</option>
            <option value="Non-Coffee">Non-Coffee</option>
            <option value="Food">Food</option>
          </select>
        </div>

        <!-- Add product button -->
        <button
          @click="openAddModal"
          class="btn-primary text-sm px-5 py-2.5 shrink-0"
        >
          <Plus :size="16" />
          <span>+ Add Product</span>
        </button>
      </div>
    </div>

    <!-- Products Table Card -->
    <div class="card overflow-hidden">
      <div class="p-5 border-b border-espresso-800/10 dark:border-cream-100/10 flex items-center justify-between">
        <h3 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100">
          Products Catalogue
        </h3>
        <span class="text-xs text-espresso-700/60 dark:text-cream-200/50">
          {{ filteredList.length }} product{{ filteredList.length !== 1 ? 's' : '' }}
        </span>
      </div>

      <!-- Table -->
      <div v-if="filteredList.length > 0" class="overflow-x-auto scrollbar-thin">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="bg-espresso-800/5 dark:bg-cream-100/5 border-b border-espresso-800/10 dark:border-cream-100/10 text-xs font-semibold uppercase tracking-wider text-espresso-700/60 dark:text-cream-200/50">
              <th class="py-3 px-5">Product</th>
              <th class="py-3 px-4">Category</th>
              <th class="py-3 px-4">Price</th>
              <th class="py-3 px-4">Stock</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-espresso-800/5 dark:divide-cream-100/5">
            <tr
              v-for="product in filteredList"
              :key="product.id"
              class="hover:bg-espresso-800/5 dark:hover:bg-cream-100/5 transition-colors"
            >
              <!-- Image & Name -->
              <td class="py-3 px-5">
                <div class="flex items-center gap-3">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-10 h-10 rounded-lg object-cover bg-espresso-800/10 shrink-0"
                  />
                  <div class="min-w-0">
                    <p class="font-medium text-espresso-800 dark:text-cream-100 text-sm truncate">
                      {{ product.name }}
                    </p>
                    <span v-if="product.featured" class="text-[10px] text-coffee-DEFAULT dark:text-accent font-semibold uppercase tracking-wider">
                      ★ Featured
                    </span>
                  </div>
                </div>
              </td>

              <!-- Category -->
              <td class="py-3 px-4 text-xs font-medium text-espresso-700 dark:text-cream-200">
                {{ product.category }}
              </td>

              <!-- Price -->
              <td class="py-3 px-4 font-semibold text-xs text-espresso-800 dark:text-cream-100">
                {{ formatRupiah(product.price) }}
              </td>

              <!-- Stock -->
              <td class="py-3 px-4 text-xs">
                <span :class="product.stock <= 10 ? 'text-amber-600 font-bold' : 'text-espresso-800 dark:text-cream-100'">
                  {{ product.stock }} pcs
                </span>
              </td>

              <!-- Status Toggle -->
              <td class="py-3 px-4">
                <button
                  @click="productStore.toggleActive(product.id)"
                  class="cursor-pointer transition-opacity hover:opacity-80"
                  :title="product.active ? 'Click to deactivate' : 'Click to activate'"
                >
                  <StatusBadge :status="product.active ? 'Active' : 'Inactive'" type="product" />
                </button>
              </td>

              <!-- Actions -->
              <td class="py-3 px-5 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="openEditModal(product)"
                    class="p-1.5 rounded-lg text-espresso-700 hover:text-espresso-900 hover:bg-espresso-800/10 dark:text-cream-200 dark:hover:text-cream-100 dark:hover:bg-cream-100/10 transition-colors"
                    title="Edit product"
                  >
                    <Edit3 :size="15" />
                  </button>
                  <button
                    @click="confirmDelete(product)"
                    class="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="Delete product"
                  >
                    <Trash2 :size="15" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="p-12 text-center">
        <EmptyState
          icon="coffee"
          title="No products found"
          description="Try changing your search term or add a new product."
        >
          <div class="mt-4">
            <button @click="openAddModal" class="btn-primary text-xs px-4 py-2">
              + Add Product
            </button>
          </div>
        </EmptyState>
      </div>
    </div>

    <!-- Product Add/Edit Modal -->
    <ProductForm
      :is-open="isFormModalOpen"
      :is-editing="isEditing"
      :product="selectedProductForEdit"
      @close="isFormModalOpen = false"
      @save="handleSaveProduct"
    />

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      :is-open="isDeleteDialogOpen"
      title="Delete Product"
      :message="`Are you sure you want to delete '${productToDelete?.name}'? This action cannot be undone.`"
      confirm-label="Delete"
      @confirm="executeDelete"
      @cancel="isDeleteDialogOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Plus, Edit3, Trash2 } from '@lucide/vue'
import ProductForm from '../../components/admin/ProductForm.vue'
import ConfirmDialog from '../../components/ConfirmDialog.vue'
import StatusBadge from '../../components/StatusBadge.vue'
import EmptyState from '../../components/EmptyState.vue'
import { useProductStore } from '../../stores/productStore'
import { useToast } from '../../composables/useToast'
import { formatRupiah } from '../../utils/currency'

const productStore = useProductStore()
const { toast } = useToast()

const searchQuery = ref('')
const selectedCategory = ref('All')

const isFormModalOpen = ref(false)
const isEditing = ref(false)
const selectedProductForEdit = ref(null)

const isDeleteDialogOpen = ref(false)
const productToDelete = ref(null)

const filteredList = computed(() => {
  let list = productStore.allProducts

  if (selectedCategory.value !== 'All') {
    list = list.filter(p => p.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  }

  return list
})

function openAddModal() {
  isEditing.value = false
  selectedProductForEdit.value = null
  isFormModalOpen.value = true
}

function openEditModal(product) {
  isEditing.value = true
  selectedProductForEdit.value = { ...product }
  isFormModalOpen.value = true
}

function handleSaveProduct(formData) {
  if (isEditing.value && selectedProductForEdit.value) {
    productStore.updateProduct(selectedProductForEdit.value.id, formData)
    toast.success('Product updated successfully')
  } else {
    productStore.addProduct(formData)
    toast.success('Product added successfully')
  }
  isFormModalOpen.value = false
}

function confirmDelete(product) {
  productToDelete.value = product
  isDeleteDialogOpen.value = true
}

function executeDelete() {
  if (productToDelete.value) {
    productStore.deleteProduct(productToDelete.value.id)
    toast.info(`Product "${productToDelete.value.name}" deleted`)
    productToDelete.value = null
  }
  isDeleteDialogOpen.value = false
}
</script>
