# frontend/Dockerfile

# ---------------------------------------------------
# 1. BASE STAGE (Shared environment)
# ---------------------------------------------------
FROM node:20-alpine AS base
WORKDIR /app
# Install libc6-compat (needed for some Next.js dependencies on Alpine)
RUN apk add --no-cache libc6-compat

# ---------------------------------------------------
# 2. DEPS STAGE (Install dependencies)
# ---------------------------------------------------
FROM base AS deps
COPY package.json package-lock.json* ./
# 'npm ci' is faster and more reliable than 'npm install' for CI/Docker
RUN npm ci

# ---------------------------------------------------
# 3. DEV STAGE (For Local Development)
# ---------------------------------------------------
FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# We just start the dev server here. 
# Code changes are synced via Volumes in docker-compose.
CMD ["npm", "run", "dev"]

# ---------------------------------------------------
# 4. BUILDER STAGE (Compile for Production)
# ---------------------------------------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This creates the optimized production build
RUN npm run build

# ---------------------------------------------------
# 5. RUNNER STAGE (Final Production Image)
# ---------------------------------------------------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only the necessary files for the standalone server
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port and start
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
