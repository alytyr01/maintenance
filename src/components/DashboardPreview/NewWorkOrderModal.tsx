import { useState } from 'react'
import Modal from './Modal'
import { Priority, RequestItem, Technician } from '../../lib/types'

interface NewWorkOrderModalProps {
  requests: RequestItem[]
  technicians: Technician[]
  onClose: () => void
  onSubmit: (wo: {
    title: string
    requestId: string
    facility: string
    technician: string
    category: string
    priority: Priority
    scheduledDate: string
    partsRequired: string[]
    cost: number
    notes: string
  }) => void
}

const NewWorkOrderModal = ({ requests, technicians, onClose, onSubmit }: NewWorkOrderModalProps) => {
  const [form, setForm] = useState({
    title: '',
    requestId: '',
    facility: 'Building A',
    technician: '',
    category: 'HVAC',
    priority: 'Medium' as Priority,
    scheduledDate: '',
    partsRequired: '',
    cost: 0,
    notes: '',
  })

  const available = technicians.filter((t) => t.availability !== 'Off Duty')
  const openRequests = requests.filter((r) => r.status !== 'Completed' && r.status !== 'Verified')

  const handleSubmit = () => {
    if (!form.title.trim() || !form.technician) return
    onSubmit({
      ...form,
      partsRequired: form.partsRequired.split(',').map((s) => s.trim()).filter(Boolean),
      cost: Number(form.cost) || 0,
    })
  }

  return (
    <Modal title="New Work Order" subtitle="Create a new work order" onClose={onClose} wide>
      <div className="dashboard-preview__form">
        <div className="dashboard-preview__form-field">
          <label className="dashboard-preview__form-label">Work Order Title *</label>
          <input
            type="text"
            className="dashboard-preview__form-input"
            placeholder="e.g. HVAC Repair - Building A Floor 2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className="dashboard-preview__form-row">
          <div className="dashboard-preview__form-field">
            <label className="dashboard-preview__form-label">Linked Request</label>
            <select
              className="dashboard-preview__form-input"
              value={form.requestId}
              onChange={(e) => setForm({ ...form, requestId: e.target.value })}
            >
              <option value="">None</option>
              {openRequests.map((r) => (
                <option key={r.id} value={r.id}>{r.id} · {r.issue}</option>
              ))}
            </select>
          </div>
          <div className="dashboard-preview__form-field">
            <label className="dashboard-preview__form-label">Facility</label>
            <select
              className="dashboard-preview__form-input"
              value={form.facility}
              onChange={(e) => setForm({ ...form, facility: e.target.value })}
            >
              <option value="Building A">Building A</option>
              <option value="Building B">Building B</option>
              <option value="Building C">Building C</option>
              <option value="Parking Garage">Parking Garage</option>
              <option value="Warehouse">Warehouse</option>
            </select>
          </div>
        </div>
        <div className="dashboard-preview__form-row">
          <div className="dashboard-preview__form-field">
            <label className="dashboard-preview__form-label">Assign Technician *</label>
            <select
              className="dashboard-preview__form-input"
              value={form.technician}
              onChange={(e) => setForm({ ...form, technician: e.target.value })}
            >
              <option value="">Select technician</option>
              {available.map((t) => (
                <option key={t.id} value={t.name}>{t.name} · {t.availability}</option>
              ))}
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
        <div className="dashboard-preview__form-row">
          <div className="dashboard-preview__form-field">
            <label className="dashboard-preview__form-label">Scheduled Date</label>
            <input
              type="text"
              className="dashboard-preview__form-input"
              placeholder="e.g. Aug 7, 2026"
              value={form.scheduledDate}
              onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
            />
          </div>
          <div className="dashboard-preview__form-field">
            <label className="dashboard-preview__form-label">Cost ($)</label>
            <input
              type="number"
              className="dashboard-preview__form-input"
              placeholder="0"
              value={form.cost || ''}
              onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="dashboard-preview__form-field">
          <label className="dashboard-preview__form-label">Parts Required (comma separated)</label>
          <input
            type="text"
            className="dashboard-preview__form-input"
            placeholder="e.g. Pipe fittings, Ceiling tiles"
            value={form.partsRequired}
            onChange={(e) => setForm({ ...form, partsRequired: e.target.value })}
          />
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
          <label className="dashboard-preview__form-label">Notes</label>
          <textarea
            className="dashboard-preview__form-input dashboard-preview__form-textarea"
            placeholder="Additional instructions..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>
        <div className="dashboard-preview__form-actions">
          <button className="dashboard-preview__btn" onClick={onClose}>Cancel</button>
          <button
            className="dashboard-preview__btn dashboard-preview__btn--primary"
            onClick={handleSubmit}
            disabled={!form.title.trim() || !form.technician}
          >
            Create Work Order
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default NewWorkOrderModal