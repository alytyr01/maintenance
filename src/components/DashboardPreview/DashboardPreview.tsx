import { useMemo, useState } from 'react'
import {
  LayoutDashboard,
  FileText,
  Wrench,
  Users,
  Building2,
  Bell,
  BarChart3,
  Settings,
  HelpCircle,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardList,
  ChevronRight,
  Calendar,
} from 'lucide-react'
import { initialRequests, initialTechnicians, initialFacilities, initialWorkOrders, initialReports, initialNotifications, initialSettings, initialActivity, helpArticles, faqs } from '../../lib/mockData'
import { RequestItem, Technician, Facility, WorkOrder, Report, Notification, DashboardSettings, Priority, ViewKey } from '../../lib/types'
import { getPriorityClass, getStatusClass } from './helpers'
import AnalyticsView from './AnalyticsView'
import ReportsView from './ReportsView'
import WorkOrdersView from './WorkOrdersView'
import TechniciansView from './TechniciansView'
import FacilitiesView from './FacilitiesView'
import NotificationsView from './NotificationsView'
import SettingsView from './SettingsView'
import HelpView from './HelpView'
import NewRequestModal from './NewRequestModal'
import NewWorkOrderModal from './NewWorkOrderModal'
import UserProfileModal from './UserProfileModal'
import './DashboardPreview.css'

const sidebarItems: { icon: typeof LayoutDashboard; label: ViewKey }[] = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: FileText, label: 'Reports' },
  { icon: Wrench, label: 'Work Orders' },
  { icon: Users, label: 'Technicians' },
  { icon: Building2, label: 'Facilities' },
  { icon: Bell, label: 'Notifications' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
  { icon: HelpCircle, label: 'Help Center' },
]

interface DashboardPreviewProps {
  onBack?: () => void
}

