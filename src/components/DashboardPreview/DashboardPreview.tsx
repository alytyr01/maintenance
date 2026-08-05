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
  UserPlus,
  FileBarChart,
  Download,
  Calendar,
  ChevronRight,
  AlertCircle,
  CheckCheck,
} from 'lucide-react'
import './DashboardPreview.css'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
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
  { issue: 'Ceiling Damage', location: 'Building B · Floor 3', priority: 'Low', technician: 'David Park', status: 'Completed', date: 'Aug 3, 2026' },
  { issue: 'Broken Door Lock', location: 'Building A · Room 305', priority: 'Medium', technician: 'Lisa Nguyen', status: 'Verified', date: 'Aug 3, 2026' },
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

const activity = [
  { time: '2m ago', icon: AlertCircle, text: 'Water leak reported in Building A · Floor 2' },
  { time: '18m ago', icon: UserPlus, text: 'Sarah Kim assigned to Room AC Failure' },
  { time: '1h ago', icon: Wrench, text: 'Repair started on Electrical Outlet · Building C' },
  { time: '3h ago', icon: CheckCircle2, text: 'Repair completed for Ceiling Damage · Building B' },
  { time: '5h ago', icon: CheckCheck, text: 'Inspection approved for Broken Door Lock' },
]

const technicians = [
  { name: 'John Martinez', completed: 48, avgTime: '2.1h', score: 98 },
  { name: 'Sarah Kim', completed: 42, avgTime: '2.6h', score: 95 },
  { name: 'Mike Rodriguez', completed: 38, avgTime: '3.2h', score: 91 },
  { name: 'Emily Chen', completed: 35, avgTime: '3.5h', score: 88 },
  { name: 'David Park', completed: 31, avgTime: '3.8h', score: 84 },
]

const weeklyData = [42, 58, 45, 72, 65, 88, 76]

const categories = [
  { label: 'HVAC', value: 32, pct: 32 },
  { label: 'Plumbing', value: 24, pct: 24 },
  { label: 'Electrical', value: 18, pct: 18 },
  { label: 'Structural', value: 14, pct: 14 },
  { label: 'Other', value: 12, pct: 12 },
]

const facilities = [
  { name: 'Building A', rooms: 120, pending: 8, critical: 2, inspection: '92%' },
  { name: 'Building B', rooms: 96, pending: 5, critical: 1, inspection: '88%' },
  { name: 'Building C', rooms: 64, pending: 3, critical: 0, inspection: '95%' },
]

const quickActions = [
  { icon: Plus, label: 'New Report' },
  { icon: UserPlus, label: 'Assign Technician' },
  { icon: ClipboardList, label: 'Create Work Order' },
  { icon: FileBarChart, label: 'Generate Report' },
  { icon: Download, label: 'Export Analytics' },
]

interface DashboardPreviewProps {
  onBack: () => void
}

