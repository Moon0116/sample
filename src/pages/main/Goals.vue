<template>
  <div class="goals-page">
    <div class="goals-header">
      <h1>Goals</h1>
      <button class="add-btn" @click="addGoal">+ Add Goal</button>
    </div>

    <div class="goals-content">
      <div class="goals-summary">
        <div class="summary-card">
          <h3>Active Goals</h3>
          <p class="count">{{ activeGoals.length }}</p>
        </div>

        <div class="summary-card">
          <h3>Total Target</h3>
          <p class="amount">${{ totalTarget.toLocaleString() }}</p>
        </div>

        <div class="summary-card">
          <h3>Total Saved</h3>
          <p class="amount saved">${{ totalSaved.toLocaleString() }}</p>
        </div>
      </div>

      <div class="goals-list">
        <h2>Your Goals</h2>

        <div class="goal-cards">
          <div v-for="goal in goals" :key="goal.id" class="goal-card">
            <div class="goal-header">
              <div class="goal-info">
                <div class="goal-icon">
                  {{ goal.icon }}
                </div>
                <div class="goal-details">
                  <h4>{{ goal.title }}</h4>
                  <p>{{ goal.description }}</p>
                </div>
              </div>
              <div class="goal-status" :class="goal.status">
                {{ goal.percentage }}%
              </div>
            </div>

            <div class="goal-progress">
              <div class="progress-info">
                <span class="current"
                  >${{ goal.current.toLocaleString() }}</span
                >
                <span class="target"
                  >/ ${{ goal.target.toLocaleString() }}</span
                >
              </div>
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :class="goal.status"
                  :style="{ width: goal.percentage + '%' }"
                ></div>
              </div>
              <div class="goal-meta">
                <span class="deadline">{{ goal.deadline }}</span>
                <span class="remaining"
                  >${{ (goal.target - goal.current).toLocaleString() }} to
                  go</span
                >
              </div>
            </div>

            <div class="goal-actions">
              <button class="btn-contribute" @click="contributeToGoal(goal.id)">
                Add Money
              </button>
              <button class="btn-edit" @click="editGoal(goal.id)">Edit</button>
            </div>
          </div>
        </div>

        <div v-if="goals.length === 0" class="empty-state">
          <div class="empty-icon">🎯</div>
          <h3>No Goals Yet</h3>
          <p>Set your first financial goal to start saving!</p>
          <button class="btn-primary" @click="addGoal">
            Create Your First Goal
          </button>
        </div>
      </div>
    </div>

    <div class="bottom-nav">
      <nav class="nav-tabs">
        <router-link to="/dashboard" class="nav-item"> Dashboard </router-link>
        <router-link to="/transactions" class="nav-item">
          Transactions
        </router-link>
        <router-link to="/analytics" class="nav-item"> Analytics </router-link>
        <router-link to="/profile" class="nav-item"> Profile </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Goals',
  data() {
    return {
      goals: [
        {
          id: 1,
          title: 'Emergency Fund',
          description: 'Build emergency savings',
          icon: '🚨',
          target: 10000,
          current: 7500,
          percentage: 75,
          status: 'good',
          deadline: 'Dec 2024'
        },
        {
          id: 2,
          title: 'Vacation Fund',
          description: 'Save for summer vacation',
          icon: '✈️',
          target: 3000,
          current: 1200,
          percentage: 40,
          status: 'progress',
          deadline: 'Jun 2024'
        },
        {
          id: 3,
          title: 'New Car',
          description: 'Down payment for new car',
          icon: '🚗',
          target: 15000,
          current: 2500,
          percentage: 17,
          status: 'start',
          deadline: 'Mar 2025'
        }
      ]
    }
  },
  computed: {
    activeGoals() {
      return this.goals.filter(goal => goal.percentage < 100)
    },
    totalTarget() {
      return this.goals.reduce((sum, goal) => sum + goal.target, 0)
    },
    totalSaved() {
      return this.goals.reduce((sum, goal) => sum + goal.current, 0)
    }
  },
  methods: {
    addGoal() {
      // TODO: Open add goal modal
      console.log('Add goal')
    },
    editGoal(goalId) {
      // TODO: Open edit goal modal
      console.log('Edit goal:', goalId)
    },
    contributeToGoal(goalId) {
      // TODO: Open contribute modal
      console.log('Contribute to goal:', goalId)
    }
  }
}
</script>

<style scoped>
.goals-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 80px;
}

.goals-header {
  background: white;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goals-header h1 {
  color: #333;
  margin: 0;
}

.add-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.goals-content {
  padding: 1.5rem;
}

.goals-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.summary-card h3 {
  color: #666;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.count {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  margin: 0;
}

.amount {
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.amount.saved {
  color: #28a745;
}

.goals-list h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.goal-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.goal-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.goal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.goal-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.goal-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f0f2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.goal-details h4 {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 1.1rem;
}

.goal-details p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.goal-status {
  font-weight: 700;
  font-size: 1.2rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.goal-status.good {
  color: #28a745;
  background: #d4edda;
}

.goal-status.progress {
  color: #ffc107;
  background: #fff3cd;
}

.goal-status.start {
  color: #6c757d;
  background: #f8f9fa;
}

.goal-progress {
  margin-bottom: 1rem;
}

.progress-info {
  display: flex;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.current {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
}

.target {
  font-size: 1rem;
  color: #666;
  margin-left: 0.25rem;
}

.progress-bar {
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.progress-fill.good {
  background: #28a745;
}

.progress-fill.progress {
  background: #ffc107;
}

.progress-fill.start {
  background: #6c757d;
}

.goal-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
}

.goal-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-contribute {
  flex: 1;
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btn-edit {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.btn-primary {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #eee;
  padding: 1rem;
}

.nav-tabs {
  display: flex;
  justify-content: space-around;
}

.nav-item {
  text-decoration: none;
  color: #666;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-item.active,
.nav-item:hover {
  color: #667eea;
  background: #f0f2ff;
}
</style>
