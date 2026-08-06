import {
  RequestItem,
  Technician,
  Facility,
  WorkOrder,
  Report,
  Notification,
  DashboardSettings,
  ActivityItem,
} from './types'

export const initialRequests: RequestItem[] = [
  { id: 'REQ-1001', issue: 'Water Leak', location: 'Building A · Floor 2', building: 'Building A', priority: 'Critical', technician: 'John Martinez', status: 'In Progress', date: 'Aug 5, 2026', category: 'Plumbing', description: 'Water leaking from ceiling tiles in hallway, potential electrical hazard.', reportedBy: 'Facility Manager' },
  { id: 'REQ-1002', issue: 'Room AC Failure', location: 'Building B · Room 214', building: 'Building B', priority: 'High', technician: 'Sarah Kim', status: 'Assigned', date: 'Aug 5, 2026', category: 'HVAC', description: 'Air conditioning unit not cooling, room temperature at 29°C.', reportedBy: 'Office Staff' },
  { id: 'REQ-1003', issue: 'Broken Window', location: 'Building A · Floor 1', building: 'Building A', priority: 'Medium', technician: 'Mike Rodriguez', status: 'Open', date: 'Aug 4, 2026', category: 'Structural', description: 'Window glass cracked, needs replacement.', reportedBy: 'Security' },
  { id: 'REQ-1004', issue: 'Electrical Outlet', location: 'Building C · Room 108', building: 'Building C', priority: 'High', technician: 'Emily Chen', status: 'In Progress', date: 'Aug 4, 2026', category: 'Electrical', description: 'Outlet sparking when plugging in equipment.', reportedBy: 'Office Staff' },
  { id: 'REQ-1005', issue: 'Ceiling Damage', location: 'Building B · Floor 3', building: 'Building B', priority: 'Medium', technician: 'Mike Rodriguez', status: 'Completed', date: 'Aug 3, 2026', category: 'Structural', description: 'Water stain and cracks in ceiling tiles.', reportedBy: 'Facility Manager' },
  { id: 'REQ-1006', issue: 'Broken Elevator', location: 'Building A · Lobby', building: 'Building A', priority: 'Critical', technician: 'James Wilson', status: 'In Progress', date: 'Aug 3, 2026', category: 'Mechanical', description: 'Elevator 2 stuck between floors, requires immediate attention.', reportedBy: 'Security' },
  { id: 'REQ-1007', issue: 'Bathroom Fixture', location: 'Building C · Floor 1', building: 'Building C', priority: 'Low', technician: 'Unassigned', status: 'Open', date: 'Aug 2, 2026', category: 'Plumbing', description: 'Toilet running continuously, high water usage.', reportedBy: 'Office Staff' },
  { id: 'REQ-1008', issue: 'Lighting Failure', location: 'Building A · Floor 4', building: 'Building A', priority: 'Medium', technician: 'Emily Chen', status: 'Assigned', date: 'Aug 2, 2026', category: 'Electrical', description: 'Multiple fluorescent lights flickering in corridor.', reportedBy: 'Office Staff' },
  { id: 'REQ-1009', issue: 'Door Lock Issue', location: 'Building B · Room 101', building: 'Building B', priority: 'Low', technician: 'Unassigned', status: 'Open', date: 'Aug 1, 2026', category: 'Structural', description: 'Conference room door lock is jammed.', reportedBy: 'Facility Manager' },
  { id: 'REQ-1010', issue: 'Fire Alarm Test', location: 'Building A · All Floors', building: 'Building A', priority: 'High', technician: 'John Martinez', status: 'Completed', date: 'Jul 31, 2026', category: 'Safety', description: 'Quarterly fire alarm system test and maintenance.', reportedBy: 'Safety Officer' },
  { id: 'REQ-1011', issue: 'Water Pressure Low', location: 'Building B · Floor 2', building: 'Building B', priority: 'Medium', technician: 'Sarah Kim', status: 'In Progress', date: 'Jul 31, 2026', category: 'Plumbing', description: 'Low water pressure in restrooms.', reportedBy: 'Office Staff' },
  { id: 'REQ-1012', issue: 'Server Room Cooling', location: 'Building A · Basement', building: 'Building A', priority: 'Critical', technician: 'James Wilson', status: 'Completed', date: 'Jul 30, 2026', category: 'HVAC', description: 'Server room AC unit overheating, emergency repair.', reportedBy: 'IT Department' },
]

