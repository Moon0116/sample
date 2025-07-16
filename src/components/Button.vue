<template>
  <button 
    :class="buttonClasses" 
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <slot v-else></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'outline'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  computed: {
    buttonClasses() {
      return [
        'btn',
        `btn-${this.variant}`,
        `btn-${this.size}`,
        {
          'btn-block': this.block,
          'btn-rounded': this.rounded,
          'btn-loading': this.loading,
          'btn-disabled': this.disabled
        }
      ]
    }
  },
  methods: {
    handleClick(event) {
      if (!this.disabled && !this.loading) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  position: relative;
  outline: none;
}

/* Sizes */
.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-radius: 6px;
}

.btn-medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  border-radius: 10px;
}

/* Variants */
.btn-primary {
  background-color: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #5a6fd8;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #5a6268;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background-color: #218838;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #c82333;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-warning:hover:not(:disabled) {
  background-color: #e0a800;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover:not(:disabled) {
  background-color: #138496;
}

.btn-light {
  background-color: #f8f9fa;
  color: #212529;
  border: 1px solid #dee2e6;
}

.btn-light:hover:not(:disabled) {
  background-color: #e2e6ea;
}

.btn-dark {
  background-color: #343a40;
  color: white;
}

.btn-dark:hover:not(:disabled) {
  background-color: #23272b;
}

.btn-outline {
  background-color: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-outline:hover:not(:disabled) {
  background-color: #667eea;
  color: white;
}

/* States */
.btn:disabled,
.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-loading {
  cursor: not-allowed;
}

/* Modifiers */
.btn-block {
  display: flex;
  width: 100%;
}

.btn-rounded {
  border-radius: 50px;
}

/* Loading spinner */
.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Focus styles */
.btn:focus {
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.25);
}

.btn-outline:focus {
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.25);
}
</style>