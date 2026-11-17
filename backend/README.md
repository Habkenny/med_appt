# Authentication API

The API persists user records in MongoDB, stores passwords as bcrypt hashes,
and issues a signed JWT after successful login.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI` to your MongoDB connection string.
3. Set `JWT_SECRET` to a random secret of at least 32 characters.
4. Start the API with `npm run dev` or `npm start`.

Create an account first with `POST /api/auth/register`. Then log in with
`POST /api/auth/login` using that account's email and password.
