import { useState } from 'react'
import { FileText, Download, Plus, Search, Filter, Loader } from 'lucide-react'
import { Report } from '../../lib/types'
import Modal from './Modal'

interface ReportsViewProps {
  reports: Report[]
  onCreateReport: () => void
  onExportReport: (id: string) => void
}

const ReportsView = ({ reports, onCreateReport, onExportReport }: ReportsViewProps) => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [previewReport, setPreviewReport] = useState<Report | null>(null)

  const types = ['All', 'Monthly', 'Quarterly', 'Bi-Annual']

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'All' || report.type === filter
    return matchesSearch && matchesFilter
  })

  return (
    <>
      <div className="dashboard-preview__view-header">
        <div>
          <h3 className="dashboard-preview__card-title">Reports</h3>
          <p className="dashboard-preview__card-subtitle">Generate, view, and export maintenance reports</p>
        </div>
        <div className="dashboard-preview__view-header-actions">
          <button className="dashboard-preview__btn dashboard-preview__btn--primary" onClick={onCreateReport}>
            <Plus size={14} strokeWidth={2} />
            New Report
          </button>
        </div>
      </div>

      <div className="dashboard-preview__toolbar">
        <div className="dashboard-preview__toolbar-search">
          <Search size={14} strokeWidth={1.75} />
          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="dashboard-preview__toolbar-filters">
          {types.map((type) => (
            <button
              key={type}
              className={`dashboard-preview__filter-btn${filter === type ? ' dashboard-preview__filter-btn--active' : ''}`}
              onClick={() => setFilter(type)}
            >
              <Filter size={12} strokeWidth={1.75} />
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-preview__card dashboard-preview__card--table">
        <div className="dashboard-preview__reports-table">
          <div className="dashboard-preview__reports-header">
            <span>Report</span>
            <span>Type</span>
            <span>Period</span>
            <span>Status</span>
            <span>Generated</span>
            <span>Size</span>
            <span></span>
          </div>
          {filteredReports.map((report) => (
            <div key={report.id} className="dashboard-preview__reports-row">
              <span className="dashboard-preview__reports-title">
                <span className="dashboard-preview__reports-icon">
                  <FileText size={14} strokeWidth={1.75} />
                </span>
                {report.title}
              </span>
              <span className="dashboard-preview__reports-type">{report.type}</span>
              <span className="dashboard-preview__reports-period">{report.period}</span>
              <span>
                <span className={`dashboard-preview__badge ${report.status === 'Ready' ? 'dashboard-preview__status--completed' : 'dashboard-preview__status--progress'}`}>
                  {report.status === 'Ready' ? <><FileText size={10} strokeWidth={2} /> {report.status}</> : <><Loader size={10} strokeWidth={2} /> {report.status}</>}
                </span>
              </span>
              <span className="dashboard-preview__reports-date">{report.date}</span>
              <span className="dashboard-preview__reports-size">{report.size}</span>
              <span className="dashboard-preview__reports-actions">
                <button
                  className="dashboard-preview__btn dashboard-preview__btn--sm"
                  onClick={() => setPreviewReport(report)}
                >
                  Preview
                </button>
                <button
                  className="dashboard-preview__btn dashboard-preview__btn--sm dashboard-preview__btn--icon"
                  onClick={() => onExportReport(report.id)}
                  aria-label="Export report"
                >
                  <Download size={14} strokeWidth={1.75} />
                </button>
              </span>
            </div>
          ))}
          {filteredReports.length === 0 && (
            <div className="dashboard-preview__empty-state">No reports found</div>
          )}
        </div>
      </div>

      {previewReport && (
        <Modal
          title={previewReport.title}
          subtitle={`${previewReport.type} Report · ${previewReport.period}`}
          onClose={() => setPreviewReport(null)}
          wide
        >
          <div className="dashboard-preview__report-preview">
            <div className="dashboard-preview__report-metrics">
              <div className="dashboard-preview__report-metric">
                <span className="dashboard-preview__report-metric-label">Total Requests</span>
                <span className="dashboard-preview__report-metric-value">{previewReport.data.totalRequests}</span>
              </div>
              <div className="dashboard-preview__report-metric">
                <span className="dashboard-preview__report-metric-label">Completed</span>
                <span className="dashboard-preview__report-metric-value">{previewReport.data.completed}</span>
              </div>
              <div className="dashboard-preview__report-metric">
                <span className="dashboard-preview__report-metric-label">Open</span>
                <span className="dashboard-preview__report-metric-value">{previewReport.data.open}</span>
              </div>
              <div className="dashboard-preview__report-metric">
                <span className="dashboard-preview__report-metric-label">Avg Resolution</span>
                <span className="dashboard-preview__report-metric-value">{previewReport.data.avgResolution}</span>
              </div>
              <div className="dashboard-preview__report-metric">
                <span className="dashboard-preview__report-metric-label">Satisfaction</span>
                <span className="dashboard-preview__report-metric-value">{previewReport.data.satisfaction} / 5</span>
              </div>
            </div>
            <div className="dashboard-preview__report-preview-actions">
              <button
                className="dashboard-preview__btn dashboard-preview__btn--primary"
                onClick={() => onExportReport(previewReport.id)}
              >
                <Download size={14} strokeWidth={2} />
                Export Report
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default ReportsView