const services = [
  {
    name: 'Frontend',
    type: 'React + Vite',
    namespace: 'hydrus-prod',
    replicas: '2/2',
    image: 'hydrusacr.azurecr.io/frontend:v1.2.3',
    port: '80',
    status: 'Running',
    uptime: '99.98%',
    latency: '38ms',
    restarts: 0,
  },
  {
    name: 'Backend API',
    type: 'Python FastAPI',
    namespace: 'hydrus-prod',
    replicas: '2/2',
    image: 'hydrusacr.azurecr.io/backend:v1.2.3',
    port: '8000',
    status: 'Running',
    uptime: '99.91%',
    latency: '142ms',
    restarts: 1,
  },
  {
    name: 'PostgreSQL',
    type: 'Database',
    namespace: 'hydrus-prod',
    replicas: '1/1',
    image: 'postgres:15-alpine',
    port: '5432',
    status: 'Running',
    uptime: '100%',
    latency: '12ms',
    restarts: 0,
  },
  {
    name: 'Ingress Controller',
    type: 'NGINX',
    namespace: 'ingress-nginx',
    replicas: '2/2',
    image: 'nginx/nginx-ingress:3.4.0',
    port: '443',
    status: 'Warning',
    uptime: '99.71%',
    latency: '8ms',
    restarts: 3,
  },
]

const statusStyle = {
  Running: 'bg-green-900/40 text-gh-green border-gh-green/30',
  Warning: 'bg-yellow-900/40 text-gh-yellow border-gh-yellow/30',
  Failed: 'bg-red-900/40 text-gh-red border-gh-red/30',
}

const Services = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-medium text-gh-text mb-1">Services</h1>
        <p className="text-gh-muted text-sm">All running services in AKS cluster</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {services.map((svc, i) => (
          <div
            key={i}
            className="bg-gh-surface border border-gh-border rounded-xl p-5 hover:border-gh-blue/40 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-base font-medium text-gh-text">{svc.name}</h2>
                  <span className={`text-xs border px-2 py-0.5 rounded-full ${statusStyle[svc.status]}`}>
                    {svc.status}
                  </span>
                </div>
                <div className="text-xs text-gh-muted">{svc.type} · namespace: {svc.namespace}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gh-text font-medium">{svc.replicas} replicas</div>
                <div className="text-xs text-gh-muted mt-0.5">port {svc.port}</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="bg-gh-bg rounded-lg p-3 border border-gh-border/50">
                <div className="text-xs text-gh-muted mb-1">Uptime</div>
                <div className="text-sm font-medium text-gh-green">{svc.uptime}</div>
              </div>
              <div className="bg-gh-bg rounded-lg p-3 border border-gh-border/50">
                <div className="text-xs text-gh-muted mb-1">Avg Latency</div>
                <div className="text-sm font-medium text-gh-blue">{svc.latency}</div>
              </div>
              <div className="bg-gh-bg rounded-lg p-3 border border-gh-border/50">
                <div className="text-xs text-gh-muted mb-1">Restarts</div>
                <div className={`text-sm font-medium ${svc.restarts > 0 ? 'text-gh-yellow' : 'text-gh-green'}`}>
                  {svc.restarts}
                </div>
              </div>
              <div className="bg-gh-bg rounded-lg p-3 border border-gh-border/50">
                <div className="text-xs text-gh-muted mb-1">Replicas</div>
                <div className="text-sm font-medium text-gh-text">{svc.replicas}</div>
              </div>
            </div>

            <div className="bg-gh-bg rounded-lg px-3 py-2 border border-gh-border/50">
              <span className="text-xs text-gh-muted">Image: </span>
              <span className="text-xs text-gh-blue font-mono">{svc.image}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
