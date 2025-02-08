# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy only package.json and pnpm-lock.yaml first
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# **Force a clean install**
RUN pnpm store prune && rm -rf node_modules pnpm-lock.yaml && pnpm install --no-frozen-lockfile

# Copy the rest of the project files
COPY . .

# Build the project
RUN turbo run build

# Expose ports (modify as needed)
EXPOSE 3000 4000

# Start the application
CMD ["turbo", "run", "start"]
