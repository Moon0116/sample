<template>
  <div class="budget-page">
    <div class="budget-header">
      <h1>Budget</h1>
      <button class="add-btn" @click="addBudget">+ Add Budget</button>
    </div>

    <div class="budget-content">
      <div class="budget-overview">
        <div class="overview-card">
          <h3>Monthly Budget</h3>
          <div class="budget-progress">
            <div class="progress-info">
              <span class="spent">$1,850</span>
              <span class="total">/ $2,500</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 74%"></div>
            </div>
            <p class="remaining">$650 remaining</p>
          </div>
        </div>
      </div>

      <div class="budget-categories">
        <h2>Budget Categories</h2>

        <div class="category-list">
          <div
            v-for="category in budgetCategories"
            :key="category.id"
            class="category-item"
          >
            <div class="category-header">
              <div class="category-info">
                <div
                  class="category-icon"
                  :style="{ background: category.color }"
                >
                  {{ category.icon }}
                </div>
                <div class="category-details">
                  <h4>{{ category.name }}</h4>
                  <p>${{ category.spent }} / ${{ category.budget }}</p>
                </div>
              </div>
              <div class="category-status" :class="category.status">
                {{ category.percentage }}%
              </div>
            </div>

            <div class="category-progress">
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :class="category.status"
                  :style="{ width: category.percentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="budget-tips">
        <h2>Budget Tips</h2>
        <div class="tip-cards">
          <div class="tip-card">
            <div class="tip-icon">💡</div>
            <div class="tip-content">
              <h4>Stay on Track</h4>
              <p>You're doing great! Keep monitoring your spending.</p>
            </div>
          </div>

          <div class="tip-card warning">
            <div class="tip-icon">⚠️</div>
            <div class="tip-content">
              <h4>Food Budget Alert</h4>
              <p>You've exceeded your food budget by $50 this month.</p>
            </div>
          </div>
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
  name: 'Budget',
  data() {
    return {
      budgetCategories: [
        {
          id: 1,
          name: 'Food & Dining',
          icon: '🍽️',
          color: '#667eea',
          budget: 600,
          spent: 650,
          percentage: 108,
          status: 'over'
        },
        {
          id: 2,
          name: 'Transportation',
          icon: '🚗',
          color: '#764ba2',
          budget: 400,
          spent: 320,
          percentage: 80,
          status: 'good'
        },
        {
          id: 3,
          name: 'Shopping',
          icon: '🛍️',
          color: '#f093fb',
          budget: 300,
          spent: 180,
          percentage: 60,
          status: 'good'
        },
        {
          id: 4,
          name: 'Bills & Utilities',
          icon: '💡',
          color: '#4facfe',
          budget: 500,
          spent: 480,
          percentage: 96,
          status: 'warning'
        }
      ]
    }
  },
  methods: {
    addBudget() {
      // TODO: Open add budget modal
      console.log('Add budget')
    }
  }
}
</script>

<style scoped>
.budget-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 80px;
}

.budget-header {
  background: white;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.budget-header h1 {
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

.budget-content {
  padding: 1.5rem;
}

.budget-overview {
  margin-bottom: 2rem;
}

.overview-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.overview-card h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.progress-info {
  display: flex;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.spent {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
}

.total {
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
  background: #667eea;
  transition: width 0.3s ease;
}

.progress-fill.good {
  background: #28a745;
}

.progress-fill.warning {
  background: #ffc107;
}

.progress-fill.over {
  background: #dc3545;
}

.remaining {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.budget-categories h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.category-list {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
}

.category-item {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.category-item:last-child {
  border-bottom: none;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.category-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.category-details h4 {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 1rem;
}

.category-details p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.category-status {
  font-weight: 700;
  font-size: 1rem;
}

.category-status.good {
  color: #28a745;
}

.category-status.warning {
  color: #ffc107;
}

.category-status.over {
  color: #dc3545;
}

.category-progress .progress-bar {
  height: 6px;
}

.budget-tips h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.tip-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tip-card {
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: 4px solid #28a745;
}

.tip-card.warning {
  border-left-color: #ffc107;
}

.tip-icon {
  font-size: 1.5rem;
}

.tip-content h4 {
  color: #333;
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.tip-content p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
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
