<template>
  <div class="space-y-6">
    <!-- Top Action & Filter Bar -->
    <div class="card p-5">
      <div class="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <!-- Search and Category filters -->
        <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-1 max-w-xl">
          <div class="relative flex-1">
            <Search :size="16" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-700/40 dark:text-cream-200/40 pointer-events-none" />
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search supplies & ingredients..."
              class="form-input pl-10 text-sm"
            />
          </div>

          <select
            v-model="selectedCategory"
            class="form-select sm:w-44 text-sm"
          >
            <option value="All">All Types</option>
            <option value="Ingredient">Ingredients</option>
            <option value="Packaging">Packaging</option>
          </select>
        </div>

        <button
          @click="openAddModal"
          class="btn-primary text-sm px-5 py-2.5 shrink-0"
        >
          <Plus :size="16" />
          <span>+ Add Supply</span>
        </button>
      </div>
    </div>

    <!-- Inventory Table Card -->
    <div class="card overflow-hidden">
      <div class="p-5 border-b border-espresso-800/10 dark:border-cream-100/10 flex items-center justify-between">
        <div>
          <h3 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100">
            Raw Ingredients & Packaging
          </h3>
          <p class="text-xs text-espresso-700/60 dark:text-cream-200/50 mt-0.5">
            Operational stock levels for daily bar operations
          </p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-amber-600 dark:text-amber-400 font-semibold" v-if="inventoryStore.lowStockItems.length > 0">
            ⚠ {{ inventoryStore.lowStockItems.length }} item{{ inventoryStore.lowStockItems.length > 1 ? 's' : '' }} need restock
          </span>
        </div>
      </div>

      <div v-if="filteredInventory.length > 0" class="overflow-x-auto scrollbar-thin">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="bg-espresso-800/5 dark:bg-cream-100/5 border-b border-espresso-800/10 dark:border-cream-100/10 text-xs font-semibold uppercase tracking-wider text-espresso-700/60 dark:text-cream-200/50">
              <th class="py-3 px-5">Supply Item</th>
              <th class="py-3 px-4">Category</th>
              <th class="py-3 px-4">Current Stock</th>
              <th class="py-3 px-4">Min. Threshold</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-5 text-right">Quick Stock Adjustment</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-espresso-800/5 dark:divide-cream-100/5">
            <tr
              v-for="item in filteredInventory"
              :key="item.id"
              class="hover:bg-espresso-800/5 dark:hover:bg-cream-100/5 transition-colors"
            >
              <!-- Name -->
              <td class="py-3 px-5">
                <p class="font-medium text-espresso-800 dark:text-cream-100 text-sm">{{ item.name }}</p>
              </td>

              <!-- Category -->
              <td class="py-3 px-4 text-xs text-espresso-700/70 dark:text-cream-200/60">
                <span class="px-2 py-0.5 rounded bg-espresso-800/5 dark:bg-cream-100/10">
                  {{ item.category }}
                </span>
              </td>

              <!-- Quantity -->
              <td class="py-3 px-4 font-mono font-bold text-sm text-espresso-800 dark:text-cream-100">
                {{ item.quantity }} {{ item.unit }}
              </td>

              <!-- Min Stock -->
              <td class="py-3 px-4 text-xs text-espresso-700/60 dark:text-cream-200/50">
                {{ item.minStock }} {{ item.unit }}
              </td>

              <!-- Status Badge -->
              <td class="py-3 px-4">
                <StatusBadge :status="item.status" type="inventory" />
              </td>

              <!-- Quick Adjustment & Delete -->
              <td class="py-3 px-5 text-right">
                <div class="flex items-center justify-end gap-2">
                  <!-- Decrease -->
                  <button
                    @click="adjustStock(item, -1)"
                    class="w-7 h-7 rounded-lg bg-espresso-800/10 dark:bg-cream-100/10 flex items-center justify-center hover:bg-espresso-800/20 text-espresso-800 dark:text-cream-100 transition-colors"
                    title="Decrease stock by 1"
                  >
                    <Minus :size="12" />
                  </button>

                  <!-- Direct set -->
                  <button
                    @click="openEditStock(item)"
                    class="px-2.5 py-1 text-xs rounded-lg border border-espresso-800/20 dark:border-cream-100/20 hover:bg-espresso-800/10 dark:hover:bg-cream-100/10 font-medium text-espresso-800 dark:text-cream-100"
                    title="Edit quantity"
                  >
                    Set
                  </button>

                  <!-- Increase -->
                  <button
                    @click="adjustStock(item, 1)"
                    class="w-7 h-7 rounded-lg bg-espresso-800 dark:bg-cream-100 text-cream-100 dark:text-espresso-800 flex items-center justify-center hover:bg-espresso-700 dark:hover:bg-cream-200 transition-colors"
                    title="Increase stock by 1"
                  >
                    <Plus :size="12" />
                  </button>

                  <!-- Delete -->
                  <button
                    @click="confirmDelete(item)"
                    class="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ml-1"
                    title="Delete item"
                  >
                    <Trash2 :size="14" />
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
          icon="database"
          title="No inventory records"
          description="Try changing your search term or add an ingredient supply item."
        />
      </div>
    </div>

    <!-- Add Item Modal -->
    <Teleport to="body">
      <div
        v-if="isAddModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        role="dialog"
      >
        <div class="fixed inset-0 bg-espresso-800/60 backdrop-blur-sm" @click="isAddModalOpen = false"></div>

        <div class="relative bg-white dark:bg-espresso-800 rounded-2xl shadow-modal max-w-md w-full p-6 my-8 z-10 animate-slide-up border border-espresso-800/10 dark:border-cream-100/10">
          <div class="flex items-center justify-between pb-4 border-b border-espresso-800/10 dark:border-cream-100/10 mb-5">
            <h3 class="font-serif font-bold text-xl text-espresso-800 dark:text-cream-100">
              Add Inventory Supply
            </h3>
            <button
              @click="isAddModalOpen = false"
              class="p-1 rounded-lg text-espresso-700/60 dark:text-cream-200/60 hover:text-espresso-800 dark:hover:text-cream-100 transition-colors"
            >
              <X :size="20" />
            </button>
          </div>

          <form @submit.prevent="submitAddInventory" class="space-y-4">
            <div>
              <label class="form-label">Item Name <span class="text-red-500">*</span></label>
              <input
                v-model="newForm.name"
                type="text"
                required
                class="form-input"
                placeholder="e.g. Vanilla Syrup"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="form-label">Category</label>
                <select v-model="newForm.category" class="form-select w-full">
                  <option value="Ingredient">Ingredient</option>
                  <option value="Packaging">Packaging</option>
                </select>
              </div>

              <div>
                <label class="form-label">Unit <span class="text-red-500">*</span></label>
                <input
                  v-model="newForm.unit"
                  type="text"
                  required
                  class="form-input"
                  placeholder="kg, L, pcs..."
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="form-label">Initial Quantity <span class="text-red-500">*</span></label>
                <input
                  v-model.number="newForm.quantity"
                  type="number"
                  step="0.1"
                  min="0"
                  required
                  class="form-input"
                  placeholder="5"
                />
              </div>

              <div>
                <label class="form-label">Min Stock Threshold <span class="text-red-500">*</span></label>
                <input
                  v-model.number="newForm.minStock"
                  type="number"
                  step="0.1"
                  min="0"
                  required
                  class="form-input"
                  placeholder="1"
                />
              </div>
            </div>

            <div class="flex justify-end gap-3 pt-4 border-t border-espresso-800/10 dark:border-cream-100/10">
              <button
                type="button"
                @click="isAddModalOpen = false"
                class="btn-secondary text-sm px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn-primary text-sm px-6 py-2"
              >
                Save Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Edit Stock Modal -->
    <Teleport to="body">
      <div
        v-if="editingStockItem"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        role="dialog"
      >
        <div class="fixed inset-0 bg-espresso-800/60 backdrop-blur-sm" @click="editingStockItem = null"></div>

        <div class="relative bg-white dark:bg-espresso-800 rounded-2xl shadow-modal max-w-sm w-full p-6 my-8 z-10 animate-slide-up border border-espresso-800/10 dark:border-cream-100/10">
          <div class="flex items-center justify-between pb-4 border-b border-espresso-800/10 dark:border-cream-100/10 mb-4">
            <h3 class="font-serif font-bold text-lg text-espresso-800 dark:text-cream-100">
              Update Stock Level
            </h3>
            <button
              @click="editingStockItem = null"
              class="p-1 rounded-lg text-espresso-700/60 dark:text-cream-200/60 hover:text-espresso-800 dark:hover:text-cream-100 transition-colors"
            >
              <X :size="18" />
            </button>
          </div>

          <p class="text-xs text-espresso-700/70 dark:text-cream-200/60 mb-4">
            Adjusting available quantity for <strong class="text-espresso-800 dark:text-cream-100">{{ editingStockItem.name }}</strong>
          </p>

          <form @submit.prevent="saveStockLevel" class="space-y-4">
            <div>
              <label class="form-label">New Stock Quantity ({{ editingStockItem.unit }})</label>
              <input
                v-model.number="tempQuantity"
                type="number"
                step="0.1"
                min="0"
                required
                class="form-input"
              />
            </div>

            <div class="flex justify-end gap-3 pt-3 border-t border-espresso-800/10 dark:border-cream-100/10">
              <button
                type="button"
                @click="editingStockItem = null"
                class="btn-secondary text-xs px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn-primary text-xs px-5 py-2"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirmation -->
    <ConfirmDialog
      :is-open="isDeleteDialogOpen"
      title="Delete Inventory Item"
      :message="`Are you sure you want to remove '${itemToDelete?.name}' from inventory?`"
      confirm-label="Delete"
      @confirm="executeDelete"
      @cancel="isDeleteDialogOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Search, Plus, Minus, Trash2, X } from '@lucide/vue'
