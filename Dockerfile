# Stage 1: Build the app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if any)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the Next.js app for production
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

# Set non-root user for security
RUN adduser -D appuser
USER appuser

WORKDIR /app

# Copy the build output and node_modules from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "start"]
