import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Features from './components/Features/Features'
import Workflow from './components/Workflow/Workflow'
import DashboardPreview from './components/DashboardPreview/DashboardPreview'
import CTA from './components/CTA/CTA'
import Footer from './components/Footer/Footer'
import RequestDemoModal from './components/RequestDemoModal/RequestDemoModal'

const openDashboardView = (setShowDashboard: (value: boolean) => void) => {
  setShowDashboard(true)
  window.scrollTo(0, 0)
}

const closeDashboardView = (setShowDashboard: (value: boolean) => void) => {
  setShowDashboard(false)
  window.scrollTo(0, 0)
}

function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)

  const openDemoModal = () => setIsDemoModalOpen(true)
  const closeDemoModal = () => setIsDemoModalOpen(false)

  const openDashboard = () => openDashboardView(setShowDashboard)
  const closeDashboard = () => closeDashboardView(setShowDashboard)

  return (
    <>
      {showDashboard ? (
        <DashboardPreview onBack={closeDashboard} />
      ) : (
        <>
          <Navbar onRequestDemo={openDemoModal} onViewDashboard={openDashboard} />
          <main>
            <Hero onViewDashboard={openDashboard} />
            <Features />
            <Workflow />
            <CTA onRequestDemo={openDemoModal} />
          </main>
          <Footer />
        </>
      )}
      <RequestDemoModal open={isDemoModalOpen} onClose={closeDemoModal} />
    </>
  )
}

export default App