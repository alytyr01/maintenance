import { X } from 'lucide-react'

interface ModalProps {
  title: string
  subtitle?: string
  onClose: () => void
  children: React.ReactNode
  wide?: boolean
}

const Modal = ({ title, subtitle, onClose, children, wide }: ModalProps) => {
  return (
    <div className="dashboard-preview__modal-overlay" onClick={onClose}>
      <div
        className={`dashboard-preview__modal${wide ? ' dashboard-preview__modal--wide' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dashboard-preview__modal-header">
          <div>
            <h3 className="dashboard-preview__modal-title">{title}</h3>
            {subtitle && <p className="dashboard-preview__modal-subtitle">{subtitle}</p>}
          </div>
          <button className="dashboard-preview__modal-close" onClick={onClose} aria-label="Close">
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal