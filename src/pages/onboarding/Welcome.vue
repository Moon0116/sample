<template>
  <div class="welcome-page">
    <div class="welcome-container">
      <div class="logo-section">
        <h1>Welcome</h1>
      </div>
      
      <div class="content-section">
        <h2>Get Started</h2>
        <p>Welcome to your personal finance app</p>
      </div>
      
      <div class="action-section">
        <button class="btn-primary" @click="goToLogin">Get Started</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  methods: {
    goToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.welcome-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.welcome-container {
  text-align: center;
  padding: 2rem;
}

.logo-section h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.content-section {
  margin-bottom: 3rem;
}

.content-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.btn-primary {
  background: white;
  color: #667eea;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
}
</style>