const DashboardPreview = ({ onBack }: DashboardPreviewProps) => {
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
                  className={`dashboard-preview__nav-item${item.active ? ' dashboard-preview__nav-item--active' : ''}`}
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
                <button className="dashboard-preview__back-btn" onClick={onBack} aria-label="Back to site">
                  <ChevronRight size={16} strokeWidth={1.75} className="dashboard-preview__back-chevron" />
                  <span>Back to site</span>
                </button>
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

            {/* Main Grid */}
            <div className="dashboard-preview__grid">
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

              {/* Recent Activity */}
              <div className="dashboard-preview__card">
                <div className="dashboard-preview__card-header">
                  <div>
                    <h3 className="dashboard-preview__card-title">Recent Activity</h3>
                    <p className="dashboard-preview__card-subtitle">Latest updates across all requests</p>
                  </div>
                </div>

                <div className="dashboard-preview__activity">
                  {activity.map((item, index) => (
                    <div key={index} className="dashboard-preview__activity-item">
                      <div className="dashboard-preview__activity-icon">
                        <item.icon size={14} strokeWidth={1.75} />
                      </div>
                      <div className="dashboard-preview__activity-content">
                        <p className="dashboard-preview__activity-text">{item.text}</p>
                        <span className="dashboard-preview__activity-time">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Chart */}
              <div className="dashboard-preview__card">
                <div className="dashboard-preview__card-header">
                  <div>
                    <h3 className="dashboard-preview__card-title">Weekly Maintenance Requests</h3>
                    <p className="dashboard-preview__card-subtitle">Requests received per day</p>
                  </div>
                  <span className="dashboard-preview__card-total">+18.2%</span>
                </div>

                <div className="dashboard-preview__bar-chart">
                  {weeklyData.map((value, index) => (
                    <div key={index} className="dashboard-preview__bar-col">
                      <div className="dashboard-preview__bar-track">
                        <div
                          className="dashboard-preview__bar-fill"
                          style={{ height: `${(value / 100) * 100}%` }}
                        ></div>
                      </div>
                      <span className="dashboard-preview__bar-label">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Chart */}
              <div className="dashboard-preview__card">
                <div className="dashboard-preview__card-header">
                  <div>
                    <h3 className="dashboard-preview__card-title">Monthly Completed Repairs</h3>
                    <p className="dashboard-preview__card-subtitle">Repairs completed per month</p>
                  </div>
                  <span className="dashboard-preview__card-total">+12.4%</span>
                </div>

                <div className="dashboard-preview__line-chart">
                  <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="dashboard-preview__line-svg">
                    <defs>
                      <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,80 C20,75 30,60 50,65 C70,70 80,45 100,50 C120,55 130,35 150,40 C170,45 180,25 200,30 C220,35 230,15 250,20 C270,25 280,10 300,15 L300,100 L0,100 Z"
                      fill="url(#lineFill)"
                    />
                    <path
                      d="M0,80 C20,75 30,60 50,65 C70,70 80,45 100,50 C120,55 130,35 150,40 C170,45 180,25 200,30 C220,35 230,15 250,20 C270,25 280,10 300,15"
                      fill="none"
                      stroke="#0A0A0A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="dashboard-preview__line-labels">
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>May</span>
                    <span>Jul</span>
                    <span>Sep</span>
                    <span>Nov</span>
                  </div>
                </div>
              </div>

              {/* Request Categories */}
              <div className="dashboard-preview__card">
                <div className="dashboard-preview__card-header">
                  <div>
                    <h3 className="dashboard-preview__card-title">Request Categories</h3>
                    <p className="dashboard-preview__card-subtitle">Distribution by category</p>
                  </div>
                </div>

                <div className="dashboard-preview__categories">
                  {categories.map((category) => (
                    <div key={category.label} className="dashboard-preview__category">
                      <div className="dashboard-preview__category-header">
                        <span className="dashboard-preview__category-label">{category.label}</span>
                        <span className="dashboard-preview__category-value">{category.value}%</span>
                      </div>
                      <div className="dashboard-preview__category-track">
                        <div
                          className="dashboard-preview__category-fill"
                          style={{ width: `${category.pct}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technician Performance */}
              <div className="dashboard-preview__card">
                <div className="dashboard-preview__card-header">
                  <div>
                    <h3 className="dashboard-preview__card-title">Technician Performance</h3>
                    <p className="dashboard-preview__card-subtitle">Top performers this month</p>
                  </div>
                </div>

                <div className="dashboard-preview__tech-table">
                  <div className="dashboard-preview__tech-header">
                    <span>Technician</span>
                    <span>Completed</span>
                    <span>Avg Time</span>
                    <span>Score</span>
                  </div>
                  {technicians.map((tech, index) => (
                    <div key={index} className="dashboard-preview__tech-row">
                      <span className="dashboard-preview__tech-name">
                        <span className="dashboard-preview__tech-rank">{index + 1}</span>
                        {tech.name}
                      </span>
                      <span className="dashboard-preview__tech-completed">{tech.completed}</span>
                      <span className="dashboard-preview__tech-time">{tech.avgTime}</span>
                      <span className="dashboard-preview__tech-score">
                        <span className="dashboard-preview__score-bar">
                          <span
                            className="dashboard-preview__score-fill"
                            style={{ width: `${tech.score}%` }}
                          ></span>
                        </span>
                        <span className="dashboard-preview__score-value">{tech.score}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities Overview */}
              <div className="dashboard-preview__card">
                <div className="dashboard-preview__card-header">
                  <div>
                    <h3 className="dashboard-preview__card-title">Facilities Overview</h3>
                    <p className="dashboard-preview__card-subtitle">Status across all facilities</p>
                  </div>
                </div>

                <div className="dashboard-preview__facilities">
                  {facilities.map((facility, index) => (
                    <div key={index} className="dashboard-preview__facility">
                      <div className="dashboard-preview__facility-header">
                        <span className="dashboard-preview__facility-name">
                          <Building2 size={14} strokeWidth={1.75} />
                          {facility.name}
                        </span>
                        <span className="dashboard-preview__facility-rate">{facility.inspection}</span>
                      </div>
                      <div className="dashboard-preview__facility-stats">
                        <div className="dashboard-preview__facility-stat">
                          <span className="dashboard-preview__facility-stat-value">{facility.rooms}</span>
                          <span className="dashboard-preview__facility-stat-label">Rooms</span>
                        </div>
                        <div className="dashboard-preview__facility-stat">
                          <span className="dashboard-preview__facility-stat-value">{facility.pending}</span>
                          <span className="dashboard-preview__facility-stat-label">Pending</span>
                        </div>
                        <div className="dashboard-preview__facility-stat">
                          <span className="dashboard-preview__facility-stat-value dashboard-preview__facility-stat-value--critical">
                            {facility.critical}
                          </span>
                          <span className="dashboard-preview__facility-stat-label">Critical</span>
                        </div>
                        <div className="dashboard-preview__facility-stat">
                          <span className="dashboard-preview__facility-stat-value">{facility.inspection}</span>
                          <span className="dashboard-preview__facility-stat-label">Inspection</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="dashboard-preview__card">
                <div className="dashboard-preview__card-header">
                  <div>
                    <h3 className="dashboard-preview__card-title">Quick Actions</h3>
                    <p className="dashboard-preview__card-subtitle">Common operations</p>
                  </div>
                </div>

                <div className="dashboard-preview__quick-actions">
                  {quickActions.map((action) => (
                    <button key={action.label} className="dashboard-preview__quick-action">
                      <span className="dashboard-preview__quick-action-icon">
                        <action.icon size={16} strokeWidth={1.75} />
                      </span>
                      <span className="dashboard-preview__quick-action-label">{action.label}</span>
                      <ChevronRight size={14} strokeWidth={1.75} className="dashboard-preview__quick-action-chevron" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}

export default DashboardPreview