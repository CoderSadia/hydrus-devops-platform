# Architecture Diagram

## Target Architecture


HYDRUS DEVOPS PLATFORM
─────────────────────────────────────────────────────

Developer
    │
    │ git push
    ▼
GitHub Repository
    │
    └── GitHub Actions CI/CD Pipeline
            │
            ├── 1. Test
            ├── 2. Build Docker Images
            ├── 3. Push to ACR
            └── 4. Deploy to AKS

    ▼
Azure Container Registry (ACR)
hydrusacrsadia2026dev.azurecr.io
    │
    ▼
┌─────────────────────────────────────────────────┐
│          AZURE KUBERNETES SERVICE               │
│          hydrus-aks-dev · East US               │
│                                                 │
│  User → HTTPS → DNS → Load Balancer             │
│                          │                      │
│                          ▼                      │
│              Ingress Controller (NGINX)         │
│               namespace: hydrus-prod            │
│                          │                      │
│              ┌───────────┴───────────┐          │
│              │ path:/                │ path:/api│
│              ▼                       ▼          │
│        Frontend Service       Backend Service   │
│        ClusterIP :80          ClusterIP :8000   │
│              │                       │          │
│              ▼                       ▼          │
│        Frontend Pods          Backend Pods      │
│        React × 2              FastAPI × 2       │
│        HPA: 2-5               HPA: 2-10         │
│                                     │           │
│                                     ▼           │
│                           PostgreSQL Pod        │
│                           ClusterIP :5432       │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│          AZURE INFRASTRUCTURE                   │
│  RG      : hydrus-rg-dev                        │
│  VNet    : hydrus-vnet-dev (10.0.0.0/16)        │
│  Subnet  : aks-subnet (10.0.1.0/24)             │
│  ACR     : hydrusacrsadia2026dev.azurecr.io     │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│          MONITORING STACK                       │
│  Prometheus  →  Grafana Dashboards              │
│  Azure Monitor  →  Alerts (Slack/PagerDuty)     │
│  Loki  →  Log Aggregation                       │
└─────────────────────────────────────────────────┘

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

