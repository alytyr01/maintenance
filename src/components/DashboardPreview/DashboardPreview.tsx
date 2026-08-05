import './DashboardPreview.css'

const stats = [
  { label: 'Open Requests', value: '24' },
  { label: 'Resolved Today', value: '12' },
  { label: 'Pending Repairs', value: '8' },
  { label: 'Avg Resolution', value: '2.4h' },
]

const reports = [
  { issue: 'HVAC System - Building A', priority: 'High', status: 'In Progress', assigned: 'John Martinez', progress: 65 },
  { issue: 'Elevator #2 Maintenance', priority: 'Critical', status: 'Pending', assigned: 'Sarah Kim', progress: 0 },
  { issue: 'Parking Lot Lighting', priority: 'Medium', status: 'In Progress', assigned: 'Mike Rodriguez', progress: 40 },
  { issue: 'Restroom Faucet - Floor 2', priority: 'Low', status: 'Completed', assigned: 'Emily Chen', progress: 100 },
  { issue: 'Fire Alarm System Check', priority: 'High', status: 'Pending', assigned: 'David Park', progress: 0 },
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
    case 'Completed': return 'dashboard-preview__status--completed'
    case 'In Progress': return 'dashboard-preview__status--progress'
    case 'Pending': return 'dashboard-preview__status--pending'
    default: return ''
  }
}

const DashboardPreview = () => {
  return (
    <section id="dashboard" className="dashboard-preview section">
      <div className="container">
        <div className="dashboard-preview__header">
          <h2 className="dashboard-preview__title">Powerful analytics at your fingertips</h2>
          <p className="dashboard-preview__description">
            Get real-time insights into your maintenance operations with detailed dashboards and reports.
          </p>
        </div>

        <div className="dashboard-preview__content">
          <div className="dashboard-preview__window">
            <div className="dashboard-preview__window-header">
              <div className="dashboard-preview__window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="dashboard-preview__window-title">Maintena Dashboard</span>
            </div>

            <div className="dashboard-preview__window-body">
              <div className="dashboard-preview__stats">
                {stats.map((stat, index) => (
                  <div key={index} className="dashboard-preview__stat">
                    <span className="dashboard-preview__stat-value">{stat.value}</span>
                    <span className="dashboard-preview__stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="dashboard-preview__table-container">
                <div className="dashboard-preview__table-header">
                  <span>Issue</span>
                  <span>Priority</span>
                  <span>Status</span>
                  <span>Assigned To</span>
                  <span>Progress</span>
                </div>
                {reports.map((report, index) => (
                  <div key={index} className="dashboard-preview__table-row">
                    <span className="dashboard-preview__issue">{report.issue}</span>
                    <span className={`dashboard-preview__priority ${getPriorityClass(report.priority)}`}>
                      {report.priority}
                    </span>
                    <span className={`dashboard-preview__status ${getStatusClass(report.status)}`}>
                      {report.status}
                    </span>
                    <span className="dashboard-preview__assigned">{report.assigned}</span>
                    <div className="dashboard-preview__progress">
                      <div className="dashboard-preview__progress-bar">
                        <div 
                          className="dashboard-preview__progress-fill" 
                          style={{ width: `${report.progress}%` }}
                        />
                      </div>
                      <span className="dashboard-preview__progress-value">{report.progress}%</span>
                    </div>
                  </div>
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