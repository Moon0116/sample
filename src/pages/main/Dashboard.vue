<template>
  <div class="dashboard-page">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <div class="user-info">
        <span>Welcome back!</span>
      </div>
    </div>
    
    <div class="dashboard-content">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Balance</h3>
          <p class="amount">$0.00</p>
        </div>
        
        <div class="stat-card">
          <h3>This Month</h3>
          <p class="amount income">+$0.00</p>
        </div>
        
        <div class="stat-card">
          <h3>Expenses</h3>
          <p class="amount expense">-$0.00</p>
        </div>
        
        <div class="stat-card">
          <h3>Savings</h3>
          <p class="amount">$0.00</p>
        </div>
      </div>
      
      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="action-buttons">
          <button class="action-btn" @click="goToTransactions">
            View Transactions
          </button>
          <button class="action-btn" @click="goToAnalytics">
            Analytics
          </button>
          <button class="action-btn" @click="goToBudget">
            Budget
          </button>
          <button class="action-btn" @click="goToGoals">
            Goals
          </button>
        </div>
      </div>
    </div>
    
    <div class="bottom-nav">
      <nav class="nav-tabs">
        <router-link to="/dashboard" class="nav-item active">
          Dashboard
        </router-link>
        <router-link to="/transactions" class="nav-item">
          Transactions
        </router-link>
        <router-link to="/analytics" class="nav-item">
          Analytics
        </router-link>
        <router-link to="/profile" class="nav-item">
          Profile
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  methods: {
    goToTransactions() {
      this.$router.push('/transactions')
    },
    goToAnalytics() {
      this.$router.push('/analytics')
    },
    goToBudget() {
      this.$router.push('/budget')
    },
    goToGoals() {
      this.$router.push('/goals')
    }
  }
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 80px;
}

.dashboard-header {
  background: white;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h1 {
  color: #333;
  margin: 0;
}

.user-info {
  color: #666;
}

.dashboard-content {
  padding: 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.stat-card h3 {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.amount.income {
  color: #28a745;
}

.amount.expense {
  color: #dc3545;
}

.quick-actions {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.quick-actions h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.action-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background: #5a6fd8;
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