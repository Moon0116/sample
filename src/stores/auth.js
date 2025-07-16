import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    isLoggedIn: state => !!state.token && !!state.user,
    userName: state => state.user?.name || '',
    userEmail: state => state.user?.email || ''
  },

  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call
        const response = await this.mockLogin(credentials)

        this.token = response.token
        this.user = response.user
        this.isAuthenticated = true

        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))

        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async register(userData) {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call
        const response = await this.mockRegister(userData)

        this.token = response.token
        this.user = response.user
        this.isAuthenticated = true

        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))

        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        // TODO: Call logout API if needed

        this.token = null
        this.user = null
        this.isAuthenticated = false
        this.error = null

        localStorage.removeItem('token')
        localStorage.removeItem('user')

        return { success: true }
      } catch (error) {
        console.error('Logout error:', error)
        return { success: false, error: error.message }
      }
    },

    async forgotPassword(email) {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call
        await this.mockForgotPassword(email)
        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async resetPassword(token, newPassword) {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call
        await this.mockResetPassword(token, newPassword)
        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async updateProfile(userData) {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call
        const response = await this.mockUpdateProfile(userData)

        this.user = { ...this.user, ...response.user }
        localStorage.setItem('user', JSON.stringify(this.user))

        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    initializeAuth() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
        this.isAuthenticated = true
      }
    },

    clearError() {
      this.error = null
    },

    // Mock API methods - replace with actual API calls
    async mockLogin(credentials) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (
            credentials.email === 'user@example.com' &&
            credentials.password === 'password'
          ) {
            resolve({
              token: 'mock-jwt-token-' + Date.now(),
              user: {
                id: 1,
                name: 'John Doe',
                email: 'user@example.com',
                avatar: null,
                createdAt: new Date().toISOString()
              }
            })
          } else {
            reject(new Error('Invalid email or password'))
          }
        }, 1000)
      })
    },

    async mockRegister(userData) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (userData.email && userData.password && userData.name) {
            resolve({
              token: 'mock-jwt-token-' + Date.now(),
              user: {
                id: Date.now(),
                name: userData.name,
                email: userData.email,
                avatar: null,
                createdAt: new Date().toISOString()
              }
            })
          } else {
            reject(new Error('Missing required fields'))
          }
        }, 1000)
      })
    },

    async mockForgotPassword(email) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email) {
            resolve({ message: 'Password reset email sent' })
          } else {
            reject(new Error('Email is required'))
          }
        }, 1000)
      })
    },

    async mockResetPassword(token, newPassword) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (token && newPassword) {
            resolve({ message: 'Password reset successful' })
          } else {
            reject(new Error('Invalid token or password'))
          }
        }, 1000)
      })
    },

    async mockUpdateProfile(userData) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            user: userData
          })
        }, 1000)
      })
    }
  }
})
