# Portfolio React

React/Vite portfolio with an optional Express + Prisma backend.

## Local Development

```bash
npm install
npm run dev
```

The frontend falls back to static portfolio data when `VITE_API_URL` is not set.

## Vercel

This repo includes `vercel.json` for Vite builds and SPA route rewrites.

Set this environment variable in Vercel only if the hosted frontend should call a backend API:

```bash
VITE_API_URL=https://your-api-domain.com
```

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

The Vercel deploy workflow runs on pushes to `main`. Add these GitHub repository secrets to enable production deploys:

```bash
VERCEL_ORG_ID
VERCEL_PROJECT_ID
VERCEL_TOKEN
```
