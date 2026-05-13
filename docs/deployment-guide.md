# Deployment Guide

## Local Development Setup

### Prerequisites
- Docker and Docker Compose
- Node.js v20+
- Python 3.12+
- Azure CLI
- Terraform v1.0+
- kubectl

### Run with Docker Compose

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

# Frontend
cd frontend
npm install
npm run dev
```

---

## Task 1 - Dockerization Q&A

### Q1. What optimizations did you apply to reduce Docker image size?

1. Multi-stage builds - Separate builder and production stages so build tools are not in final image
2. python:3.12-slim - Slim base image instead of full Python image
3. node:20-alpine - Alpine Linux base image (5MB vs 900MB)
4. npm ci - Exact install from package-lock.json, faster and cache friendly
5. --no-cache-dir - Skip pip cache to reduce layer size
6. Static build - React compiled to static files, served by nginx without Node.js runtime
7. .dockerignore - Exclude node_modules, .git, __pycache__ from build context

### Q2. What is the difference between a Docker image and a Docker container?

- Image - Read-only template stored in registry, built from Dockerfile
- Container - Running instance of an image with its own writable layer
- Image is like a class definition, container is like an object instance
- Multiple containers can run from the same image simultaneously

### Q3. How do you pass environment-specific values to a container securely?

1. Environment variables via docker-compose or Kubernetes ConfigMap
2. Kubernetes Secrets - base64 encoded, mounted as environment variables
3. Azure Key Vault - Centralized secrets management for production
4. Never hardcode secrets in Dockerfile or source code
5. .env files - Used locally only, never committed to Git via .gitignore

### Q4. How would you troubleshoot a container that exits immediately after startup?

```bash
# Check exit code and status
docker ps -a

# Check container logs
docker logs <container_name>

# Run interactively to debug
docker run -it --entrypoint /bin/sh <image_name>

# Inspect container details
docker inspect <container_name>

# Check recent events
docker events --since 10m
```

Common causes:
- Missing required environment variables
- Wrong CMD or ENTRYPOINT in Dockerfile
- Port already in use on host
- Missing dependencies or wrong image tag
- Permission issues on mounted volumes

---

## Task 2 - Terraform Q&A

### Q5. How would you manage separate dev, stage, and prod environments?

1. Separate .tfvars files - dev.tfvars, stage.tfvars, prod.tfvars with different values
2. Terraform Workspaces - terraform workspace new prod
3. Different variable values - node count, VM size, SKU per environment
4. Remote state per environment - Separate storage accounts for each env
5. Branch-based deployment - dev branch deploys to dev, main branch to prod

### Q6. What is Terraform state, and why is remote state important?

- State - JSON file that tracks real infrastructure vs Terraform configuration
- Terraform uses state to know what exists and what needs to change
- Remote state stored in Azure Blob Storage or Terraform Cloud because:
  - Enables team collaboration - multiple engineers can work together
  - Provides state locking - prevents two people applying at the same time
  - Backup and recovery - state is not lost if local machine fails
  - Audit trail - history of all infrastructure changes

### Q7. How would you secure Terraform state and sensitive variables?

1. Azure Blob Storage with encryption enabled for remote state backend
2. State locking with Azure Blob lease to prevent concurrent modifications
3. Sensitive variables marked with sensitive = true in variables.tf
4. Azure Key Vault for secrets instead of storing in tfvars files
5. Limited RBAC access to state storage account - only CI/CD pipeline
6. Never commit .tfstate or .tfstate.backup files to Git

### Q8. What Azure networking/security considerations would you apply for AKS?

1. Private AKS cluster - API server endpoint not publicly accessible
2. Network Policy - Control pod-to-pod traffic with Calico or Azure CNI
3. Azure CNI - Advanced networking for better performance
4. NSG rules - Restrict inbound/outbound traffic on subnets
5. Private ACR - Container registry accessible only within VNet
6. Managed Identity - No service principal credentials needed
7. Azure Policy - Enforce security and compliance standards on AKS

---

## Task 3 - Kubernetes Q&A

### Q9. Explain the request flow from browser to frontend to backend API inside AKS.

Browser
→ DNS Resolution (hydrus.example.com)
→ Azure Load Balancer (Public IP)
→ Ingress Controller (NGINX pod)
→ Frontend Service (ClusterIP :80)
→ Frontend Pod (React app served by nginx)
→ API call to /api path
→ Backend Service (ClusterIP :8000)
→ Backend Pod (FastAPI)
→ PostgreSQL Service (ClusterIP :5432)
→ PostgreSQL Pod (Database)

### Q10. What is the difference between Deployment and StatefulSet?

| Feature | Deployment | StatefulSet |
|---|---|---|
| Pod identity | Random names (pod-abc123) | Stable ordered names (pod-0, pod-1) |
| Storage | Shared or ephemeral | Dedicated PVC per pod |
| Scaling order | Any order | Sequential ordered |
| Use case | Stateless apps | Stateful apps |
| Example | React, FastAPI | PostgreSQL, Redis, Kafka |

### Q11. What is the difference between ClusterIP, NodePort, and LoadBalancer?

| Type | Accessible From | Use Case |
|---|---|---|
| ClusterIP | Inside cluster only | Internal services like backend, database |
| NodePort | Outside via node IP and port | Development and testing only |
| LoadBalancer | Public internet via Azure LB | Production frontend, ingress controller |

### Q12. How would you troubleshoot a pod stuck in CrashLoopBackOff?

```bash
# Check current logs
kubectl logs <pod-name> -n hydrus-prod

# Check previous container logs before crash
kubectl logs <pod-name> -n hydrus-prod --previous

# Describe pod for events and status
kubectl describe pod <pod-name> -n hydrus-prod

# Check all events in namespace
kubectl get events -n hydrus-prod --sort-by='.lastTimestamp'

# Shell into pod if it starts briefly
kubectl exec -it <pod-name> -n hydrus-prod -- /bin/sh
```

Common causes: missing environment variables, wrong image, OOM kill, failed health checks

### Q13. How do readiness and liveness probes improve reliability?

- Readiness probe - Pod only receives traffic when it is truly ready
  - Prevents 503 errors during application startup
  - Removes pod from load balancer rotation if it becomes unhealthy
- Liveness probe - Kubernetes restarts pod if application is stuck or deadlocked
  - Detects infinite loops and deadlocks automatically
  - Self-healing without manual intervention required

### Q14. Which metrics did you use for HPA and why?

- CPU utilization at 70% - Primary metric because it directly reflects request load
- Memory utilization at 80% - Secondary metric to prevent OOM kills
- 70% CPU threshold leaves 30% headroom for traffic spikes before new pods start
- Memory at 80% gives time to scale before pods get killed by OOM killer

---

## Task 4 - CI/CD Q&A

### Q15. Explain CI vs CD.

- CI (Continuous Integration) - Automatically build, test, and validate code on every commit. Catches bugs early before merging.
- CD (Continuous Delivery) - Automatically deploy to staging after CI passes. Manual approval gate for production deployment.
- CD (Continuous Deployment) - Fully automated deployment all the way to production without any manual approval.

### Q16. How would you implement rollback for a failed deployment?

```bash
# Immediate rollback to previous version
kubectl rollout undo deployment/backend -n hydrus-prod

# Check rollout history
kubectl rollout history deployment/backend -n hydrus-prod

# Rollback to a specific revision
kubectl rollout undo deployment/backend --to-revision=2 -n hydrus-prod

# Verify rollback status
kubectl rollout status deployment/backend -n hydrus-prod
```

In GitHub Actions pipeline, automatic rollback is triggered on failure using the if: failure() condition.

### Q17. What is the difference between rolling update and blue-green deployment?

| Feature | Rolling Update | Blue-Green |
|---|---|---|
| Downtime | Zero downtime | Zero downtime |
| Resources needed | Same resources | Double resources required |
| Rollback speed | Slow gradual | Instant just switch traffic |
| Risk level | Gradual lower risk | All-at-once switch |
| Best for | Regular updates | Major version releases |

### Q18. How would you protect secrets used by the pipeline?

1. GitHub Secrets - Store AZURE_CREDENTIALS and ACR passwords as encrypted secrets
2. Never log secrets - Mask sensitive values in all pipeline output
3. Azure Key Vault - Fetch secrets at runtime, never stored in code or repo
4. Least privilege - Service principal with minimum required permissions only
5. Secret rotation - Regular rotation schedule for all credentials
6. OIDC authentication - Keyless authentication with Azure, no long-lived credentials
