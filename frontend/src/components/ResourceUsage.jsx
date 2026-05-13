const resources = [
  { name: 'CPU Usage', value: 62, unit: '62%', color: '#58a6ff' },
  { name: 'Memory', value: 53, unit: '4.2 / 8 GB', color: '#3fb950' },
  { name: 'Storage', value: 34, unit: '28 GB used', color: '#d29922' },
  { name: 'Network I/O', value: 41, unit: '1.2 GB/s', color: '#f778ba' },
]

const ResourceUsage = () => {
  return (
    <div className="bg-gh-surface border border-gh-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gh-text flex items-center gap-2">
          <span>🖥️</span> AKS Resource Usage
        </h2>
        <span className="text-xs text-gh-muted">hydrus-aks-prod · East US</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {resources.map((r, i) => (
          <div
            key={i}
            className="bg-gh-bg border border-gh-border/50 rounded-lg p-3 hover:border-gh-border transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gh-muted">{r.name}</span>
            </div>
            <div className="text-xl font-medium mb-1" style={{ color: r.color }}>
              {r.value}%
            </div>
            <div className="text-xs text-gh-muted mb-2">{r.unit}</div>
            <div className="h-1.5 bg-gh-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${r.value}%`, background: r.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResourceUsage
