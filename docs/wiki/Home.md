# portfolio_React Wiki

Welcome to the `portfolio_React` project wiki. This portfolio showcases Syed Farman Ali's full-stack work across React, MERN, Python/Django, machine learning, deployed web apps, and production-ready project setup.

## Project Status

Current status: active development and deployment-ready.

The project includes:

- React + Vite frontend
- Redux-powered portfolio data
- Optional Express + Prisma backend API
- Admin dashboard for content management
- AI chatbot fallback responses
- Vercel deployment configuration
- Docker and Docker Compose setup
- GitHub Actions CI/CD
- SEO metadata, sitemap, robots file, and structured data

## Live Links

- Frontend: `https://portfolio-react-theta-steel.vercel.app/`
- GitHub: `https://github.com/FARMAN9/portfolio_React`
- Backend API: configure after backend deployment

## Local Setup

Install frontend dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Frontend local URL:

```text
http://localhost:5173/
```

## Backend Setup

Install backend dependencies:

```bash
cd backend
npm install
```

Create backend environment variables:

```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="change-me-in-production"
GEMINI_API_KEY=""
```

Generate Prisma client:

```bash
npx prisma generate
```

Start the backend:

```bash
npm start
```

Backend local URL:

```text
http://localhost:5000/
```

Health check:

```text
http://localhost:5000/api/health
```

## Frontend API Configuration

The frontend uses `VITE_API_URL` to call the backend.

Local `.env`:

```bash
VITE_API_URL=http://localhost:5000
```

For Vercel frontend deployment, set:

```bash
VITE_API_URL=https://your-backend-vercel-url
```

If no production API URL is configured, the portfolio can still use fallback static data.

## Deployment

### Frontend on Vercel

The root `vercel.json` builds the Vite frontend and rewrites SPA routes to `index.html`.

Required GitHub secrets for frontend deploy:

```bash
VERCEL_ORG_ID
VERCEL_PROJECT_ID
VERCEL_TOKEN
```

### Backend on Vercel

The backend has its own Vercel setup in `backend/vercel.json` and a serverless entry at `backend/api/index.js`.

Required GitHub secrets for backend deploy:

```bash
VERCEL_BACKEND_ORG_ID
VERCEL_BACKEND_PROJECT_ID
VERCEL_BACKEND_TOKEN
```

Important: for production persistence, use a hosted database connection string for `DATABASE_URL` instead of local SQLite.

## Docker

Build the frontend image:

```bash
docker build -t portfolio-frontend .
```

Build the backend image:

```bash
docker build -t portfolio-backend ./backend
```

Run both services:

```bash
docker compose up --build
```

Frontend:

```text
http://localhost:8080
```

Backend:

```text
http://localhost:5000
```

## CI/CD

GitHub Actions includes:

- frontend install, lint, and build
- backend install and Prisma generation
- Docker image build checks
- optional frontend Vercel deployment
- optional backend Vercel deployment

Deploy workflows skip automatically if required Vercel secrets are not configured.

## SEO

SEO support includes:

- title and description metadata
- canonical URLs
- Open Graph tags
- Twitter card tags
- `robots.txt`
- `sitemap.xml`
- web manifest
- Person, Website, and Featured Projects structured data
- noindex metadata for private admin routes

## Roadmap

Planned improvements:

- Add a hosted production database for the backend
- Add project screenshots for every portfolio item
- Add backend validation for admin forms
- Add contact form delivery through email or a database
- Add automated deployment status badges
- Add API tests for backend routes
- Add analytics and search console verification

## Useful Commands

```bash
npm run lint
npm run build
```

```bash
cd backend
npx prisma generate
npm start
```

## Maintainer

Syed Farman Ali

- GitHub: `https://github.com/FARMAN9`
- LinkedIn: `https://www.linkedin.com/in/farman9`
- LeetCode: `https://leetcode.com/saeedfarman9/`
