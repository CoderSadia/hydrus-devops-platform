# Troubleshooting Guide

## Production Incident Scenario

### Symptoms
- Backend API high response time
- Users receiving random 503 errors
- Some pods restarting frequently
- High CPU usage during peak traffic

---

### Q19. List possible root causes.

1. Insufficient CPU/memory resource limits for current traffic load
2. Database connection pool exhaustion from too many concurrent connections
3. Memory leak causing gradual memory growth leading to OOM kills
4. Slow or unoptimized database queries blocking application threads
5. HPA not configured or thresholds too high causing no auto-scaling
6. Readiness probe misconfiguration sending traffic to unready pods
7. Intermittent network issues or DNS resolution failures inside cluster
8. Node-level resource pressure affecting all pods on that node

---

### Q20. Provide step-by-step investigation process.

```bash
# Step 1 - Check pod status
kubectl get pods -n hydrus-prod
kubectl describe pod <pod-name> -n hydrus-prod

# Step 2 - Check resource usage
kubectl top pods -n hydrus-prod
kubectl top nodes

# Step 3 - Check application logs
kubectl logs -f deployment/backend -n hydrus-prod
kubectl logs deployment/backend -n hydrus-prod --previous

# Step 4 - Check cluster events
kubectl get events -n hydrus-prod --sort-by='.lastTimestamp'

# Step 5 - Check HPA scaling status
kubectl get hpa -n hydrus-prod
kubectl describe hpa backend-hpa -n hydrus-prod

# Step 6 - Check ingress and services
kubectl get ingress -n hydrus-prod
kubectl describe ingress hydrus-ingress -n hydrus-prod

# Step 7 - Check Azure Monitor metrics
az monitor metrics list \
  --resource /subscriptions/.../managedClusters/hydrus-aks-dev \
  --metric "node_cpu_usage_percentage"
```

---

### Q21. Mention Kubernetes, Azure, and Linux commands you would use.

**Kubernetes:**
```bash
kubectl get pods -n hydrus-prod -o wide
kubectl describe pod <pod> -n hydrus-prod
kubectl logs <pod> -n hydrus-prod --previous
kubectl exec -it <pod> -n hydrus-prod -- /bin/sh
kubectl top pods -n hydrus-prod
kubectl top nodes
kubectl rollout restart deployment/backend -n hydrus-prod
kubectl rollout undo deployment/backend -n hydrus-prod
kubectl scale deployment backend --replicas=5 -n hydrus-prod
```

**Azure:**
```bash
az aks get-credentials --resource-group hydrus-rg-dev --name hydrus-aks-dev
az aks show --resource-group hydrus-rg-dev --name hydrus-aks-dev
az monitor activity-log list --resource-group hydrus-rg-dev
az acr repository list --name hydrusacrsadia2026dev
```

**Linux:**
```bash
top
htop
free -h
df -h
netstat -tulpn
curl -v http://backend-service:8000/health
ping backend-service
nslookup backend-service
```

---

### Q22. Which logs and metrics would you check first?

1. Pod logs - kubectl logs deployment/backend --previous for crash reason
2. Pod events - kubectl describe pod for OOM kills and failed probes
3. CPU and Memory - kubectl top pods for resource exhaustion
4. HPA status - kubectl get hpa to see if scaling is happening
5. Prometheus metrics - API response time p95 and error rate percentage
6. Azure Monitor - Node CPU, memory, disk usage at infrastructure level

---

### Q23. What immediate mitigation would you apply?

```bash
# Scale up replicas immediately
kubectl scale deployment backend --replicas=5 -n hydrus-prod

# Restart unhealthy pods
kubectl rollout restart deployment/backend -n hydrus-prod

# Rollback if recent bad deployment caused the issue
kubectl rollout undo deployment/backend -n hydrus-prod

# Temporarily increase HPA minimum replicas
kubectl patch hpa backend-hpa -n hydrus-prod \
  -p '{"spec":{"minReplicas":4}}'
```

---

### Q24. What long-term preventive actions would you recommend?

1. Set proper resource requests and limits for all containers based on load testing
2. Configure HPA with appropriate CPU and memory thresholds
3. Implement circuit breaker pattern for external service dependencies
4. Use PgBouncer for database connection pooling to prevent exhaustion
5. Run load testing with k6 or Locust before every production release
6. Implement Redis caching for frequently accessed data to reduce DB load
7. Set up Prometheus alerting with PagerDuty integration for critical issues
8. Regular chaos engineering tests to find weaknesses before production incidents
9. Implement rate limiting in Ingress controller to prevent traffic spikes
10. Use Pod Disruption Budgets to ensure minimum availability during node updates

---

## Common Issues

### Pod stuck in CrashLoopBackOff
```bash
kubectl logs <pod> --previous -n hydrus-prod
kubectl describe pod <pod> -n hydrus-prod
# Check: missing env vars, wrong image, port conflicts
```

### ImagePullBackOff
```bash
kubectl describe pod <pod> -n hydrus-prod
# Check: ACR credentials, image name and tag
az acr login --name hydrusacrsadia2026dev
```

### Pod Pending
```bash
kubectl describe pod <pod> -n hydrus-prod
kubectl top nodes
# Check: resource limits, node capacity, PVC binding
```
