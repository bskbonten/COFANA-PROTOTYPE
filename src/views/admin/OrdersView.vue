<template>
  <div class="space-y-6">
    <!-- Filter Bar -->
    <div class="card p-5">
      <div class="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <!-- Search and Status filters -->
        <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-1 max-w-xl">
          <div class="relative flex-1">
            <Search :size="16" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-700/40 dark:text-cream-200/40 pointer-events-none" />
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search by Order ID or customer name..."
              class="form-input pl-10 text-sm"
            />
          </div>

          <select
            v-model="statusFilter"
            class="form-select sm:w-44 text-sm"
          >
            <option value="All">All Statuses</option>
            <option v-for="s in orderStore.ORDER_STATUSES" :key="s" :value="s">
              {{ s }}
            </option>
          </select>
        </div>

        <div class="text-xs text-espresso-700/60 dark:text-cream-200/50 self-end sm:self-center">
          Total: <span class="font-bold text-espresso-800 dark:text-cream-100">{{ filteredOrders.length }} orders</span>
        </div>
      </div>
    </div>

    <!-- Orders Table Card -->
    <div class="card overflow-hidden">
      <div class="p-5 border-b border-espresso-800/10 dark:border-cream-100/10 flex items-center justify-between">
        <h3 class="font-serif font-semibold text-lg text-espresso-800 dark:text-cream-100">
          Order Records
        </h3>
      </div>

      <div v-if="filteredOrders.length > 0" class="overflow-x-auto scrollbar-thin">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="bg-espresso-800/5 dark:bg-cream-100/5 border-b border-espresso-800/10 dark:border-cream-100/10 text-xs font-semibold uppercase tracking-wider text-espresso-700/60 dark:text-cream-200/50">
              <th class="py-3 px-5">Order ID</th>
              <th class="py-3 px-4">Customer</th>
              <th class="py-3 px-4">Date & Time</th>
              <th class="py-3 px-4">Items Summary</th>
              <th class="py-3 px-4">Total</th>
              <th class="py-3 px-4">Payment</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-espresso-800/5 dark:divide-cream-100/5">
            <tr
              v-for="order in filteredOrders"
              :key="order.id"
              class="hover:bg-espresso-800/5 dark:hover:bg-cream-100/5 transition-colors"
            >
              <!-- ID -->
              <td class="py-3 px-5 font-mono font-bold text-xs text-espresso-800 dark:text-cream-100">
                {{ order.id }}
              </td>

              <!-- Customer -->
              <td class="py-3 px-4">
                <p class="font-medium text-espresso-800 dark:text-cream-100 text-sm">{{ order.customer?.name }}</p>
                <p class="text-[11px] text-espresso-700/60 dark:text-cream-200/50">{{ order.customer?.phone }}</p>
              </td>

              <!-- Date -->
              <td class="py-3 px-4 text-xs text-espresso-700/70 dark:text-cream-200/60 whitespace-nowrap">
                {{ formatDate(order.createdAt) }}
              </td>

              <!-- Items summary -->
              <td class="py-3 px-4 text-xs text-espresso-700/80 dark:text-cream-200/70">
                <span class="font-medium">{{ order.items.reduce((s, i) => s + i.qty, 0) }} pcs</span>
                <span class="text-espresso-700/50 dark:text-cream-200/40 text-[11px] block truncate max-w-xs">
                  {{ order.items.map(i => `${i.qty}x ${i.name}`).join(', ') }}
                </span>
              </td>

              <!-- Total -->
              <td class="py-3 px-4 font-semibold text-xs text-espresso-800 dark:text-cream-100 whitespace-nowrap">
                {{ formatRupiah(order.total) }}
              </td>

              <!-- Payment -->
              <td class="py-3 px-4 text-xs">
                <span class="px-2 py-0.5 rounded bg-espresso-800/5 dark:bg-cream-100/10 font-medium text-espresso-800 dark:text-cream-100">
                  {{ order.payment }}
                </span>
              </td>

              <!-- Status Dropdown -->
              <td class="py-3 px-4">
                <select
                  :value="order.status"
                  @change="onStatusChange(order.id, $event.target.value)"
                  class="text-xs font-semibold rounded-lg px-2.5 py-1 border transition-colors cursor-pointer focus:outline-none"
                  :class="getStatusSelectClass(order.status)"
                >
                  <option v-for="s in orderStore.ORDER_STATUSES" :key="s" :value="s">
                    {{ s }}
                  </option>
                </select>
              </td>

              <!-- Action (View Details) -->
              <td class="py-3 px-5 text-right">
                <button
                  @click="openDetails(order)"
                  class="btn-secondary text-xs px-3 py-1.5"
                >
                  <Eye :size="13" />
                  <span>Details</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="p-12 text-center">
        <EmptyState
          icon="receipt"
          title="No orders found"
          description="There are no orders matching your selected criteria."
        />
      </div>
    </div>

    <!-- Order Detail Modal -->
    <Teleport to="body">
      <div
        v-if="selectedOrderForModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        role="dialog"
      >
        <div class="fixed inset-0 bg-espresso-800/60 backdrop-blur-sm" @click="selectedOrderForModal = null"></div>

        <div class="relative bg-white dark:bg-espresso-800 rounded-2xl shadow-modal max-w-lg w-full p-6 my-8 z-10 animate-slide-up border border-espresso-800/10 dark:border-cream-100/10">
          <div class="flex items-center justify-between pb-4 border-b border-espresso-800/10 dark:border-cream-100/10 mb-5">
            <div>
              <span class="text-xs font-mono font-bold text-coffee-DEFAULT dark:text-accent">
                {{ selectedOrderForModal.id }}
              </span>
              <h3 class="font-serif font-bold text-xl text-espresso-800 dark:text-cream-100">
                Order Information
              </h3>
            </div>
            <button
              @click="selectedOrderForModal = null"
              class="p-1 rounded-lg text-espresso-700/60 dark:text-cream-200/60 hover:text-espresso-800 dark:hover:text-cream-100 transition-colors"
            >
              <X :size="20" />
            </button>
          </div>

          <div class="space-y-4 text-sm">
            <!-- Customer -->
            <div class="bg-cream-50 dark:bg-espresso-900/40 p-4 rounded-xl space-y-2">
              <div class="flex justify-between">
                <span class="text-xs text-espresso-700/60 dark:text-cream-200/50">Customer Name:</span>
                <span class="font-semibold text-espresso-800 dark:text-cream-100">{{ selectedOrderForModal.customer?.name }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-espresso-700/60 dark:text-cream-200/50">WhatsApp:</span>
                <span class="font-medium text-espresso-800 dark:text-cream-100">{{ selectedOrderForModal.customer?.phone }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-espresso-700/60 dark:text-cream-200/50">Order Date:</span>
                <span class="text-xs text-espresso-800 dark:text-cream-100">{{ formatDate(selectedOrderForModal.createdAt) }}</span>
              </div>
              <div v-if="selectedOrderForModal.customer?.notes" class="pt-2 border-t border-espresso-800/10 dark:border-cream-100/10">
                <span class="text-xs text-espresso-700/60 dark:text-cream-200/50 block mb-0.5">Special Instructions:</span>
                <p class="text-xs text-espresso-800 dark:text-cream-100 italic">{{ selectedOrderForModal.customer.notes }}</p>
              </div>
            </div>

            <!-- Items -->
            <div>
              <h4 class="font-semibold text-xs uppercase tracking-wider text-espresso-700/60 dark:text-cream-200/50 mb-2">
                Ordered Items
              </h4>
              <div class="divide-y divide-espresso-800/10 dark:divide-cream-100/10 max-h-48 overflow-y-auto scrollbar-thin">
                <div
                  v-for="(item, i) in selectedOrderForModal.items"
                  :key="i"
                  class="py-2.5 flex items-center justify-between text-xs"
                >
                  <div>
                    <p class="font-semibold text-espresso-800 dark:text-cream-100">{{ item.qty }}x {{ item.name }}</p>
                    <p v-if="item.ice || item.sugar" class="text-[10px] text-espresso-700/60 dark:text-cream-200/50">
                      Ice: {{ item.ice }} · Sugar: {{ item.sugar }}
                    </p>
                  </div>
                  <span class="font-medium text-espresso-800 dark:text-cream-100">
                    {{ formatRupiah(item.price * item.qty) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Total breakdown -->
            <div class="pt-3 border-t border-espresso-800/10 dark:border-cream-100/10 space-y-1.5 text-xs">
              <div class="flex justify-between text-espresso-700/70 dark:text-cream-200/60">
                <span>Subtotal</span>
                <span>{{ formatRupiah(selectedOrderForModal.subtotal) }}</span>
              </div>
              <div v-if="selectedOrderForModal.discount > 0" class="flex justify-between text-sage-DEFAULT font-medium">
                <span>Discount</span>
                <span>-{{ formatRupiah(selectedOrderForModal.discount) }}</span>
              </div>
              <div class="flex justify-between text-sm font-bold text-espresso-800 dark:text-cream-100 pt-1 border-t border-espresso-800/10 dark:border-cream-100/10">
                <span>Total</span>
                <span class="font-serif text-base">{{ formatRupiah(selectedOrderForModal.total) }}</span>
              </div>
            </div>

            <!-- Status selector in modal -->
            <div class="pt-3 border-t border-espresso-800/10 dark:border-cream-100/10 flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider text-espresso-700/60 dark:text-cream-200/50">
                Current Status
              </span>
              <select
                :value="selectedOrderForModal.status"
                @change="onModalStatusChange($event.target.value)"
                class="text-xs font-semibold rounded-lg px-3 py-1.5 border"
                :class="getStatusSelectClass(selectedOrderForModal.status)"
              >
                <option v-for="s in orderStore.ORDER_STATUSES" :key="s" :value="s">
                  {{ s }}
                </option>
              </select>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <button
              @click="selectedOrderForModal = null"
              class="btn-primary text-xs px-5 py-2"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Eye, X } from '@lucide/vue'
import EmptyState from '../../components/EmptyState.vue'
import { useOrderStore } from '../../stores/orderStore'
import { useToast } from '../../composables/useToast'
import { formatRupiah } from '../../utils/currency'

const orderStore = useOrderStore()
const { toast } = useToast()

const searchQuery = ref('')
const statusFilter = ref('All')
const selectedOrderForModal = ref(null)

const filteredOrders = computed(() => {
  let list = orderStore.orders

  if (statusFilter.value !== 'All') {
    list = list.filter(o => o.status === statusFilter.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(o =>
      o.id.toLowerCase().includes(q) ||
      o.customer?.name?.toLowerCase().includes(q) ||
      o.customer?.phone?.includes(q)
    )
  }

  return list
})

function formatDate(isoStr) {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function onStatusChange(orderId, newStatus) {
  orderStore.updateOrderStatus(orderId, newStatus)
  toast.success(`Order ${orderId} marked as ${newStatus}`)
}

function openDetails(order) {
  selectedOrderForModal.value = { ...order }
}

function onModalStatusChange(newStatus) {
  if (selectedOrderForModal.value) {
    selectedOrderForModal.value.status = newStatus
    orderStore.updateOrderStatus(selectedOrderForModal.value.id, newStatus)
    toast.success(`Order status updated to ${newStatus}`)
  }
}

function getStatusSelectClass(status) {
  switch (status) {
    case 'Pending':
      return 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700'
    case 'Processing':
      return 'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-700'
    case 'Ready':
      return 'bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-700'
    case 'Completed':
      return 'bg-green-50 text-green-800 border-green-300 dark:bg-green-950/40 dark:text-green-300 dark:border-green-700'
    case 'Cancelled':
      return 'bg-red-50 text-red-800 border-red-300 dark:bg-red-950/40 dark:text-red-300 dark:border-red-700'
    default:
      return 'bg-gray-50 text-gray-800 border-gray-300'
  }
}
</script>
