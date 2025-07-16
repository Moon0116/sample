<template>
  <div class="categories-page">
    <div class="categories-header">
      <h1>Categories</h1>
      <button class="add-btn" @click="addCategory">+ Add Category</button>
    </div>

    <div class="categories-content">
      <div class="category-tabs">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'expense' }"
          @click="setActiveTab('expense')"
        >
          Expense Categories
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'income' }"
          @click="setActiveTab('income')"
        >
          Income Categories
        </button>
      </div>

      <div class="categories-list">
        <div class="category-grid">
          <div
            v-for="category in filteredCategories"
            :key="category.id"
            class="category-card"
            @click="viewCategory(category.id)"
          >
            <div class="category-icon" :style="{ background: category.color }">
              {{ category.icon }}
            </div>
            <div class="category-info">
              <h3>{{ category.name }}</h3>
              <p class="category-count">
                {{ category.transactionCount }} transactions
              </p>
              <p class="category-amount" :class="category.type">
                {{ category.type === 'income' ? '+' : '-' }}${{
                  category.totalAmount.toLocaleString()
                }}
              </p>
            </div>
            <div class="category-actions">
              <button
                class="action-btn"
                @click.stop="editCategory(category.id)"
              >
                ✏️
              </button>
              <button
                class="action-btn delete"
                @click.stop="deleteCategory(category.id)"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredCategories.length === 0" class="empty-state">
          <div class="empty-icon">📁</div>
          <h3>No {{ activeTab }} categories</h3>
          <p>
            Create your first {{ activeTab }} category to organize your
            transactions.
          </p>
          <button class="btn-primary" @click="addCategory">
            Add {{ activeTab }} Category
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
  name: 'Categories',
  data() {
    return {
      activeTab: 'expense',
      categories: [
        // Expense Categories
        {
          id: 1,
          name: 'Food & Dining',
          icon: '🍽️',
          color: '#667eea',
          type: 'expense',
          transactionCount: 25,
          totalAmount: 850
        },
        {
          id: 2,
          name: 'Transportation',
          icon: '🚗',
          color: '#764ba2',
          type: 'expense',
          transactionCount: 12,
          totalAmount: 320
        },
        {
          id: 3,
          name: 'Shopping',
          icon: '🛍️',
          color: '#f093fb',
          type: 'expense',
          transactionCount: 8,
          totalAmount: 450
        },
        {
          id: 4,
          name: 'Bills & Utilities',
          icon: '💡',
          color: '#4facfe',
          type: 'expense',
          transactionCount: 6,
          totalAmount: 680
        },
        {
          id: 5,
          name: 'Entertainment',
          icon: '🎬',
          color: '#43e97b',
          type: 'expense',
          transactionCount: 15,
          totalAmount: 280
        },
        {
          id: 6,
          name: 'Healthcare',
          icon: '🏥',
          color: '#fa709a',
          type: 'expense',
          transactionCount: 3,
          totalAmount: 150
        },

        // Income Categories
        {
          id: 7,
          name: 'Salary',
          icon: '💼',
          color: '#667eea',
          type: 'income',
          transactionCount: 2,
          totalAmount: 6000
        },
        {
          id: 8,
          name: 'Freelance',
          icon: '💻',
          color: '#764ba2',
          type: 'income',
          transactionCount: 5,
          totalAmount: 1200
        },
        {
          id: 9,
          name: 'Investment',
          icon: '📈',
          color: '#4facfe',
          type: 'income',
          transactionCount: 3,
          totalAmount: 450
        },
        {
          id: 10,
          name: 'Other Income',
          icon: '💰',
          color: '#43e97b',
          type: 'income',
          transactionCount: 1,
          totalAmount: 200
        }
      ]
    }
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(
        category => category.type === this.activeTab
      )
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab
    },
    addCategory() {
      // TODO: Open add category modal
      console.log('Add category for:', this.activeTab)
    },
    editCategory(categoryId) {
      // TODO: Open edit category modal
      console.log('Edit category:', categoryId)
    },
    deleteCategory(categoryId) {
      // TODO: Show confirmation dialog
      if (confirm('Are you sure you want to delete this category?')) {
        this.categories = this.categories.filter(c => c.id !== categoryId)
      }
    },
    viewCategory(categoryId) {
      this.$router.push(`/category/${categoryId}`)
    }
  }
}
</script>

<style scoped>
.categories-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 80px;
}

.categories-header {
  background: white;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.categories-header h1 {
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

.categories-content {
  padding: 1.5rem;
}

.category-tabs {
  display: flex;
  background: white;
  border-radius: 8px;
  padding: 0.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tab-btn {
  flex: 1;
  background: none;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: #666;
}

.tab-btn.active {
  background: #667eea;
  color: white;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.category-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  position: relative;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.category-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.category-info h3 {
  color: #333;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.category-count {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
}

.category-amount {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
}

.category-amount.income {
  color: #28a745;
}

.category-amount.expense {
  color: #dc3545;
}

.category-actions {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.category-card:hover .category-actions {
  opacity: 1;
}

.action-btn {
  background: #f8f9fa;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background: #e9ecef;
}

.action-btn.delete:hover {
  background: #f8d7da;
  color: #dc3545;
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
  text-transform: capitalize;
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
  text-transform: capitalize;
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
