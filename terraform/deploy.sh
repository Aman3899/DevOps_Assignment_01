#!/bin/bash

# Exit on any error
set -e

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if Terraform is installed
if ! command -v terraform &> /dev/null; then
    echo "Terraform is not installed. Please install it first."
    exit 1
fi

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo "kubectl is not installed. Please install it first."
    exit 1
fi

# Set variables
AWS_REGION=$(terraform output -raw region 2>/dev/null || echo "us-east-1")
CLUSTER_NAME=$(terraform output -raw cluster_id 2>/dev/null || echo "blog-app-cluster")
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "=== Deploying Blog App to AWS ==="
echo "AWS Region: $AWS_REGION"
echo "Cluster Name: $CLUSTER_NAME"
echo "AWS Account ID: $AWS_ACCOUNT_ID"

# Initialize Terraform
echo "Initializing Terraform..."
terraform init

# Apply Terraform configuration with auto-approve and using tfvars file
echo "Applying Terraform configuration..."
terraform apply -auto-approve

# Configure kubectl
echo "Configuring kubectl..."
aws eks update-kubeconfig --region $AWS_REGION --name $CLUSTER_NAME

# Create ECR repositories if they don't exist
echo "Creating ECR repositories..."
aws ecr describe-repositories --repository-names blog-app-frontend --region $AWS_REGION || \
    aws ecr create-repository --repository-name blog-app-frontend --region $AWS_REGION
aws ecr describe-repositories --repository-names blog-app-backend --region $AWS_REGION || \
    aws ecr create-repository --repository-name blog-app-backend --region $AWS_REGION

# Login to ECR
echo "Logging in to ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build and push Docker images
echo "Building and pushing Docker images..."
cd ..

# Backend
echo "Building backend image..."
docker build -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/blog-app-backend:latest ./backend
echo "Pushing backend image..."
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/blog-app-backend:latest

# Frontend
echo "Building frontend image..."
docker build -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/blog-app-frontend:latest ./frontend
echo "Pushing frontend image..."
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/blog-app-frontend:latest

cd terraform

# Create Kubernetes secrets
echo "Creating Kubernetes secrets..."
kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -

# Create Kubernetes secrets for MongoDB and JWT
kubectl create secret generic blog-app-secrets \
  --from-literal=mongo-uri="mongodb://admin:password@mongodb-service:27017/blog-app?authSource=admin" \
  --from-literal=jwt-secret="your-jwt-secret-key" \
  --dry-run=client -o yaml | kubectl apply -f -

# Replace placeholders in deployment file
echo "Preparing deployment file..."
sed -e "s/\${AWS_ACCOUNT_ID}/$AWS_ACCOUNT_ID/g" \
    -e "s/\${AWS_REGION}/$AWS_REGION/g" \
    eks-deployment.yaml > eks-deployment-ready.yaml

# Apply Kubernetes manifests
echo "Applying Kubernetes manifests..."
kubectl apply -f eks-deployment-ready.yaml

# Wait for deployments to be ready
echo "Waiting for deployments to be ready..."
kubectl rollout status deployment/blog-app-backend
kubectl rollout status deployment/blog-app-frontend

# Get the ALB URL
echo "Getting the Application Load Balancer URL..."
sleep 30  # Give some time for the ALB to be provisioned
ALB_URL=$(kubectl get ingress blog-app-ingress -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')

echo "=== Deployment Complete ==="
echo "Your application is available at: http://$ALB_URL"
echo "It may take a few minutes for the DNS to propagate and the application to be fully available."
