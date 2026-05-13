const deployments = [
  {
    id: '#47',
    name: 'frontend · v1.2.3',
    branch: 'main',
    commit: 'a3f9d2b',
    author: 'sadia',
    time: '3 mins ago',
    duration: '2m 14s',
    status: 'success',
    steps: ['Build image', 'Push to ACR', 'Deploy to AKS', 'Health check'],
    completedSteps: 4,
  },
  {
    id: '#46',
    name: 'backend · v1.2.3',
    branch: 'main',
    commit: 'a3f9d2b',
    author: 'sadia',
    time: 'running now',
    duration: '1m 03s',
    status: 'running',
    steps: ['Build image', 'Push to ACR', 'Deploy to AKS', 'Health check'],
    completedSteps: 2,
  },
  {
    id: '#45',
    name: 'terraform · infra update',
    branch: 'main',
    commit: '91c7e4a',
    author: 'sadia',
    time: '1 hour ago',
    duration: '4m 38s',
    status: 'success',
    steps: ['Plan', 'Review', 'Apply', 'Verify'],
    completedSteps: 4,
  },
  {
    id: '#44',
    name: 'backend · unit tests',
    branch: 'develop',
    commit: 'f2d8c1e',
    author: 'sadia',
    time: '2 hours ago',
    duration: '1m 52s',
    status: 'failed',
    steps: ['Lint', 'Test', 'Build', 'Deploy'],
    completedSteps: 2,
  },
]

const statusStyle = {
  success: 'bg-green-900/40 text-gh-green border-gh-green/30',
  running: 'bg-blue-900/40 text-gh-blue border-gh-blue/30',
  failed: 'bg-red-900/40 text-gh-red border-gh-red/30',
}

const stepColor = (index, completedSteps, status) => {
  if (index < completedSteps) return 'bg-gh-green'
  if (index === completedSteps && status === 'running') return 'bg-gh-blue animate-pulse'
  if (status === 'failed' && index === completedSteps) return 'bg-gh-red'
  return 'bg-gh-border'
}

const Deployments = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-medium text-gh-text mb-1">Deployments</h1>
        <p className="text-gh-muted text-sm">CI/CD pipeline runs and deployment history</p>
      </div>

      <div className="flex flex-col gap-4">
        {deployments.map((d, i) => (
          <div
            key={i}
            className="bg-gh-surface border border-gh-border rounded-xl p-5 hover:border-gh-blue/40 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gh-muted font-mono">{d.id}</span>
                <h2 className="text-sm font-medium text-gh-text">{d.name}</h2>
                <span className={`text-xs border px-2 py-0.5 rounded-full ${statusStyle[d.status]}`}>
                  {d.status}
                </span>
              </div>
              <div className="text-xs text-gh-muted">{d.duration}</div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              {d.steps.map((step, j) => (
                <div key={j} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${stepColor(j, d.completedSteps, d.status)}`}></div>
                    <span className="text-xs text-gh-muted">{step}</span>
                  </div>
                  {j < d.steps.length - 1 && (
                    <div className="w-6 h-px bg-gh-border"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs text-gh-muted">
              <span>🌿 {d.branch}</span>
              <span>📝 {d.commit}</span>
              <span>👤 {d.author}</span>
              <span>🕐 {d.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Deployments
