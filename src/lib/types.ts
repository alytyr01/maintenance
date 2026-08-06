export type Priority = 'Critical' | 'High' | 'Medium' | 'Low'
export type RequestStatus = 'Open' | 'Assigned' | 'In Progress' | 'Completed' | 'Verified'
export type WorkOrderStatus = 'Draft' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled'
export type NotificationType = 'alert' | 'assignment' | 'repair' | 'completed' | 'info'
export type Role = 'Admin' | 'Manager' | 'Technician' | 'Viewer'

export interface RequestItem {
  id: string
  issue: string
  location: string
  building: string
  priority: Priority
  technician: string
  status: RequestStatus
  date: string
  category: string
  description: string
  reportedBy: string
}

export interface Technician {
  id: string
  name: string
  role: string
  email: string
  phone: string
  completed: number
  avgTime: string
  score: number
  availability: 'Available' | 'On Job' | 'Off Duty'
  skills: string[]
  assigned: number
}

export interface Facility {
  id: string
  name: string
  rooms: number
  pending: number
  critical: number
  inspection: string
  location: string
  manager: string
  status: 'Operational' | 'Maintenance' | 'Under Inspection'
}

export interface WorkOrder {
  id: string
  requestId: string
  title: string
  description: string
  facility: string
  technician: string
  status: WorkOrderStatus
  category: string
  priority: Priority
  scheduledDate: string
  completionDate?: string
  partsRequired: string[]
  cost: number
  notes: string
}

export interface Report {
  id: string
  title: string
  type: string
  period: string
  status: 'Ready' | 'Generating'
  date: string
  size: string
  data: {
    totalRequests: number
    completed: number
    open: number
    avgResolution: string
    satisfaction: number
  }
}

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  time: string
  read: boolean
}

export interface DashboardSettings {
  notifications: boolean
  emailAlerts: boolean
  weeklyReport: boolean
  autoAssign: boolean
  alertThreshold: number
  darkMode: boolean
  compactView: boolean
  language: string
}

export interface ActivityItem {
  id: string
  time: string
  type: NotificationType
  text: string
}

export type ViewKey =
  | 'Dashboard'
  | 'Reports'
  | 'Work Orders'
  | 'Technicians'
  | 'Facilities'
  | 'Notifications'
  | 'Analytics'
  | 'Settings'
  | 'Help Center'