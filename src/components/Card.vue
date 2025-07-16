<template>
  <div :class="cardClasses" @click="handleClick">
    <div
      v-if="$slots.header || title"
      class="border-b border-gray-200 bg-gray-50 px-4 py-3"
    >
      <slot name="header">
        <h3 v-if="title" class="text-lg font-semibold text-gray-900">
          {{ title }}
        </h3>
      </slot>
      <div v-if="$slots.actions" class="flex items-center gap-2">
        <slot name="actions"></slot>
      </div>
    </div>

    <div class="p-4">
      <slot></slot>
    </div>

    <div
      v-if="$slots.footer"
      class="border-t border-gray-200 bg-gray-50 px-4 py-3"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: value =>
      ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(
        value
      )
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  clickable: {
    type: Boolean,
    default: false
  },
  shadow: {
    type: String,
    default: 'medium',
    validator: value => ['none', 'small', 'medium', 'large'].includes(value)
  }
})

const emit = defineEmits(['click'])

const cardClasses = computed(() => {
  const baseClasses =
    'bg-white rounded-lg overflow-hidden transition-all duration-200'

  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg'
  }

  const variantClasses = {
    default: 'border border-gray-200',
    primary: 'border border-blue-200',
    success: 'border border-green-200',
    warning: 'border border-yellow-200',
    danger: 'border border-red-200',
    info: 'border border-cyan-200'
  }

  const interactiveClasses = []
  if (props.hoverable) {
    interactiveClasses.push('hover:-translate-y-1 hover:shadow-lg')
  }
  if (props.clickable) {
    interactiveClasses.push(
      'cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:translate-y-0'
    )
  }

  return [
    baseClasses,
    shadowClasses[props.shadow],
    variantClasses[props.variant],
    ...interactiveClasses
  ]
    .filter(Boolean)
    .join(' ')
})

const handleClick = event => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>
