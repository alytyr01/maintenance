import { useState } from 'react'
import { Plus, Search, Eye, Truck, CheckCircle2, XCircle } from 'lucide-react'
import { WorkOrder, Technician } from '../../lib/types'
import Modal from './Modal'
import { getPriorityClass, getStatusClass } from './helpers'

interface WorkOrdersViewProps {
  workOrders: WorkOrder[]
  technicians: Technician[]
  onCreateWorkOrder: () => void
  onUpdateStatus: (id: string, status: WorkOrder['status']) => void
}

const WorkOrdersView = ({ workOrders, technicians, onCreateWorkOrder, onUpdateStatus }: WorkOrdersViewProps) => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedWO, setSelectedWO] = useState<WorkOrder | null>(null)

  const statuses = ['All', 'Draft', 'Scheduled', 'In Progress', 'Completed', 'Cancelled']

  const filtered = workOrders.filter((wo) => {
    const matchesSearch = wo.title.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || wo.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getTechnicianSkills = (name: string) => {
    const tech = technicians.find((t) => t.name === name)
    return tech?.skills ?? []
  }

  const handleStatusChange = (wo: WorkOrder, newStatus: WorkOrder['status']) => {
    onUpdateStatus(wo.id, newStatus)
    if (wo.id === selectedWO?.id) {
      setSelectedWO({ ...wo, status: newStatus })
    }
  }

  return (
    <>
      <div className="dashboard-preview__view-header">
        <div>
          <h3 className="dashboard-preview__card-title">Work Orders</h3>
          <p className="dashboard-preview__card-subtitle">Track work orders from scheduling through completion</p>
        </div>
        <div className="dashboard-preview__view-header-actions">
          <button className="dashboard-preview__btn dashboard-preview__btn--primary" onClick={onCreateWorkOrder}>
            <Plus size={14} strokeWidth={2} />
            New Work Order
          </button>
        </div>
      </div>

      <div className="dashboard-preview__toolbar">
        <div className="dashboard-preview__toolbar-search">
          <Search size={14} strokeWidth={1.75} />
          <input
            type="text"
            placeholder="Search work orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="dashboard-preview__toolbar-filters">
          {statuses.map((status) => (
            <button
              key={status}
              className={`dashboard-preview__filter-btn${statusFilter === status ? ' dashboard-preview__filter-btn--active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-preview__card dashboard-preview__card--table">
        <div className="dashboard-preview__workorders-table">
          <div className="dashboard-preview__workorders-header">
            <span>Work Order</span>
            <span>Facility</span>
            <span>Technician</span>
            <span>Priority</span>
            <span>Status</span>
            <span>Scheduled</span>
            <span>Cost</span>
            <span></span>
          </div>
          {filtered.map((wo) => (
            <div key={wo.id} className="dashboard-preview__workorders-row">
              <span className="dashboard-preview__workorders-title">
                <span className="dashboard-preview__workorders-id">{wo.id}</span>
                {wo.title}
              </span>
              <span className="dashboard-preview__workorders-facility">{wo.facility}</span>
              <span className="dashboard-preview__workorders-tech">{wo.technician}</span>
              <span>
                <span className={`dashboard-preview__badge ${getPriorityClass(wo.priority)}`}>
                  {wo.priority}
                </span>
              </span>
              <span>
                <span className={`dashboard-preview__badge ${getStatusClass(wo.status)}`}>
                  {wo.status}
                </span>
              </span>
              <span className="dashboard-preview__workorders-date">{wo.scheduledDate}</span>
              <span className="dashboard-preview__workorders-cost">${wo.cost.toLocaleString()}</span>
              <span className="dashboard-preview__workorders-actions">
                <button
                  className="dashboard-preview__btn dashboard-preview__btn--sm"
                  onClick={() => setSelectedWO(wo)}
                >
                  <Eye size={12} strokeWidth={1.75} />
                  View
                </button>
              </span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="dashboard-preview__empty-state">No work orders found</div>
          )}
        </div>
      </div>

      {selectedWO && (
        <Modal
          title={`${selectedWO.id} · ${selectedWO.title}`}
          subtitle={`${selectedWO.category} · ${selectedWO.priority} priority`}
          onClose={() => setSelectedWO(null)}
          wide
        >
          <div className="dashboard-preview__workorder-detail">
            <div className="dashboard-preview__workorder-info">
              <div className="dashboard-preview__workorder-detail-grid">
                <div className="dashboard-preview__workorder-detail-item">
                  <span className="dashboard-preview__workorder-detail-label">Description</span>
                  <span className="dashboard-preview__workorder-detail-value">{selectedWO.description}</span>
                </div>
                <div className="dashboard-preview__workorder-detail-item">
                  <span className="dashboard-preview__workorder-detail-label">Facility</span>
                  <span className="dashboard-preview__workorder-detail-value">{selectedWO.facility}</span>
                </div>
                <div className="dashboard-preview__workorder-detail-item">
                  <span className="dashboard-preview__workorder-detail-label">Technician</span>
                  <span className="dashboard-preview__workorder-detail-value">{selectedWO.technician}</span>
                </div>
                <div className="dashboard-preview__workorder-detail-item">
                  <span className="dashboard-preview__workorder-detail-label">Scheduled Date</span>
                  <span className="dashboard-preview__workorder-detail-value">{selectedWO.scheduledDate}</span>
                </div>
                {selectedWO.completionDate && (
                  <div className="dashboard-preview__workorder-detail-item">
                    <span className="dashboard-preview__workorder-detail-label">Completion Date</span>
                    <span className="dashboard-preview__workorder-detail-value">{selectedWO.completionDate}</span>
                  </div>
                )}
                <div className="dashboard-preview__workorder-detail-item">
                  <span className="dashboard-preview__workorder-detail-label">Cost</span>
                  <span className="dashboard-preview__workorder-detail-value">${selectedWO.cost.toLocaleString()}</span>
                </div>
                <div className="dashboard-preview__workorder-detail-item">
                  <span className="dashboard-preview__workorder-detail-label">Parts Required</span>
                  <div className="dashboard-preview__workorder-parts">
                    {selectedWO.partsRequired.map((part) => (
                      <span key={part} className="dashboard-preview__workorder-part">
                        <Truck size={12} strokeWidth={1.75} />
                        {part}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="dashboard-preview__workorder-detail-item">
                  <span className="dashboard-preview__workorder-detail-label">Technician Skills</span>
                  <div className="dashboard-preview__workorder-parts">
                    {getTechnicianSkills(selectedWO.technician).map((skill) => (
                      <span key={skill} className="dashboard-preview__workorder-part">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="dashboard-preview__workorder-detail-item">
                <span className="dashboard-preview__workorder-detail-label">Notes</span>
                <span className="dashboard-preview__workorder-detail-value">{selectedWO.notes}</span>
              </div>
            </div>
            <div className="dashboard-preview__workorder-status-actions">
              <span className="dashboard-preview__workorder-detail-label">Update Status:</span>
              {(['Scheduled', 'In Progress', 'Completed', 'Cancelled'] as WorkOrder['status'][]).map((status) => (
                <button
                  key={status}
                  className={`dashboard-preview__btn dashboard-preview__btn--sm${selectedWO.status === status ? ' dashboard-preview__btn--primary' : ''}`}
                  onClick={() => handleStatusChange(selectedWO, status)}
                >
                  {status === 'Completed' && <CheckCircle2 size={12} strokeWidth={1.75} />}
                  {status === 'Cancelled' && <XCircle size={12} strokeWidth={1.75} />}
                  {status}
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default WorkOrdersView