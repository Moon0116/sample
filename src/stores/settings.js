import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // General Settings
    currency: 'USD',
    language: 'en',
    theme: 'light',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'US',

    // Notification Settings
    notifications: {
      pushEnabled: true,
      newTransactions: true,
      largeExpenses: true,
      expenseThreshold: 100,
      dailySummary: false,
      budgetWarnings: true,
      budgetThreshold: 75,
      budgetExceeded: true,
      goalMilestones: true,
      goalReminders: false,
      weeklyReports: true,
      monthlyReports: true,
      securityAlerts: true,
      quietStart: '22:00',
      quietEnd: '08:00',
      weekendNotifications: false
    },

    // Privacy & Security Settings
    security: {
      biometricLogin: false,
      autoLock: true,
      autoLockTimeout: 5, // minutes
      twoFactorAuth: {
        enabled: false,
        method: 'sms', // 'sms', 'email', 'app'
        phone: '',
        email: ''
      },
      dataEncryption: true,
      secureBackup: true,
      loginHistory: true
    },

    // Data Management Settings
    data: {
      autoBackup: true,
      backupFrequency: 'weekly', // 'daily', 'weekly', 'monthly'
      cloudSync: true,
      dataRetention: 365, // days
      exportFormat: 'csv' // 'csv', 'json', 'pdf'
    },

    // Display Settings
    display: {
      showBalance: true,
      hideAmounts: false,
      compactView: false,
      showCategories: true,
      defaultView: 'dashboard', // 'dashboard', 'transactions', 'analytics'
      chartType: 'bar' // 'bar', 'line', 'pie'
    },

    loading: false,
    error: null
  }),

  getters: {
    currencySymbol: state => {
      const symbols = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
        KRW: '₩',
        CNY: '¥'
      }
      return symbols[state.currency] || '$'
    },

    languageName: state => {
      const languages = {
        en: 'English',
        ko: '한국어',
        ja: '日本語',
        zh: '中文',
        es: 'Español',
        fr: 'Français',
        de: 'Deutsch'
      }
      return languages[state.language] || 'English'
    },

    themeName: state => {
      const themes = {
        light: 'Light',
        dark: 'Dark',
        auto: 'Auto'
      }
      return themes[state.theme] || 'Light'
    },

    isQuietTime: state => {
      const now = new Date()
      const currentTime = now.getHours() * 60 + now.getMinutes()

      const [quietStartHour, quietStartMin] = state.notifications.quietStart
        .split(':')
        .map(Number)
      const [quietEndHour, quietEndMin] = state.notifications.quietEnd
        .split(':')
        .map(Number)

      const quietStart = quietStartHour * 60 + quietStartMin
      const quietEnd = quietEndHour * 60 + quietEndMin

      if (quietStart < quietEnd) {
        return currentTime >= quietStart && currentTime <= quietEnd
      } else {
        // Quiet time spans midnight
        return currentTime >= quietStart || currentTime <= quietEnd
      }
    },

    shouldShowNotification: state => {
      if (!state.notifications.pushEnabled) return false
      if (state.isQuietTime) return false

      const now = new Date()
      const isWeekend = now.getDay() === 0 || now.getDay() === 6

      if (isWeekend && !state.notifications.weekendNotifications) return false

      return true
    }
  },

  actions: {
    async loadSettings() {
      this.loading = true
      this.error = null

      try {
        // Load from localStorage first
        const savedSettings = localStorage.getItem('app-settings')
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings)
          this.$patch(parsed)
        }

        // TODO: Replace with actual API call to sync with server
        const serverSettings = await this.mockLoadSettings()
        if (serverSettings) {
          this.$patch(serverSettings)
          this.saveToLocalStorage()
        }

        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async saveSettings() {
      this.loading = true
      this.error = null

      try {
        // Save to localStorage immediately
        this.saveToLocalStorage()

        // TODO: Replace with actual API call to sync with server
        await this.mockSaveSettings(this.$state)

        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    updateSetting(path, value) {
      const keys = path.split('.')
      let current = this

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value

      // Auto-save to localStorage
      this.saveToLocalStorage()
    },

    async resetSettings() {
      this.loading = true
      this.error = null

      try {
        // Reset to default values
        this.$reset()

        // Clear localStorage
        localStorage.removeItem('app-settings')

        // TODO: Replace with actual API call
        await this.mockResetSettings()

        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async exportSettings() {
      try {
        const settings = { ...this.$state }
        delete settings.loading
        delete settings.error

        const blob = new Blob([JSON.stringify(settings, null, 2)], {
          type: 'application/json'
        })

        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `settings-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      }
    },

    async importSettings(file) {
      this.loading = true
      this.error = null

      try {
        const text = await file.text()
        const settings = JSON.parse(text)

        // Validate settings structure
        if (!this.validateSettings(settings)) {
          throw new Error('Invalid settings file format')
        }

        // Apply settings
        this.$patch(settings)
        this.saveToLocalStorage()

        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async clearCache() {
      try {
        // Clear various caches
        localStorage.removeItem('transactions-cache')
        localStorage.removeItem('budgets-cache')
        localStorage.removeItem('goals-cache')

        // Clear service worker cache if available
        if ('caches' in window) {
          const cacheNames = await caches.keys()
          await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
          )
        }

        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      }
    },

    saveToLocalStorage() {
      try {
        const settings = { ...this.$state }
        delete settings.loading
        delete settings.error
        localStorage.setItem('app-settings', JSON.stringify(settings))
      } catch (error) {
        console.error('Failed to save settings to localStorage:', error)
      }
    },

    validateSettings(settings) {
      // Basic validation of settings structure
      const requiredKeys = [
        'currency',
        'language',
        'theme',
        'notifications',
        'security',
        'data',
        'display'
      ]
      return requiredKeys.every(key => key in settings)
    },

    clearError() {
      this.error = null
    },

    // Mock API methods - replace with actual API calls
    async mockLoadSettings() {
      return new Promise(resolve => {
        setTimeout(() => {
          // Return null to indicate no server settings available
          resolve(null)
        }, 500)
      })
    },

    async mockSaveSettings(settings) {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('Settings saved to server:', settings)
          resolve({ success: true })
        }, 500)
      })
    },

    async mockResetSettings() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ success: true })
        }, 500)
      })
    }
  }
})
