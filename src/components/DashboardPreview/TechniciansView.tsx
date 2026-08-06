import { useState } from 'react'
import { Plus, Search, Mail, Phone, UserPlus } from 'lucide-react'
import { Technician, RequestItem } from '../../lib/types'
import Modal from './Modal'
import { getAvailabilityClass } from './helpers'

interface TechniciansViewProps {
  technicians: Technician[]
  requests: RequestItem[]
  onAddTechnician: (tech: Omit<Technician, 'id' | 'completed' | 'avgTime' | 'score'>) => void
  onAssignRequest: (requestId: string, technicianName: string) => void
}

const TechniciansView = ({ technicians, requests, onAddTechnician, onAssignRequest }: TechniciansViewProps) => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState<string | null>(null)
  const [newTech, setNewTech] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    skills: '',
    availability: 'Available' as Technician['availability'],
    assigned: 0,
  })

  const filters = ['All', 'Available', 'On Job', 'Off Duty']

  const filtered = technicians.filter((tech) => {
    const matchesSearch = tech.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'All' || tech.availability === filter
    return matchesSearch && matchesFilter
  })

  const unassignedRequests = requests.filter((r) => r.technician === 'Unassigned' || r.status === 'Open')

  const handleSubmit = () => {
    if (!newTech.name.trim()) return
    onAddTechnician({
      ...newTech,
      skills: newTech.skills.split(',').map((s) => s.trim()).filter(Boolean),
    })
    setShowAddModal(false)
    setNewTech({ name: '', role: '', email: '', phone: '', skills: '', availability: 'Available', assigned: 0 })
  }

  const handleAssign = (requestId: string, techName: string) => {
    onAssignRequest(requestId, techName)
    setShowAssignModal(null)
  }

  const initials = (name: string) => name.split(' ').map((n) => n[0]).join('')

  return (
    <>
      <div className="dashboard-preview__view-header">
        <div>
          <h3 className="dashboard-preview__card-title">Technicians</h3>
          <p className="dashboard-preview__card-subtitle">Manage your maintenance team and assignments</p>
        </div>
        <div className="dashboard-preview__view-header-actions">
          <button className="dashboard-preview__btn dashboard-preview__btn--primary" onClick={() => setShowAddModal(true)}>
            <Plus size={14} strokeWidth={2} />
            Add Technician
          </button>
        </div>
      </div>

      <div className="dashboard-preview__toolbar">
        <div className="dashboard-preview__toolbar-search">
          <Search size={14} strokeWidth={1.75} />
          <input
            type="text"
            placeholder="Search technicians..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="dashboard-preview__toolbar-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`dashboard-preview__filter-btn${filter === f ? ' dashboard-preview__filter-btn--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-preview__grid">
        {filtered.map((tech) => (
          <div key={tech.id} className="dashboard-preview__tech-card">
            <div className="dashboard-preview__tech-card-header">
              <div className="dashboard-preview__tech-card-avatar">{initials(tech.name)}</div>
              <div className="dashboard-preview__tech-card-info">
                <span className="dashboard-preview__tech-card-name">{tech.name}</span>
                <span className="dashboard-preview__tech-card-role">{tech.role}</span>
              </div>
              <span className={`dashboard-preview__badge ${getAvailabilityClass(tech.availability)}`}>
                {tech.availability}
              </span>
            </div>

            <div className="dashboard-preview__tech-card-stats">
              <div className="dashboard-preview__tech-card-stat">
                <span className="dashboard-preview__tech-card-stat-value">{tech.completed}</span>
                <span className="dashboard-preview__tech-card-stat-label">Completed</span>
              </div>
              <div className="dashboard-preview__tech-card-stat">
                <span className="dashboard-preview__tech-card-stat-value">{tech.avgTime}</span>
                <span className="dashboard-preview__tech-card-stat-label">Avg Time</span>
              </div>
              <div className="dashboard-preview__tech-card-stat">
                <span className="dashboard-preview__tech-card-stat-value">{tech.score}</span>
                <span className="dashboard-preview__tech-card-stat-label">Score</span>
              </div>
              <div className="dashboard-preview__tech-card-stat">
                <span className="dashboard-preview__tech-card-stat-value">{tech.assigned}</span>
                <span className="dashboard-preview__tech-card-stat-label">Assigned</span>
              </div>
            </div>

            <div className="dashboard-preview__tech-card-skills">
              {tech.skills.map((skill) => (
                <span key={skill} className="dashboard-preview__skill-tag">{skill}</span>
              ))}
            </div>

            <div className="dashboard-preview__tech-card-contact">
              <span className="dashboard-preview__tech-card-contact-item">
                <Mail size={12} strokeWidth={1.75} />
                {tech.email}
              </span>
              <span className="dashboard-preview__tech-card-contact-item">
                <Phone size={12} strokeWidth={1.75} />
                {tech.phone}
              </span>
            </div>

            <div className="dashboard-preview__tech-card-actions">
              <button
                className="dashboard-preview__btn dashboard-preview__btn--sm"
                onClick={() => setShowAssignModal(tech.name)}
                disabled={tech.availability === 'Off Duty'}
              >
                <UserPlus size={12} strokeWidth={1.75} />
                Assign Request
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <Modal title="Add Technician" subtitle="Add a new member to your maintenance team" onClose={() => setShowAddModal(false)}>
          <div className="dashboard-preview__form">
            <div className="dashboard-preview__form-row">
              <div className="dashboard-preview__form-field">
                <label className="dashboard-preview__form-label">Full Name</label>
                <input
                  type="text"
                  className="dashboard-preview__form-input"
                  placeholder="e.g. John Smith"
                  value={newTech.name}
                  onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
                />
              </div>
              <div className="dashboard-preview__form-field">
                <label className="dashboard-preview__form-label">Role</label>
                <input
                  type="text"
                  className="dashboard-preview__form-input"
                  placeholder="e.g. Technician"
                  value={newTech.role}
                  onChange={(e) => setNewTech({ ...newTech, role: e.target.value })}
                />
              </div>
            </div>
            <div className="dashboard-preview__form-row">
              <div className="dashboard-preview__form-field">
                <label className="dashboard-preview__form-label">Email</label>
                <input
                  type="email"
                  className="dashboard-preview__form-input"
                  placeholder="name@maintena.com"
                  value={newTech.email}
                  onChange={(e) => setNewTech({ ...newTech, email: e.target.value })}
                />
              </div>
              <div className="dashboard-preview__form-field">
                <label className="dashboard-preview__form-label">Phone</label>
                <input
                  type="text"
                  className="dashboard-preview__form-input"
                  placeholder="(555) 000-0000"
                  value={newTech.phone}
                  onChange={(e) => setNewTech({ ...newTech, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="dashboard-preview__form-row">
              <div className="dashboard-preview__form-field">
                <label className="dashboard-preview__form-label">Skills (comma separated)</label>
                <input
                  type="text"
                  className="dashboard-preview__form-input"
                  placeholder="Plumbing, HVAC, Electrical"
                  value={newTech.skills}
                  onChange={(e) => setNewTech({ ...newTech, skills: e.target.value })}
                />
              </div>
              <div className="dashboard-preview__form-field">
                <label className="dashboard-preview__form-label">Availability</label>
                <select
                  className="dashboard-preview__form-input"
                  value={newTech.availability}
                  onChange={(e) => setNewTech({ ...newTech, availability: e.target.value as Technician['availability'] })}
                >
                  <option value="Available">Available</option>
                  <option value="On Job">On Job</option>
                  <option value="Off Duty">Off Duty</option>
                </select>
              </div>
            </div>
            <div className="dashboard-preview__form-actions">
              <button className="dashboard-preview__btn" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="dashboard-preview__btn dashboard-preview__btn--primary" onClick={handleSubmit}>
                Add Technician
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showAssignModal && (
        <Modal
          title="Assign Request"
          subtitle={`Select a request to assign to ${showAssignModal}`}
          onClose={() => setShowAssignModal(null)}
        >
          <div className="dashboard-preview__assign-list">
            {unassignedRequests.length === 0 && (
              <div className="dashboard-preview__empty-state">No unassigned requests available</div>
            )}
            {unassignedRequests.map((req) => (
              <div key={req.id} className="dashboard-preview__assign-item">
                <div className="dashboard-preview__assign-info">
                  <span className="dashboard-preview__assign-title">{req.issue}</span>
                  <span className="dashboard-preview__assign-sub">{req.id} · {req.location}</span>
                </div>
                <button
                  className="dashboard-preview__btn dashboard-preview__btn--sm dashboard-preview__btn--primary"
                  onClick={() => handleAssign(req.id, showAssignModal)}
                >
                  Assign
                </button>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  )
}

export default TechniciansView