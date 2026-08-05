import { Quote } from 'lucide-react'
import './Testimonials.css'

const testimonials = [
  {
    quote: 'Maintena cut our average resolution time from 5 days to under 24 hours. The reporting workflow is incredibly intuitive.',
    name: 'Sarah Johnson',
    role: 'Facilities Director',
    org: 'Lincoln School District',
  },
  {
    quote: 'We finally have visibility into every maintenance request across our 12 buildings. The analytics alone are worth it.',
    name: 'David Chen',
    role: 'Operations Manager',
    org: 'Metro General Hospital',
  },
  {
    quote: 'The technician assignment is brilliant. Our team resolves issues 40% faster with the automated routing.',
    name: 'Amanda Rodriguez',
    role: 'Head of Facilities',
    org: 'Riverton Municipality',
  },
]

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <div className="testimonials__header">
          <span className="testimonials__badge">Testimonials</span>
          <h2 className="testimonials__title">Trusted by organizations that care</h2>
          <p className="testimonials__description">
            Schools, hospitals, municipalities, and companies rely on Maintena to keep their facilities running smoothly.
          </p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonials__card">
              <div className="testimonials__quote-icon">
                <Quote size={20} strokeWidth={1.5} />
              </div>
              <p className="testimonials__quote">{testimonial.quote}</p>
              <div className="testimonials__author">
                <div className="testimonials__avatar">
                  {testimonial.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="testimonials__author-info">
                  <span className="testimonials__name">{testimonial.name}</span>
                  <span className="testimonials__role">
                    {testimonial.role} · {testimonial.org}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials