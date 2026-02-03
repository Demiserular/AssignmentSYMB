# Online Bank Mini System

This repository contains an Online Bank Mini System prototype with a Node.js backend and a React frontend.

Quick start:

1. Backend
   - cd backend
   - npm install
   - npm run dev
   - Server runs at http://localhost:4000

2. Frontend
   - cd frontend
   - npm install
   - npm run dev
   - App runs at http://localhost:5173 (Vite default)

The backend exposes these endpoints under `/api`:

- POST `/api/accounts` - create account
- GET `/api/accounts` - list accounts
- POST `/api/accounts/:accountNo/deposit` - deposit
- POST `/api/accounts/:accountNo/withdraw` - withdraw
- POST `/api/transfer` - transfer

See `task.md` for assignment requirements.
