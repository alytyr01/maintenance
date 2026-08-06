export const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'Critical': return 'dashboard-preview__priority--critical'
    case 'High': return 'dashboard-preview__priority--high'
    case 'Medium': return 'dashboard-preview__priority--medium'
    case 'Low': return 'dashboard-preview__priority--low'
    default: return ''
  }
}

export const getStatusClass = (status: string) => {
  switch (status) {
    case 'Open': return 'dashboard-preview__status--open'
    case 'Assigned': return 'dashboard-preview__status--assigned'
    case 'In Progress': return 'dashboard-preview__status--progress'
    case 'Completed': return 'dashboard-preview__status--completed'
    case 'Verified': return 'dashboard-preview__status--verified'
    case 'Draft': return 'dashboard-preview__status--draft'
    case 'Scheduled': return 'dashboard-preview__status--scheduled'
    case 'Cancelled': return 'dashboard-preview__status--cancelled'
    default: return ''
  }
}

export const getAvailabilityClass = (availability: string) => {
  switch (availability) {
    case 'Available': return 'dashboard-preview__availability--available'
    case 'On Job': return 'dashboard-preview__availability--onjob'
    case 'Off Duty': return 'dashboard-preview__availability--offduty'
    default: return ''
  }
}

export const getFacilityStatusClass = (status: string) => {
  switch (status) {
    case 'Operational': return 'dashboard-preview__facility-status--operational'
    case 'Maintenance': return 'dashboard-preview__facility-status--maintenance'
    case 'Under Inspection': return 'dashboard-preview__facility-status--inspection'
    default: return ''
  }
}