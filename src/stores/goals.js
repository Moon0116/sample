import { defineStore } from 'pinia'

export const useGoalsStore = defineStore('goals', {
  state: () => ({
    goals: [],
    loading: false,
    error: null
  }),

  getters: {
    activeGoals: state => {
      return state.goals.filter(goal => goal.status === 'active')
    },

    completedGoals: state => {
      return state.goals.filter(goal => goal.status === 'completed')
    },

    pausedGoals: state => {
      return state.goals.filter(goal => goal.status === 'paused')
    },

    goalsByCategory: state => {
      const categories = {}
      state.goals.forEach(goal => {
        if (!categories[goal.category]) {
          categories[goal.category] = []
        }
        categories[goal.category].push(goal)
      })
      return categories
    },

    goalsProgress: state => {
      return state.goals.map(goal => {
        const progress =
          goal.targetAmount > 0
            ? (goal.currentAmount / goal.targetAmount) * 100
            : 0
        const remaining = goal.targetAmount - goal.currentAmount
        const daysLeft = goal.targetDate
          ? Math.ceil(
              (new Date(goal.targetDate) - new Date()) / (1000 * 60 * 60 * 24)
            )
          : null

        // Calculate required monthly/weekly contribution
        let requiredMonthly = 0
        let requiredWeekly = 0

        if (daysLeft && daysLeft > 0 && remaining > 0) {
          const monthsLeft = daysLeft / 30
          const weeksLeft = daysLeft / 7
          requiredMonthly = monthsLeft > 0 ? remaining / monthsLeft : remaining
          requiredWeekly = weeksLeft > 0 ? remaining / weeksLeft : remaining
        }

        return {
          ...goal,
          progress: Math.min(progress, 100),
          remaining,
          daysLeft,
          requiredMonthly,
          requiredWeekly,
          isOverdue: daysLeft !== null && daysLeft < 0,
          isNearDeadline: daysLeft !== null && daysLeft <= 30 && daysLeft > 0
        }
      })
    },

    goalsSummary: state => {
      const progress = state.goalsProgress
      const totalGoals = progress.length
      const activeGoals = progress.filter(g => g.status === 'active').length
      const completedGoals = progress.filter(
        g => g.status === 'completed'
      ).length
      const totalTarget = progress.reduce((sum, g) => sum + g.targetAmount, 0)
      const totalSaved = progress.reduce((sum, g) => sum + g.currentAmount, 0)
      const overallProgress =
        totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0

      return {
        totalGoals,
        activeGoals,
        completedGoals,
        totalTarget,
        totalSaved,
        overallProgress,
        overdueGoals: progress.filter(g => g.isOverdue).length,
        nearDeadlineGoals: progress.filter(g => g.isNearDeadline).length
      }
    },

    upcomingMilestones: state => {
      return state.goalsProgress
        .filter(goal => goal.status === 'active')
        .map(goal => {
          const milestones = []
          const milestonePercentages = [25, 50, 75, 90, 100]

          milestonePercentages.forEach(percentage => {
            const milestoneAmount = (goal.targetAmount * percentage) / 100
            if (goal.currentAmount < milestoneAmount) {
              milestones.push({
                goalId: goal.id,
                goalName: goal.name,
                percentage,
                amount: milestoneAmount,
                remaining: milestoneAmount - goal.currentAmount
              })
            }
          })

          return milestones
        })
        .flat()
        .sort((a, b) => a.remaining - b.remaining)
        .slice(0, 5)
    }
  },

  actions: {
    async fetchGoals() {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call
        const goals = await this.mockFetchGoals()
        this.goals = goals
        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async createGoal(goalData) {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call
        const goal = await this.mockCreateGoal(goalData)
        this.goals.push(goal)
        return { success: true, goal }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async updateGoal(id, goalData) {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call
        const goal = await this.mockUpdateGoal(id, goalData)
        const index = this.goals.findIndex(g => g.id === id)
        if (index !== -1) {
          this.goals[index] = goal
        }
        return { success: true, goal }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async deleteGoal(id) {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call
        await this.mockDeleteGoal(id)
        this.goals = this.goals.filter(g => g.id !== id)
        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async contributeToGoal(id, amount, description = '') {
      this.loading = true
      this.error = null

      try {
        // TODO: Replace with actual API call
        const contribution = await this.mockContributeToGoal(
          id,
          amount,
          description
        )

        const goalIndex = this.goals.findIndex(g => g.id === id)
        if (goalIndex !== -1) {
          this.goals[goalIndex].currentAmount += amount

          // Check if goal is completed
          if (
            this.goals[goalIndex].currentAmount >=
            this.goals[goalIndex].targetAmount
          ) {
            this.goals[goalIndex].status = 'completed'
            this.goals[goalIndex].completedAt = new Date().toISOString()
          }

          // Add contribution to history
          if (!this.goals[goalIndex].contributions) {
            this.goals[goalIndex].contributions = []
          }
          this.goals[goalIndex].contributions.unshift(contribution)
        }

        return { success: true, contribution }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async pauseGoal(id) {
      return this.updateGoal(id, { status: 'paused' })
    },

    async resumeGoal(id) {
      return this.updateGoal(id, { status: 'active' })
    },

    async completeGoal(id) {
      return this.updateGoal(id, {
        status: 'completed',
        completedAt: new Date().toISOString()
      })
    },

    clearError() {
      this.error = null
    },

    // Mock API methods - replace with actual API calls
    async mockFetchGoals() {
      return new Promise(resolve => {
        setTimeout(() => {
          const mockGoals = [
            {
              id: 1,
              name: 'Emergency Fund',
              description: 'Build an emergency fund for unexpected expenses',
              category: 'Emergency',
              targetAmount: 10000,
              currentAmount: 3500,
              targetDate: '2024-12-31',
              status: 'active',
              priority: 'high',
              color: '#dc3545',
              icon: '🚨',
              contributions: [
                {
                  id: 1,
                  amount: 500,
                  description: 'Monthly contribution',
                  date: '2024-01-15',
                  createdAt: '2024-01-15T10:00:00Z'
                }
              ],
              createdAt: '2024-01-01T00:00:00Z'
            },
            {
              id: 2,
              name: 'Vacation to Japan',
              description: 'Save for a 2-week trip to Japan',
              category: 'Travel',
              targetAmount: 5000,
              currentAmount: 1200,
              targetDate: '2024-08-01',
              status: 'active',
              priority: 'medium',
              color: '#28a745',
              icon: '✈️',
              contributions: [],
              createdAt: '2024-01-01T00:00:00Z'
            },
            {
              id: 3,
              name: 'New Laptop',
              description: 'Save for a new MacBook Pro',
              category: 'Technology',
              targetAmount: 2500,
              currentAmount: 800,
              targetDate: '2024-06-01',
              status: 'active',
              priority: 'low',
              color: '#17a2b8',
              icon: '💻',
              contributions: [],
              createdAt: '2024-01-01T00:00:00Z'
            }
          ]
          resolve(mockGoals)
        }, 500)
      })
    },

    async mockCreateGoal(goalData) {
      return new Promise(resolve => {
        setTimeout(() => {
          const goal = {
            id: Date.now(),
            currentAmount: 0,
            status: 'active',
            contributions: [],
            createdAt: new Date().toISOString(),
            ...goalData
          }
          resolve(goal)
        }, 500)
      })
    },

    async mockUpdateGoal(id, goalData) {
      return new Promise(resolve => {
        setTimeout(() => {
          const goal = {
            id,
            ...goalData,
            updatedAt: new Date().toISOString()
          }
          resolve(goal)
        }, 500)
      })
    },

    async mockDeleteGoal() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ success: true })
        }, 500)
      })
    },

    async mockContributeToGoal(id, amount, description) {
      return new Promise(resolve => {
        setTimeout(() => {
          const contribution = {
            id: Date.now(),
            amount,
            description,
            date: new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString()
          }
          resolve(contribution)
        }, 500)
      })
    }
  }
})