import StatusBadge from '../../components/StatusBadge.vue'
import ConfirmDialog from '../../components/ConfirmDialog.vue'
import EmptyState from '../../components/EmptyState.vue'
import { useInventoryStore } from '../../stores/inventoryStore'
import { useToast } from '../../composables/useToast'

const inventoryStore = useInventoryStore()
const { toast } = useToast()

const searchQuery = ref('')
const selectedCategory = ref('All')

const isAddModalOpen = ref(false)
const newForm = reactive({
  name: '',
  category: 'Ingredient',
  quantity: 5,
  minStock: 1,
  unit: 'kg'
})

const editingStockItem = ref(null)
const tempQuantity = ref(0)

const isDeleteDialogOpen = ref(false)
const itemToDelete = ref(null)

const filteredInventory = computed(() => {
  let list = inventoryStore.inventoryWithStatus

  if (selectedCategory.value !== 'All') {
    list = list.filter(i => i.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(i =>
      i.name.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q)
    )
  }

  return list
})

function openAddModal() {
  newForm.name = ''
  newForm.category = 'Ingredient'
  newForm.quantity = 5
  newForm.minStock = 1
  newForm.unit = 'kg'
  isAddModalOpen.value = true
}

function submitAddInventory() {
  inventoryStore.addInventory({
    name: newForm.name.trim(),
    category: newForm.category,
    quantity: parseFloat(newForm.quantity) || 0,
    minStock: parseFloat(newForm.minStock) || 0,
    unit: newForm.unit.trim()
  })
  toast.success('Inventory item added')
  isAddModalOpen.value = false
}

function adjustStock(item, delta) {
  const newQty = Math.max(0, parseFloat((item.quantity + delta).toFixed(2)))
  inventoryStore.updateStock(item.id, newQty)
  toast.info(`Updated ${item.name} stock to ${newQty} ${item.unit}`)
}

function openEditStock(item) {
  editingStockItem.value = item
  tempQuantity.value = item.quantity
}

function saveStockLevel() {
  if (editingStockItem.value) {
    inventoryStore.updateStock(editingStockItem.value.id, tempQuantity.value)
    toast.success(`Updated ${editingStockItem.value.name} stock`)
    editingStockItem.value = null
  }
}

function confirmDelete(item) {
  itemToDelete.value = item
  isDeleteDialogOpen.value = true
}

function executeDelete() {
  if (itemToDelete.value) {
    inventoryStore.deleteInventory(itemToDelete.value.id)
    toast.info(`Item "${itemToDelete.value.name}" removed`)
    itemToDelete.value = null
  }
  isDeleteDialogOpen.value = false
}
</script>
