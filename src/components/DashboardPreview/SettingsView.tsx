import { useState } from 'react'
import { Save, Bell, UserCog } from 'lucide-react'
import { DashboardSettings } from '../../lib/types'

interface SettingsViewProps {
  settings: DashboardSettings
  onUpdateSettings: (settings: DashboardSettings) => void
}

const SettingsView = ({ settings, onUpdateSettings }: SettingsViewProps) => {
  const [local, setLocal] = useState(settings)
  const [saved, setSaved] = useState(false)

  const update = (key: keyof DashboardSettings, value: unknown) => {
    setLocal({ ...local, [key]: value })
    setSaved(false)
  }

  const handleSave = () => {
    onUpdateSettings(local)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      <div className="dashboard-preview__view-header">
        <div>
          <h3 className="dashboard-preview__card-title">Settings</h3>
          <p className="dashboard-preview__card-subtitle">Configure your dashboard preferences and notifications</p>
        </div>
        <div className="dashboard-preview__view-header-actions">
          <button className="dashboard-preview__btn dashboard-preview__btn--primary" onClick={handleSave}>
            <Save size={14} strokeWidth={2} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="dashboard-preview__settings">
        <div className="dashboard-preview__settings-section">
          <div className="dashboard-preview__settings-section-header">
            <span className="dashboard-preview__settings-section-icon">
              <Bell size={16} strokeWidth={1.75} />
            </span>
            <div>
              <h4 className="dashboard-preview__settings-section-title">Notifications</h4>
              <p className="dashboard-preview__settings-section-desc">Control how alerts are delivered</p>
            </div>
          </div>
          <div className="dashboard-preview__settings-list">
            <div className="dashboard-preview__settings-item">
              <div>
                <span className="dashboard-preview__settings-item-title">Push Notifications</span>
                <span className="dashboard-preview__settings-item-desc">Receive real-time alerts in the dashboard</span>
              </div>
              <label className="dashboard-preview__toggle">
                <input
                  type="checkbox"
                  checked={local.notifications}
                  onChange={(e) => update('notifications', e.target.checked)}
                />
                <span className="dashboard-preview__toggle-slider"></span>
              </label>
            </div>
            <div className="dashboard-preview__settings-item">
              <div>
                <span className="dashboard-preview__settings-item-title">Email Alerts</span>
                <span className="dashboard-preview__settings-item-desc">Receive alerts by email</span>
              </div>
              <label className="dashboard-preview__toggle">
                <input
                  type="checkbox"
                  checked={local.emailAlerts}
                  onChange={(e) => update('emailAlerts', e.target.checked)}
                />
                <span className="dashboard-preview__toggle-slider"></span>
              </label>
            </div>
            <div className="dashboard-preview__settings-item">
              <div>
                <span className="dashboard-preview__settings-item-title">Weekly Report</span>
                <span className="dashboard-preview__settings-item-desc">Receive a weekly maintenance summary</span>
              </div>
              <label className="dashboard-preview__toggle">
                <input
                  type="checkbox"
                  checked={local.weeklyReport}
                  onChange={(e) => update('weeklyReport', e.target.checked)}
                />
                <span className="dashboard-preview__toggle-slider"></span>
              </label>
            </div>
            <div className="dashboard-preview__settings-item">
              <div>
                <span className="dashboard-preview__settings-item-title">Auto-Assign Requests</span>
                <span className="dashboard-preview__settings-item-desc">Automatically assign requests to available technicians</span>
              </div>
              <label className="dashboard-preview__toggle">
                <input
                  type="checkbox"
                  checked={local.autoAssign}
                  onChange={(e) => update('autoAssign', e.target.checked)}
                />
                <span className="dashboard-preview__toggle-slider"></span>
              </label>
            </div>
            <div className="dashboard-preview__settings-item">
              <div>
                <span className="dashboard-preview__settings-item-title">Alert Threshold</span>
                <span className="dashboard-preview__settings-item-desc">
                  Alert when open requests exceed {local.alertThreshold}%
                </span>
              </div>
              <div className="dashboard-preview__range">
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={local.alertThreshold}
                  onChange={(e) => update('alertThreshold', Number(e.target.value))}
                />
                <span className="dashboard-preview__range-value">{local.alertThreshold}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-preview__settings-section">
          <div className="dashboard-preview__settings-section-header">
            <span className="dashboard-preview__settings-section-icon">
              <UserCog size={16} strokeWidth={1.75} />
            </span>
            <div>
              <h4 className="dashboard-preview__settings-section-title">Appearance</h4>
              <p className="dashboard-preview__settings-section-desc">Customize your dashboard view</p>
            </div>
          </div>
          <div className="dashboard-preview__settings-list">
            <div className="dashboard-preview__settings-item">
              <div>
                <span className="dashboard-preview__settings-item-title">Compact View</span>
                <span className="dashboard-preview__settings-item-desc">Show more content with reduced spacing</span>
              </div>
              <label className="dashboard-preview__toggle">
                <input
                  type="checkbox"
                  checked={local.compactView}
                  onChange={(e) => update('compactView', e.target.checked)}
                />
                <span className="dashboard-preview__toggle-slider"></span>
              </label>
            </div>
            <div className="dashboard-preview__settings-item">
              <div>
                <span className="dashboard-preview__settings-item-title">Language</span>
                <span className="dashboard-preview__settings-item-desc">Display language preference</span>
              </div>
              <select
                className="dashboard-preview__form-input dashboard-preview__form-input--sm"
                value={local.language}
                onChange={(e) => update('language', e.target.value)}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsView