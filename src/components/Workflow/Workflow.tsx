import './Workflow.css'

const steps = [
  { number: 1, title: 'Report Issue' },
  { number: 2, title: 'Assign Technician' },
  { number: 3, title: 'Repair' },
  { number: 4, title: 'Inspection' },
  { number: 5, title: 'Completed' },
]

const Workflow = () => {
  return (
    <section id="workflow" className="workflow section">
      <div className="container">
        <div className="workflow__header">
          <h2 className="workflow__title">How it works</h2>
          <p className="workflow__description">
            A streamlined process designed to get your facility issues resolved faster.
          </p>
        </div>

        <div className="workflow__timeline">
          {steps.map((step, index) => (
            <div key={index} className="workflow__step">
              <div className="workflow__step-number">{step.number}</div>
              <div className="workflow__step-content">
                <h3 className="workflow__step-title">{step.title}</h3>
              </div>
              {index < steps.length - 1 && (
                <div className="workflow__connector">
                  <svg width="100%" height="2" viewBox="0 0 100 2" preserveAspectRatio="none">
                    <line x1="0" y1="1" x2="100" y2="1" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="4 4" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Workflow