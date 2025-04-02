      
# Assignment 2: Advanced Deployment Strategies with Kubernetes, Helm, Service Mesh, and GitOps

This repository contains the solution for Assignment 2, demonstrating advanced deployment strategies using a sample application deployed on Kubernetes. It utilizes Helm for packaging, Linkerd for service mesh capabilities (observability, traffic splitting), and Argo CD for implementing GitOps workflows.

## Project Overview

The goal is to deploy a simple application (consisting of a frontend and a backend service) onto a Kubernetes cluster and manage its lifecycle using modern DevOps tools and practices:

1.  **Kubernetes Deployment:** Basic deployment using raw Kubernetes manifests.
2.  **Helm Packaging:** Packaging the application into a Helm chart for templating and release management.
3.  **Service Mesh (Linkerd):** Integrating Linkerd to gain observability, reliability, and enable advanced traffic management like Canary deployments.
4.  **GitOps (Argo CD):** Using Argo CD to automate the deployment process based on the state of this Git repository.

## Folder Structure
```
ASSIGNMENT_01/
├── .github/ # GitHub Actions workflows (e.g., CI for building images)
├── argocd/ # Argo CD Application manifests (e.g., application.yaml)
├── backend/ # Backend application source code (Requires Dockerfile)
├── frontend/ # Frontend application source code (Requires Dockerfile)
├── kubernetes/
│ ├── helm/charts/ # Helm chart for the application
│ │ ├── myapp/ # Helm chart directory (created via helm create)
│ │ │ ├── templates/ # Kubernetes manifest templates
│ │ │ ├── Chart.yaml # Chart metadata
│ │ │ ├── values.yaml # Default configuration values
│ │ │ ├── values-dev.yaml # Development environment values
│ │ │ └── values-prod.yaml # Production environment values
│ └── manifests/ # Raw Kubernetes manifests (for Task 1)
│ ├── namespace.yaml
│ ├── server-deployment.yaml
│ ├── client-deployment.yaml
│ └── ingress.yaml # (Example manifests)
├── scripts/ # Utility scripts
│ ├── generate-secrets.sh # (Optional: Script for secrets)
│ └── linkerd-install.sh # Script to install Linkerd CLI and control plane
├── service-mesh/
│ └── linkerd/ # Linkerd specific configurations
│ ├── service-profile/ # (Optional: Linkerd ServiceProfiles)
│ └── traffic-split.yaml # (Example: For Canary Deployments)
├── docker-compose.yml # Optional: For local development setup
├── health_check.sh # Script to check application health
└── README.md # This file
```
      
## Prerequisites

Ensure you have the following tools installed and configured:

*   `kubectl`: Kubernetes command-line tool.
*   `helm`: Kubernetes package manager.
*   `linkerd` CLI: Linkerd command-line tool.
*   `docker`: Containerization tool (for building images).
*   A running Kubernetes cluster (e.g., Minikube, Kind, k3d, GKE, EKS, AKS).
*   `git`: Version control system.
*   Argo CD: Installed in your cluster (see Task 4).
*   (Optional) An Ingress controller installed in your cluster (like Nginx Ingress) if using Ingress resources.

## Setup

1.  **Clone the Repository:**
    ```bash
    git clone <your-repo-url>
    cd ASSIGNMENT_01
    ```
2.  **Start Kubernetes Cluster:** Ensure your chosen Kubernetes cluster is running.
    *(Example for Minikube)*
    ```bash
    minikube start --cpus=4 --memory=4096 # Adjust resources as needed
    # If using Ingress
    minikube addons enable ingress
    ```
3.  **(Optional) Build & Push Docker Images:** Build your actual `frontend` and `backend` application images and push them to a container registry (like Docker Hub, GHCR, etc.). Update the image references in `kubernetes/helm/charts/myapp/values-*.yaml`. This step can be automated using GitHub Actions (see `.github/workflows/`).

## Deployment and Usage

Follow these tasks sequentially to deploy and manage the application.

### Task 1: Basic Kubernetes Deployment (Raw Manifests)

This step deploys the application using basic Kubernetes YAML files.

1.  **Create Namespace:**
    ```bash
    kubectl apply -f kubernetes/manifests/namespace.yaml
    ```
2.  **Deploy Application Components:**
    *(Ensure manifests in `kubernetes/manifests/` define your Deployments, Services, etc.)*
    ```bash
    kubectl apply -f kubernetes/manifests/ -n myapp
    ```
3.  **Verify:**
    ```bash
    kubectl get all -n myapp
    # Check pods, services, ingress status
    ```
4.  **(Optional) Clean Up:**
    ```bash
    kubectl delete -f kubernetes/manifests/ -n myapp
    ```

### Task 2: Helm Packaging

Package the application using Helm for better manageability and configuration.

