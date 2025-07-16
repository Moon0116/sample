<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Header -->
    <div class="bg-white p-6 shadow-sm">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Transactions</h1>
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          @click="addTransaction"
        >
          + Add
        </button>
      </div>
    </div>

    <div class="p-6">
      <!-- Filter Tabs -->
      <div class="mb-6">
        <div class="flex bg-white rounded-lg p-1 shadow-sm">
          <button
            class="flex-1 py-3 px-4 rounded-md font-medium transition-colors"
            :class="
              activeFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            "
            @click="setFilter('all')"
          >
            All
          </button>
          <button
            class="flex-1 py-3 px-4 rounded-md font-medium transition-colors"
            :class="
              activeFilter === 'income'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            "
            @click="setFilter('income')"
          >
            Income
          </button>
          <button
            class="flex-1 py-3 px-4 rounded-md font-medium transition-colors"
            :class="
              activeFilter === 'expense'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            "
            @click="setFilter('expense')"
          >
            Expense
          </button>
        </div>
      </div>

      <!-- Transactions List -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div
          v-for="transaction in filteredTransactions"
          :key="transaction.id"
          class="flex items-center p-4 border-b border-gray-100 last:border-b-0"
        >
          <div
            class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4"
          >
            {{ transaction.category.charAt(0) }}
          </div>
          <div class="flex-1">
            <h3 class="font-medium text-gray-900">
              {{ transaction.description }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ transaction.category }} • {{ transaction.date }}
            </p>
          </div>
          <div
            class="font-bold text-lg"
            :class="
              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
            "
          >
            {{ transaction.type === 'income' ? '+' : '-' }}${{
              transaction.amount
            }}
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredTransactions.length === 0" class="text-center py-12">
          <p class="text-gray-500 mb-4">No transactions found</p>
          <button
            class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            @click="addTransaction"
          >
            Add Your First Transaction
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4"
    >
      <nav class="flex justify-around">
        <router-link
          to="/home"
          class="text-gray-600 text-sm px-3 py-2 rounded-md"
        >
          Home
        </router-link>
        <router-link
          to="/transactions"
          class="text-blue-600 bg-blue-50 text-sm px-3 py-2 rounded-md"
        >
          Transactions
        </router-link>
        <router-link
          to="/analytics"
          class="text-gray-600 text-sm px-3 py-2 rounded-md"
        >
          Analytics
        </router-link>
        <router-link
          to="/profile"
          class="text-gray-600 text-sm px-3 py-2 rounded-md"
        >
          Profile
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('all')

const transactions = ref([
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
])

const filteredTransactions = computed(() => {
  if (activeFilter.value === 'all') {
    return transactions.value
  }
  return transactions.value.filter(t => t.type === activeFilter.value)
})

const setFilter = filter => {
  activeFilter.value = filter
}

const addTransaction = () => {
  // TODO: Open add transaction modal
  console.log('Add transaction')
}
</script>
