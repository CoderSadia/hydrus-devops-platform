import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { time: '00:00', requests: 45 },
  { time: '02:00', requests: 62 },
  { time: '04:00', requests: 38 },
  { time: '06:00', requests: 71 },
  { time: '08:00', requests: 95 },
  { time: '10:00', requests: 120 },
  { time: '12:00', requests: 145 },
  { time: '14:00', requests: 132 },
  { time: '16:00', requests: 158 },
  { time: '18:00', requests: 142 },
  { time: '20:00', requests: 118 },
  { time: '22:00', requests: 87 },
  { time: 'Now', requests: 96 },
]

const RequestChart = () => {
  return (
    <div className="bg-gh-surface border border-gh-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gh-text flex items-center gap-2">
          <span>📈</span> Request Volume (24h)
        </h2>
        <span className="text-xs bg-blue-900/40 text-gh-blue border border-gh-blue/30 px-2 py-0.5 rounded-full">
          API
        </span>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#58a6ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            tick={{ fill: '#8b949e', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              background: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '8px',
              color: '#e6edf3',
              fontSize: '12px',
            }}
          />
          <Area
            type="monotone"
            dataKey="requests"
            stroke="#58a6ff"
            strokeWidth={2}
            fill="url(#colorReq)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RequestChart
