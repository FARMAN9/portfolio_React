# Portfolio React

React/Vite portfolio with an optional Express + Prisma backend.

## Local Development

```bash
npm install
npm run dev
```

The frontend falls back to static portfolio data when `VITE_API_URL` is not set.

## Frontend Vercel

This repo includes `vercel.json` for Vite builds and SPA route rewrites.

Set this environment variable in the frontend Vercel project so the hosted frontend can call the backend API:

```bash
VITE_API_URL=https://your-api-domain.com
```

## Backend Vercel

The backend can be deployed as a separate Vercel project from the `backend` directory.

Backend environment variables:

```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="change-me-in-production"
GEMINI_API_KEY=""
```

For production data persistence, use a hosted database URL instead of the local SQLite file.

## Docker

Build and run the frontend container:

```bash
docker build -t portfolio-frontend .
docker run --rm -p 8080:80 portfolio-frontend
```

Run frontend and backend together:

```bash
docker compose up --build
```

Frontend: `http://localhost:8080`

Backend: `http://localhost:5000`

## CI/CD

GitHub Actions runs:

- frontend install, lint, and build
- backend install and Prisma client generation
- frontend and backend Docker image builds

The frontend Vercel deploy workflow runs on pushes to `main`. Add these GitHub repository secrets to enable frontend production deploys:

```bash
VERCEL_ORG_ID
VERCEL_PROJECT_ID
VERCEL_TOKEN
```

The backend Vercel deploy workflow also runs on pushes to `main`. Add these GitHub repository secrets to enable backend production deploys:

```bash
VERCEL_BACKEND_ORG_ID
VERCEL_BACKEND_PROJECT_ID
VERCEL_BACKEND_TOKEN
```

After the backend deploys, set the frontend Vercel environment variable `VITE_API_URL` to the backend deployment URL.
