<template>
  <div class="security-page">
    <div class="security-header">
      <button class="back-btn" @click="goBack">
        ← Back
      </button>
      <h1>Security</h1>
      <div></div>
    </div>
    
    <div class="security-content">
      <div class="security-section">
        <h2>Password</h2>
        <div class="security-group">
          <div class="security-item clickable" @click="changePassword">
            <div class="security-info">
              <h3>Change Password</h3>
              <p>Update your account password</p>
            </div>
            <div class="security-arrow">›</div>
          </div>
          
          <div class="security-item">
            <div class="security-info">
              <h3>Password Strength</h3>
              <p>Current password strength</p>
            </div>
            <div class="password-strength">
              <div class="strength-indicator strong">
                <span>Strong</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="security-section">
        <h2>Two-Factor Authentication</h2>
        <div class="security-group">
          <div class="security-item">
            <div class="security-info">
              <h3>SMS Authentication</h3>
              <p>Receive codes via text message</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="security.smsAuth" @change="toggleSmsAuth" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="security-item">
            <div class="security-info">
              <h3>Email Authentication</h3>
              <p>Receive codes via email</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="security.emailAuth" @change="toggleEmailAuth" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="security-item clickable" @click="setupAuthenticator">
            <div class="security-info">
              <h3>Authenticator App</h3>
              <p>Use Google Authenticator or similar app</p>
            </div>
            <div class="security-status">
              <span class="status-badge" :class="security.authenticatorApp ? 'enabled' : 'disabled'">
                {{ security.authenticatorApp ? 'Enabled' : 'Disabled' }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="security-section">
        <h2>Login Security</h2>
        <div class="security-group">
          <div class="security-item">
            <div class="security-info">
              <h3>Biometric Login</h3>
              <p>Use fingerprint or face recognition</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="security.biometricLogin" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="security-item">
            <div class="security-info">
              <h3>Auto-lock Timer</h3>
              <p>Lock app after inactivity</p>
            </div>
            <select v-model="security.autoLockTimer" class="security-control">
              <option value="never">Never</option>
              <option value="1min">1 minute</option>
              <option value="5min">5 minutes</option>
              <option value="15min">15 minutes</option>
              <option value="30min">30 minutes</option>
            </select>
          </div>
          
          <div class="security-item clickable" @click="viewLoginHistory">
            <div class="security-info">
              <h3>Login History</h3>
              <p>View recent login attempts</p>
            </div>
            <div class="security-arrow">›</div>
          </div>
        </div>
      </div>
      
      <div class="security-section">
        <h2>Data Protection</h2>
        <div class="security-group">
          <div class="security-item">
            <div class="security-info">
              <h3>Data Encryption</h3>
              <p>Encrypt sensitive data</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="security.dataEncryption" disabled />
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="security-item">
            <div class="security-info">
              <h3>Secure Backup</h3>
              <p>Encrypted cloud backup</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="security.secureBackup" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="security-item clickable" @click="downloadBackup">
            <div class="security-info">
              <h3>Download Backup</h3>
              <p>Download encrypted backup file</p>
            </div>
            <div class="security-arrow">›</div>
          </div>
        </div>
      </div>
      
      <div class="security-section danger">
        <h2>Account Actions</h2>
        <div class="security-group">
          <div class="security-item clickable danger" @click="deactivateAccount">
            <div class="security-info">
              <h3>Deactivate Account</h3>
              <p>Temporarily disable your account</p>
            </div>
            <div class="security-arrow">›</div>
          </div>
          
          <div class="security-item clickable danger" @click="deleteAccount">
            <div class="security-info">
              <h3>Delete Account</h3>
              <p>Permanently delete your account and data</p>
            </div>
            <div class="security-arrow">›</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Security',
  data() {
    return {
      security: {
        smsAuth: false,
        emailAuth: true,
        authenticatorApp: false,
        biometricLogin: true,
        autoLockTimer: '5min',
        dataEncryption: true,
        secureBackup: true
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    changePassword() {
      // TODO: Open change password modal
      console.log('Change password')
    },
    toggleSmsAuth() {
      if (this.security.smsAuth) {
        // TODO: Setup SMS authentication
        console.log('Setup SMS auth')
      } else {
        // TODO: Disable SMS authentication
        console.log('Disable SMS auth')
      }
    },
    toggleEmailAuth() {
      if (this.security.emailAuth) {
        // TODO: Setup email authentication
        console.log('Setup email auth')
      } else {
        // TODO: Disable email authentication
        console.log('Disable email auth')
      }
    },
    setupAuthenticator() {
      // TODO: Open authenticator setup
      console.log('Setup authenticator app')
    },
    viewLoginHistory() {
      // TODO: Show login history
      console.log('View login history')
    },
    downloadBackup() {
      // TODO: Download backup file
      console.log('Download backup')
    },
    deactivateAccount() {
      if (confirm('Are you sure you want to deactivate your account? You can reactivate it later.')) {
        // TODO: Implement account deactivation
        console.log('Deactivate account')
      }
    },
    deleteAccount() {
      const confirmation = prompt('Type "DELETE" to confirm account deletion:')
      if (confirmation === 'DELETE') {
        // TODO: Implement account deletion
        console.log('Delete account')
        alert('Account deletion initiated. You will receive a confirmation email.')
      }
    }
  }
}
</script>

<style scoped>
.security-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.security-header {
  background: white;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
}

.back-btn {
  background: none;
  border: none;
  color: #667eea;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
}

.security-header h1 {
  color: #333;
  margin: 0;
  text-align: center;
}

.security-content {
  padding: 1.5rem;
}

.security-section {
  margin-bottom: 2rem;
}

.security-section h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.security-section.danger h2 {
  color: #dc3545;
}

.security-group {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.security-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.security-item:last-child {
  border-bottom: none;
}

.security-item.clickable {
  cursor: pointer;
  transition: background-color 0.2s;
}

.security-item.clickable:hover {
  background: #f8f9fa;
}

.security-item.danger {
  color: #dc3545;
}

.security-item.danger:hover {
  background: #f8d7da;
}

.security-info {
  flex: 1;
}

.security-info h3 {
  margin: 0 0 0.25rem 0;
  color: inherit;
  font-size: 1rem;
  font-weight: 600;
}

.security-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.security-control {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  min-width: 120px;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #667eea;
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

input:disabled + .toggle-slider {
  opacity: 0.5;
  cursor: not-allowed;
}

.password-strength {
  display: flex;
  align-items: center;
}

.strength-indicator {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.strength-indicator.strong {
  background: #d4edda;
  color: #28a745;
}

.strength-indicator.medium {
  background: #fff3cd;
  color: #ffc107;
}

.strength-indicator.weak {
  background: #f8d7da;
  color: #dc3545;
}

.security-status {
  display: flex;
  align-items: center;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-badge.enabled {
  background: #d4edda;
  color: #28a745;
}

.status-badge.disabled {
  background: #f8d7da;
  color: #dc3545;
}

.security-arrow {
  font-size: 1.2rem;
  color: #ccc;
}
</style>