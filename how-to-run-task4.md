<h1 align="center">🚀 GitOps (40 Marks) 🚀</h1>

<div align="center">
  <p>This section provides the necessary credentials and commands to interact with your GitOps setup.</p>
</div>

<hr style="border: 2px solid #007bff; border-radius: 5px;">

## 🔑 GitOps Credentials

Here are your GitOps login details:

* **Username:** `admin`
* **Password:** `ok68VIslRDjAClt1`

<div style="background-color: #f0f8ff; border: 1px solid #add8e6; padding: 15px; border-radius: 5px;">
  <p>⚠️ <strong>Important:</strong> Please treat your password with utmost care. Avoid sharing it and ensure it is stored securely.</p>
</div>

<hr style="border: 1px dashed #ccc;">

## ⚙️ Applying Argo CD Configuration

To apply the Argo CD application configuration, execute the following `kubectl` command:
```
kubectl apply -f argocd/application.yml
```