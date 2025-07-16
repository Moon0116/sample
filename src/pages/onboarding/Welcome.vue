<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white"
  >
    <div class="text-center p-8">
      <div class="mb-8">
        <h1 class="text-5xl font-bold mb-4">Welcome</h1>
      </div>

      <div class="mb-12">
        <h2 class="text-3xl font-semibold mb-4">Get Started</h2>
        <p class="text-xl text-blue-100">
          Welcome to your personal finance app
        </p>
      </div>

      <div>
        <button
          class="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:-translate-y-1 transition-transform duration-200 shadow-lg"
          @click="goToLogin"
        >
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}
</script>
