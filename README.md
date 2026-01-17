# Chandabaz Report - Anonymous Reporting Platform

A full-stack anonymous reporting platform built with **Next.js 14**, **Go (Fiber)**, **PostgreSQL**, and **Redis**.

## Project Structure

```text
/root
├── docker-compose.yml      # Orchestrates DB, Redis, and full-stack Docker runs
├── frontend/               # Next.js Application (Client)
│   ├── Dockerfile          # Multi-stage build for Dev & Prod
│   └── ...
└── backend/                # Go Application (API + Worker)
    ├── Dockerfile          # Multi-stage build with FFmpeg
    ├── cmd/server/         # Entry point (main.go)
    └── ...
```

## Prerequisites

Before you start, ensure you have the following installed:

1.  **Docker & Docker Compose** (Required for Database/Redis)
2.  **Go 1.21+** (For local backend dev)
3.  **Node.js 20+** (For local frontend dev)
4.  **FFmpeg** (Required locally for backend video processing)
    * Mac: `brew install ffmpeg`
    * Windows: `winget install ffmpeg`
    * Linux: `sudo apt install ffmpeg`
---

## Option 1: Hybrid Development (Recommended)
*Run Infrastructure in Docker, but run Code locally for speed and debugging.*

### 1. Configure Environment Variables
Create `.env` files in both folders.

**backend/.env**
```bash
PORT=8080
APP_ENV=development

# Database Config (Use 'localhost' for Hybrid Dev)
DB_HOST=localhost
DB_PORT=5432
DB_USER=user
DB_PASSWORD=pass
DB_NAME=ransomdb
DB_SSLMODE=disable
DB_TIMEZONE=Asia/Dhaka

# Redis Config
REDIS_HOST=localhost
REDIS_PORT=6379
```

**frontend/.env**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 2. Start Infrastructure (DB & Redis)
From the **Root** folder, run:
```bash
docker compose up db redis -d
```
* **Postgres** will listen on `localhost:5432`.
* **Redis** will listen on `localhost:6379`.

### 3. Start Backend (Go)
Open a new terminal:
```bash
cd backend
go mod tidy            # Download dependencies
go run cmd/server/main.go
# OR if you have Air installed:
# air
```
* Backend runs at: `http://localhost:8080`

### 4. Start Frontend (Next.js)
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
* Frontend runs at: `http://localhost:3000`

---

## Option 2: Full Docker Mode
*Run everything inside containers. Best for testing Production-like behavior.*

### 1. Update Environment for Docker Network
If running fully in Docker, the containers talk to each other via service names (`db`, `redis`), not `localhost`.

**Open docker-compose.yml** and ensure the `backend` service has these environment overrides (or update your `.env` temporarily):
```yaml
# Inside docker-compose.yml under 'backend' service:
environment:
  - DB_HOST=db        # Docker service name
  - REDIS_HOST=redis  # Docker service name
```

### 2. Build and Run
From the **Root** folder:
```bash
docker compose up --build
```

* **Frontend:** `http://localhost:3000`
* **Backend:** `http://localhost:8080`
* **Database:** Internal Only (Port 5432)

---

## Commands & Utilities

### Database Migrations
Migrations run automatically when the Backend starts. Check the logs for:
`Migration completed!`

### Port Conflicts?
If you see `Bind for 0.0.0.0:5432 failed`, it means you have a local Postgres running.
* **Fix:** Stop local Postgres (`brew services stop postgresql` or `sudo systemctl stop postgresql`).
* **Force Fix:** Kill whatever is on that port:
    ```bash
    sudo lsof -i :5432  # Get PID
    sudo kill -9 <PID>
    ```

### Clean Up Docker
To stop everything and remove volumes (RESET DATABASE):
```bash
docker compose down -v
```

---

## Deployment (Production)

The project is pre-configured for deployment.
1.  Copy project to VPS.
2.  Update `.env` files with production secrets (S3 keys, real DB passwords).
3.  Run:
    ```bash
    docker compose up --build -d
    ```
