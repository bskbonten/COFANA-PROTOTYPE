<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      :aria-modal="true"
    >
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-espresso-800/60 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

      <!-- Modal Card -->
      <div class="relative bg-white dark:bg-espresso-800 rounded-2xl shadow-modal max-w-lg w-full p-6 my-8 z-10 animate-slide-up border border-espresso-800/10 dark:border-cream-100/10">
        <div class="flex items-center justify-between pb-4 border-b border-espresso-800/10 dark:border-cream-100/10 mb-5">
          <h2 class="font-serif font-bold text-xl text-espresso-800 dark:text-cream-100">
            {{ isEditing ? 'Edit Product' : 'Add New Product' }}
          </h2>
          <button
            @click="$emit('close')"
            class="p-1 rounded-lg text-espresso-700/60 dark:text-cream-200/60 hover:text-espresso-800 dark:hover:text-cream-100 transition-colors"
          >
            <X :size="20" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="form-label">Product Name <span class="text-red-500">*</span></label>
            <input
              v-model="form.name"
              type="text"
              class="form-input"
              placeholder="e.g. Vanilla Bean Latte"
              :class="{ 'border-red-500 focus:ring-red-500': errors.name }"
            />
            <p v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
          </div>

          <!-- Category & Price -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">Category <span class="text-red-500">*</span></label>
              <select v-model="form.category" class="form-select w-full">
                <option value="Coffee">Coffee</option>
                <option value="Non-Coffee">Non-Coffee</option>
                <option value="Food">Food</option>
              </select>
            </div>
            <div>
              <label class="form-label">Price (IDR) <span class="text-red-500">*</span></label>
              <input
                v-model.number="form.price"
                type="number"
                min="0"
                step="500"
                class="form-input"
                placeholder="15000"
                :class="{ 'border-red-500 focus:ring-red-500': errors.price }"
              />
              <p v-if="errors.price" class="text-xs text-red-500 mt-1">{{ errors.price }}</p>
            </div>
          </div>

          <!-- Stock & Status -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">Initial Stock <span class="text-red-500">*</span></label>
              <input
                v-model.number="form.stock"
                type="number"
                min="0"
                class="form-input"
                placeholder="50"
                :class="{ 'border-red-500 focus:ring-red-500': errors.stock }"
              />
              <p v-if="errors.stock" class="text-xs text-red-500 mt-1">{{ errors.stock }}</p>
            </div>
            <div>
              <label class="form-label">Status</label>
              <div class="flex items-center gap-3 mt-2.5">
                <label class="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="form.active"
                    class="w-4 h-4 text-espresso-800 rounded border-espresso-800/30 focus:ring-espresso-800 dark:focus:ring-cream-100"
                  />
                  <span class="text-sm font-medium text-espresso-800 dark:text-cream-100">
                    {{ form.active ? 'Active' : 'Inactive' }}
                  </span>
                </label>
                <label class="inline-flex items-center gap-2 cursor-pointer ml-3">
                  <input
                    type="checkbox"
                    v-model="form.featured"
                    class="w-4 h-4 text-espresso-800 rounded border-espresso-800/30 focus:ring-espresso-800 dark:focus:ring-cream-100"
                  />
                  <span class="text-sm font-medium text-espresso-800 dark:text-cream-100">Featured</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Image URL -->
          <div>
            <label class="form-label">Image URL</label>
            <input
              v-model="form.image"
              type="url"
              class="form-input"
              placeholder="https://images.unsplash.com/..."
            />
            <p class="text-[11px] text-espresso-700/60 dark:text-cream-200/50 mt-1">
              Leave blank to use default coffee image placeholder.
            </p>
          </div>

          <!-- Description -->
          <div>
            <label class="form-label">Description <span class="text-red-500">*</span></label>
            <textarea
              v-model="form.description"
              rows="3"
              class="form-textarea w-full"
              placeholder="Detailed flavor notes and product description..."
              :class="{ 'border-red-500 focus:ring-red-500': errors.description }"
            ></textarea>
            <p v-if="errors.description" class="text-xs text-red-500 mt-1">{{ errors.description }}</p>
          </div>

          <!-- Action buttons -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-espresso-800/10 dark:border-cream-100/10">
            <button
              type="button"
              @click="$emit('close')"
              class="btn-secondary text-sm px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn-primary text-sm px-6 py-2"
            >
              {{ isEditing ? 'Save Changes' : 'Create Product' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { X } from '@lucide/vue'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  product: { type: Object, default: null },
  isEditing: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'save'])

const defaultImage = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80'

const form = reactive({
  name: '',
  category: 'Coffee',
  price: 15000,
  stock: 50,
  description: '',
  image: '',
  active: true,
  featured: false
})

const errors = reactive({
  name: '',
  price: '',
  stock: '',
  description: ''
})

watch(() => props.product, (newVal) => {
  if (newVal) {
    form.name = newVal.name || ''
    form.category = newVal.category || 'Coffee'
    form.price = newVal.price || 0
    form.stock = newVal.stock !== undefined ? newVal.stock : 50
    form.description = newVal.description || ''
    form.image = newVal.image || ''
    form.active = newVal.active !== undefined ? newVal.active : true
    form.featured = newVal.featured || false
  } else {
    resetForm()
  }
  clearErrors()
}, { immediate: true })

function resetForm() {
  form.name = ''
  form.category = 'Coffee'
  form.price = 15000
  form.stock = 50
  form.description = ''
  form.image = ''
  form.active = true
  form.featured = false
}

function clearErrors() {
  errors.name = ''
  errors.price = ''
  errors.stock = ''
  errors.description = ''
}

function validate() {
  clearErrors()
  let valid = true

  if (!form.name.trim()) {
    errors.name = 'Product name is required.'
    valid = false
  }
  if (!form.price || form.price <= 0) {
    errors.price = 'Please enter a valid price.'
    valid = false
  }
  if (form.stock === undefined || form.stock < 0) {
    errors.stock = 'Stock cannot be negative.'
    valid = false
  }
  if (!form.description.trim()) {
    errors.description = 'Description is required.'
    valid = false
  }

  return valid
}

function handleSubmit() {
  if (!validate()) return

  emit('save', {
    ...form,
    image: form.image.trim() || defaultImage
  })
}
</script>
