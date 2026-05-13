import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const responseData = [
  { time: '00:00', latency: 120 },
  { time: '02:00', latency: 98 },
  { time: '04:00', latency: 145 },
  { time: '06:00', latency: 132 },
  { time: '08:00', latency: 189 },
  { time: '10:00', latency: 210 },
  { time: '12:00', latency: 178 },
  { time: '14:00', latency: 156 },
  { time: '16:00', latency: 142 },
  { time: '18:00', latency: 168 },
  { time: '20:00', latency: 134 },
  { time: '22:00', latency: 118 },
  { time: 'Now', latency: 142 },
]

const errorData = [
  { time: '00:00', errors: 2 },
  { time: '02:00', errors: 0 },
  { time: '04:00', errors: 1 },
  { time: '06:00', errors: 0 },
  { time: '08:00', errors: 5 },
  { time: '10:00', errors: 3 },
  { time: '12:00', errors: 0 },
  { time: '14:00', errors: 1 },
  { time: '16:00', errors: 0 },
  { time: '18:00', errors: 2 },
  { time: '20:00', errors: 0 },
  { time: '22:00', errors: 0 },
  { time: 'Now', errors: 0 },
]

const alerts = [
  {
    level: 'warning',
    title: 'High CPU on backend pod',
    message: 'backend-7d9f8b-xk2p: CPU usage at 87% for 5 minutes',
    time: '10 mins ago',
  },
  {
    level: 'info',
    title: 'HPA scaled up',
    message: 'backend deployment scaled from 2 to 3 replicas',
    time: '25 mins ago',
  },
  {
    level: 'success',
    title: 'Deployment successful',
    message: 'frontend:v1.2.3 deployed to AKS successfully',
    time: '3 mins ago',
  },
  {
    level: 'warning',
    title: 'Ingress controller restarts',
    message: 'ingress-nginx-controller restarted 3 times in 1 hour',
    time: '1 hour ago',
  },
]

const alertStyle = {
  warning: {
    border: 'border-gh-yellow/30',
    bg: 'bg-yellow-900/20',
    dot: 'bg-gh-yellow',
    text: 'text-gh-yellow',
  },
  info: {
    border: 'border-gh-blue/30',
    bg: 'bg-blue-900/20',
    dot: 'bg-gh-blue',
    text: 'text-gh-blue',
  },
  success: {
    border: 'border-gh-green/30',
    bg: 'bg-green-900/20',
    dot: 'bg-gh-green',
    text: 'text-gh-green',
  },
}

const tooltipStyle = {
  contentStyle: {
    background: '#161b22',
    border: '1px solid #30363d',
    borderRadius: '8px',
    color: '#e6edf3',
    fontSize: '12px',
  },
}

const Monitoring = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-medium text-gh-text mb-1">Monitoring</h1>
        <p className="text-gh-muted text-sm">
          Prometheus metrics · Grafana dashboards · Real-time alerts
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Avg Response Time', value: '142ms', color: 'text-gh-blue' },
          { label: 'Error Rate', value: '0.12%', color: 'text-gh-green' },
          { label: 'Throughput', value: '1.2k req/min', color: 'text-gh-text' },
          { label: 'Active Alerts', value: '2', color: 'text-gh-yellow' },
        ].map((m, i) => (
          <div key={i} className="bg-gh-surface border border-gh-border rounded-xl p-4">
            <div className="text-xs text-gh-muted mb-2">{m.label}</div>
            <div className={`text-2xl font-medium ${m.color}`}>{m.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gh-surface border border-gh-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gh-text flex items-center gap-2">
              <span>⚡</span> API Response Time (ms)
            </h2>
            <span className="text-xs bg-blue-900/40 text-gh-blue border border-gh-blue/30 px-2 py-0.5 rounded-full">
              24h
            </span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={responseData}>
              <defs>
                <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#58a6ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fill: '#8b949e', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="latency" stroke="#58a6ff" strokeWidth={2} fill="url(#colorLatency)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gh-surface border border-gh-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gh-text flex items-center gap-2">
              <span>🔴</span> Error Rate (per hour)
            </h2>
            <span className="text-xs bg-green-900/40 text-gh-green border border-gh-green/30 px-2 py-0.5 rounded-full">
              Low
            </span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={errorData}>
              <defs>
                <linearGradient id="colorError" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f85149" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f85149" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fill: '#8b949e', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="errors" stroke="#f85149" strokeWidth={2} fill="url(#colorError)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gh-surface border border-gh-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-gh-text flex items-center gap-2">
            <span>🔔</span> Recent Alerts
          </h2>
          <span className="text-xs text-gh-muted">Last 24 hours</span>
        </div>
        <div className="flex flex-col gap-2">
          {alerts.map((alert, i) => {
            const style = alertStyle[alert.level]
            return (
              <div
                key={i}
                className={`flex items-start gap-3 px-4 py-3 rounded-lg border ${style.border} ${style.bg}`}
              >
                <div className={`w-2 h-2 rounded-full mt-1.5 ${style.dot} pulse`}></div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${style.text}`}>{alert.title}</div>
                  <div className="text-xs text-gh-muted mt-0.5">{alert.message}</div>
                </div>
                <div className="text-xs text-gh-muted whitespace-nowrap">{alert.time}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Monitoring
