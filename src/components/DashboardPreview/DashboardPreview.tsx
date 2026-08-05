import { useState } from 'react'
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
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardList,
  ChevronRight,
  Calendar,
} from 'lucide-react'
import AnalyticsView from './AnalyticsView'
import './DashboardPreview.css'

const sidebarItems = [
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

const stats = [
  { label: 'Open Requests', value: '128', trend: '+12%', trendUp: true, icon: ClipboardList },
  { label: 'Completed Today', value: '42', trend: '+8%', trendUp: true, icon: CheckCircle2 },
  { label: 'Avg Resolution Time', value: '3.8h', trend: '-0.4h', trendUp: true, icon: Clock },
  { label: 'Active Technicians', value: '18', trend: '+2', trendUp: true, icon: Users },
]

const requests = [
  { issue: 'Water Leak', location: 'Building A · Floor 2', priority: 'Critical', technician: 'John Martinez', status: 'In Progress', date: 'Aug 5, 2026' },
  { issue: 'Room AC Failure', location: 'Building B · Room 214', priority: 'High', technician: 'Sarah Kim', status: 'Assigned', date: 'Aug 5, 2026' },
  { issue: 'Broken Window', location: 'Building A · Floor 1', priority: 'Medium', technician: 'Mike Rodriguez', status: 'Open', date: 'Aug 4, 2026' },
  { issue: 'Electrical Outlet', location: 'Building C · Room 108', priority: 'High', technician: 'Emily Chen', status: 'In Progress', date: 'Aug 4, 2026' },
]

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'Critical': return 'dashboard-preview__priority--critical'
    case 'High': return 'dashboard-preview__priority--high'
    case 'Medium': return 'dashboard-preview__priority--medium'
    case 'Low': return 'dashboard-preview__priority--low'
    default: return ''
  }
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Open': return 'dashboard-preview__status--open'
    case 'Assigned': return 'dashboard-preview__status--assigned'
    case 'In Progress': return 'dashboard-preview__status--progress'
    case 'Completed': return 'dashboard-preview__status--completed'
    case 'Verified': return 'dashboard-preview__status--verified'
    default: return ''
  }
}

interface DashboardPreviewProps {
  onBack?: () => void
}

const DashboardPreview = ({ onBack }: DashboardPreviewProps) => {
  const [activeView, setActiveView] = useState('Dashboard')

  const handleNavClick = (label: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setActiveView(label)
  }

  const renderView = () => {
    if (activeView === 'Analytics') {
      return <AnalyticsView />
    }

    if (activeView !== 'Dashboard') {
      return (
        <div className="dashboard-preview__view-header">
          <div>
            <h3 className="dashboard-preview__card-title">{activeView}</h3>
            <p className="dashboard-preview__card-subtitle">This section is coming soon</p>
          </div>
        </div>
      )
    }

    return (
      <>
        {/* Analytics Stats */}
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

        {/* Request Management Table */}
        <div className="dashboard-preview__card dashboard-preview__card--table">
          <div className="dashboard-preview__card-header">
            <div>
              <h3 className="dashboard-preview__card-title">Request Management</h3>
              <p className="dashboard-preview__card-subtitle">All maintenance requests across facilities</p>
            </div>
            <button className="dashboard-preview__btn dashboard-preview__btn--primary">
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
            {requests.map((request, index) => (
              <div key={index} className="dashboard-preview__table-row">
                <span className="dashboard-preview__issue">{request.issue}</span>
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
                  <button className="dashboard-preview__more-btn" aria-label="More actions">
                    <MoreHorizontal size={16} strokeWidth={1.75} />
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <section id="dashboard" className="dashboard-preview dashboard-preview--full">
      <div className="dashboard-preview__app">
          {/* Sidebar */}
          <aside className="dashboard-preview__sidebar">
            <div className="dashboard-preview__logo">
              <div className="dashboard-preview__logo-mark">M</div>
              <span className="dashboard-preview__logo-text">Maintena</span>
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
              <div className="dashboard-preview__user">
                <div className="dashboard-preview__avatar">AK</div>
                <div className="dashboard-preview__user-info">
                  <span className="dashboard-preview__user-name">Alex Kim</span>
                  <span className="dashboard-preview__user-role">Admin</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="dashboard-preview__main">
            {/* Top Navigation */}
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
                  <input type="text" placeholder="Search requests, technicians, facilities..." />
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
                  <span>Aug 5, 2026</span>
                </div>
                <button className="dashboard-preview__icon-btn" aria-label="Notifications">
                  <Bell size={16} strokeWidth={1.75} />
                  <span className="dashboard-preview__notification-dot"></span>
                </button>
                <button className="dashboard-preview__icon-btn" aria-label="Settings">
                  <Settings size={16} strokeWidth={1.75} />
                </button>
                <div className="dashboard-preview__avatar dashboard-preview__avatar--sm">AK</div>
              </div>
            </div>

            {renderView()}
          </div>
        </div>
    </section>
  )
}

export default DashboardPreview