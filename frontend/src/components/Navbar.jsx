const Navbar = ({ activePage, setActivePage }) => {
  const links = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'services', label: 'Services' },
    { id: 'deployments', label: 'Deployments' },
    { id: 'monitoring', label: 'Monitoring' },
  ]

  return (
    <nav className="bg-gh-surface border-b border-gh-border px-6 h-14 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gh-blue rounded-lg flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span className="text-gh-text font-medium text-base">Hydrus DevOps</span>
        <span className="text-xs bg-blue-900/40 text-gh-blue border border-gh-blue/30 px-2 py-0.5 rounded-full">Platform</span>
      </div>

      <div className="flex gap-1">
        {links.map(link => (
          <button
            key={link.id}
            onClick={() => setActivePage(link.id)}
            className={`px-3 py-1.5 rounded-md text-sm transition-all ${
              activePage === link.id
                ? 'bg-gh-border text-gh-blue'
                : 'text-gh-muted hover:text-gh-text hover:bg-gh-border/50'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gh-green rounded-full pulse"></div>
          <span className="text-gh-green text-xs">All systems operational</span>
        </div>
        <div className="w-8 h-8 bg-gh-blue rounded-full flex items-center justify-center text-white text-xs font-medium">
          HY
        </div>
      </div>
    </nav>
  )
}

export default Navbar
