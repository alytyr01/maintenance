import { useState, useEffect } from 'react'
import './Navbar.css'

interface NavbarProps {
  onRequestDemo: () => void
  onViewDashboard: () => void
}

const Navbar = ({ onRequestDemo, onViewDashboard }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container container">
        <a href="/" className="navbar__logo">
          <svg className="navbar__logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#0A0A0A"/>
            <path d="M8 16 L14 10 L20 16 L14 22 Z" fill="#FFFFFF"/>
            <circle cx="22" cy="10" r="3" fill="#FFFFFF"/>
          </svg>
          <span className="navbar__logo-text">Maintena</span>
        </a>

        <div className="navbar__links">
          <a href="#features" className="navbar__link">Features</a>
          <a href="#workflow" className="navbar__link">Workflow</a>
          <button type="button" className="navbar__link navbar__link--btn" onClick={onViewDashboard}>Analytics</button>
          <a href="#about" className="navbar__link">About</a>
          <a href="#contact" className="navbar__link">Contact</a>
        </div>

        <button type="button" className="btn btn-primary navbar__cta" onClick={onRequestDemo}>
          Request Demo
        </button>

        <button className="navbar__mobile-toggle" aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar