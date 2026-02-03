Backend: Express server with in-memory Account store.

Endpoints:

- POST /api/accounts
- GET /api/accounts
- POST /api/accounts/:accountNo/deposit
- POST /api/accounts/:accountNo/withdraw
- POST /api/transfer
- POST /api/kyc/verify (prototype KYC verification endpoint)

Notes:

- KYC verification endpoint accepts a code and returns { verified: true } for codes length >= 4 (prototype behavior)

- Transfer and account updates use a simple in-memory locking mechanism to ensure atomicity.
- This is a prototype; replace in-memory store with a real database for production.
