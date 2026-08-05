import { Camera, UserPlus, Wrench, ClipboardCheck, CheckCircle2 } from 'lucide-react'
import './Workflow.css'

const steps = [
  {
    icon: Camera,
    number: '01',
    title: 'Report Issue',
    description: 'Submit a maintenance request with photos and location details in under a minute.',
  },
  {
    icon: UserPlus,
    number: '02',
    title: 'Assign Technician',
    description: 'Automatically route the request to the right technician based on skill and availability.',
  },
  {
    icon: Wrench,
    number: '03',
    title: 'Track Repair',
    description: 'Follow real-time progress as your technician diagnoses, repairs, and resolves the issue.',
  },
  {
    icon: ClipboardCheck,
    number: '04',
    title: 'Inspect & Verify',
    description: 'Quality checks confirm the repair meets standards before the request is closed.',
  },
  {
    icon: CheckCircle2,
    number: '05',
    title: 'Completion',
    description: 'Receive final reports, documentation, and analytics to keep your records complete.',
  },
]

const Workflow = () => {
  return (
    <section id="workflow" className="workflow section">
      <div className="container">
        <div className="workflow__header">
          <span className="workflow__badge">How it works</span>
          <h2 className="workflow__title">A streamlined process to resolve facility issues</h2>
          <p className="workflow__description">
            Transform your maintenance process today. From report to resolution, every step is designed to get your facility issues resolved faster.
          </p>
        </div>

        <div className="workflow__grid">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="workflow__card">
                <div className="workflow__card-top">
                  <div className="workflow__icon">
                    <Icon strokeWidth={1.5} />
                  </div>
                  <span className="workflow__number">{step.number}</span>
                </div>
                <h3 className="workflow__step-title">{step.title}</h3>
                <p className="workflow__step-description">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="workflow__arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Workflow