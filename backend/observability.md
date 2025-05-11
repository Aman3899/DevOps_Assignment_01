# Observability Setup for MERN Blog App

This document outlines the observability setup for our MERN stack blog application, including OpenTelemetry for tracing, Prometheus for metrics collection, and Grafana for visualization.

## Tools Used

1. **OpenTelemetry**: For distributed tracing and instrumentation
2. **Prometheus**: For metrics collection and storage
3. **Grafana**: For metrics visualization and dashboards
4. **Jaeger**: For distributed tracing visualization

## Metrics Collected

- **HTTP Request Rate**: Number of requests per second
- **Error Rate**: Number of 4xx/5xx errors per second
- **Latency**: Response time percentiles (p95, p99)
- **Custom App-Level Metrics**: MongoDB operations, authentication events

## Setup Instructions

### 1. Prerequisites

- Docker and Docker Compose installed
- Node.js and npm installed (for local development)

### 2. Configuration Files

The following configuration files are included in the project:

- `backend/prometheus.yml`: Prometheus configuration
- `backend/tracing.js`: OpenTelemetry configuration
- `grafana/provisioning/datasources/datasource.yml`: Grafana datasource configuration
- `grafana/dashboards/blog-app-dashboard.json`: Pre-configured Grafana dashboard
- `docker-compose-observability.yml`: Docker Compose file with all observability services

### 3. Running the Observability Stack

\`\`\`bash
# Start the entire stack with observability tools
docker-compose -f docker-compose-observability.yml up -d

# Check if all services are running
docker-compose -f docker-compose-observability.yml ps
\`\`\`

### 4. Accessing the Dashboards

- **Grafana**: http://localhost:3001 (login with admin and password is my Laptop's password)
- **Prometheus**: http://localhost:9090
- **Jaeger UI**: http://localhost:16686

### 5. Metrics Endpoints

- Backend metrics: http://localhost:3000/metrics

## Dashboard Screenshots

![HTTP Request Rate Dashboard](./screenshots/request-rate.png)
![Error Rate Dashboard](./screenshots/error-rate.png)
![Latency Dashboard](./screenshots/latency.png)

## Troubleshooting

### Common Issues

1. **Prometheus can't scrape metrics**:
   - Check if the backend service is exposing metrics on the `/metrics` endpoint
   - Verify the Prometheus configuration in `prometheus.yml`
   - Ensure network connectivity between Prometheus and the backend service

2. **Traces not appearing in Jaeger**:
   - Verify that the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable is correctly set
   - Check if Jaeger is running and accessible
   - Look for any errors in the backend service logs related to OpenTelemetry

3. **Grafana dashboards not showing data**:
   - Verify that the Prometheus datasource is correctly configured in Grafana
   - Check if Prometheus is collecting metrics from the backend
   - Ensure the dashboard queries match the metric names exposed by the application

## Adding Custom Metrics

To add custom metrics to the application:

1. Import the Prometheus client in your code:
   \`\`\`javascript
   const promClient = require('prom-client');
   \`\`\`

2. Create a new metric:
   \`\`\`javascript
   const myCustomMetric = new promClient.Counter({
     name: 'my_custom_metric',
     help: 'Description of my custom metric',
     labelNames: ['label1', 'label2']
   });
   
   // Register the metric
   register.registerMetric(myCustomMetric);
   \`\`\`

3. Increment the metric in your code:
   \`\`\`javascript
   myCustomMetric.inc({ label1: 'value1', label2: 'value2' });
   \`\`\`

4. Add the metric to your Grafana dashboard by creating a new panel with the appropriate query.
\`\`\`

```terraform file="terraform/main.tf"
provider "aws" {
  region = var.aws_region
}

# VPC
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "${var.project_name}-vpc"
  cidr = var.vpc_cidr

  azs             = var.availability_zones
  private_subnets = var.private_subnet_cidrs
  public_subnets  = var.public_subnet_cidrs

  enable_nat_gateway = true
  single_nat_gateway = true
  enable_vpn_gateway = false

  # Required for EKS
  enable_dns_hostnames = true
  enable_dns_support   = true

  public_subnet_tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
    "kubernetes.io/role/elb"                    = "1"
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"           = "1"
  }

  tags = var.tags
}

# EKS Cluster
module "eks" {
  source = "terraform-aws-modules/eks/aws"
  version = "19.15.3"

  cluster_name    = var.cluster_name
  cluster_version = var.kubernetes_version

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  cluster_endpoint_public_access = true

  eks_managed_node_group_defaults = {
    ami_type       = "AL2_x86_64"
    instance_types = ["t3.medium"]
    
    attach_cluster_primary_security_group = true
  }

  eks_managed_node_groups = {
    app_nodes = {
      min_size     = var.min_node_count
      max_size     = var.max_node_count
      desired_size = var.desired_node_count

      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"

      labels = {
        Environment = var.environment
      }

      tags = var.tags
    }
  }

  tags = var.tags
}

# IAM role for the Kubernetes service account
module "load_balancer_controller_irsa_role" {
  source = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "5.30.0"

  role_name = "aws-load-balancer-controller"
  
  attach_load_balancer_controller_policy = true

  oidc_providers = {
    ex = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["kube-system:aws-load-balancer-controller"]
    }
  }

  tags = var.tags
}

# AWS Load Balancer Controller Helm Release
resource "helm_release" "aws_load_balancer_controller" {
  depends_on = [module.eks]
  
  name       = "aws-load-balancer-controller"
  repository = "https://aws.github.io/eks-charts"
  chart      = "aws-load-balancer-controller"
  namespace  = "kube-system"
  version    = "1.5.3"

  set {
    name  = "clusterName"
    value = var.cluster_name
  }

  set {
    name  = "serviceAccount.create"
    value = "true"
  }

  set {
    name  = "serviceAccount.name"
    value = "aws-load-balancer-controller"
  }

  set {
    name  = "serviceAccount.annotations.eks\\.amazonaws\\.com/role-arn"
    value = module.load_balancer_controller_irsa_role.iam_role_arn
  }
}

# Kubernetes provider configuration
provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
  
  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args        = ["eks", "get-token", "--cluster-name", var.cluster_name]
  }
}

# Helm provider configuration
provider "helm" {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
    
    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      args        = ["eks", "get-token", "--cluster-name", var.cluster_name]
    }
  }
}