export const initialTechnicians: Technician[] = [
  { id: 'TEC-01', name: 'John Martinez', role: 'Senior Technician', email: 'john.m@maintena.com', phone: '(555) 010-1001', completed: 48, avgTime: '2.1h', score: 98, availability: 'On Job', skills: ['Plumbing', 'HVAC', 'Mechanical'], assigned: 2 },
  { id: 'TEC-02', name: 'Sarah Kim', role: 'Technician', email: 'sarah.k@maintena.com', phone: '(555) 010-1002', completed: 42, avgTime: '2.6h', score: 95, availability: 'On Job', skills: ['HVAC', 'Plumbing'], assigned: 2 },
  { id: 'TEC-03', name: 'Mike Rodriguez', role: 'Technician', email: 'mike.r@maintena.com', phone: '(555) 010-1003', completed: 38, avgTime: '3.2h', score: 91, availability: 'Available', skills: ['Structural', 'Carpentry', 'Painting'], assigned: 1 },
  { id: 'TEC-04', name: 'Emily Chen', role: 'Technician', email: 'emily.c@maintena.com', phone: '(555) 010-1004', completed: 35, avgTime: '2.9h', score: 93, availability: 'On Job', skills: ['Electrical', 'Electronics'], assigned: 2 },
  { id: 'TEC-05', name: 'James Wilson', role: 'Senior Technician', email: 'james.w@maintena.com', phone: '(555) 010-1005', completed: 52, avgTime: '1.9h', score: 97, availability: 'On Job', skills: ['Mechanical', 'HVAC', 'Electrical'], assigned: 2 },
  { id: 'TEC-06', name: 'Lisa Patel', role: 'Technician', email: 'lisa.p@maintena.com', phone: '(555) 010-1006', completed: 29, avgTime: '3.5h', score: 88, availability: 'Off Duty', skills: ['Plumbing', 'Structural'], assigned: 0 },
  { id: 'TEC-07', name: 'David Chen', role: 'Technician', email: 'david.c@maintena.com', phone: '(555) 010-1007', completed: 31, avgTime: '3.0h', score: 90, availability: 'Available', skills: ['HVAC', 'Mechanical'], assigned: 0 },
  { id: 'TEC-08', name: 'Maria Garcia', role: 'Technician', email: 'maria.g@maintena.com', phone: '(555) 010-1008', completed: 26, avgTime: '3.8h', score: 86, availability: 'Available', skills: ['Electrical', 'Safety'], assigned: 0 },
]

export const initialFacilities: Facility[] = [
  { id: 'FAC-01', name: 'Building A', rooms: 120, pending: 8, critical: 2, inspection: '92%', location: 'Main Campus, 1200 Tech Blvd', manager: 'Alex Kim', status: 'Operational' },
  { id: 'FAC-02', name: 'Building B', rooms: 96, pending: 5, critical: 1, inspection: '88%', location: 'Main Campus, 1240 Tech Blvd', manager: 'Sarah Connor', status: 'Maintenance' },
  { id: 'FAC-03', name: 'Building C', rooms: 64, pending: 3, critical: 0, inspection: '95%', location: 'West Campus, 2300 Innovation Dr', manager: 'Robert Lee', status: 'Operational' },
  { id: 'FAC-04', name: 'Parking Garage', rooms: 0, pending: 2, critical: 1, inspection: '85%', location: 'Main Campus, Park Level 1', manager: 'Alex Kim', status: 'Under Inspection' },
  { id: 'FAC-05', name: 'Warehouse', rooms: 8, pending: 1, critical: 0, inspection: '98%', location: 'East Campus, 500 Supply Rd', manager: 'Jenna Brooks', status: 'Operational' },
]

