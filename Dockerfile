# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy only package.json and pnpm-lock.yaml first to leverage Docker caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies in the monorepo root
RUN pnpm install --no-frozen-lockfile --filter=!eslint-config

# Copy the rest of the repo
COPY . .

# Build the project
RUN turbo run build

# Expose ports (adjust based on your frontend/backend configuration)
EXPOSE 3000 4000

# Start the application
CMD ["turbo", "run", "start"]
