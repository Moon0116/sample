<template>
  <div class="analytics-page">
    <div class="analytics-header">
      <h1>Analytics</h1>
      <div class="period-selector">
        <select v-model="selectedPeriod">
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
    </div>
    
    <div class="analytics-content">
      <div class="summary-cards">
        <div class="summary-card">
          <h3>Total Income</h3>
          <p class="amount income">$3,000.00</p>
          <span class="change positive">+12% from last month</span>
        </div>
        
        <div class="summary-card">
          <h3>Total Expenses</h3>
          <p class="amount expense">$1,850.00</p>
          <span class="change negative">+5% from last month</span>
        </div>
      </div>
      
      <div class="chart-section">
        <div class="chart-card">
          <h3>Spending by Category</h3>
          <div class="chart-placeholder">
            <div class="pie-chart">
              <div class="chart-legend">
                <div class="legend-item">
                  <span class="legend-color" style="background: #667eea;"></span>
                  <span>Food & Dining (40%)</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color" style="background: #764ba2;"></span>
                  <span>Transportation (25%)</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color" style="background: #f093fb;"></span>
                  <span>Shopping (20%)</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color" style="background: #4facfe;"></span>
                  <span>Bills (15%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="chart-card">
          <h3>Monthly Trend</h3>
          <div class="chart-placeholder">
            <div class="line-chart">
              <p>Chart visualization will be implemented here</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="insights-section">
        <h2>Insights</h2>
        <div class="insight-cards">
          <div class="insight-card">
            <div class="insight-icon">💡</div>
            <div class="insight-content">
              <h4>Spending Alert</h4>
              <p>You've spent 15% more on dining this month</p>
            </div>
          </div>
          
          <div class="insight-card">
            <div class="insight-icon">🎯</div>
            <div class="insight-content">
              <h4>Goal Progress</h4>
              <p>You're 80% towards your savings goal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bottom-nav">
      <nav class="nav-tabs">
        <router-link to="/dashboard" class="nav-item">
          Dashboard
        </router-link>
        <router-link to="/transactions" class="nav-item">
          Transactions
        </router-link>
        <router-link to="/analytics" class="nav-item active">
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
  name: 'Analytics',
  data() {
    return {
      selectedPeriod: 'month'
    }
  }
}
</script>

<style scoped>
.analytics-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 80px;
}

.analytics-header {
  background: white;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.analytics-header h1 {
  color: #333;
  margin: 0;
}

.period-selector select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
}

.analytics-content {
  padding: 1.5rem;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.summary-card h3 {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.amount {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.5rem 0;
}

.amount.income {
  color: #28a745;
}

.amount.expense {
  color: #dc3545;
}

.change {
  font-size: 0.8rem;
  font-weight: 500;
}

.change.positive {
  color: #28a745;
}

.change.negative {
  color: #dc3545;
}

.chart-section {
  margin-bottom: 2rem;
}

.chart-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
}

.chart-card h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.chart-placeholder {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 8px;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.line-chart {
  text-align: center;
  color: #666;
}

.insights-section h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.insight-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.insight-card {
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.insight-icon {
  font-size: 1.5rem;
}

.insight-content h4 {
  color: #333;
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.insight-content p {
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