<template>
  <div :class="cardClasses" @click="handleClick">
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3 v-if="title" class="card-title">{{ title }}</h3>
      </slot>
      <div v-if="$slots.actions" class="card-actions">
        <slot name="actions"></slot>
      </div>
    </div>
    
    <div class="card-body">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: true
    },
    shadow: {
      type: String,
      default: 'medium',
      validator: value => ['none', 'small', 'medium', 'large'].includes(value)
    }
  },
  emits: ['click'],
  computed: {
    cardClasses() {
      return [
        'card',
        `card-${this.variant}`,
        `card-${this.size}`,
        `card-shadow-${this.shadow}`,
        {
          'card-hoverable': this.hoverable,
          'card-clickable': this.clickable,
          'card-bordered': this.bordered
        }
      ]
    }
  },
  methods: {
    handleClick(event) {
      if (this.clickable) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
}

/* Borders */
.card-bordered {
  border: 1px solid #e1e5e9;
}

/* Shadows */
.card-shadow-none {
  box-shadow: none;
}

.card-shadow-small {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-shadow-medium {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-shadow-large {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* Sizes */
.card-small {
  font-size: 0.875rem;
}

.card-small .card-header,
.card-small .card-body,
.card-small .card-footer {
  padding: 0.75rem;
}

.card-medium .card-header,
.card-medium .card-body,
.card-medium .card-footer {
  padding: 1rem;
}

.card-large {
  font-size: 1.125rem;
}

.card-large .card-header,
.card-large .card-body,
.card-large .card-footer {
  padding: 1.5rem;
}

/* Variants */
.card-primary {
  border-color: #667eea;
}

.card-primary .card-header {
  background-color: #667eea;
  color: white;
}

.card-success {
  border-color: #28a745;
}

.card-success .card-header {
  background-color: #28a745;
  color: white;
}

.card-warning {
  border-color: #ffc107;
}

.card-warning .card-header {
  background-color: #ffc107;
  color: #212529;
}

.card-danger {
  border-color: #dc3545;
}

.card-danger .card-header {
  background-color: #dc3545;
  color: white;
}

.card-info {
  border-color: #17a2b8;
}

.card-info .card-header {
  background-color: #17a2b8;
  color: white;
}

/* Header */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e1e5e9;
  background-color: #f8f9fa;
}

.card-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Body */
.card-body {
  flex: 1;
}

/* Footer */
.card-footer {
  border-top: 1px solid #e1e5e9;
  background-color: #f8f9fa;
}

/* Interactive states */
.card-hoverable:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-clickable {
  cursor: pointer;
}

.card-clickable:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12);
}

.card-clickable:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 480px) {
  .card-large .card-header,
  .card-large .card-body,
  .card-large .card-footer {
    padding: 1rem;
  }
  
  .card-medium .card-header,
  .card-medium .card-body,
  .card-medium .card-footer {
    padding: 0.75rem;
  }
}
</style>