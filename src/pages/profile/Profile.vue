<template>
  <div class="profile-page">
    <div class="profile-header">
      <h1>Profile</h1>
      <button class="edit-btn" @click="editProfile">
        Edit
      </button>
    </div>
    
    <div class="profile-content">
      <div class="profile-info">
        <div class="avatar-section">
          <div class="avatar">
            <img v-if="user.avatar" :src="user.avatar" :alt="user.name" />
            <span v-else class="avatar-initial">{{ user.name.charAt(0) }}</span>
          </div>
          <button class="change-avatar-btn" @click="changeAvatar">
            Change Photo
          </button>
        </div>
        
        <div class="user-details">
          <h2>{{ user.name }}</h2>
          <p class="email">{{ user.email }}</p>
          <p class="member-since">Member since {{ user.memberSince }}</p>
        </div>
      </div>
      
      <div class="profile-stats">
        <div class="stat-card">
          <h3>Total Transactions</h3>
          <p class="stat-value">{{ user.stats.totalTransactions }}</p>
        </div>
        
        <div class="stat-card">
          <h3>Categories Used</h3>
          <p class="stat-value">{{ user.stats.categoriesUsed }}</p>
        </div>
        
        <div class="stat-card">
          <h3>Goals Achieved</h3>
          <p class="stat-value">{{ user.stats.goalsAchieved }}</p>
        </div>
      </div>
      
      <div class="profile-menu">
        <div class="menu-section">
          <h3>Account</h3>
          <div class="menu-items">
            <router-link to="/settings" class="menu-item">
              <div class="menu-icon">⚙️</div>
              <div class="menu-content">
                <h4>Settings</h4>
                <p>App preferences and configuration</p>
              </div>
              <div class="menu-arrow">›</div>
            </router-link>
            
            <router-link to="/security" class="menu-item">
              <div class="menu-icon">🔒</div>
              <div class="menu-content">
                <h4>Security</h4>
                <p>Password and security settings</p>
              </div>
              <div class="menu-arrow">›</div>
            </router-link>
            
            <router-link to="/notifications" class="menu-item">
              <div class="menu-icon">🔔</div>
              <div class="menu-content">
                <h4>Notifications</h4>
                <p>Manage your notification preferences</p>
              </div>
              <div class="menu-arrow">›</div>
            </router-link>
          </div>
        </div>
        
        <div class="menu-section">
          <h3>Data</h3>
          <div class="menu-items">
            <div class="menu-item" @click="exportData">
              <div class="menu-icon">📤</div>
              <div class="menu-content">
                <h4>Export Data</h4>
                <p>Download your financial data</p>
              </div>
              <div class="menu-arrow">›</div>
            </div>
            
            <div class="menu-item" @click="importData">
              <div class="menu-icon">📥</div>
              <div class="menu-content">
                <h4>Import Data</h4>
                <p>Import transactions from file</p>
              </div>
              <div class="menu-arrow">›</div>
            </div>
          </div>
        </div>
        
        <div class="menu-section">
          <h3>Support</h3>
          <div class="menu-items">
            <div class="menu-item" @click="contactSupport">
              <div class="menu-icon">💬</div>
              <div class="menu-content">
                <h4>Contact Support</h4>
                <p>Get help with your account</p>
              </div>
              <div class="menu-arrow">›</div>
            </div>
            
            <div class="menu-item" @click="showAbout">
              <div class="menu-icon">ℹ️</div>
              <div class="menu-content">
                <h4>About</h4>
                <p>App version and information</p>
              </div>
              <div class="menu-arrow">›</div>
            </div>
          </div>
        </div>
        
        <div class="menu-section danger">
          <div class="menu-items">
            <div class="menu-item danger" @click="logout">
              <div class="menu-icon">🚪</div>
              <div class="menu-content">
                <h4>Logout</h4>
                <p>Sign out of your account</p>
              </div>
              <div class="menu-arrow">›</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bottom-nav">
      <nav class="nav-tabs">
        <router-link to="/dashboard" class="nav-item">
          Dashboard
        </router-link>
        <router-link to="/transactions" class="nav-item">
          Transactions
        </router-link>
        <router-link to="/analytics" class="nav-item">
          Analytics
        </router-link>
        <router-link to="/profile" class="nav-item active">
          Profile
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: null,
        memberSince: 'January 2024',
        stats: {
          totalTransactions: 156,
          categoriesUsed: 12,
          goalsAchieved: 3
        }
      }
    }
  },
  methods: {
    editProfile() {
      // TODO: Open edit profile modal
      console.log('Edit profile')
    },
    changeAvatar() {
      // TODO: Open avatar change modal
      console.log('Change avatar')
    },
    exportData() {
      // TODO: Implement data export
      console.log('Export data')
    },
    importData() {
      // TODO: Implement data import
      console.log('Import data')
    },
    contactSupport() {
      // TODO: Open support contact
      console.log('Contact support')
    },
    showAbout() {
      // TODO: Show about dialog
      alert('Finance App v1.0.0')
    },
    logout() {
      if (confirm('Are you sure you want to logout?')) {
        // TODO: Implement logout logic
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 80px;
}

.profile-header {
  background: white;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-header h1 {
  color: #333;
  margin: 0;
}

.edit-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.profile-content {
  padding: 1.5rem;
}

.profile-info {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
  text-align: center;
}

.avatar-section {
  margin-bottom: 1.5rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  background: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-initial {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
}

.change-avatar-btn {
  background: #f8f9fa;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.user-details h2 {
  color: #333;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.email {
  color: #666;
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.member-since {
  color: #999;
  margin: 0;
  font-size: 0.9rem;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.stat-card h3 {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #667eea;
  margin: 0;
}

.profile-menu {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.menu-section h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.menu-items {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;
  color: inherit;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: #f8f9fa;
}

.menu-item.danger {
  color: #dc3545;
}

.menu-item.danger:hover {
  background: #f8d7da;
}

.menu-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  width: 24px;
  text-align: center;
}

.menu-content {
  flex: 1;
}

.menu-content h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.menu-content p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.menu-arrow {
  font-size: 1.2rem;
  color: #ccc;
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