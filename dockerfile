# --- Stage 1: Builder ---
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copy package files
COPY package*.json ./

# 2. Install ALL dependencies (we need 'typescript' which is a dev dependency)
RUN npm install

# 3. Copy source code
COPY . .

# 4. BUILD THE CODE (This creates the /dist folder)
# This was the missing step!
RUN npx tsc

# --- Stage 2: Runner ---
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Create unprivileged user
RUN addgroup -S app && adduser -S -G app app

# 5. Install ONLY production dependencies (keeps image small)
COPY package*.json ./
RUN npm ci --only=production

# 6. Copy the compiled JS files from the 'builder' stage
COPY --from=builder /app/dist ./dist

USER app

EXPOSE ${PORT}

# Note: Ensure your server actually listens on /health
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- --timeout=2 http://localhost:${PORT}/health || exit 1

CMD ["node", "dist/index.js"]