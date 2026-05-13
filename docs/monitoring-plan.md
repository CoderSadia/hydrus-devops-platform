# Monitoring and Logging Plan

## Overview

This document describes the monitoring and logging strategy for the
Hydrus DevOps Platform running on Azure Kubernetes Service (AKS).

## Monitoring Stack

- Prometheus - Metrics collection from pods and nodes
- Grafana - Metrics visualization and dashboards
- Azure Monitor - Azure-native infrastructure monitoring
- Loki - Log aggregation and querying
- Alertmanager - Alert routing and notifications

## Prometheus and Grafana Setup

### Install via Helm

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace

helm install grafana grafana/grafana \
  --namespace monitoring \
  --set adminPassword=hydrus-grafana-2026
```

## Cluster Health Monitoring

```bash
kubectl get nodes -o wide
kubectl top pods -n hydrus-prod
kubectl top nodes
kubectl get events -n hydrus-prod --sort-by='.lastTimestamp'
```

## Key Metrics to Monitor

| Metric | Tool | Alert Threshold |
|--------|------|-----------------|
| CPU Usage | Prometheus | > 80% for 5min |
| Memory Usage | Prometheus | > 85% for 5min |
| Pod Restart Count | Prometheus | > 3 in 1 hour |
| API Response Time | Prometheus | > 500ms avg |
| Error Rate (5xx) | Prometheus | > 1% |
| Node Disk Usage | Prometheus | > 85% |

## Application Monitoring

### Backend API Metrics
- Request rate (req/min)
- Response time (p50, p95, p99)
- Error rate (4xx, 5xx)
- Active connections
- Database query time

### Frontend Metrics
- Page load time
- JavaScript errors
- User sessions

## Logging Strategy

### Log Collection with Loki

```bash
helm install loki grafana/loki-stack \
  --namespace monitoring \
  --set grafana.enabled=false \
  --set prometheus.enabled=false
```

### Log Levels
- ERROR - Application errors and exceptions
- WARN - Performance degradation and retries
- INFO - Request/response and deployments
- DEBUG - Development environment only

### Useful Log Commands

```bash
# Backend logs
kubectl logs -f deployment/backend -n hydrus-prod

# Frontend logs
kubectl logs -f deployment/frontend -n hydrus-prod

# Previous container logs after crash
kubectl logs deployment/backend -n hydrus-prod --previous
```

## Alert Configuration

### Critical Alerts (PagerDuty and Slack)
- Pod CrashLoopBackOff
- Node NotReady
- API error rate > 5%
- Database connection failed
- PVC > 90% full

### Warning Alerts (Slack only)
- CPU > 80% for 5 minutes
- Memory > 85% for 5 minutes
- Pod restart > 3 times in 1 hour
- API response time > 500ms

### Prometheus Alert Rules

```yaml
groups:
  - name: hydrus-alerts
    rules:
      - alert: HighCPUUsage
        expr: container_cpu_usage_seconds_total > 0.8
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage detected"

      - alert: PodCrashLooping
        expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Pod is crash looping"

      - alert: HighAPIResponseTime
        expr: http_request_duration_seconds{quantile="0.95"} > 0.5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "API response time is high"
```

## Grafana Dashboards

### Recommended Dashboards
- ID 315 - Kubernetes cluster monitoring
- ID 6417 - Kubernetes pods monitoring
- ID 1860 - Node exporter full
- ID 7362 - PostgreSQL database

## Azure Monitor Integration

```bash
az aks enable-addons \
  --resource-group hydrus-rg-dev \
  --name hydrus-aks-dev \
  --addons monitoring
```
