import { defineStore } from 'pinia'

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: [],
    categories: [
      // Income categories
      { id: 1, name: 'Salary', type: 'income', color: '#28a745', icon: '💼' },
      {
        id: 2,
        name: 'Freelance',
        type: 'income',
        color: '#17a2b8',
        icon: '💻'
      },
      {
        id: 3,
        name: 'Investment',
        type: 'income',
        color: '#6f42c1',
        icon: '📈'
      },
      {
        id: 4,
        name: 'Other Income',
        type: 'income',
        color: '#20c997',
        icon: '💰'
      },

      // Expense categories
      {
        id: 5,
        name: 'Food & Dining',
        type: 'expense',
        color: '#fd7e14',
        icon: '🍽️'
      },
      {
        id: 6,
        name: 'Transportation',
        type: 'expense',
        color: '#6610f2',
        icon: '🚗'
      },
      {
        id: 7,
        name: 'Shopping',
        type: 'expense',
        color: '#e83e8c',
        icon: '🛍️'
      },
      {
        id: 8,
        name: 'Entertainment',
        type: 'expense',
        color: '#20c997',
        icon: '🎬'
      },
      {
        id: 9,
        name: 'Bills & Utilities',
        type: 'expense',
        color: '#dc3545',
        icon: '⚡'
      },
      {
        id: 10,
        name: 'Healthcare',
        type: 'expense',
        color: '#198754',
        icon: '🏥'
      },
      {
        id: 11,
        name: 'Education',
        type: 'expense',
        color: '#0d6efd',
        icon: '📚'
      },
      {
        id: 12,
        name: 'Other Expense',
        type: 'expense',
        color: '#6c757d',
        icon: '📝'
      }
    ],
    loading: false,
    error: null,
    filters: {
      type: 'all', // 'all', 'income', 'expense'
      category: null,
      dateRange: {
        start: null,
        end: null
      },
      amountRange: {
        min: null,
        max: null
      }
    }
  }),

  getters: {
    filteredTransactions: state => {
      let filtered = [...state.transactions]

      // Filter by type
      if (state.filters.type !== 'all') {
        filtered = filtered.filter(t => t.type === state.filters.type)
      }

      // Filter by category
      if (state.filters.category) {
        filtered = filtered.filter(t => t.categoryId === state.filters.category)
      }

      // Filter by date range
      if (state.filters.dateRange.start) {
        filtered = filtered.filter(
          t => new Date(t.date) >= new Date(state.filters.dateRange.start)
        )
      }
      if (state.filters.dateRange.end) {
        filtered = filtered.filter(
          t => new Date(t.date) <= new Date(state.filters.dateRange.end)
        )
      }

      // Filter by amount range
      if (state.filters.amountRange.min) {
        filtered = filtered.filter(
          t => t.amount >= state.filters.amountRange.min
        )
      }
      if (state.filters.amountRange.max) {
        filtered = filtered.filter(
          t => t.amount <= state.filters.amountRange.max
        )
      }

      return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
    },

    totalIncome: state => {
      return state.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)
    },

    totalExpenses: state => {
      return state.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
    },

    balance: state => {
      return state.transactions.reduce((balance, t) => {
        return t.type === 'income' ? balance + t.amount : balance - t.amount
      }, 0)
    },

    recentTransactions: state => {
      return state.transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10)
    },

    expensesByCategory: state => {
      const expenses = state.transactions.filter(t => t.type === 'expense')
      const categoryTotals = {}

      expenses.forEach(transaction => {
        const category = state.categories.find(
          c => c.id === transaction.categoryId
        )
        if (category) {
          if (!categoryTotals[category.name]) {
            categoryTotals[category.name] = {
              name: category.name,
              amount: 0,
              color: category.color,
              icon: category.icon
            }
          }
          categoryTotals[category.name].amount += transaction.amount
        }
      })

      return Object.values(categoryTotals).sort((a, b) => b.amount - a.amount)
    },

    incomeCategories: state =>
      state.categories.filter(c => c.type === 'income'),
    expenseCategories: state =>
      state.categories.filter(c => c.type === 'expense')
  },

  actions: {
    async fetchTransactions() {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call
        const transactions = await this.mockFetchTransactions()
        this.transactions = transactions
        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async addTransaction(transactionData) {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call
        const transaction = await this.mockAddTransaction(transactionData)
        this.transactions.unshift(transaction)
        return { success: true, transaction }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async updateTransaction(id, transactionData) {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call
        const transaction = await this.mockUpdateTransaction(
          id,
          transactionData
        )
        const index = this.transactions.findIndex(t => t.id === id)
        if (index !== -1) {
          this.transactions[index] = transaction
        }
        return { success: true, transaction }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async deleteTransaction(id) {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call
        await this.mockDeleteTransaction(id)
        this.transactions = this.transactions.filter(t => t.id !== id)
        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async addCategory(categoryData) {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call
        const category = await this.mockAddCategory(categoryData)
        this.categories.push(category)
        return { success: true, category }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    setFilter(filterType, value) {
      if (filterType === 'dateRange') {
        this.filters.dateRange = { ...this.filters.dateRange, ...value }
      } else if (filterType === 'amountRange') {
        this.filters.amountRange = { ...this.filters.amountRange, ...value }
      } else {
        this.filters[filterType] = value
      }
    },

    clearFilters() {
      this.filters = {
        type: 'all',
        category: null,
        dateRange: { start: null, end: null },
        amountRange: { min: null, max: null }
      }
    },

    clearError() {
      this.error = null
    },

    // Mock API methods - replace with actual API calls
    async mockFetchTransactions() {
      return new Promise(resolve => {
        setTimeout(() => {
          const mockTransactions = [
            {
              id: 1,
              type: 'income',
              amount: 5000,
              categoryId: 1,
              description: 'Monthly Salary',
              date: '2024-01-15',
              createdAt: '2024-01-15T10:00:00Z'
            },
            {
              id: 2,
              type: 'expense',
              amount: 50,
              categoryId: 5,
              description: 'Lunch at restaurant',
              date: '2024-01-14',
              createdAt: '2024-01-14T12:30:00Z'
            },
            {
              id: 3,
              type: 'expense',
              amount: 100,
              categoryId: 7,
              description: 'Grocery shopping',
              date: '2024-01-13',
              createdAt: '2024-01-13T15:45:00Z'
            }
          ]
          resolve(mockTransactions)
        }, 500)
      })
    },

    async mockAddTransaction(transactionData) {
      return new Promise(resolve => {
        setTimeout(() => {
          const transaction = {
            id: Date.now(),
            ...transactionData,
            createdAt: new Date().toISOString()
          }
          resolve(transaction)
        }, 500)
      })
    },

    async mockUpdateTransaction(id, transactionData) {
      return new Promise(resolve => {
        setTimeout(() => {
          const transaction = {
            id,
            ...transactionData,
            updatedAt: new Date().toISOString()
          }
          resolve(transaction)
        }, 500)
      })
    },

    async mockDeleteTransaction() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ success: true })
        }, 500)
      })
    },

    async mockAddCategory(categoryData) {
      return new Promise(resolve => {
        setTimeout(() => {
          const category = {
            id: Date.now(),
            ...categoryData
          }
          resolve(category)
        }, 500)
      })
    }
  }
})
