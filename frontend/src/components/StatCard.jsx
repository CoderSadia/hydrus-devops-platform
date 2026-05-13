const StatCard = ({ label, value, change, trend, icon }) => {
  const trendColor = {
    up: 'text-gh-green',
    down: 'text-gh-red',
    neutral: 'text-gh-muted',
  }

  return (
    <div className="bg-gh-surface border border-gh-border rounded-xl p-4 hover:border-gh-blue/40 transition-all">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">{icon}</span>
        <span className="text-gh-muted text-xs">{label}</span>
      </div>
      <div className="text-2xl font-medium text-gh-text mb-1">{value}</div>
      <div className={`text-xs ${trendColor[trend]}`}>
        {trend === 'up' && '↑ '}{trend === 'down' && '↓ '}{change}
      </div>
    </div>
  )
}

export default StatCard
