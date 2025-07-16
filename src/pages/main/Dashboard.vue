<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <div class="bg-white p-6 shadow-sm flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div class="text-gray-600">
        <span>Welcome back!</span>
      </div>
    </div>

    <div class="p-6">
      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-sm text-center">
          <h3 class="text-gray-600 text-sm font-medium mb-2">Total Balance</h3>
          <p class="text-2xl font-bold text-gray-900">$0.00</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm text-center">
          <h3 class="text-gray-600 text-sm font-medium mb-2">This Month</h3>
          <p class="text-2xl font-bold text-green-600">+$0.00</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm text-center">
          <h3 class="text-gray-600 text-sm font-medium mb-2">Expenses</h3>
          <p class="text-2xl font-bold text-red-600">-$0.00</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm text-center">
          <h3 class="text-gray-600 text-sm font-medium mb-2">Savings</h3>
          <p class="text-2xl font-bold text-gray-900">$0.00</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div class="grid grid-cols-2 gap-4">
          <button
            class="bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            @click="goToTransactions"
          >
            View Transactions
          </button>
          <button
            class="bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            @click="goToAnalytics"
          >
            Analytics
          </button>
          <button
            class="bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            @click="goToBudget"
          >
            Budget
          </button>
          <button
            class="bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            @click="goToGoals"
          >
            Goals
          </button>
        </div>
      </div>
    </div>

    <div
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4"
    >
      <nav class="flex justify-around">
        <router-link
          to="/dashboard"
          class="text-blue-600 bg-blue-50 text-sm px-3 py-2 rounded-md transition-all"
        >
          Dashboard
        </router-link>
        <router-link
          to="/transactions"
          class="text-gray-600 text-sm px-3 py-2 rounded-md hover:text-blue-600 hover:bg-blue-50 transition-all"
        >
          Transactions
        </router-link>
        <router-link
          to="/analytics"
          class="text-gray-600 text-sm px-3 py-2 rounded-md hover:text-blue-600 hover:bg-blue-50 transition-all"
        >
          Analytics
        </router-link>
        <router-link
          to="/profile"
          class="text-gray-600 text-sm px-3 py-2 rounded-md hover:text-blue-600 hover:bg-blue-50 transition-all"
        >
          Profile
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToTransactions = () => {
  router.push('/transactions')
}

const goToAnalytics = () => {
  router.push('/analytics')
}

const goToBudget = () => {
  router.push('/budget')
}

const goToGoals = () => {
  router.push('/goals')
}
</script>
