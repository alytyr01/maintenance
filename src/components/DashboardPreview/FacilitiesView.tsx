import { useState } from 'react'
import { Plus, Search, Building2, MapPin, User } from 'lucide-react'
import { Facility } from '../../lib/types'
import Modal from './Modal'
import { getFacilityStatusClass } from './helpers'

interface FacilitiesViewProps {
  facilities: Facility[]
  onAddFacility: (facility: Omit<Facility, 'id' | 'pending' | 'critical'>) => void
  onUpdateFacilityStatus: (id: string, status: Facility['status']) => void
}

const FacilitiesView = ({ facilities, onAddFacility, onUpdateFacilityStatus }: FacilitiesViewProps) => {
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newFacility, setNewFacility] = useState({
    name: '',
    rooms: 0,
    inspection: '0%',
    location: '',
    manager: '',
    status: 'Operational' as Facility['status'],
  })

  const filtered = facilities.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.location.toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = () => {
    if (!newFacility.name.trim()) return
    onAddFacility(newFacility)
    setShowAddModal(false)
    setNewFacility({ name: '', rooms: 0, inspection: '0%', location: '', manager: '', status: 'Operational' })
  }

  const statusOptions: Facility['status'][] = ['Operational', 'Maintenance', 'Under Inspection']

  return (
    <>
      <div className="dashboard-preview__view-header">
        <div>
          <h3 className="dashboard-preview__card-title">Facilities</h3>
          <p className="dashboard-preview__card-subtitle">Manage all buildings and facilities in your portfolio</p>
        </div>
        <div className="dashboard-preview__view-header-actions">
          <button className="dashboard-preview__btn dashboard-preview__btn--primary" onClick={() => setShowAddModal(true)}>
            <Plus size={14} strokeWidth={2} />
            Add Facility
          </button>
        </div>
      </div>

      <div className="dashboard-preview__toolbar">
        <div className="dashboard-preview__toolbar-search">
          <Search size={14} strokeWidth={1.75} />
          <input
            type="text"
            placeholder="Search facilities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="dashboard-preview__card dashboard-preview__card--table">
        <div className="dashboard-preview__facilities-table">
          <div className="dashboard-preview__facilities-header">
            <span>Facility</span>
            <span>Status</span>
            <span>Rooms</span>
            <span>Pending</span>
            <span>Critical</span>
            <span>Inspection</span>
            <span>Manager</span>
            <span></span>
          </div>
          {filtered.map((facility) => {
            return (
              <div key={facility.id} className="dashboard-preview__facilities-row">
                <span className="dashboard-preview__facilities-name">
                  <span className="dashboard-preview__facilities-icon">
                    <Building2 size={14} strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="dashboard-preview__facilities-title">{facility.name}</span>
                    <span className="dashboard-preview__facilities-location">
                      <MapPin size={10} strokeWidth={1.75} />
                      {facility.location}
                    </span>
                  </span>
                </span>
                <span>
                  <span className={`dashboard-preview__badge ${getFacilityStatusClass(facility.status)}`}>
                    {facility.status}
                  </span>
                </span>
                <span className="dashboard-preview__facilities-value">{facility.rooms}</span>
                <span className="dashboard-preview__facilities-value">{facility.pending}</span>
                <span className="dashboard-preview__facilities-value dashboard-preview__facilities-value--critical">
                  {facility.critical}
                </span>
                <span className="dashboard-preview__facilities-value">{facility.inspection}</span>
                <span className="dashboard-preview__facilities-manager">
                  <User size={12} strokeWidth={1.75} />
                  {facility.manager}
                </span>
                <span className="dashboard-preview__facilities-actions">
                  <select
                    className="dashboard-preview__status-select"
                    value={facility.status}
                    onChange={(e) => onUpdateFacilityStatus(facility.id, e.target.value as Facility['status'])}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </span>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div className="dashboard-preview__empty-state">No facilities found</div>
          )}
        </div>
      </div>

      {showAddModal && (
        <Modal title="Add Facility" subtitle="Register a new facility in your portfolio" onClose={() => setShowAddModal(false)}>
          <div className="dashboard-preview__form">
            <div className="dashboard-preview__form-row">
              <div className="dashboard-preview__form-field">
                <label className="dashboard-preview__form-label">Facility Name</label>
                <input
                  type="text"
                  className="dashboard-preview__form-input"
                  placeholder="e.g. Building D"
                  value={newFacility.name}
                  onChange={(e) => setNewFacility({ ...newFacility, name: e.target.value })}
                />
              </div>
              <div className="dashboard-preview__form-field">
                <label className="dashboard-preview__form-label">Number of Rooms</label>
                <input
                  type="number"
                  className="dashboard-preview__form-input"
                  placeholder="e.g. 100"
                  value={newFacility.rooms || ''}
                  onChange={(e) => setNewFacility({ ...newFacility, rooms: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="dashboard-preview__form-row">
              <div className="dashboard-preview__form-field">
                <label className="dashboard-preview__form-label">Location</label>
                <input
                  type="text"
                  className="dashboard-preview__form-input"
                  placeholder="e.g. Main Campus, 1300 Tech Blvd"
                  value={newFacility.location}
                  onChange={(e) => setNewFacility({ ...newFacility, location: e.target.value })}
                />
              </div>
              <div className="dashboard-preview__form-field">
                <label className="dashboard-preview__form-label">Manager</label>
                <input
                  type="text"
                  className="dashboard-preview__form-input"
                  placeholder="e.g. Jane Doe"
                  value={newFacility.manager}
                  onChange={(e) => setNewFacility({ ...newFacility, manager: e.target.value })}
                />
              </div>
            </div>
            <div className="dashboard-preview__form-row">
              <div className="dashboard-preview__form-field">
                <label className="dashboard-preview__form-label">Inspection Rate</label>
                <input
                  type="text"
                  className="dashboard-preview__form-input"
                  placeholder="e.g. 90%"
                  value={newFacility.inspection}
                  onChange={(e) => setNewFacility({ ...newFacility, inspection: e.target.value })}
                />
              </div>
              <div className="dashboard-preview__form-field">
                <label className="dashboard-preview__form-label">Status</label>
                <select
                  className="dashboard-preview__form-input"
                  value={newFacility.status}
                  onChange={(e) => setNewFacility({ ...newFacility, status: e.target.value as Facility['status'] })}
                >
                  <option value="Operational">Operational</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Under Inspection">Under Inspection</option>
                </select>
              </div>
            </div>
            <div className="dashboard-preview__form-actions">
              <button className="dashboard-preview__btn" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="dashboard-preview__btn dashboard-preview__btn--primary" onClick={handleSubmit}>
                Add Facility
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default FacilitiesView