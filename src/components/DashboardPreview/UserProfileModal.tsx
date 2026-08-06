import { useState } from 'react'
import { X, User, Mail, Phone, Building2, Shield, LogOut, KeyRound, Save } from 'lucide-react'
import { Role } from '../../lib/types'

interface UserProfileModalProps {
  onClose: () => void
}

const UserProfileModal = ({ onClose }: UserProfileModalProps) => {
  const [form, setForm] = useState({
    name: 'Alex Kim',
    email: 'alex.kim@maintena.com',
    phone: '(555) 010-0001',
    role: 'Admin' as Role,
    department: 'Facility Management',
  })
  const [saved, setSaved] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' })

  const initials = form.name.split(' ').map((n) => n[0]).join('')

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="dashboard-preview__modal-overlay" onClick={onClose}>
      <div className="dashboard-preview__modal dashboard-preview__modal--profile" onClick={(e) => e.stopPropagation()}>
        <div className="dashboard-preview__modal-header">
          <div>
            <h3 className="dashboard-preview__modal-title">User Profile</h3>
            <p className="dashboard-preview__modal-subtitle">Manage your account information</p>
          </div>
          <button className="dashboard-preview__modal-close" onClick={onClose} aria-label="Close">
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        <div className="dashboard-preview__profile">
          <div className="dashboard-preview__profile-header">
            <div className="dashboard-preview__profile-avatar">{initials}</div>
            <div className="dashboard-preview__profile-info">
              <span className="dashboard-preview__profile-name">{form.name}</span>
              <span className="dashboard-preview__profile-role">
                <Shield size={12} strokeWidth={1.75} />
                {form.role}
              </span>
            </div>
            <span className="dashboard-preview__badge dashboard-preview__status--completed">
              Active
            </span>
          </div>

          <div className="dashboard-preview__profile-section">
            <h4 className="dashboard-preview__profile-section-title">
              <User size={14} strokeWidth={1.75} />
              Account Information
            </h4>
            <div className="dashboard-preview__form">
              <div className="dashboard-preview__form-row">
                <div className="dashboard-preview__form-field">
                  <label className="dashboard-preview__form-label">Full Name</label>
                  <input
                    type="text"
                    className="dashboard-preview__form-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="dashboard-preview__form-field">
                  <label className="dashboard-preview__form-label">Role</label>
                  <select
                    className="dashboard-preview__form-input"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Technician">Technician</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
              </div>
              <div className="dashboard-preview__form-row">
                <div className="dashboard-preview__form-field">
                  <label className="dashboard-preview__form-label">
                    <Mail size={12} strokeWidth={1.75} /> Email
                  </label>
                  <input
                    type="email"
                    className="dashboard-preview__form-input"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="dashboard-preview__form-field">
                  <label className="dashboard-preview__form-label">
                    <Phone size={12} strokeWidth={1.75} /> Phone
                  </label>
                  <input
                    type="text"
                    className="dashboard-preview__form-input"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="dashboard-preview__form-field">
                <label className="dashboard-preview__form-label">
                  <Building2 size={12} strokeWidth={1.75} /> Department
                </label>
                <input
                  type="text"
                  className="dashboard-preview__form-input"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="dashboard-preview__profile-section">
            <h4 className="dashboard-preview__profile-section-title">
              <KeyRound size={14} strokeWidth={1.75} />
              Change Password
            </h4>
            <div className="dashboard-preview__form">
              <div className="dashboard-preview__form-field">
                <label className="dashboard-preview__form-label">Current Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="dashboard-preview__form-input"
                  placeholder="Enter current password"
                  value={password.current}
                  onChange={(e) => setPassword({ ...password, current: e.target.value })}
                />
              </div>
              <div className="dashboard-preview__form-row">
                <div className="dashboard-preview__form-field">
                  <label className="dashboard-preview__form-label">New Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="dashboard-preview__form-input"
                    placeholder="Enter new password"
                    value={password.new}
                    onChange={(e) => setPassword({ ...password, new: e.target.value })}
                  />
                </div>
                <div className="dashboard-preview__form-field">
                  <label className="dashboard-preview__form-label">Confirm Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="dashboard-preview__form-input"
                    placeholder="Confirm new password"
                    value={password.confirm}
                    onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                  />
                </div>
              </div>
              <label className="dashboard-preview__profile-show-password">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                Show passwords
              </label>
            </div>
          </div>

          <div className="dashboard-preview__profile-actions">
            <button className="dashboard-preview__btn dashboard-preview__btn--danger">
              <LogOut size={14} strokeWidth={2} />
              Sign Out
            </button>
            <button className="dashboard-preview__btn dashboard-preview__btn--primary" onClick={handleSave}>
              <Save size={14} strokeWidth={2} />
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileModal