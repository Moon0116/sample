<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Header -->
    <div class="bg-white p-6 shadow-sm">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Analytics</h1>
        <select
          v-model="selectedPeriod"
          class="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
    </div>

    <div class="p-6">
      <!-- Summary Cards -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-white p-6 rounded-xl shadow-sm">
          <h3 class="text-gray-600 text-sm font-medium mb-2">Total Income</h3>
          <p class="text-2xl font-bold text-green-600 mb-1">$3,000.00</p>
          <span class="text-xs font-medium text-green-600"
            >+12% from last month</span
          >
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm">
          <h3 class="text-gray-600 text-sm font-medium mb-2">Total Expenses</h3>
          <p class="text-2xl font-bold text-red-600 mb-1">$1,850.00</p>
          <span class="text-xs font-medium text-red-600"
            >+5% from last month</span
          >
        </div>
      </div>

      <!-- Chart Section -->
      <div class="space-y-4 mb-6">
        <div class="bg-white p-6 rounded-xl shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Spending by Category
          </h3>
          <div
            class="min-h-[200px] flex items-center justify-center bg-gray-50 rounded-lg"
          >
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <span class="w-3 h-3 bg-blue-600 rounded-full"></span>
                <span class="text-gray-700">Food & Dining (40%)</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="w-3 h-3 bg-purple-600 rounded-full"></span>
                <span class="text-gray-700">Transportation (25%)</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="w-3 h-3 bg-pink-500 rounded-full"></span>
                <span class="text-gray-700">Shopping (20%)</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="w-3 h-3 bg-cyan-500 rounded-full"></span>
                <span class="text-gray-700">Bills (15%)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Monthly Trend
          </h3>
          <div
            class="min-h-[200px] flex items-center justify-center bg-gray-50 rounded-lg"
          >
            <p class="text-gray-600">
              Chart visualization will be implemented here
            </p>
          </div>
        </div>
      </div>

      <!-- Insights Section -->
      <div>
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Insights</h2>
        <div class="space-y-3">
          <div
            class="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4"
          >
            <div class="text-2xl">💡</div>
            <div>
              <h4 class="font-medium text-gray-900">Spending Alert</h4>
              <p class="text-sm text-gray-600">
                You've spent 15% more on dining this month
              </p>
            </div>
          </div>

          <div
            class="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4"
          >
            <div class="text-2xl">🎯</div>
            <div>
              <h4 class="font-medium text-gray-900">Goal Progress</h4>
              <p class="text-sm text-gray-600">
                You're 80% towards your savings goal
              </p>
            </div>
          </div>
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
          class="text-gray-600 text-sm px-3 py-2 rounded-md"
        >
          Transactions
        </router-link>
        <router-link
          to="/analytics"
          class="text-blue-600 bg-blue-50 text-sm px-3 py-2 rounded-md"
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
import { ref } from 'vue'

const selectedPeriod = ref('month')
</script>
