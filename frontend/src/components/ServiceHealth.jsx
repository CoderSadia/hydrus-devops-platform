const services = [
  { name: 'Frontend (React)', latency: '38ms', uptime: '100%', status: 'healthy' },
  { name: 'Backend API (FastAPI)', latency: '142ms', uptime: '99.9%', status: 'healthy' },
  { name: 'PostgreSQL DB', latency: '12ms', uptime: '100%', status: 'healthy' },
  { name: 'Ingress Controller', latency: '8ms', uptime: '99.7%', status: 'warning' },
]

const ServiceHealth = () => {
  return (
    <div className="bg-gh-surface border border-gh-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gh-text flex items-center gap-2">
          <span>🟢</span> Service Health
        </h2>
        <span className="text-xs bg-green-900/40 text-gh-green border border-gh-green/30 px-2 py-0.5 rounded-full">
          Live
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {services.map((svc, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-3 py-2.5 bg-gh-bg rounded-lg border border-gh-border/50 hover:border-gh-border transition-all"
          >
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${
                svc.status === 'healthy' ? 'bg-gh-green pulse' : 'bg-gh-yellow pulse'
              }`}></div>
              <span className="text-sm text-gh-text">{svc.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gh-muted">{svc.latency}</span>
              <span className="text-xs bg-green-900/40 text-gh-green px-2 py-0.5 rounded-full">
                {svc.uptime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiceHealth
