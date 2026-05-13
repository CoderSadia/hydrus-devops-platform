# Architecture Diagram

## Target Architecture

                                           HYDRUS DEVOPS PLATFORM
                                ─────────────────────────────────────────────


Developer
│
│ git push
▼
GitHub Repository
│
├─── GitHub Actions CI/CD Pipeline
│         │
│         ├── 1. Run Tests
│         ├── 2. Build Docker Images
│         ├── 3. Push to ACR
│         └── 4. Deploy to AKS
│
▼
Azure Container Registry (ACR)
hydrusacrsadia2026dev.azurecr.io
│
│ Pull Images
▼
┌─────────────────────────────────────────────────────────────┐
│                    AZURE KUBERNETES SERVICE                  │
│                    hydrus-aks-dev (East US)                  │
│                                                             │
│   User                                                      │
│    │                                                        │
│    │ HTTPS                                                  │
│    ▼                                                        │
│  DNS (hydrus.example.com)                                   │
│    │                                                        │
│    ▼                                                        │
│  Azure Load Balancer (Public IP)                            │
│    │                                                        │
│    ▼                                                        │
│  Ingress Controller (NGINX)          namespace: hydrus-prod │
│    │                                                        │
│    ├──────────────────┐                                     │
│    │ path: /          │ path: /api                          │
│    ▼                  ▼                                     │
│  Frontend Service   Backend Service                         │
│  (ClusterIP :80)    (ClusterIP :8000)                       │
│    │                  │                                     │
│    ▼                  ▼                                     │
│  Frontend Pods      Backend Pods                            │
│  (React x2)         (FastAPI x2)                            │
│  HPA: 2-5           HPA: 2-10                               │
│                       │                                     │
│                       ▼                                     │
│                  PostgreSQL Service                         │
│                  (ClusterIP :5432)                          │
│                       │                                     │
│                       ▼                                     │
│                  PostgreSQL Pod                             │
│                  (StatefulSet x1)                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│                    AZURE INFRASTRUCTURE                      │
│                                                             │
│  Resource Group: hydrus-rg-dev                              │
│  Virtual Network: hydrus-vnet-dev (10.0.0.0/16)            │
│  Subnet: aks-subnet (10.0.1.0/24)                          │
│  ACR: hydrusacrsadia2026dev.azurecr.io                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│                    MONITORING STACK                          │
│                                                             │
│  Prometheus ──► Grafana Dashboards                          │
│  Azure Monitor ──► Alerts (Slack/PagerDuty)                 │
│  Loki ──► Log Aggregation                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

## Infrastructure Components

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend | React + Vite + nginx | User Interface |
| Backend | Python FastAPI | REST API |
| Database | PostgreSQL 15 | Data Storage |
| Container Registry | Azure ACR | Docker Image Storage |
| Orchestration | AKS (Kubernetes) | Container Management |
| Networking | Azure VNet + NSG | Network Isolation |
| Ingress | NGINX Ingress Controller | Traffic Routing |
| CI/CD | GitHub Actions | Automation Pipeline |
| IaC | Terraform | Infrastructure Provisioning |
| Monitoring | Prometheus + Grafana | Metrics and Alerts |
| Logging | Loki | Log Aggregation |

## CI/CD Flow
git push (main branch)
│
▼
GitHub Actions Triggered
│
├── Job 1: Test
│     ├── Python unit tests
│     └── React build check
│
├── Job 2: Build and Push
│     ├── docker build backend
│     ├── docker push to ACR
│     ├── docker build frontend
│     └── docker push to ACR
│
└── Job 3: Deploy
├── kubectl apply manifests
├── kubectl set image
├── kubectl rollout status
├── Smoke test
└── Rollback on failure
