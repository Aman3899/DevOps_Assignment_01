# Use an official lightweight Node.js image as the base
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json separately for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy only necessary files
COPY . .

# Use a minimal runtime image for security & size optimization
FROM node:18-alpine

# Set a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Set the working directory
WORKDIR /app

# Copy only required files from the builder stage
COPY --from=builder /app .

# Expose the necessary port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
