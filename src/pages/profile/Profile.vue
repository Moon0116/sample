<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Header -->
    <div class="bg-white p-6 shadow-sm">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Profile</h1>
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          @click="editProfile"
        >
          Edit
        </button>
      </div>
    </div>

    <div class="p-6">
      <!-- Profile Info -->
      <div class="bg-white p-8 rounded-xl shadow-sm mb-6 text-center">
        <div class="mb-6">
          <div
            class="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden"
          >
            <img
              v-if="user.avatar"
              :src="user.avatar"
              :alt="user.name"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-3xl font-bold text-white">{{
              user.name.charAt(0)
            }}</span>
          </div>
          <button
            class="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            @click="changeAvatar"
          >
            Change Photo
          </button>
        </div>

        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ user.name }}</h2>
          <p class="text-gray-600 mb-1">{{ user.email }}</p>
          <p class="text-gray-500 text-sm">
            Member since {{ user.memberSince }}
          </p>
        </div>
      </div>

      <!-- Profile Stats -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="bg-white p-6 rounded-xl shadow-sm text-center">
          <h3 class="text-gray-600 text-sm font-medium mb-2">
            Total Transactions
          </h3>
          <p class="text-2xl font-bold text-blue-600">
            {{ user.stats.totalTransactions }}
          </p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm text-center">
          <h3 class="text-gray-600 text-sm font-medium mb-2">
            Categories Used
          </h3>
          <p class="text-2xl font-bold text-blue-600">
            {{ user.stats.categoriesUsed }}
          </p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm text-center">
          <h3 class="text-gray-600 text-sm font-medium mb-2">Goals Achieved</h3>
          <p class="text-2xl font-bold text-blue-600">
            {{ user.stats.goalsAchieved }}
          </p>
        </div>
      </div>

      <!-- Profile Menu -->
      <div class="space-y-6">
        <!-- Account Section -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Account</h3>
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <router-link
              to="/settings"
              class="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div class="text-2xl mr-4">⚙️</div>
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">Settings</h4>
                <p class="text-sm text-gray-600">
                  App preferences and configuration
                </p>
              </div>
              <div class="text-gray-400 text-xl">›</div>
            </router-link>

            <router-link
              to="/security"
              class="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div class="text-2xl mr-4">🔒</div>
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">Security</h4>
                <p class="text-sm text-gray-600">
                  Password and security settings
                </p>
              </div>
              <div class="text-gray-400 text-xl">›</div>
            </router-link>

            <router-link
              to="/notifications"
              class="flex items-center p-4 hover:bg-gray-50 transition-colors"
            >
              <div class="text-2xl mr-4">🔔</div>
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">Notifications</h4>
                <p class="text-sm text-gray-600">
                  Manage your notification preferences
                </p>
              </div>
              <div class="text-gray-400 text-xl">›</div>
            </router-link>
          </div>
        </div>

        <!-- Data Section -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Data</h3>
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div
              class="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              @click="exportData"
            >
              <div class="text-2xl mr-4">📤</div>
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">Export Data</h4>
                <p class="text-sm text-gray-600">
                  Download your financial data
                </p>
              </div>
              <div class="text-gray-400 text-xl">›</div>
            </div>

            <div
              class="flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              @click="importData"
            >
              <div class="text-2xl mr-4">📥</div>
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">Import Data</h4>
                <p class="text-sm text-gray-600">
                  Import transactions from file
                </p>
              </div>
              <div class="text-gray-400 text-xl">›</div>
            </div>
          </div>
        </div>

        <!-- Support Section -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Support</h3>
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div
              class="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              @click="contactSupport"
            >
              <div class="text-2xl mr-4">💬</div>
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">Contact Support</h4>
                <p class="text-sm text-gray-600">Get help with your account</p>
              </div>
              <div class="text-gray-400 text-xl">›</div>
            </div>

            <div
              class="flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              @click="showAbout"
            >
              <div class="text-2xl mr-4">ℹ️</div>
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">About</h4>
                <p class="text-sm text-gray-600">App version and information</p>
              </div>
              <div class="text-gray-400 text-xl">›</div>
            </div>
          </div>
        </div>

        <!-- Logout Section -->
        <div>
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div
              class="flex items-center p-4 hover:bg-red-50 transition-colors cursor-pointer text-red-600"
              @click="logout"
            >
              <div class="text-2xl mr-4">🚪</div>
              <div class="flex-1">
                <h4 class="font-medium">Logout</h4>
                <p class="text-sm text-red-500">Sign out of your account</p>
              </div>
              <div class="text-red-400 text-xl">›</div>
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
          class="text-gray-600 text-sm px-3 py-2 rounded-md"
        >
          Analytics
        </router-link>
        <router-link
          to="/profile"
          class="text-blue-600 bg-blue-50 text-sm px-3 py-2 rounded-md"
        >
          Profile
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: null,
  memberSince: 'January 2024',
  stats: {
    totalTransactions: 156,
    categoriesUsed: 12,
    goalsAchieved: 3
  }
})

const editProfile = () => {
  // TODO: Open edit profile modal
  console.log('Edit profile')
}

const changeAvatar = () => {
  // TODO: Open avatar change modal
  console.log('Change avatar')
}

const exportData = () => {
  // TODO: Implement data export
  console.log('Export data')
}

const importData = () => {
  // TODO: Implement data import
  console.log('Import data')
}

const contactSupport = () => {
  // TODO: Open support contact
  console.log('Contact support')
}

const showAbout = () => {
  // TODO: Show about dialog
  alert('Finance App v1.0.0')
}

const logout = () => {
  if (confirm('Are you sure you want to logout?')) {
    // TODO: Implement logout logic
    router.push('/login')
  }
}
</script>
