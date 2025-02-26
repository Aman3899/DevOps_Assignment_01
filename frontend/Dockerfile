# Use Node.js for building the frontend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all project files and build the frontend
COPY . .
RUN npm run build

# Use Nginx only for serving static files
FROM nginx:alpine AS production

# Ensure the build output exists
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the correct port
EXPOSE 5173

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]