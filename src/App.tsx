import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Features from './components/Features/Features'
import Workflow from './components/Workflow/Workflow'
import DashboardPreview from './components/DashboardPreview/DashboardPreview'
import CTA from './components/CTA/CTA'
import Footer from './components/Footer/Footer'
import RequestDemoModal from './components/RequestDemoModal/RequestDemoModal'

function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

  const openDemoModal = () => setIsDemoModalOpen(true)
  const closeDemoModal = () => setIsDemoModalOpen(false)

  return (
    <>
      <Navbar onRequestDemo={openDemoModal} />
      <main>
        <Hero />
        <Features />
        <Workflow />
        <DashboardPreview />
        <CTA onRequestDemo={openDemoModal} />
      </main>
      <Footer />
      <RequestDemoModal open={isDemoModalOpen} onClose={closeDemoModal} />
    </>
  )
}

export default App