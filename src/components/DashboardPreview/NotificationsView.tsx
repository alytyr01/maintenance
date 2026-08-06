import { useState } from 'react'
import { Bell, CheckCheck, Trash2, AlertCircle, UserPlus, Wrench, CheckCircle2, Info } from 'lucide-react'
import { Notification, NotificationType } from '../../lib/types'

interface NotificationsViewProps {
  notifications: Notification[]
  onMarkRead: (id: string) => void
  onMarkAllRead: () => void
  onClearAll: () => void
  onDelete: (id: string) => void
}

const typeIconMap: Record<NotificationType, typeof Bell> = {
  alert: AlertCircle,
  assignment: UserPlus,
  repair: Wrench,
  completed: CheckCircle2,
  info: Info,
}

const NotificationsView = ({ notifications, onMarkRead, onMarkAllRead, onClearAll, onDelete }: NotificationsViewProps) => {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Unread', 'Alert', 'Assignment', 'Repair', 'Completed', 'Info']

  const filtered = notifications.filter((n) => {
    if (filter === 'All') return true
    if (filter === 'Unread') return !n.read
    return n.type === filter.toLowerCase()
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <>
      <div className="dashboard-preview__view-header">
        <div>
          <h3 className="dashboard-preview__card-title">Notifications</h3>
          <p className="dashboard-preview__card-subtitle">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'You are all caught up'}
          </p>
        </div>
        <div className="dashboard-preview__view-header-actions">
          <button className="dashboard-preview__btn" onClick={onMarkAllRead}>
            <CheckCheck size={14} strokeWidth={2} />
            Mark All Read
          </button>
          <button className="dashboard-preview__btn" onClick={onClearAll}>
            <Trash2 size={14} strokeWidth={2} />
            Clear All
          </button>
        </div>
      </div>

      <div className="dashboard-preview__toolbar">
        <div className="dashboard-preview__toolbar-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`dashboard-preview__filter-btn${filter === f ? ' dashboard-preview__filter-btn--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-preview__card">
        <div className="dashboard-preview__notifications-list">
          {filtered.length === 0 && (
            <div className="dashboard-preview__empty-state">No notifications found</div>
          )}
          {filtered.map((notification) => {
            const Icon = typeIconMap[notification.type]
            return (
              <div
                key={notification.id}
                className={`dashboard-preview__notification-item${notification.read ? ' dashboard-preview__notification-item--read' : ''}`}
                onClick={() => !notification.read && onMarkRead(notification.id)}
                role="button"
                tabIndex={0}
              >
                <div className={`dashboard-preview__notification-icon dashboard-preview__notification-icon--${notification.type}`}>
                  <Icon size={16} strokeWidth={1.75} />
                </div>
                <div className="dashboard-preview__notification-content">
                  <div className="dashboard-preview__notification-header">
                    <span className="dashboard-preview__notification-title">{notification.title}</span>
                    {!notification.read && <span className="dashboard-preview__notification-unread-dot"></span>}
                  </div>
                  <p className="dashboard-preview__notification-message">{notification.message}</p>
                  <span className="dashboard-preview__notification-time">{notification.time}</span>
                </div>
                <button
                  className="dashboard-preview__notification-delete"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(notification.id)
                  }}
                  aria-label="Delete notification"
                >
                  <Trash2 size={14} strokeWidth={1.75} />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default NotificationsView