import { useState } from 'react'
import Modal from './Modal'
import { Priority } from '../../lib/types'

interface NewRequestModalProps {
  onClose: () => void
  onSubmit: (request: {
    issue: string
    location: string
    building: string
    priority: Priority
    category: string
    description: string
  }) => void
}

const NewRequestModal = ({ onClose, onSubmit }: NewRequestModalProps) => {
  const [form, setForm] = useState({
    issue: '',
    location: '',
    building: 'Building A',
    priority: 'Medium' as Priority,
    category: 'HVAC',
    description: '',
  })

  const handleSubmit = () => {
    if (!form.issue.trim() || !form.location.trim()) return
    onSubmit(form)
  }

  return (
    <Modal title="New Maintenance Request" subtitle="Report a maintenance issue" onClose={onClose}>
      <div className="dashboard-preview__form">
        <div className="dashboard-preview__form-field">
          <label className="dashboard-preview__form-label">Issue *</label>
          <input
            type="text"
            className="dashboard-preview__form-input"
            placeholder="e.g. Water Leak, AC Failure"
            value={form.issue}
            onChange={(e) => setForm({ ...form, issue: e.target.value })}
          />
        </div>
        <div className="dashboard-preview__form-field">
          <label className="dashboard-preview__form-label">Location *</label>
          <input
            type="text"
            className="dashboard-preview__form-input"
            placeholder="e.g. Building A · Floor 2"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>
        <div className="dashboard-preview__form-row">
          <div className="dashboard-preview__form-field">
            <label className="dashboard-preview__form-label">Building</label>
            <select
              className="dashboard-preview__form-input"
              value={form.building}
              onChange={(e) => setForm({ ...form, building: e.target.value })}
            >
              <option value="Building A">Building A</option>
              <option value="Building B">Building B</option>
              <option value="Building C">Building C</option>
              <option value="Parking Garage">Parking Garage</option>
              <option value="Warehouse">Warehouse</option>
            </select>
          </div>
          <div className="dashboard-preview__form-field">
            <label className="dashboard-preview__form-label">Category</label>
            <select
              className="dashboard-preview__form-input"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="HVAC">HVAC</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Structural">Structural</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Safety">Safety</option>
            </select>
          </div>
        </div>
        <div className="dashboard-preview__form-field">
          <label className="dashboard-preview__form-label">Priority</label>
          <div className="dashboard-preview__priority-select">
            {(['Critical', 'High', 'Medium', 'Low'] as Priority[]).map((p) => (
              <button
                key={p}
                className={`dashboard-preview__priority-option${form.priority === p ? ' dashboard-preview__priority-option--active' : ''}`}
                onClick={() => setForm({ ...form, priority: p })}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="dashboard-preview__form-field">
          <label className="dashboard-preview__form-label">Description</label>
          <textarea
            className="dashboard-preview__form-input dashboard-preview__form-textarea"
            placeholder="Describe the issue in detail..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="dashboard-preview__form-actions">
          <button className="dashboard-preview__btn" onClick={onClose}>Cancel</button>
          <button
            className="dashboard-preview__btn dashboard-preview__btn--primary"
            onClick={handleSubmit}
            disabled={!form.issue.trim() || !form.location.trim()}
          >
            Submit Request
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default NewRequestModal