<template>
  <teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="handleOverlayClick"
    >
      <div :class="modalClasses" @click.stop>
        <div
          v-if="title || $slots.header"
          class="flex items-center justify-between p-6 border-b border-gray-200"
        >
          <slot name="header">
            <h2 class="text-xl font-semibold text-gray-900">{{ title }}</h2>
          </slot>
          <button
            v-if="closable"
            class="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            @click="close"
          >
            ×
          </button>
        </div>

        <div class="p-6 overflow-y-auto flex-1">
          <slot></slot>
        </div>

        <div
          v-if="$slots.footer"
          class="flex justify-end gap-2 p-4 border-t border-gray-200"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { computed, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large', 'full'].includes(value)
  },
  closable: {
    type: Boolean,
    default: true
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])

const modalClasses = computed(() => {
  const baseClasses =
    'bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden flex flex-col'

  const sizeClasses = {
    small: 'w-full max-w-md',
    medium: 'w-full max-w-2xl',
    large: 'w-full max-w-4xl',
    full: 'w-full h-full max-w-none max-h-none rounded-none'
  }

  return `${baseClasses} ${sizeClasses[props.size]}`
})

const close = () => {
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    close()
  }
}

watch(
  () => props.show,
  newVal => {
    if (newVal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>
