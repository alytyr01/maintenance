import './CTA.css'

interface CTAProps {
  onRequestDemo: () => void
}

const CTA = ({ onRequestDemo }: CTAProps) => {
  return (
    <section id="demo" className="cta section">
      <div className="container">
        <div className="cta__content">
          <h2 className="cta__title">Transform your maintenance process today.</h2>
          <p className="cta__description">
            Replace scattered messages and manual tracking with one intelligent platform built for modern organizations.
          </p>
          <div className="cta__actions">
            <button type="button" className="btn btn-primary" onClick={onRequestDemo}>
              Request Demo
            </button>
            <a href="#learn" className="btn btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA