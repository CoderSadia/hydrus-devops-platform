const pipelines = [
  {
    name: 'frontend · build & push to ACR',
    branch: 'main',
    commit: 'a3f9d2b',
    time: '3 mins ago',
    duration: '2m 14s',
    status: 'success',
  },
  {
    name: 'backend · deploy to AKS',
    branch: 'main',
    commit: 'a3f9d2b',
    time: 'running now',
    duration: '1m 03s',
    status: 'running',
  },
  {
    name: 'terraform · infrastructure plan & apply',
    branch: 'main',
    commit: '91c7e4a',
    time: '1 hour ago',
    duration: '4m 38s',
    status: 'success',
  },
  {
    name: 'backend · unit tests & code quality',
    branch: 'develop',
    commit: 'f2d8c1e',
    time: '2 hours ago',
    duration: '1m 52s',
    status: 'failed',
  },
]

const StatusIcon = ({ status }) => {
  if (status === 'success') return (
    <div className="w-7 h-7 rounded-md bg-green-900/40 text-gh-green flex items-center justify-center text-xs">✓</div>
  )
  if (status === 'running') return (
    <div className="w-7 h-7 rounded-md bg-blue-900/40 text-gh-blue flex items-center justify-center text-xs animate-spin">⟳</div>
  )
  if (status === 'failed') return (
    <div className="w-7 h-7 rounded-md bg-red-900/40 text-gh-red flex items-center justify-center text-xs">✕</div>
  )
}

const PipelineStatus = () => {
  return (
    <div className="bg-gh-surface border border-gh-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gh-text flex items-center gap-2">
          <span>⚙️</span> CI/CD Pipeline Status
        </h2>
        <span className="text-xs bg-blue-900/40 text-gh-blue border border-gh-blue/30 px-2 py-0.5 rounded-full">
          GitHub Actions
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {pipelines.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-3 py-2.5 bg-gh-bg rounded-lg border border-gh-border/50 hover:border-gh-border transition-all"
          >
            <StatusIcon status={p.status} />
            <div className="flex-1">
              <div className="text-sm text-gh-text">{p.name}</div>
              <div className="text-xs text-gh-muted mt-0.5">
                {p.branch} · commit {p.commit} · {p.time}
              </div>
            </div>
            <div className="text-xs text-gh-muted">{p.duration}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PipelineStatus
