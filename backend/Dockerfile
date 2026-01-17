# ---------------------------------------------------
# 1. BASE STAGE (Shared OS + Libraries)
# ---------------------------------------------------
FROM golang:1.21-alpine AS base

# Install System Dependencies
# - git: needed for 'go mod download'
# - ffmpeg: needed for video processing
RUN apk add --no-cache git ffmpeg

WORKDIR /app

# Cache dependencies
COPY go.mod go.sum ./
RUN go mod download

# ---------------------------------------------------
# 2. DEV STAGE (For Local Development with Air)
# ---------------------------------------------------
FROM base AS dev
RUN go install github.com/air-verse/air@latest
COPY . .
CMD ["air", "-c", ".air.toml"]

# ---------------------------------------------------
# 3. BUILDER STAGE (Compile for Prod)
# ---------------------------------------------------
FROM base AS builder
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd/server

# ---------------------------------------------------
# 4. RUNNER STAGE (Production)
# ---------------------------------------------------

FROM alpine:latest AS runner
RUN apk add --no-cache ffmpeg ca-certificates
WORKDIR /app
COPY --from=builder /app/main .
CMD ["./main"]
