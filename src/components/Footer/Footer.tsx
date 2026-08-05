import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              <svg className="footer__logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#0A0A0A"/>
                <path d="M8 16 L14 10 L20 16 L14 22 Z" fill="#FFFFFF"/>
                <circle cx="22" cy="10" r="3" fill="#FFFFFF"/>
              </svg>
              <span className="footer__logo-text">Maintena</span>
            </a>
            <p className="footer__tagline">
              Modern maintenance reporting for organizations that care about their facilities.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h4 className="footer__column-title">Product</h4>
              <a href="#features" className="footer__link">Features</a>
              <a href="#workflow" className="footer__link">Workflow</a>
              <a href="#dashboard" className="footer__link">Analytics</a>
              <a href="#pricing" className="footer__link">Pricing</a>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Company</h4>
              <a href="#about" className="footer__link">About</a>
              <a href="#blog" className="footer__link">Blog</a>
              <a href="#careers" className="footer__link">Careers</a>
              <a href="#contact" className="footer__link">Contact</a>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Legal</h4>
              <a href="#privacy" className="footer__link">Privacy</a>
              <a href="#terms" className="footer__link">Terms</a>
              <a href="#security" className="footer__link">Security</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Maintena. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer