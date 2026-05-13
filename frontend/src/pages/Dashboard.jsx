import { useApi } from '../hooks/useApi'
import StatCard from '../components/StatCard'
import ServiceHealth from '../components/ServiceHealth'
import RequestChart from '../components/RequestChart'
import PipelineStatus from '../components/PipelineStatus'
import ResourceUsage from '../components/ResourceUsage'

const Dashboard = () => {
  const { data: stats } = useApi('/api/stats')
  const { data: health } = useApi('/health')

  const statCards = [
    {
      label: 'Cluster Uptime',
      value: stats ? `${stats.cluster.uptime_percent}%` : '99.98%',
      change: '+0.02% this month',
      trend: 'up',
      icon: '⏱',
    },
    {
      label: 'Active Pods',
      value: stats ? `${stats.cluster.active_pods} / ${stats.cluster.total_pods}` : '24 / 24',
      change: 'All healthy',
      trend: 'up',
      icon: '📦',
    },
    {
      label: 'Avg Response',
      value: stats ? `${stats.performance.avg_response_ms}ms` : '142ms',
      change: '-18ms from yesterday',
      trend: 'up',
      icon: '⚡',
    },
    {
      label: 'Deployments Today',
      value: stats ? `${stats.deployments_today}` : '7',
      change: '6 success · 1 running',
      trend: 'neutral',
      icon: '🚀',
    },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gh-text mb-1">
          Welcome to <span className="text-gh-blue">Hydrus DevOps Platform</span>
        </h1>
        <p className="text-gh-muted text-sm">
          Real-time infrastructure monitoring · AKS cluster health · CI/CD pipeline status
        </p>
        {health && (
          <div className="mt-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-gh-green rounded-full pulse"></div>
            <span className="text-xs text-gh-green">
              API Connected · uptime {health.uptime_seconds}s · DB {health.database}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {statCards.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <ServiceHealth />
        <RequestChart />
      </div>

      <div className="mb-4">
        <PipelineStatus />
      </div>

      <div>
        <ResourceUsage />
      </div>
    </div>
  )
}

export default Dashboard
