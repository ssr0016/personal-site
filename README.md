# Personal Site — Monorepo

## Structure
- `frontend/` — Next.js 16 + shadcn/ui + TanStack Query + MDX
- `backend/` — Go Echo + Squirrel + Postgres

## Setup
cd frontend && pnpm install
cd backend && make dev

## Dev URLs
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Swagger: http://localhost:8080/swagger/index.html

## Templates
Built from ssr0016/template-nextjs and ssr0016/template-go-echo-squirrel.

## Env
- `frontend/.env.example`
- `backend/.env.example`
- Root `.env.example` (combined reference)
