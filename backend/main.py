from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from datetime import datetime
import os
import time
import psycopg2

load_dotenv()

app = FastAPI(
    title="Hydrus DevOps Platform API",
    description="Backend API for Hydrus DevOps Platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

START_TIME = time.time()

def get_db():
    try:
        conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        return conn, True
    except Exception as e:
        return None, False

@app.get("/")
def root():
    return {
        "message": "Hydrus DevOps Platform API",
        "version": "1.0.0",
        "status": "running",
        "environment": os.getenv("ENVIRONMENT", "development"),
    }

@app.get("/health")
def health_check():
    uptime = round(time.time() - START_TIME, 2)
    _, db_connected = get_db()
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "uptime_seconds": uptime,
        "environment": os.getenv("ENVIRONMENT", "development"),
        "database": "connected" if db_connected else "disconnected",
        "version": "1.0.0",
    }

@app.get("/api/stats")
def get_stats():
    uptime = round(time.time() - START_TIME, 2)
    return {
        "cluster": {
            "name": "hydrus-aks-prod",
            "region": "East US",
            "uptime_percent": 99.98,
            "active_pods": 24,
            "total_pods": 24,
        },
        "performance": {
            "avg_response_ms": 142,
            "error_rate_percent": 0.12,
            "throughput_rpm": 1200,
            "uptime_seconds": uptime,
        },
        "resources": {
            "cpu_percent": 62,
            "memory_percent": 53,
            "memory_used_gb": 4.2,
            "memory_total_gb": 8,
            "storage_percent": 34,
            "storage_used_gb": 28,
        },
        "deployments_today": 7,
        "timestamp": datetime.utcnow().isoformat(),
    }

@app.get("/api/services")
def get_services():
    return {
        "services": [
            {
                "name": "Frontend",
                "type": "React + Vite",
                "status": "Running",
                "replicas": "2/2",
                "latency_ms": 38,
                "uptime_percent": 100,
                "restarts": 0,
                "image": "hydrusacr.azurecr.io/frontend:v1.2.3",
            },
            {
                "name": "Backend API",
                "type": "Python FastAPI",
                "status": "Running",
                "replicas": "2/2",
                "latency_ms": 142,
                "uptime_percent": 99.91,
                "restarts": 1,
                "image": "hydrusacr.azurecr.io/backend:v1.2.3",
            },
            {
                "name": "PostgreSQL",
                "type": "Database",
                "status": "Running",
                "replicas": "1/1",
                "latency_ms": 12,
                "uptime_percent": 100,
                "restarts": 0,
                "image": "postgres:15-alpine",
            },
            {
                "name": "Ingress Controller",
                "type": "NGINX",
                "status": "Warning",
                "replicas": "2/2",
                "latency_ms": 8,
                "uptime_percent": 99.71,
                "restarts": 3,
                "image": "nginx/nginx-ingress:3.4.0",
            },
        ]
    }

@app.get("/api/pipelines")
def get_pipelines():
    return {
        "pipelines": [
            {
                "id": "#47",
                "name": "frontend · build & push to ACR",
                "branch": "main",
                "commit": "a3f9d2b",
                "author": "sadia",
                "status": "success",
                "duration": "2m 14s",
                "time": "3 mins ago",
            },
            {
                "id": "#46",
                "name": "backend · deploy to AKS",
                "branch": "main",
                "commit": "a3f9d2b",
                "author": "sadia",
                "status": "running",
                "duration": "1m 03s",
                "time": "running now",
            },
            {
                "id": "#45",
                "name": "terraform · infrastructure plan & apply",
                "branch": "main",
                "commit": "91c7e4a",
                "author": "sadia",
                "status": "success",
                "duration": "4m 38s",
                "time": "1 hour ago",
            },
            {
                "id": "#44",
                "name": "backend · unit tests",
                "branch": "develop",
                "commit": "f2d8c1e",
                "author": "sadia",
                "status": "failed",
                "duration": "1m 52s",
                "time": "2 hours ago",
            },
        ]
    }

@app.get("/api/alerts")
def get_alerts():
    return {
        "alerts": [
            {
                "level": "warning",
                "title": "High CPU on backend pod",
                "message": "backend-7d9f8b-xk2p: CPU usage at 87% for 5 minutes",
                "time": "10 mins ago",
            },
            {
                "level": "info",
                "title": "HPA scaled up",
                "message": "backend deployment scaled from 2 to 3 replicas",
                "time": "25 mins ago",
            },
            {
                "level": "success",
                "title": "Deployment successful",
                "message": "frontend:v1.2.3 deployed to AKS successfully",
                "time": "3 mins ago",
            },
            {
                "level": "warning",
                "title": "Ingress controller restarts",
                "message": "ingress-nginx-controller restarted 3 times in 1 hour",
                "time": "1 hour ago",
            },
        ]
    }
