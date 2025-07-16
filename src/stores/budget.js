import { defineStore } from 'pinia'
import { useTransactionsStore } from './transactions'

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    budgets: [],
    loading: false,
    error: null,
    currentPeriod: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    }
  }),

  getters: {
    currentMonthBudgets: (state) => {
      return state.budgets.filter(budget => {
        const budgetDate = new Date(budget.year, budget.month - 1)
        const currentDate = new Date(state.currentPeriod.year, state.currentPeriod.month - 1)
        return budgetDate.getTime() === currentDate.getTime()
      })
    },
    
    totalBudget: (state) => {
      return state.budgets
        .filter(budget => {
          const budgetDate = new Date(budget.year, budget.month - 1)
          const currentDate = new Date(state.currentPeriod.year, state.currentPeriod.month - 1)
          return budgetDate.getTime() === currentDate.getTime()
        })
        .reduce((sum, budget) => sum + budget.amount, 0)
    },
    
    budgetProgress: (state) => {
      const transactionsStore = useTransactionsStore()
      
      return state.budgets.map(budget => {
        // Get transactions for this budget's category and period
        const startDate = new Date(budget.year, budget.month - 1, 1)
        const endDate = new Date(budget.year, budget.month, 0)
        
        const spent = transactionsStore.transactions
          .filter(transaction => {
            const transactionDate = new Date(transaction.date)
            return transaction.type === 'expense' &&
                   transaction.categoryId === budget.categoryId &&
                   transactionDate >= startDate &&
                   transactionDate <= endDate
          })
          .reduce((sum, transaction) => sum + transaction.amount, 0)
        
        const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0
        const remaining = budget.amount - spent
        
        return {
          ...budget,
          spent,
          remaining,
          percentage: Math.min(percentage, 100),
          status: percentage >= 100 ? 'exceeded' : percentage >= 80 ? 'warning' : 'good'
        }
      })
    },
    
    budgetSummary: (state) => {
      const progress = state.budgetProgress
      const totalBudgeted = progress.reduce((sum, p) => sum + p.amount, 0)
      const totalSpent = progress.reduce((sum, p) => sum + p.spent, 0)
      const totalRemaining = totalBudgeted - totalSpent
      
      return {
        totalBudgeted,
        totalSpent,
        totalRemaining,
        overallPercentage: totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0,
        categoriesCount: progress.length,
        exceededCount: progress.filter(p => p.status === 'exceeded').length,
        warningCount: progress.filter(p => p.status === 'warning').length
      }
    },
    
    budgetAlerts: (state) => {
      return state.budgetProgress
        .filter(budget => budget.status === 'warning' || budget.status === 'exceeded')
        .map(budget => ({
          id: budget.id,
          categoryName: budget.categoryName,
          message: budget.status === 'exceeded' 
            ? `Budget exceeded by $${(budget.spent - budget.amount).toFixed(2)}`
            : `${budget.percentage.toFixed(0)}% of budget used`,
          type: budget.status,
          amount: budget.amount,
          spent: budget.spent
        }))
    }
  },

  actions: {
    async fetchBudgets() {
      this.loading = true
      this.error = null
      
      try {
        // TODO: Replace with actual API call
        const budgets = await this.mockFetchBudgets()
        this.budgets = budgets
        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async createBudget(budgetData) {
      this.loading = true
      this.error = null
      
      try {
        // TODO: Replace with actual API call
        const budget = await this.mockCreateBudget(budgetData)
        this.budgets.push(budget)
        return { success: true, budget }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async updateBudget(id, budgetData) {
      this.loading = true
      this.error = null
      
      try {
        // TODO: Replace with actual API call
        const budget = await this.mockUpdateBudget(id, budgetData)
        const index = this.budgets.findIndex(b => b.id === id)
        if (index !== -1) {
          this.budgets[index] = budget
        }
        return { success: true, budget }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async deleteBudget(id) {
      this.loading = true
      this.error = null
      
      try {
        // TODO: Replace with actual API call
        await this.mockDeleteBudget(id)
        this.budgets = this.budgets.filter(b => b.id !== id)
        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async copyBudgetFromPreviousMonth() {
      this.loading = true
      this.error = null
      
      try {
        const previousMonth = this.currentPeriod.month === 1 ? 12 : this.currentPeriod.month - 1
        const previousYear = this.currentPeriod.month === 1 ? this.currentPeriod.year - 1 : this.currentPeriod.year
        
        const previousBudgets = this.budgets.filter(budget => 
          budget.year === previousYear && budget.month === previousMonth
        )
        
        const newBudgets = []
        for (const budget of previousBudgets) {
          const newBudget = {
            ...budget,
            id: undefined,
            year: this.currentPeriod.year,
            month: this.currentPeriod.month
          }
          
          const createdBudget = await this.mockCreateBudget(newBudget)
          newBudgets.push(createdBudget)
          this.budgets.push(createdBudget)
        }
        
        return { success: true, budgets: newBudgets }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    setPeriod(year, month) {
      this.currentPeriod = { year, month }
    },

    clearError() {
      this.error = null
    },

    // Mock API methods - replace with actual API calls
    async mockFetchBudgets() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const transactionsStore = useTransactionsStore()
          const mockBudgets = [
            {
              id: 1,
              categoryId: 5,
              categoryName: 'Food & Dining',
              amount: 500,
              year: new Date().getFullYear(),
              month: new Date().getMonth() + 1,
              createdAt: new Date().toISOString()
            },
            {
              id: 2,
              categoryId: 6,
              categoryName: 'Transportation',
              amount: 200,
              year: new Date().getFullYear(),
              month: new Date().getMonth() + 1,
              createdAt: new Date().toISOString()
            },
            {
              id: 3,
              categoryId: 7,
              categoryName: 'Shopping',
              amount: 300,
              year: new Date().getFullYear(),
              month: new Date().getMonth() + 1,
              createdAt: new Date().toISOString()
            },
            {
              id: 4,
              categoryId: 8,
              categoryName: 'Entertainment',
              amount: 150,
              year: new Date().getFullYear(),
              month: new Date().getMonth() + 1,
              createdAt: new Date().toISOString()
            }
          ]
          resolve(mockBudgets)
        }, 500)
      })
    },

    async mockCreateBudget(budgetData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const transactionsStore = useTransactionsStore()
          const category = transactionsStore.categories.find(c => c.id === budgetData.categoryId)
          
          const budget = {
            id: Date.now(),
            ...budgetData,
            categoryName: category?.name || 'Unknown Category',
            createdAt: new Date().toISOString()
          }
          resolve(budget)
        }, 500)
      })
    },

    async mockUpdateBudget(id, budgetData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const transactionsStore = useTransactionsStore()
          const category = transactionsStore.categories.find(c => c.id === budgetData.categoryId)
          
          const budget = {
            id,
            ...budgetData,
            categoryName: category?.name || 'Unknown Category',
            updatedAt: new Date().toISOString()
          }
          resolve(budget)
        }, 500)
      })
    },

    async mockDeleteBudget(id) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true })
        }, 500)
      })
    }
  }
})