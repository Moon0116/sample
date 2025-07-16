<template>
  <div class="notifications-page">
    <div class="notifications-header">
      <button class="back-btn" @click="goBack">
        ← Back
      </button>
      <h1>Notifications</h1>
      <div></div>
    </div>
    
    <div class="notifications-content">
      <div class="notifications-section">
        <h2>Push Notifications</h2>
        <div class="notifications-group">
          <div class="notification-item">
            <div class="notification-info">
              <h3>Enable Push Notifications</h3>
              <p>Allow the app to send notifications to your device</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.pushEnabled" @change="togglePushNotifications" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="notifications-section" v-if="notifications.pushEnabled">
        <h2>Transaction Alerts</h2>
        <div class="notifications-group">
          <div class="notification-item">
            <div class="notification-info">
              <h3>New Transactions</h3>
              <p>Get notified when new transactions are added</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.newTransactions" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="notification-item">
            <div class="notification-info">
              <h3>Large Expenses</h3>
              <p>Alert for expenses above threshold</p>
            </div>
            <div class="notification-controls">
              <label class="toggle-switch">
                <input type="checkbox" v-model="notifications.largeExpenses" />
                <span class="toggle-slider"></span>
              </label>
              <input 
                v-if="notifications.largeExpenses" 
                type="number" 
                v-model="notifications.expenseThreshold" 
                class="threshold-input"
                placeholder="Amount"
              />
            </div>
          </div>
          
          <div class="notification-item">
            <div class="notification-info">
              <h3>Daily Summary</h3>
              <p>Daily spending summary at end of day</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.dailySummary" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="notifications-section" v-if="notifications.pushEnabled">
        <h2>Budget & Goals</h2>
        <div class="notifications-group">
          <div class="notification-item">
            <div class="notification-info">
              <h3>Budget Warnings</h3>
              <p>Alert when approaching budget limits</p>
            </div>
            <div class="notification-controls">
              <label class="toggle-switch">
                <input type="checkbox" v-model="notifications.budgetWarnings" />
                <span class="toggle-slider"></span>
              </label>
              <select v-if="notifications.budgetWarnings" v-model="notifications.budgetThreshold" class="threshold-select">
                <option value="50">50%</option>
                <option value="75">75%</option>
                <option value="90">90%</option>
                <option value="100">100%</option>
              </select>
            </div>
          </div>
          
          <div class="notification-item">
            <div class="notification-info">
              <h3>Budget Exceeded</h3>
              <p>Alert when budget is exceeded</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.budgetExceeded" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="notification-item">
            <div class="notification-info">
              <h3>Goal Milestones</h3>
              <p>Celebrate when reaching goal milestones</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.goalMilestones" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="notification-item">
            <div class="notification-info">
              <h3>Goal Reminders</h3>
              <p>Weekly reminders about your goals</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.goalReminders" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="notifications-section">
        <h2>Email Notifications</h2>
        <div class="notifications-group">
          <div class="notification-item">
            <div class="notification-info">
              <h3>Weekly Reports</h3>
              <p>Receive weekly spending reports via email</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.weeklyReports" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="notification-item">
            <div class="notification-info">
              <h3>Monthly Reports</h3>
              <p>Receive monthly financial summaries</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.monthlyReports" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="notification-item">
            <div class="notification-info">
              <h3>Security Alerts</h3>
              <p>Important security notifications</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.securityAlerts" disabled />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="notifications-section">
        <h2>Notification Schedule</h2>
        <div class="notifications-group">
          <div class="notification-item">
            <div class="notification-info">
              <h3>Quiet Hours</h3>
              <p>Don't send notifications during these hours</p>
            </div>
            <div class="time-controls">
              <input type="time" v-model="notifications.quietStart" class="time-input" />
              <span>to</span>
              <input type="time" v-model="notifications.quietEnd" class="time-input" />
            </div>
          </div>
          
          <div class="notification-item">
            <div class="notification-info">
              <h3>Weekend Notifications</h3>
              <p>Receive notifications on weekends</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.weekendNotifications" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="save-section">
        <button class="save-btn" @click="saveNotificationSettings">
          Save Settings
        </button>
        <button class="test-btn" @click="testNotification">
          Send Test Notification
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notifications',
  data() {
    return {
      notifications: {
        pushEnabled: true,
        newTransactions: true,
        largeExpenses: true,
        expenseThreshold: 100,
        dailySummary: false,
        budgetWarnings: true,
        budgetThreshold: '75',
        budgetExceeded: true,
        goalMilestones: true,
        goalReminders: false,
        weeklyReports: true,
        monthlyReports: true,
        securityAlerts: true,
        quietStart: '22:00',
        quietEnd: '08:00',
        weekendNotifications: false
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    togglePushNotifications() {
      if (this.notifications.pushEnabled) {
        // Request notification permission
        if ('Notification' in window) {
          Notification.requestPermission().then(permission => {
            if (permission !== 'granted') {
              this.notifications.pushEnabled = false
              alert('Please enable notifications in your browser settings')
            }
          })
        }
      }
    },
    saveNotificationSettings() {
      // TODO: Save notification settings to backend
      console.log('Saving notification settings:', this.notifications)
      alert('Notification settings saved successfully!')
    },
    testNotification() {
      if (this.notifications.pushEnabled && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('Test Notification', {
          body: 'This is a test notification from your finance app!',
          icon: '/favicon.ico'
        })
      } else {
        alert('Please enable push notifications first')
      }
    }
  }
}
</script>

<style scoped>
.notifications-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.notifications-header {
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

.notifications-header h1 {
  color: #333;
  margin: 0;
  text-align: center;
}

.notifications-content {
  padding: 1.5rem;
}

.notifications-section {
  margin-bottom: 2rem;
}

.notifications-section h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.notifications-group {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.notification-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-info {
  flex: 1;
}

.notification-info h3 {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
}

.notification-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.notification-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

.threshold-input {
  width: 80px;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.threshold-select {
  padding: 0.25rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  background: white;
}

.time-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.time-input {
  padding: 0.25rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.save-section {
  display: flex;
  gap: 1rem;
  justify-content: center;
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

.test-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.test-btn:hover {
  background: #218838;
}
</style>