export const initialWorkOrders: WorkOrder[] = [
  { id: 'WO-2001', requestId: 'REQ-1001', title: 'Water Leak Repair - Building A Floor 2', description: 'Locate leak source and repair pipe. Replace damaged ceiling tiles.', facility: 'Building A', technician: 'John Martinez', status: 'In Progress', category: 'Plumbing', priority: 'Critical', scheduledDate: 'Aug 5, 2026', partsRequired: ['Pipe fittings', 'Ceiling tiles'], cost: 450, notes: 'Possible source from HVAC condensate line.' },
  { id: 'WO-2002', requestId: 'REQ-1002', title: 'AC Unit Replacement - Room 214', description: 'Replace faulty AC unit compressor and recharge refrigerant.', facility: 'Building B', technician: 'Sarah Kim', status: 'Scheduled', category: 'HVAC', priority: 'High', scheduledDate: 'Aug 6, 2026', partsRequired: ['Compressor', 'Refrigerant R-410A'], cost: 1200, notes: 'Ordered compressor - arriving tomorrow.' },
  { id: 'WO-2003', requestId: 'REQ-1004', title: 'Rewire Electrical Outlet - Room 108', description: 'Replace damaged outlet and check wiring for safety.', facility: 'Building C', technician: 'Emily Chen', status: 'In Progress', category: 'Electrical', priority: 'High', scheduledDate: 'Aug 5, 2026', partsRequired: ['GFCI outlet', 'Wire nuts'], cost: 180, notes: 'Isolate circuit before work.' },
  { id: 'WO-2004', requestId: 'REQ-1006', title: 'Elevator Repair - Building A Lobby', description: 'Inspect hydraulic system and replace worn seals.', facility: 'Building A', technician: 'James Wilson', status: 'In Progress', category: 'Mechanical', priority: 'Critical', scheduledDate: 'Aug 5, 2026', partsRequired: ['Hydraulic seals', 'Hydraulic oil'], cost: 2500, notes: 'Contract elevator service to inspect safety brakes.' },
  { id: 'WO-2005', requestId: 'REQ-1005', title: 'Ceiling Repair - Building B Floor 3', description: 'Replace damaged ceiling tiles and fix water stain.', facility: 'Building B', technician: 'Mike Rodriguez', status: 'Completed', category: 'Structural', priority: 'Medium', scheduledDate: 'Aug 3, 2026', completionDate: 'Aug 4, 2026', partsRequired: ['Ceiling tiles', 'Patching compound'], cost: 320, notes: 'Repaired leak from roof - need follow-up inspection.' },
  { id: 'WO-2006', requestId: 'REQ-1010', title: 'Fire Alarm System Maintenance', description: 'Test all fire alarm panels and replace expired detectors.', facility: 'Building A', technician: 'John Martinez', status: 'Completed', category: 'Safety', priority: 'High', scheduledDate: 'Jul 31, 2026', completionDate: 'Jul 31, 2026', partsRequired: ['Smoke detectors', 'Batteries'], cost: 890, notes: 'All systems operational. Report filed.' },
]

export const initialReports: Report[] = [
  { id: 'RPT-3001', title: 'Monthly Maintenance Overview', type: 'Monthly', period: 'Jul 2026', status: 'Ready', date: 'Jul 31, 2026', size: '2.4 MB', data: { totalRequests: 156, completed: 132, open: 24, avgResolution: '3.4h', satisfaction: 4.7 } },
  { id: 'RPT-3002', title: 'Facility Performance Report', type: 'Quarterly', period: 'Q2 2026', status: 'Ready', date: 'Jun 30, 2026', size: '4.1 MB', data: { totalRequests: 412, completed: 368, open: 44, avgResolution: '3.1h', satisfaction: 4.5 } },
  { id: 'RPT-3003', title: 'Technician Productivity', type: 'Monthly', period: 'Jul 2026', status: 'Ready', date: 'Jul 28, 2026', size: '1.8 MB', data: { totalRequests: 156, completed: 132, open: 24, avgResolution: '3.4h', satisfaction: 4.7 } },
  { id: 'RPT-3004', title: 'Cost & Budget Analysis', type: 'Quarterly', period: 'Q2 2026', status: 'Generating', date: 'In Progress', size: '--', data: { totalRequests: 412, completed: 368, open: 44, avgResolution: '3.1h', satisfaction: 4.5 } },
  { id: 'RPT-3005', title: 'Preventive Maintenance Plan', type: 'Bi-Annual', period: 'H1 2026', status: 'Ready', date: 'Jun 15, 2026', size: '3.2 MB', data: { totalRequests: 268, completed: 245, open: 23, avgResolution: '2.8h', satisfaction: 4.8 } },
  { id: 'RPT-3006', title: 'Safety & Compliance Report', type: 'Quarterly', period: 'Q2 2026', status: 'Ready', date: 'Jun 28, 2026', size: '5.7 MB', data: { totalRequests: 89, completed: 85, open: 4, avgResolution: '2.2h', satisfaction: 4.9 } },
]

