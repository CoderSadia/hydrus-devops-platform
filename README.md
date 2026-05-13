# Hydrus DevOps Platform

A production-style web platform deployed on Microsoft Azure demonstrating
Docker, Terraform, AKS, CI/CD, and monitoring best practices.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Python FastAPI |
| Database | PostgreSQL 15 |
| Container Registry | Azure Container Registry |
| Orchestration | Azure Kubernetes Service (AKS) |
| Infrastructure | Terraform |
| CI/CD | GitHub Actions |
| Ingress | NGINX Ingress Controller |
| Monitoring | Prometheus + Grafana |
| Logging | Loki |

## Architecture

User → DNS → Azure Load Balancer → Ingress Controller → AKS
→ Frontend (React x2 pods)
→ Backend API (FastAPI x2 pods)
→ PostgreSQL Database
CI/CD: GitHub Actions → ACR → AKS

## Project Structure

```
hydrus-devops-platform/
├── README.md
├── docker-compose.yml
├── docs/
│   ├── architecture-diagram.md
│   ├── deployment-guide.md
│   ├── monitoring-plan.md
│   └── troubleshooting.md
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
├── backend/
│   ├── Dockerfile
│   └── main.py
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── provider.tf
│   ├── modules/
│   │   ├── aks/
│   │   ├── acr/
│   │   └── network/
│   └── environments/
│       ├── dev.tfvars
│       ├── stage.tfvars
│       └── prod.tfvars
├── k8s/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secret-example.yaml
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── hpa.yaml
└── pipelines/
    ├── github-actions.yml
    └── azure-pipelines.yml
```

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js v20+
- Python 3.12+
- Azure CLI
- Terraform v1.0+
- kubectl

### Run Locally with Docker

```bash
git clone https://github.com/CoderSadia/hydrus-devops-platform
cd hydrus-devops-platform
docker compose up -d
```

- Frontend: http://localhost
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Run Without Docker

```bash
# Backend
cd backend
pip3 install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## Infrastructure Setup with Terraform

```bash
cd terraform

# Initialize
terraform init

# Plan
terraform plan -var-file=environments/dev.tfvars

# Apply
terraform apply -var-file=environments/dev.tfvars

# Destroy when done
terraform destroy -var-file=environments/dev.tfvars
```

## Kubernetes Deployment

```bash
# Get AKS credentials
az aks get-credentials --resource-group hydrus-rg-dev --name hydrus-aks-dev

# Deploy all manifests
kubectl apply -f k8s/

# Check status
kubectl get pods -n hydrus-prod
kubectl get services -n hydrus-prod
kubectl get ingress -n hydrus-prod
```

## CI/CD Pipeline

Pipeline is triggered automatically on:
- Push to `main` branch → Build, test, and deploy to production
- Push to `develop` branch → Build and test only
- Pull request to `main` → Run tests only

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| AZURE_CREDENTIALS | Azure service principal JSON |
| INGRESS_HOST | Public IP of ingress controller |

### Pipeline Stages

1. Test - Run unit tests and build verification
2. Build and Push - Build Docker images and push to ACR
3. Deploy - Deploy to AKS with rollback on failure

## Monitoring

```bash
# Install Prometheus and Grafana
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace

# Check cluster health
kubectl top pods -n hydrus-prod
kubectl top nodes

# View logs
kubectl logs -f deployment/backend -n hydrus-prod
```

## Documentation

- [Deployment Guide and Q&A](docs/deployment-guide.md)
- [Monitoring Plan](docs/monitoring-plan.md)
- [Troubleshooting Guide](docs/troubleshooting.md)
- [Architecture Diagram](docs/architecture-diagram.md)

## Submission Checklist

- [x] Git repository
- [x] README with setup and deployment steps
- [x] Dockerfile and docker-compose.yml
- [x] Terraform code
- [x] Kubernetes manifests
- [x] CI/CD pipeline YAML
- [x] Architecture diagram
- [x] Troubleshooting and monitoring documentation

## Docker Hub Images

| Image | Link |
|-------|------|
| Backend | https://hub.docker.com/r/codersadia/hydrus-devops-platform-backend |
| Frontend | https://hub.docker.com/r/codersadia/hydrus-devops-platform-frontend |


## Author

Sadia | DevOps Engineer Assessment | Hydrus Digital BD
