<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Header -->
    <div class="bg-white p-6 shadow-sm">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Home</h1>
        <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>

    <!-- Balance Card -->
    <div class="p-6">
      <div
        class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6"
      >
        <h2 class="text-lg font-medium mb-2">Total Balance</h2>
        <p class="text-3xl font-bold">$12,345.67</p>
        <div class="flex justify-between mt-4">
          <div>
            <p class="text-blue-100 text-sm">Income</p>
            <p class="font-semibold">+$5,000</p>
          </div>
          <div>
            <p class="text-blue-100 text-sm">Expenses</p>
            <p class="font-semibold">-$2,500</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <button
          class="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center"
        >
          <div
            class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2"
          >
            <span class="text-green-600 text-xl">+</span>
          </div>
          <span class="text-gray-700 font-medium">Add Income</span>
        </button>

        <button
          class="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center"
        >
          <div
            class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2"
          >
            <span class="text-red-600 text-xl">-</span>
          </div>
          <span class="text-gray-700 font-medium">Add Expense</span>
        </button>
      </div>

      <!-- Recent Transactions -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h3>
          <button class="text-blue-600 text-sm">See All</button>
        </div>

        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <div
                class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3"
              >
                <span class="text-blue-600">🛒</span>
              </div>
              <div>
                <p class="font-medium text-gray-900">Grocery Shopping</p>
                <p class="text-sm text-gray-500">Today</p>
              </div>
            </div>
            <span class="text-red-600 font-semibold">-$85.50</span>
          </div>

          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <div
                class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3"
              >
                <span class="text-green-600">💰</span>
              </div>
              <div>
                <p class="font-medium text-gray-900">Salary</p>
                <p class="text-sm text-gray-500">Yesterday</p>
              </div>
            </div>
            <span class="text-green-600 font-semibold">+$3,000</span>
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
          class="text-blue-600 bg-blue-50 text-sm px-3 py-2 rounded-md"
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
// Home page component
</script>
