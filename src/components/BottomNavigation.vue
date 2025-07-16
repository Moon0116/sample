<template>
  <div class="bottom-navigation">
    <nav class="nav-container">
      <router-link
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        class="nav-item"
        :class="{ active: $route.name === item.name }"
      >
        <div class="nav-icon">
          <span v-html="item.icon"></span>
        </div>
        <span class="nav-label">{{ item.label }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'BottomNavigation',
  data() {
    return {
      navItems: [
        {
          name: 'Dashboard',
          path: '/dashboard',
          label: 'Home',
          icon: '🏠'
        },
        {
          name: 'Transactions',
          path: '/transactions',
          label: 'Transactions',
          icon: '💳'
        },
        {
          name: 'Analytics',
          path: '/analytics',
          label: 'Analytics',
          icon: '📊'
        },
        {
          name: 'Budget',
          path: '/budget',
          label: 'Budget',
          icon: '💰'
        },
        {
          name: 'Profile',
          path: '/profile',
          label: 'Profile',
          icon: '👤'
        }
      ]
    }
  }
}
</script>

<style scoped>
.bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
  max-width: 500px;
  margin: 0 auto;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #666;
  transition: color 0.2s;
  padding: 0.5rem;
  min-width: 60px;
}

.nav-item.active {
  color: #667eea;
}

.nav-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.nav-label {
  font-size: 0.75rem;
  font-weight: 500;
}

@media (max-width: 480px) {
  .nav-label {
    font-size: 0.7rem;
  }

  .nav-icon {
    font-size: 1.3rem;
  }
}
</style>
