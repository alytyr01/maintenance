import {
  AlertCircle,
  UserPlus,
  Wrench,
  CheckCircle2,
  Building2,
  ClipboardList,
  Plus,
  FileBarChart,
  Download,
  ChevronRight,
} from 'lucide-react'
import { ActivityItem, Technician, Facility } from '../../lib/types'

interface AnalyticsViewProps {
  activity: ActivityItem[]
  technicians: Technician[]
  facilities: Facility[]
}

const AnalyticsView = ({ activity, technicians, facilities }: AnalyticsViewProps) => {
  const weeklyData = [42, 58, 45, 72, 65, 88, 76]

  const categories = [
    { label: 'HVAC', value: 32, pct: 32 },
    { label: 'Plumbing', value: 24, pct: 24 },
    { label: 'Electrical', value: 18, pct: 18 },
    { label: 'Structural', value: 14, pct: 14 },
    { label: 'Other', value: 12, pct: 12 },
  ]

  const quickActions = [
    { icon: Plus, label: 'New Report' },
    { icon: UserPlus, label: 'Assign Technician' },
    { icon: ClipboardList, label: 'Create Work Order' },
    { icon: FileBarChart, label: 'Generate Report' },
    { icon: Download, label: 'Export Analytics' },
  ]

  return (
    <>
      <div className="dashboard-preview__view-header">
        <div>
          <h3 className="dashboard-preview__card-title">Analytics</h3>
          <p className="dashboard-preview__card-subtitle">Performance insights and activity across all facilities</p>
        </div>
      </div>

      <div className="dashboard-preview__view">
        <div className="dashboard-preview__grid">
          {/* Recent Activity */}
          <div className="dashboard-preview__card">
            <div className="dashboard-preview__card-header">
              <div>
                <h3 className="dashboard-preview__card-title">Recent Activity</h3>
                <p className="dashboard-preview__card-subtitle">Latest updates across all requests</p>
              </div>
            </div>

            <div className="dashboard-preview__activity">
              {activity.slice(0, 6).map((item) => (
                <div key={item.id} className="dashboard-preview__activity-item">
                  <div className="dashboard-preview__activity-icon">
                    {item.type === 'alert' && <AlertCircle size={14} strokeWidth={1.75} />}
                    {item.type === 'assignment' && <UserPlus size={14} strokeWidth={1.75} />}
                    {item.type === 'repair' && <Wrench size={14} strokeWidth={1.75} />}
                    {item.type === 'completed' && <CheckCircle2 size={14} strokeWidth={1.75} />}
                    {item.type === 'info' && <FileBarChart size={14} strokeWidth={1.75} />}
                  </div>
                  <div className="dashboard-preview__activity-content">
                    <p className="dashboard-preview__activity-text">{item.text}</p>
                    <span className="dashboard-preview__activity-time">{item.time}</span>
                  </div>
                </div>
              ))}
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
              {technicians.slice(0, 5).map((tech, index) => (
                <div key={tech.id} className="dashboard-preview__tech-row">
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
              {facilities.slice(0, 4).map((facility) => (
                <div key={facility.id} className="dashboard-preview__facility">
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
    </>
  )
}

export default AnalyticsView