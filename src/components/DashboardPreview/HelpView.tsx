import { useState } from 'react'
import { Search, BookOpen, ChevronDown, MessageCircle, Mail, ExternalLink } from 'lucide-react'

interface HelpArticle {
  id: string
  category: string
  title: string
  description: string
  views: number
}

interface HelpViewProps {
  articles: HelpArticle[]
  faqs: { question: string; answer: string }[]
}

const HelpView = ({ articles, faqs }: HelpViewProps) => {
  const [search, setSearch] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase()) ||
    a.description.toLowerCase().includes(search.toLowerCase())
  )

  const categories = [...new Set(articles.map((a) => a.category))]

  return (
    <>
      <div className="dashboard-preview__view-header">
        <div>
          <h3 className="dashboard-preview__card-title">Help Center</h3>
          <p className="dashboard-preview__card-subtitle">Documentation, FAQs, and support resources</p>
        </div>
      </div>

      <div className="dashboard-preview__help-search">
        <Search size={18} strokeWidth={1.75} />
        <input
          type="text"
          placeholder="Search help articles, documentation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="dashboard-preview__grid">
        <div className="dashboard-preview__card">
          <div className="dashboard-preview__card-header">
            <div>
              <h3 className="dashboard-preview__card-title">Documentation</h3>
              <p className="dashboard-preview__card-subtitle">Browse all help articles</p>
            </div>
            <BookOpen size={16} strokeWidth={1.75} />
          </div>

          {categories.map((category) => (
            <div key={category} className="dashboard-preview__help-category">
              <h4 className="dashboard-preview__help-category-title">{category}</h4>
              {filtered
                .filter((a) => a.category === category)
                .map((article) => (
                  <div key={article.id} className="dashboard-preview__help-article">
                    <div>
                      <span className="dashboard-preview__help-article-title">{article.title}</span>
                      <span className="dashboard-preview__help-article-desc">{article.description}</span>
                    </div>
                    <span className="dashboard-preview__help-article-views">{article.views} views</span>
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div className="dashboard-preview__card">
          <div className="dashboard-preview__card-header">
            <div>
              <h3 className="dashboard-preview__card-title">Frequently Asked Questions</h3>
              <p className="dashboard-preview__card-subtitle">Quick answers to common questions</p>
            </div>
            <MessageCircle size={16} strokeWidth={1.75} />
          </div>

          <div className="dashboard-preview__faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="dashboard-preview__faq-item">
                <button
                  className="dashboard-preview__faq-question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={14}
                    strokeWidth={1.75}
                    className={`dashboard-preview__faq-chevron${openFaq === index ? ' dashboard-preview__faq-chevron--open' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <p className="dashboard-preview__faq-answer">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>

          <div className="dashboard-preview__help-contact">
            <div className="dashboard-preview__help-contact-header">
              <span className="dashboard-preview__help-contact-icon">
                <Mail size={14} strokeWidth={1.75} />
              </span>
              <div>
                <span className="dashboard-preview__help-contact-title">Still need help?</span>
                <span className="dashboard-preview__help-contact-desc">Our support team is available 24/7</span>
              </div>
            </div>
            <a className="dashboard-preview__btn dashboard-preview__btn--primary" href="mailto:support@maintena.com">
              Contact Support
              <ExternalLink size={12} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default HelpView