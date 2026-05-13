import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Services from './pages/Services'
import Deployments from './pages/Deployments'
import Monitoring from './pages/Monitoring'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch(activePage) {
      case 'dashboard': return <Dashboard />
      case 'services': return <Services />
      case 'deployments': return <Deployments />
      case 'monitoring': return <Monitoring />
      default: return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gh-bg">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="fade-in">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
