import { Upload, FileText, UserCheck, Activity, Bell, BarChart3 } from 'lucide-react'
import './Features.css'

const features = [
  {
    icon: Upload,
    title: 'Upload Image',
    description: 'Attach photos directly from mobile or desktop.',
  },
  {
    icon: FileText,
    title: 'Issue Reporting',
    description: 'Describe maintenance problems with detailed information.',
  },
  {
    icon: UserCheck,
    title: 'Technician Assignment',
    description: 'Assign technicians with one click.',
  },
  {
    icon: Activity,
    title: 'Progress Tracking',
    description: 'Monitor repairs from report to completion.',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Receive updates whenever statuses change.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Analyze maintenance trends and technician performance.',
  },
]

const Features = () => {
  return (
    <section id="features" className="features section">
      <div className="container">
        <div className="features__header">
          <h2 className="features__title">Everything you need to manage maintenance</h2>
          <p className="features__description">
            A complete platform designed to streamline your maintenance workflow from report to resolution.
          </p>
        </div>

        <div className="features__grid">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="features__card">
                <div className="features__icon">
                  <Icon strokeWidth={1.5} />
                </div>
                <h3 className="features__card-title">{feature.title}</h3>
                <p className="features__card-description">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features