export const initialNotifications: Notification[] = [
  { id: 'NOT-01', type: 'alert', title: 'Critical: Water Leak', message: 'Water leak reported in Building A · Floor 2. Need immediate response.', time: '2m ago', read: false },
  { id: 'NOT-02', type: 'assignment', title: 'Technician Assigned', message: 'Sarah Kim assigned to REQ-1002: Room AC Failure in Building B.', time: '18m ago', read: false },
  { id: 'NOT-03', type: 'repair', title: 'Repair Started', message: 'John Martinez started repair on Water Leak · Building A.', time: '1h ago', read: false },
  { id: 'NOT-04', type: 'completed', title: 'Repair Completed', message: 'Ceiling Damage repair completed in Building B · Floor 3.', time: '3h ago', read: false },
  { id: 'NOT-05', type: 'info', title: 'Inspection Due', message: 'Building B inspection due in 5 days. Schedule now.', time: '5h ago', read: true },
  { id: 'NOT-06', type: 'alert', title: 'Elevator Issue', message: 'Elevator 2 in Building A is out of service. Maintenance in progress.', time: '6h ago', read: true },
  { id: 'NOT-07', type: 'assignment', title: 'New Request', message: 'New request REQ-1003: Broken Window in Building A · Floor 1.', time: '1d ago', read: true },
  { id: 'NOT-08', type: 'info', title: 'Parts Order Shipped', message: 'Compressor for REQ-1002 shipped. ETA: Aug 6, 2026.', time: '1d ago', read: true },
]

export const initialSettings: DashboardSettings = {
  notifications: true,
  emailAlerts: true,
  weeklyReport: true,
  autoAssign: true,
  alertThreshold: 80,
  darkMode: false,
  compactView: false,
  language: 'English',
}

export const initialActivity: ActivityItem[] = [
  { id: 'ACT-01', time: '2m ago', type: 'alert', text: 'Water leak reported in Building A · Floor 2' },
  { id: 'ACT-02', time: '18m ago', type: 'assignment', text: 'Sarah Kim assigned to Room AC Failure' },
  { id: 'ACT-03', time: '1h ago', type: 'repair', text: 'Repair started on Electrical Outlet · Building C' },
  { id: 'ACT-04', time: '3h ago', type: 'completed', text: 'Repair completed for Ceiling Damage · Building B' },
]

export const weeklyData = [42, 58, 45, 72, 65, 88, 76]

export const categories = [
  { label: 'HVAC', value: 32, pct: 32 },
  { label: 'Plumbing', value: 24, pct: 24 },
  { label: 'Electrical', value: 18, pct: 18 },
  { label: 'Structural', value: 14, pct: 14 },
  { label: 'Other', value: 12, pct: 12 },
]

export const helpArticles = [
  { id: 'HLP-01', category: 'Getting Started', title: 'How to submit a maintenance request', description: 'Learn how to create and submit a maintenance request through the dashboard in under a minute.', views: 1240 },
  { id: 'HLP-02', category: 'Work Orders', title: 'Understanding work order statuses', description: 'A guide to all work order statuses and what each one means for your team.', views: 980 },
  { id: 'HLP-03', category: 'Technicians', title: 'Assigning technicians to requests', description: 'Best practices for assigning the right technician based on skills and availability.', views: 756 },
  { id: 'HLP-04', category: 'Reports', title: 'Generating and exporting reports', description: 'How to create detailed maintenance reports and export them to CSV or PDF.', views: 645 },
  { id: 'HLP-05', category: 'Facilities', title: 'Managing facility inspection schedules', description: 'Set up and manage recurring inspections for all your facilities.', views: 512 },
  { id: 'HLP-06', category: 'Settings', title: 'Configuring notification preferences', description: 'Control which notifications your team receives for maintenance events.', views: 431 },
]

export const faqs = [
  { question: 'How quickly will my request be addressed?', answer: 'Critical requests are addressed within 30 minutes. High priority within 2 hours, medium within 24 hours, and low priority within 72 hours.' },
  { question: 'Can I track the status of my request?', answer: 'Yes, the Request Management table on the Dashboard shows real-time status for all requests. You can also check Work Orders for detailed progress.' },
  { question: 'How do I add a new technician to the team?', answer: 'Navigate to the Technicians section and click "Add Technician" to create a new member. You will need their name, contact info, and skills.' },
  { question: 'What should I do for after-hours emergencies?', answer: 'For after-hours emergencies, call the emergency maintenance line directly. Critical issues are prioritized 24/7.' },
]
