<template>
  <div class="input-group" :class="{ 'has-error': error, 'is-focused': isFocused }">
    <label v-if="label" class="input-label" :for="inputId">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>
    
    <div class="input-wrapper">
      <div v-if="$slots.prefix || prefixIcon" class="input-prefix">
        <slot name="prefix">
          <span v-if="prefixIcon" class="input-icon">{{ prefixIcon }}</span>
        </slot>
      </div>
      
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :maxlength="maxlength"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      
      <div v-if="$slots.suffix || suffixIcon || showPasswordToggle" class="input-suffix">
        <slot name="suffix">
          <button 
            v-if="showPasswordToggle" 
            type="button" 
            class="password-toggle"
            @click="togglePasswordVisibility"
          >
            {{ type === 'password' ? '👁️' : '🙈' }}
          </button>
          <span v-else-if="suffixIcon" class="input-icon">{{ suffixIcon }}</span>
        </slot>
      </div>
    </div>
    
    <div v-if="error || hint" class="input-message">
      <span v-if="error" class="error-message">{{ error }}</span>
      <span v-else-if="hint" class="hint-message">{{ hint }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    prefixIcon: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    min: {
      type: [String, Number],
      default: undefined
    },
    max: {
      type: [String, Number],
      default: undefined
    },
    step: {
      type: [String, Number],
      default: undefined
    },
    maxlength: {
      type: [String, Number],
      default: undefined
    }
  },
  emits: ['update:modelValue', 'focus', 'blur', 'keydown'],
  data() {
    return {
      isFocused: false,
      inputId: `input-${Math.random().toString(36).substr(2, 9)}`
    }
  },
  computed: {
    inputClasses() {
      return [
        'input-field',
        `input-${this.size}`,
        {
          'has-prefix': this.$slots.prefix || this.prefixIcon,
          'has-suffix': this.$slots.suffix || this.suffixIcon || this.showPasswordToggle
        }
      ]
    },
    showPasswordToggle() {
      return this.type === 'password' || (this.type === 'text' && this.$attrs.originalType === 'password')
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    handleFocus(event) {
      this.isFocused = true
      this.$emit('focus', event)
    },
    handleBlur(event) {
      this.isFocused = false
      this.$emit('blur', event)
    },
    handleKeydown(event) {
      this.$emit('keydown', event)
    },
    togglePasswordVisibility() {
      const input = this.$el.querySelector('input')
      if (input.type === 'password') {
        input.type = 'text'
        input.setAttribute('originalType', 'password')
      } else {
        input.type = 'password'
        input.removeAttribute('originalType')
      }
    },
    focus() {
      this.$el.querySelector('input').focus()
    },
    blur() {
      this.$el.querySelector('input').blur()
    }
  }
}
</script>

<style scoped>
.input-group {
  margin-bottom: 1rem;
}

.input-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
  font-size: 0.9rem;
}

.required-mark {
  color: #dc3545;
  margin-left: 0.25rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-field {
  width: 100%;
  border: 2px solid #e1e5e9;
  background-color: #fff;
  color: #333;
  transition: all 0.2s ease-in-out;
  outline: none;
}

.input-field:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-field:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

.input-field:readonly {
  background-color: #f8f9fa;
}

/* Sizes */
.input-small {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 6px;
}

.input-medium {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
}

.input-large {
  padding: 1rem 1.25rem;
  font-size: 1.125rem;
  border-radius: 10px;
}

/* With prefix/suffix */
.input-field.has-prefix {
  padding-left: 2.5rem;
}

.input-field.has-suffix {
  padding-right: 2.5rem;
}

.input-prefix,
.input-suffix {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: #6c757d;
  pointer-events: none;
}

.input-prefix {
  left: 0.75rem;
}

.input-suffix {
  right: 0.75rem;
}

.input-icon {
  font-size: 1rem;
}

.password-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: #6c757d;
  pointer-events: auto;
  transition: color 0.2s;
}

.password-toggle:hover {
  color: #333;
}

/* States */
.input-group.has-error .input-field {
  border-color: #dc3545;
}

.input-group.has-error .input-field:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.input-group.is-focused .input-label {
  color: #667eea;
}

/* Messages */
.input-message {
  margin-top: 0.25rem;
  font-size: 0.875rem;
}

.error-message {
  color: #dc3545;
}

.hint-message {
  color: #6c757d;
}

/* Placeholder */
.input-field::placeholder {
  color: #adb5bd;
}
</style>