1.  **Navigate to Chart:** The Helm chart `myapp` should be located in `kubernetes/helm/charts/`.
2.  **Deploy using Helm (Development):**
    ```bash
    helm install myapp-dev kubernetes/helm/charts/myapp \
      -f kubernetes/helm/charts/myapp/values-dev.yaml \
      -n myapp --create-namespace
    ```
3.  **Verify:**
    ```bash
    helm list -n myapp
    kubectl get all -n myapp
    ```
4.  **Upgrade (Example):** If you make changes to the chart or values:
    ```bash
    helm upgrade myapp-dev kubernetes/helm/charts/myapp \
      -f kubernetes/helm/charts/myapp/values-dev.yaml \
      -n myapp
    ```
5.  **Uninstall:**
    ```bash
    helm uninstall myapp-dev -n myapp
    ```

### Task 3: Service Mesh Integration (Linkerd)

Integrate Linkerd for observability, mTLS, and advanced traffic management.

1.  **Install Linkerd:**
    *   Install the Linkerd CLI (if not already done): `curl -sL https://run.linkerd.io/install | sh`
    *   Install the Linkerd control plane:
        ```bash
        # Run the install script or commands manually
        sh scripts/linkerd-install.sh
        # Verify installation
        linkerd check
        ```
2.  **Enable Linkerd Injection:** Ensure your Helm chart's Deployment templates (`templates/*-deployment.yaml`) include the `linkerd.io/inject: enabled` annotation in the pod template metadata:
    ```yaml
    # ... inside spec.template.metadata
    annotations:
      linkerd.io/inject: enabled
    ```
3.  **Deploy/Upgrade with Helm:** Deploy or upgrade your application using Helm (as in Task 2). The Linkerd proxy injector will automatically add the sidecar container.
    ```bash
    helm upgrade --install myapp-dev kubernetes/helm/charts/myapp \
      -f kubernetes/helm/charts/myapp/values-dev.yaml \
      -n myapp --create-namespace
    ```
4.  **Verify Linkerd Integration:**
    ```bash
    # Check if pods have 2/2 containers ready (app + linkerd-proxy)
    kubectl get pods -n myapp
    # Check Linkerd status for the namespace
    linkerd check --proxy -n myapp
    # Open the Linkerd dashboard
    linkerd viz dashboard &
    # View stats
    linkerd viz stat deploy -n myapp
    ```
5.  **(Bonus) Canary Deployment:**
    *   Deploy a new "canary" version of a service (e.g., `backend`) using Helm with a different image tag and potentially a different service name (e.g., `backend-service-canary`).
    *   Apply a `TrafficSplit` resource (like `service-mesh/linkerd/traffic-split.yaml`) to route a percentage of traffic to the canary.
    *   Monitor the canary using the Linkerd dashboard.

### Task 4: GitOps with Argo CD

Automate deployments based on Git repository state using Argo CD.

1.  **Install Argo CD:**
    ```bash
    kubectl create namespace argocd
    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
    # Access Argo CD UI (Port-forward or Ingress)
    kubectl port-forward svc/argocd-server -n argocd 8080:443 &
    # Get initial admin password
    argocd admin initial-password -n argocd
    ```
2.  **Define Argo CD Application:** Create an `Application` manifest (e.g., in `argocd/application.yaml`) pointing to your Git repository and the Helm chart path.
    ```yaml
    # Example: argocd/application.yaml
    apiVersion: argoproj.io/v1alpha1
    kind: Application
    metadata:
      name: myapp-dev
      namespace: argocd
    spec:
      project: default
      source:
        repoURL: <your-git-repo-url> # e.g., https://github.com/yourusername/your-repo.git
        path: kubernetes/helm/charts/myapp
        targetRevision: main # Or specific branch/tag
        helm:
          valueFiles:
          - values-dev.yaml # Specify which values file to use
      destination:
        server: https://kubernetes.default.svc
        namespace: myapp
      syncPolicy:
        automated: # Optional: Enable auto-sync
          prune: true
          selfHeal: true
        syncOptions:
        - CreateNamespace=true # Automatically create the namespace if it doesn't exist
    ```
3.  **Apply the Application Manifest:**
    ```bash
    kubectl apply -f argocd/application.yaml
    ```
4.  **Verify in Argo CD:** Access the Argo CD UI (or use `argocd` CLI) to check the application status. It should sync and deploy the Helm chart to the `myapp` namespace.
5.  **GitOps Workflow:**
    *   Make changes in your Git repository (e.g., update image tag in `values-dev.yaml`, modify Helm templates).
    *   Commit and push the changes to the `targetRevision` branch (e.g., `main`).
    *   Argo CD will automatically detect the changes (if auto-sync is enabled) or show 'OutOfSync'.
    *   Argo CD applies the changes to the cluster, ensuring the cluster state matches the Git repository state.

## Health Check

Use the provided script to perform a basic health check of the deployed application (you might need to adapt it based on your application's endpoints and Ingress setup).

```bash
# Ensure Ingress is accessible (e.g., update /etc/hosts or use port-forward)
sh scripts/health_check.sh

    