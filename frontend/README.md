# Hydrus DevOps Platform - Frontend

React + Vite + Tailwind CSS dark theme dashboard for Hydrus DevOps Platform.

## Features

- Real-time service health monitoring
- CI/CD pipeline status
- AKS resource usage (CPU, Memory, Storage)
- API response time and error rate charts
- Dark theme GitHub-style UI

## Tech Stack

- React 18
- Vite 8
- Tailwind CSS 3
- Recharts
- Axios

## Run Locally

```bash
npm install
npm run dev
```

Visit: http://localhost:5173

## Build for Production

```bash
npm run build
```

## Environment Variables

VITE_API_URL=http://localhost:8000


## Docker

```bash
docker build -t hydrus-frontend .
docker run -p 80:80 hydrus-frontend
```
