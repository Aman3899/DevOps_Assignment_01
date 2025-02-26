# DevOps Assignment 1: Containerized Development & CI/CD Pipeline

## **Table of Contents**
- [Project Overview](#project-overview)
- [System Setup](#system-setup)
- [Task 1: Linux System Administration](#task-1-linux-system-administration)
- [Task 2: Bash Scripting](#task-2-bash-scripting)
- [Task 3: Docker & Docker Compose](#task-3-docker--docker-compose)
- [Task 4: Continuous Integration (CI)](#task-4-continuous-integration-ci)
- [Submission Instructions](#submission-instructions)

---

## **Project Overview**
This project aims to set up a containerized web application development workflow using Docker and automate the CI/CD process with GitHub Actions.

---

## **System Setup**
### **Prerequisites**
Ensure the following are installed:
- Linux OS (Ubuntu 20.04+)
- Docker & Docker Compose
- Git
- Node.js & npm (for backend/frontend)
- Python (for scripting)
- GitHub Actions (for CI/CD)

---

## **Task 1: Linux System Administration (Done by Ismail Daniyal)**

### **Step 1: Creating a systemd Service**
```bash
sudo nano /etc/systemd/system/express.service
```
Add the following content:
```ini
[Unit]
Description=Express.js Web Server
After=network.target

[Service]
ExecStart=/usr/bin/node /home/ismaildanial/Desktop/DevOps_Assignment_01/backend/app.js
Restart=always
User=ismaildanial
Environment=NODE_ENV=production
WorkingDirectory=/home/ismaildanial/Desktop/DevOps_Assignment_01/backend

[Install]
WantedBy=multi-user.target
```bash
sudo systemctl daemon-reload
sudo systemctl enable express
sudo systemctl start express
```

### **Step 2: Kernel Tuning**
```bash
echo 'net.core.somaxconn=1024' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### **Step 3: Firewall Setup**
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## **Task 2: Bash Scripting**

### **Health Check Script**
```bash
#!/bin/bash
SERVICE_NAME=webapp
if ! systemctl is-active --quiet $SERVICE_NAME; then
    echo "$(date) - $SERVICE_NAME is down. Restarting..." >> /var/log/webapp_monitor.log
    systemctl restart $SERVICE_NAME
fi
```
Save as `health_check.sh` and schedule with cron:
```bash
crontab -e
*/5 * * * * /bin/bash /home/user/health_check.sh
```

### **Log Analysis Script**
```bash
#!/bin/bash
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -3
```
Run:
```bash
bash log_analysis.sh
```

---

## **Task 3: Docker & Docker Compose**

### **Step 1: Dockerfile for Backend (Express.js)**
```dockerfile
FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "server.js"]
EXPOSE 5000
```

### **Step 2: Docker Compose File**
```yaml
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app
  database:
    image: mongo:latest
    ports:
      - "27017:27017"
```
Start the services:
```bash
docker-compose up -d
```

---

## **Task 4: Continuous Integration (CI)**

### **GitHub Actions Workflow**
Create `.github/workflows/ci.yml`:
```yaml
name: CI Pipeline
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Dependencies
        run: npm install

      - name: Run Tests
        run: npm test

      - name: Build Docker Image
        run: docker build -t myapp/backend:latest .

      - name: Push to DockerHub
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
          docker tag myapp/backend:latest mydockerhub/myapp:latest
          docker push mydockerhub/myapp:latest
```

---

## **Submission Instructions**
- Push all code to the private GitHub repository.
- Include scripts, Dockerfiles, and CI/CD workflow configurations.
- Submit a link to the repository.