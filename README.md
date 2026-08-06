# Maintena - Maintenance Management Dashboard

A fully functional maintenance management dashboard built with React, TypeScript, and Vite. Manage maintenance requests, work orders, technicians, facilities, reports, notifications, and analytics all in one place.

## Features

### Dashboard
- Live statistics: Open Requests, Completed Today, In Progress, Active Technicians
- Searchable request management table with inline status updates
- Create new maintenance requests with priority selection

### Reports
- Searchable and filterable report table (Monthly, Quarterly, Bi-Annual)
- Report preview modal with key metrics
- CSV export functionality
- Generate new reports with simulated processing

### Work Orders
- Full work order tracking with search and status filters
- Detail view showing description, facility, technician, parts, skills, cost, and notes
- Inline status updates (Scheduled → In Progress → Completed/Cancelled)
- Auto-updates linked request status when work order is completed

### Technicians
- Card-based grid with performance stats (Completed, Avg Time, Score, Assigned)
- Skills tags, contact info, and availability badges
- Add new technicians with form modal
- Assign open requests to available technicians

### Facilities
- Facility management table with status, rooms, pending, critical, and inspection data
- Status dropdown (Operational / Maintenance / Under Inspection)
- Add new facilities with form modal

### Notifications
- Type-specific icons (Alert, Assignment, Repair, Completed, Info)
- Read/unread states with unread count badge
- Filters: All, Unread, Alert, Assignment, Repair, Completed, Info
- Mark all read, clear all, and delete individual notifications

### Analytics
- Recent activity feed (updates in real-time as actions are performed)
- Request categories distribution
- Weekly maintenance requests bar chart
- Monthly completed repairs line chart
- Technician performance leaderboard
- Facilities overview

### Settings
- Push notifications toggle
- Email alerts toggle
- Weekly report toggle
- Auto-assign requests toggle
- Alert threshold slider
- Compact view toggle
- Language selector

### Help Center
- Searchable documentation by category
- Collapsible FAQ accordion
- Support contact card

### User Profile
- Clickable avatar (topbar and sidebar) opens profile modal
- Edit account information (name, role, email, phone, department)
- Change password section with show/hide toggle
- Sign out button

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite 5** - Build tool and dev server
- **lucide-react** - Icon library
- **CSS Custom Properties** - Theming and styling

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

The development server will start at `http://localhost:3000`.

## Project Structure

```
src/
├── components/
│   └── DashboardPreview/
│       ├── DashboardPreview.tsx    # Main dashboard shell with state management
│       ├── DashboardPreview.css    # All dashboard styles
│       ├── AnalyticsView.tsx       # Analytics section
│       ├── ReportsView.tsx         # Reports section
│       ├── WorkOrdersView.tsx      # Work orders section
│       ├── TechniciansView.tsx     # Technicians section
│       ├── FacilitiesView.tsx      # Facilities section
│       ├── NotificationsView.tsx   # Notifications section
│       ├── SettingsView.tsx        # Settings section
│       ├── HelpView.tsx            # Help center section
│       ├── NewRequestModal.tsx     # Create request modal
│       ├── NewWorkOrderModal.tsx   # Create work order modal
│       ├── UserProfileModal.tsx    # User profile modal
│       ├── Modal.tsx               # Reusable modal component
│       └── helpers.ts              # Badge/status helper functions
├── lib/
│   ├── types.ts                    # TypeScript interfaces
│   └── mockData.ts                 # Initial mock data
├── App.tsx                         # Root component
└── main.tsx                        # Entry point
```

## Data Model

The dashboard manages the following entities:

- **RequestItem** - Maintenance requests with issue, location, priority, technician, status
- **Technician** - Team members with skills, availability, and performance metrics
- **Facility** - Buildings with rooms, pending/critical counts, inspection rates
- **WorkOrder** - Scheduled work with linked requests, parts, costs, and status
- **Report** - Generated reports with metrics and export status
- **Notification** - Alerts with type, read state, and timestamps
- **DashboardSettings** - User preferences and notification settings

## State Management

All state is managed locally with React hooks (`useState`, `useMemo`). Actions like creating requests, assigning technicians, updating statuses, and generating reports automatically:

1. Update the relevant data collections
2. Add notifications to the notification center
3. Add activity entries to the analytics feed
4. Show a toast confirmation

## License

Private project - All rights reserved.