const DashboardPreview = ({ onBack }: DashboardPreviewProps) => {
  const [activeView, setActiveView] = useState<ViewKey>('Dashboard')
  const [requests, setRequests] = useState<RequestItem[]>(initialRequests)
  const [technicians, setTechnicians] = useState<Technician[]>(initialTechnicians)
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities)
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(initialWorkOrders)
  const [reports, setReports] = useState<Report[]>(initialReports)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [settings, setSettings] = useState<DashboardSettings>(initialSettings)
  const [activity, setActivity] = useState(initialActivity)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewRequest, setShowNewRequest] = useState(false)
  const [showNewWorkOrder, setShowNewWorkOrder] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  const addNotification = (type: Notification['type'], title: string, message: string) => {
    const newNotif: Notification = {
      id: `NOT-${Date.now()}`,
      type,
      title,
      message,
      time: 'Just now',
      read: false,
    }
    setNotifications((prev) => [newNotif, ...prev])
    setActivity((prev) => [
      { id: `ACT-${Date.now()}`, time: 'Just now', type, text: message },
      ...prev,
    ])
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const stats = useMemo(() => {
    const open = requests.filter((r) => r.status === 'Open' || r.status === 'Assigned').length
    const completed = requests.filter((r) => r.status === 'Completed' || r.status === 'Verified').length
    const inProgress = requests.filter((r) => r.status === 'In Progress').length
    const activeTechs = technicians.filter((t) => t.availability !== 'Off Duty').length

    return [
      { label: 'Open Requests', value: String(open), trend: '+12%', trendUp: true, icon: ClipboardList },
      { label: 'Completed Today', value: String(completed), trend: '+8%', trendUp: true, icon: CheckCircle2 },
      { label: 'In Progress', value: String(inProgress), trend: '+5%', trendUp: true, icon: Clock },
      { label: 'Active Technicians', value: String(activeTechs), trend: '+2', trendUp: true, icon: Users },
    ]
  }, [requests, technicians])

  const filteredRequests = useMemo(() => {
    if (!searchQuery.trim()) return requests
    const q = searchQuery.toLowerCase()
    return requests.filter((r) =>
      r.issue.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.technician.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q) ||
      r.priority.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q)
    )
  }, [requests, searchQuery])

  const handleCreateRequest = (data: {
    issue: string
    location: string
    building: string
    priority: Priority
    category: string
    description: string
  }) => {
    const newRequest: RequestItem = {
      id: `REQ-${1000 + requests.length + 1}`,
      ...data,
      technician: 'Unassigned',
      status: 'Open',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      reportedBy: 'Alex Kim',
    }
    setRequests((prev) => [newRequest, ...prev])
    setShowNewRequest(false)
    addNotification('assignment', 'New Request Created', `${newRequest.id}: ${newRequest.issue} in ${newRequest.building}`)
    showToast(`Request ${newRequest.id} created successfully`)
  }

  const handleCreateWorkOrder = (data: Omit<WorkOrder, 'id' | 'status' | 'description' | 'completionDate'> & { description?: string }) => {
    const newWO: WorkOrder = {
      id: `WO-${2000 + workOrders.length + 1}`,
      ...data,
      description: data.description || 'New work order',
      status: 'Scheduled',
    }
    setWorkOrders((prev) => [newWO, ...prev])
    setShowNewWorkOrder(false)
    showToast(`Work order ${newWO.id} created successfully`)
  }

  const handleExportReport = (id: string) => {
    const report = reports.find((r) => r.id === id)
    if (!report) return
    // Create a CSV export of the report data
    const csv = [
      ['Meta', report.title, report.type, report.period],
      ['Metric', 'Value'],
      ['Total Requests', String(report.data.totalRequests)],
      ['Completed', String(report.data.completed)],
      ['Open', String(report.data.open)],
      ['Avg Resolution', report.data.avgResolution],
      ['Satisfaction', String(report.data.satisfaction)],
    ].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${report.title.replace(/\s+/g, '-').toLowerCase()}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showToast(`Report ${report.title} exported`)
  }

  const handleCreateReport = () => {
    const newReport: Report = {
      id: `RPT-${3000 + reports.length + 1}`,
      title: 'New Maintenance Report',
      type: 'Monthly',
      period: 'Aug 2026',
      status: 'Generating',
      date: 'In Progress',
      size: '--',
      data: {
        totalRequests: requests.length,
        completed: requests.filter((r) => r.status === 'Completed' || r.status === 'Verified').length,
        open: requests.filter((r) => r.status !== 'Completed' && r.status !== 'Verified').length,
        avgResolution: '3.2h',
        satisfaction: 4.6,
      },
    }
    setReports((prev) => [newReport, ...prev])
    setTimeout(() => {
      setReports((prev) =>
        prev.map((r) => r.id === newReport.id ? { ...r, status: 'Ready', date: 'Aug 6, 2026', size: '1.2 MB' } : r)
      )
    }, 2000)
    addNotification('info', 'Report Generated', `New report ${newReport.id} has been generated`)
    showToast('New report is being generated')
  }

  const handleAddTechnician = (tech: Omit<Technician, 'id' | 'completed' | 'avgTime' | 'score'>) => {
    const newTech: Technician = {
      ...tech,
      id: `TEC-${String(technicians.length + 1).padStart(2, '0')}`,
      completed: 0,
      avgTime: '--',
      score: 0,
    }
    setTechnicians((prev) => [...prev, newTech])
    addNotification('info', 'Technician Added', `${newTech.name} has been added to the team`)
    showToast(`${newTech.name} added successfully`)
  }

  const handleAssignRequest = (requestId: string, techName: string) => {
    setRequests((prev) =>
      prev.map((r) => r.id === requestId ? { ...r, technician: techName, status: 'Assigned' } : r)
    )
    setTechnicians((prev) =>
      prev.map((t) => t.name === techName ? { ...t, assigned: t.assigned + 1, availability: 'On Job' } : t)
    )
    const req = requests.find((r) => r.id === requestId)
    addNotification('assignment', 'Technician Assigned', `${techName} assigned to ${requestId}: ${req?.issue ?? 'Request'}`)
    showToast(`${techName} assigned to ${requestId}`)
  }

  const handleAddFacility = (facility: Omit<Facility, 'id' | 'pending' | 'critical'>) => {
    const newFacility: Facility = {
      ...facility,
      id: `FAC-${String(facilities.length + 1).padStart(2, '0')}`,
      pending: 0,
      critical: 0,
    }
    setFacilities((prev) => [...prev, newFacility])
    addNotification('info', 'Facility Added', `${newFacility.name} has been registered`)
    showToast(`${newFacility.name} added successfully`)
  }

  const handleUpdateFacilityStatus = (id: string, status: Facility['status']) => {
    setFacilities((prev) => prev.map((f) => f.id === id ? { ...f, status } : f))
    showToast(`Facility status updated to ${status}`)
  }

  const handleUpdateWorkOrderStatus = (id: string, status: WorkOrder['status']) => {
    const wo = workOrders.find((w) => w.id === id)
    setWorkOrders((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w
        const completionDate = status === 'Completed'
          ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : w.completionDate
        return { ...w, status, completionDate }
      })
    )
    if (wo && status === 'Completed') {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === wo.requestId ? { ...r, status: 'Completed' } : r
        )
      )
    }
    addNotification('repair', 'Work Order Updated', `${id} status changed to ${status}`)
    showToast(`${id} updated to ${status}`)
  }

  const handleMarkRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    showToast('All notifications marked as read')
  }

  const handleClearAll = () => {
    setNotifications([])
    showToast('All notifications cleared')
  }

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleRequestStatusChange = (id: string, status: RequestItem['status']) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r))
    showToast(`Request ${id} updated to ${status}`)
  }

  const handleNavClick = (label: ViewKey, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setActiveView(label)
  }

  const renderDashboard = () => (
    <>
      <div className="dashboard-preview__stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="dashboard-preview__stat-card">
            <div className="dashboard-preview__stat-header">
              <span className="dashboard-preview__stat-label">{stat.label}</span>
              <span className="dashboard-preview__stat-icon">
                <stat.icon size={16} strokeWidth={1.75} />
              </span>
            </div>
            <div className="dashboard-preview__stat-value">{stat.value}</div>
            <div className="dashboard-preview__stat-footer">
              <span className={`dashboard-preview__stat-trend${stat.trendUp ? ' dashboard-preview__stat-trend--up' : ''}`}>
                {stat.trendUp ? <ArrowUpRight size={12} strokeWidth={2} /> : <ArrowDownRight size={12} strokeWidth={2} />}
                {stat.trend}
              </span>
              <span className="dashboard-preview__stat-period">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-preview__card dashboard-preview__card--table">
        <div className="dashboard-preview__card-header">
          <div>
            <h3 className="dashboard-preview__card-title">Request Management</h3>
            <p className="dashboard-preview__card-subtitle">All maintenance requests across facilities</p>
          </div>
          <button
            className="dashboard-preview__btn dashboard-preview__btn--primary"
            onClick={() => setShowNewRequest(true)}
          >
            <Plus size={14} strokeWidth={2} />
            New Request
          </button>
        </div>

        <div className="dashboard-preview__table">
          <div className="dashboard-preview__table-header">
            <span>Issue</span>
            <span>Location</span>
            <span>Priority</span>
            <span>Technician</span>
            <span>Status</span>
            <span>Reported</span>
            <span></span>
          </div>
          {filteredRequests.slice(0, 8).map((request) => (
            <div key={request.id} className="dashboard-preview__table-row">
              <span className="dashboard-preview__issue">
                <span className="dashboard-preview__request-id">{request.id}</span>
                {request.issue}
              </span>
              <span className="dashboard-preview__location">{request.location}</span>
              <span>
                <span className={`dashboard-preview__badge ${getPriorityClass(request.priority)}`}>
                  {request.priority}
                </span>
              </span>
              <span className="dashboard-preview__technician">{request.technician}</span>
              <span>
                <span className={`dashboard-preview__badge ${getStatusClass(request.status)}`}>
                  {request.status}
                </span>
              </span>
              <span className="dashboard-preview__date-text">{request.date}</span>
              <span>
                <select
                  className="dashboard-preview__status-select dashboard-preview__status-select--sm"
                  value={request.status}
                  onChange={(e) => handleRequestStatusChange(request.id, e.target.value as RequestItem['status'])}
                >
                  <option value="Open">Open</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Verified">Verified</option>
                </select>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )

  const renderView = () => {
    switch (activeView) {
      case 'Dashboard':
        return renderDashboard()
      case 'Reports':
        return (
          <ReportsView
            reports={reports}
            onCreateReport={handleCreateReport}
            onExportReport={handleExportReport}
          />
        )
      case 'Work Orders':
        return (
          <WorkOrdersView
            workOrders={workOrders}
            technicians={technicians}
            onCreateWorkOrder={() => setShowNewWorkOrder(true)}
            onUpdateStatus={handleUpdateWorkOrderStatus}
          />
        )
      case 'Technicians':
        return (
          <TechniciansView
            technicians={technicians}
            requests={requests}
            onAddTechnician={handleAddTechnician}
            onAssignRequest={handleAssignRequest}
          />
        )
      case 'Facilities':
        return (
          <FacilitiesView
            facilities={facilities}
            onAddFacility={handleAddFacility}
            onUpdateFacilityStatus={handleUpdateFacilityStatus}
          />
        )
      case 'Notifications':
        return (
          <NotificationsView
            notifications={notifications}
            onMarkRead={handleMarkRead}
            onMarkAllRead={handleMarkAllRead}
            onClearAll={handleClearAll}
            onDelete={handleDeleteNotification}
          />
        )
      case 'Analytics':
        return <AnalyticsView activity={activity} technicians={technicians} facilities={facilities} />
      case 'Settings':
        return (
          <SettingsView
            settings={settings}
            onUpdateSettings={(s) => {
              setSettings(s)
              showToast('Settings saved successfully')
            }}
          />
        )
      case 'Help Center':
        return <HelpView articles={helpArticles} faqs={faqs} />
      default:
        return null
    }
  }

  return (
    <section id="dashboard" className="dashboard-preview dashboard-preview--full">
      <div className="dashboard-preview__app">
        <aside className="dashboard-preview__sidebar">
          <div className="dashboard-preview__logo">
            <img src="/logo.png" alt="Maintena" className="dashboard-preview__logo-img" />
          </div>

          <nav className="dashboard-preview__nav">
            {sidebarItems.map((item) => (
              <a
                key={item.label}
                href="#dashboard"
                onClick={(e) => handleNavClick(item.label, e)}
                className={`dashboard-preview__nav-item${activeView === item.label ? ' dashboard-preview__nav-item--active' : ''}`}
              >
                <item.icon size={16} strokeWidth={1.75} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="dashboard-preview__sidebar-footer">
            <button className="dashboard-preview__user dashboard-preview__user-btn" onClick={() => setShowUserProfile(true)}>
              <div className="dashboard-preview__avatar">AK</div>
              <div className="dashboard-preview__user-info">
                <span className="dashboard-preview__user-name">Alex Kim</span>
                <span className="dashboard-preview__user-role">Admin</span>
              </div>
            </button>
          </div>
        </aside>

        <div className="dashboard-preview__main">
          <div className="dashboard-preview__topbar">
            <div className="dashboard-preview__topbar-left">
              {onBack && (
                <button className="dashboard-preview__back-btn" onClick={onBack} aria-label="Back to site">
                  <ChevronRight size={16} strokeWidth={1.75} className="dashboard-preview__back-chevron" />
                  <span>Back to site</span>
                </button>
              )}
              <div className="dashboard-preview__search">
                <Search size={16} strokeWidth={1.75} />
                <input
                  type="text"
                  placeholder="Search requests, technicians, facilities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="dashboard-preview__search-kbd">⌘K</span>
              </div>
            </div>

            <div className="dashboard-preview__topbar-right">
              <div className="dashboard-preview__workspace">
                <Building2 size={16} strokeWidth={1.75} />
                <span>Main Office</span>
                <ChevronRight size={14} strokeWidth={1.75} className="dashboard-preview__workspace-chevron" />
              </div>
              <div className="dashboard-preview__date">
                <Calendar size={16} strokeWidth={1.75} />
                <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <button
                className="dashboard-preview__icon-btn"
                aria-label="Notifications"
                onClick={() => setActiveView('Notifications')}
              >
                <Bell size={16} strokeWidth={1.75} />
                {unreadCount > 0 && <span className="dashboard-preview__notification-dot"></span>}
              </button>
              <button
                className="dashboard-preview__icon-btn"
                aria-label="Settings"
                onClick={() => setActiveView('Settings')}
              >
                <Settings size={16} strokeWidth={1.75} />
              </button>
              <button
                className="dashboard-preview__avatar-btn"
                onClick={() => setShowUserProfile(true)}
                aria-label="User profile"
              >
                <div className="dashboard-preview__avatar dashboard-preview__avatar--sm">AK</div>
              </button>
            </div>
          </div>

          {renderView()}
        </div>
      </div>

      {showNewRequest && (
        <NewRequestModal
          onClose={() => setShowNewRequest(false)}
          onSubmit={handleCreateRequest}
        />
      )}

      {showNewWorkOrder && (
        <NewWorkOrderModal
          requests={requests}
          technicians={technicians}
          onClose={() => setShowNewWorkOrder(false)}
          onSubmit={handleCreateWorkOrder}
        />
      )}

      {showUserProfile && (
        <UserProfileModal onClose={() => setShowUserProfile(false)} />
      )}

      {toast && (
        <div className="dashboard-preview__toast">
          <CheckCircle2 size={16} strokeWidth={2} />
          {toast}
        </div>
      )}
    </section>
  )
}

export default DashboardPreview