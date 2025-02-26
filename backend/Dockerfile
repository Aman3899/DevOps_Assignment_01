FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files first (to leverage Docker cache)
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the rest of the application files
COPY . .

FROM node:18-alpine AS production

# Set a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Set the working directory
WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app /app

# Install nodemon globally
RUN npm install -g nodemon

# Expose the necessary port
EXPOSE 3000

# Start the backend using nodemon
CMD ["nodemon", "app.js"]