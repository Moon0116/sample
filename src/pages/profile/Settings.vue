<template>
  <div class="settings-page">
    <div class="settings-header">
      <button class="back-btn" @click="goBack">
        ← Back
      </button>
      <h1>Settings</h1>
      <div></div>
    </div>
    
    <div class="settings-content">
      <div class="settings-section">
        <h2>Preferences</h2>
        <div class="settings-group">
          <div class="setting-item">
            <div class="setting-info">
              <h3>Currency</h3>
              <p>Choose your default currency</p>
            </div>
            <select v-model="settings.currency" class="setting-control">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="KRW">KRW (₩)</option>
            </select>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <h3>Language</h3>
              <p>Select your preferred language</p>
            </div>
            <select v-model="settings.language" class="setting-control">
              <option value="en">English</option>
              <option value="ko">한국어</option>
              <option value="ja">日本語</option>
              <option value="zh">中文</option>
            </select>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <h3>Theme</h3>
              <p>Choose your app theme</p>
            </div>
            <select v-model="settings.theme" class="setting-control">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="settings-section">
        <h2>Notifications</h2>
        <div class="settings-group">
          <div class="setting-item">
            <div class="setting-info">
              <h3>Push Notifications</h3>
              <p>Receive notifications on your device</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="settings.pushNotifications" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <h3>Email Notifications</h3>
              <p>Receive notifications via email</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="settings.emailNotifications" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <h3>Budget Alerts</h3>
              <p>Get notified when approaching budget limits</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="settings.budgetAlerts" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="settings-section">
        <h2>Privacy & Security</h2>
        <div class="settings-group">
          <div class="setting-item">
            <div class="setting-info">
              <h3>Biometric Login</h3>
              <p>Use fingerprint or face recognition</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="settings.biometricLogin" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <h3>Auto-lock</h3>
              <p>Automatically lock the app after inactivity</p>
            </div>
            <select v-model="settings.autoLock" class="setting-control">
              <option value="never">Never</option>
              <option value="1min">1 minute</option>
              <option value="5min">5 minutes</option>
              <option value="15min">15 minutes</option>
            </select>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <h3>Data Backup</h3>
              <p>Automatically backup your data</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="settings.dataBackup" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="settings-section">
        <h2>Data Management</h2>
        <div class="settings-group">
          <div class="setting-item clickable" @click="clearCache">
            <div class="setting-info">
              <h3>Clear Cache</h3>
              <p>Free up storage space</p>
            </div>
            <div class="setting-arrow">›</div>
          </div>
          
          <div class="setting-item clickable" @click="resetSettings">
            <div class="setting-info">
              <h3>Reset Settings</h3>
              <p>Restore default settings</p>
            </div>
            <div class="setting-arrow">›</div>
          </div>
        </div>
      </div>
      
      <div class="save-section">
        <button class="save-btn" @click="saveSettings">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      settings: {
        currency: 'USD',
        language: 'en',
        theme: 'light',
        pushNotifications: true,
        emailNotifications: false,
        budgetAlerts: true,
        biometricLogin: false,
        autoLock: '5min',
        dataBackup: true
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    saveSettings() {
      // TODO: Save settings to backend
      console.log('Saving settings:', this.settings)
      alert('Settings saved successfully!')
    },
    clearCache() {
      if (confirm('Are you sure you want to clear the cache?')) {
        // TODO: Implement cache clearing
        console.log('Clearing cache')
        alert('Cache cleared successfully!')
      }
    },
    resetSettings() {
      if (confirm('Are you sure you want to reset all settings to default?')) {
        this.settings = {
          currency: 'USD',
          language: 'en',
          theme: 'light',
          pushNotifications: true,
          emailNotifications: false,
          budgetAlerts: true,
          biometricLogin: false,
          autoLock: '5min',
          dataBackup: true
        }
        alert('Settings reset to default!')
      }
    }
  }
}
</script>

<style scoped>
.settings-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.settings-header {
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

.settings-header h1 {
  color: #333;
  margin: 0;
  text-align: center;
}

.settings-content {
  padding: 1.5rem;
}

.settings-section {
  margin-bottom: 2rem;
}

.settings-section h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.settings-group {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-item.clickable {
  cursor: pointer;
  transition: background-color 0.2s;
}

.setting-item.clickable:hover {
  background: #f8f9fa;
}

.setting-info {
  flex: 1;
}

.setting-info h3 {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
}

.setting-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.setting-control {
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

.setting-arrow {
  font-size: 1.2rem;
  color: #ccc;
}

.save-section {
  text-align: center;
  margin-top: 2rem;
}

.save-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-btn:hover {
  background: #5a6fd8;
}
</style>