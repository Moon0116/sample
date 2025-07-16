<template>
  <div class="transactions-page">
    <div class="transactions-header">
      <h1>Transactions</h1>
      <button class="add-btn" @click="addTransaction">
        + Add
      </button>
    </div>
    
    <div class="transactions-content">
      <div class="filter-section">
        <div class="filter-tabs">
          <button 
            class="filter-tab" 
            :class="{ active: activeFilter === 'all' }"
            @click="setFilter('all')"
          >
            All
          </button>
          <button 
            class="filter-tab" 
            :class="{ active: activeFilter === 'income' }"
            @click="setFilter('income')"
          >
            Income
          </button>
          <button 
            class="filter-tab" 
            :class="{ active: activeFilter === 'expense' }"
            @click="setFilter('expense')"
          >
            Expense
          </button>
        </div>
      </div>
      
      <div class="transactions-list">
        <div class="transaction-item" v-for="transaction in filteredTransactions" :key="transaction.id">
          <div class="transaction-icon">
            <span>{{ transaction.category.charAt(0) }}</span>
          </div>
          <div class="transaction-details">
            <h3>{{ transaction.description }}</h3>
            <p>{{ transaction.category }} • {{ transaction.date }}</p>
          </div>
          <div class="transaction-amount" :class="transaction.type">
            {{ transaction.type === 'income' ? '+' : '-' }}${{ transaction.amount }}
          </div>
        </div>
        
        <div v-if="filteredTransactions.length === 0" class="empty-state">
          <p>No transactions found</p>
          <button class="btn-primary" @click="addTransaction">
            Add Your First Transaction
          </button>
        </div>
      </div>
    </div>
    
    <div class="bottom-nav">
      <nav class="nav-tabs">
        <router-link to="/dashboard" class="nav-item">
          Dashboard
        </router-link>
        <router-link to="/transactions" class="nav-item active">
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
  name: 'Transactions',
  data() {
    return {
      activeFilter: 'all',
      transactions: [
        {
          id: 1,
          description: 'Grocery Shopping',
          category: 'Food',
          amount: '85.50',
          type: 'expense',
          date: 'Today'
        },
        {
          id: 2,
          description: 'Salary',
          category: 'Income',
          amount: '3000.00',
          type: 'income',
          date: 'Yesterday'
        }
      ]
    }
  },
  computed: {
    filteredTransactions() {
      if (this.activeFilter === 'all') {
        return this.transactions
      }
      return this.transactions.filter(t => t.type === this.activeFilter)
    }
  },
  methods: {
    setFilter(filter) {
      this.activeFilter = filter
    },
    addTransaction() {
      // TODO: Open add transaction modal
      console.log('Add transaction')
    }
  }
}
</script>

<style scoped>
.transactions-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 80px;
}

.transactions-header {
  background: white;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transactions-header h1 {
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

.transactions-content {
  padding: 1.5rem;
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-tabs {
  display: flex;
  background: white;
  border-radius: 8px;
  padding: 0.25rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.filter-tab {
  flex: 1;
  background: none;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-tab.active {
  background: #667eea;
  color: white;
}

.transactions-list {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.transaction-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 1rem;
}

.transaction-details {
  flex: 1;
}

.transaction-details h3 {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 1rem;
}

.transaction-details p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.transaction-amount {
  font-weight: 700;
  font-size: 1.1rem;
}

.transaction-amount.income {
  color: #28a745;
}

.transaction-amount.expense {
  color: #dc3545;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
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