import { useState, useEffect, FormEvent } from 'react'
import { X, CheckCircle2 } from 'lucide-react'
import './RequestDemoModal.css'

interface RequestDemoModalProps {
  open: boolean
  onClose: () => void
}

const RequestDemoModal = ({ open, onClose }: RequestDemoModalProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [lastOpen, setLastOpen] = useState(open)

  if (open !== lastOpen) {
    setLastOpen(open)
    if (!open) {
      setName('')
      setEmail('')
      setCompany('')
      setSubmitted(false)
      setError('')
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }
  }, [open, onClose])

  if (!open) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !company.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <div className="demo-modal" role="dialog" aria-modal="true" aria-label="Request a demo" onClick={onClose}>
      <div className="demo-modal__dialog" onClick={(e) => e.stopPropagation()}>
        <button className="demo-modal__close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div className="demo-modal__header">
              <h2 className="demo-modal__title">Request a Demo</h2>
              <p className="demo-modal__subtitle">
                See how Maintena streamlines your maintenance workflow. Our team will reach out within one business day.
              </p>
            </div>

            <form className="demo-modal__form" onSubmit={handleSubmit} noValidate>
              <div className="demo-modal__field">
                <label className="demo-modal__label" htmlFor="demo-name">Full Name</label>
                <input
                  id="demo-name"
                  className="demo-modal__input"
                  type="text"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <div className="demo-modal__field">
                <label className="demo-modal__label" htmlFor="demo-email">Work Email</label>
                <input
                  id="demo-email"
                  className="demo-modal__input"
                  type="email"
                  placeholder="jane@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="demo-modal__field">
                <label className="demo-modal__label" htmlFor="demo-company">Company</label>
                <input
                  id="demo-company"
                  className="demo-modal__input"
                  type="text"
                  placeholder="Acme Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  autoComplete="organization"
                />
              </div>

              {error && <p className="demo-modal__error">{error}</p>}

              <button type="submit" className="btn btn-primary demo-modal__submit">
                Request Demo
              </button>
            </form>
          </>
        ) : (
          <div className="demo-modal__success">
            <CheckCircle2 size={48} className="demo-modal__success-icon" />
            <h2 className="demo-modal__title">Request Received!</h2>
            <p className="demo-modal__success-text">
              Thanks, {name || 'friend'}! We'll contact you at <strong>{email}</strong> to schedule your personalized demo.
            </p>
            <button className="btn btn-primary demo-modal__submit" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default RequestDemoModal