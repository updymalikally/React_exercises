# JWT Auth & Role Authorization API

A small Express API demonstrating user registration, bcrypt password hashing, JWT authentication, and admin-only authorization.

## Start

Use Node.js 18.18 or newer. The project includes a private `.env` for local development; `.env` and the local user database are excluded from Git.

```sh
npm install
npm run dev
```

The API runs at `http://localhost:4000`. `GET /health` returns a simple status check.

## Routes

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Public | Create a user and receive a JWT |
| `POST` | `/auth/login` | Public | Verify credentials and receive a JWT |
| `GET` | `/auth/profile` | Bearer token | Return the current user's public profile |
| `GET` | `/admin/dashboard` | Admin Bearer token | Return the admin welcome message |

Register and login accept JSON. Example user registration:

```json
{
  "name": "Avery Student",
  "email": "avery@example.com",
  "password": "a-long-password"
}
```

New accounts receive the `user` role by default. To create an admin account, send `"role": "admin"` and the `adminCode` value from the private `.env`. The code is required so a public registration request cannot grant itself admin access.

Use the returned token on protected requests:

```http
Authorization: Bearer <token>
```

User records are stored in `data/users.json`; passwords are stored as bcrypt hashes. The JWT secret and admin registration code are kept in `.env` and must not be committed or shared.

## Configuration

Copy `.env.example` to `.env` if you need to recreate the local configuration. Set `JWT_SECRET` to a private random value at least 32 bytes long. `ADMIN_REGISTRATION_CODE`, `CLIENT_ORIGIN`, `JWT_EXPIRES_IN`, `PORT`, and `DATA_FILE` can also be configured there.
