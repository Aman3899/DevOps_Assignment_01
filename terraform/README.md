# AWS Infrastructure with Terraform for Blog App

This directory contains Terraform configurations to deploy the Blog App infrastructure on AWS, including a VPC, EKS cluster, and all necessary components.

## Architecture

The infrastructure consists of:

- **VPC** with public and private subnets across multiple availability zones
- **EKS Cluster** for running Kubernetes workloads
- **AWS Load Balancer Controller** for managing Kubernetes ingress resources
- **IAM Roles** for service accounts with necessary permissions

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) (v1.0.0 or newer)
- [AWS CLI](https://aws.amazon.com/cli/) configured with appropriate credentials
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) for interacting with the Kubernetes cluster

## Getting Started

### 1. Initialize Terraform

\`\`\`bash
terraform init
\`\`\`

### 2. Review the Execution Plan

\`\`\`bash
terraform plan
\`\`\`

### 3. Apply the Configuration

\`\`\`bash
terraform apply
\`\`\`

### 4. Configure kubectl to Connect to the EKS Cluster

After the infrastructure is provisioned, configure kubectl to connect to your EKS cluster:

\`\`\`bash
aws eks update-kubeconfig --region $(terraform output -raw region) --name $(terraform output -raw cluster_id)
\`\`\`

## Deploying the Application

Once the infrastructure is provisioned, you can deploy the application using Helm:

\`\`\`bash
# Navigate to the Helm chart directory
cd ../kubernetes/helm/charts

# Install the application
helm install blog-app . -f values-dev.yaml
\`\`\`

## Cleaning Up

To destroy all resources created by Terraform:

\`\`\`bash
terraform destroy
\`\`\`

## Configuration

You can customize the deployment by modifying the variables in `variables.tf`. Key variables include:

- `aws_region`: AWS region to deploy resources
- `cluster_name`: Name of the EKS cluster
- `kubernetes_version`: Kubernetes version to use
- `min_node_count`, `max_node_count`, `desired_node_count`: Node group scaling configuration

## Remote State (Optional)

For team environments, it's recommended to use remote state storage. Uncomment and configure the `backend.tf` file with your S3 bucket and DynamoDB table details.

## Security Considerations

- The EKS cluster is configured with public endpoint access for demonstration purposes. For production, consider restricting access.
- IAM roles follow the principle of least privilege.
- All resources are tagged for better organization and cost tracking.