# Simple CRUD Example: PostgreSQL + Express + React + Tailwind (Local)

This is a minimal, **line-by-line documented** example project that implements full CRUD (Create, Read, Update, Delete)
for a single `persons` table using:

- PostgreSQL (database)
- Express.js (backend API)
- React (frontend)
- Tailwind (via CDN for simplicity)

This project is intended to run locally. It contains all files with comments and setup instructions.

---

## Quick setup (backend)

1. Make sure PostgreSQL is installed and running locally.
2. Create a database, e.g. `crud_example`:
   - `createdb crud_example`
3. Run the SQL to create table:
   - `psql -d crud_example -f backend/sql/create_table.sql`
4. Start backend:
   - `cd backend`
   - `npm install`
   - Create a `.env` file with:
     ```
     DATABASE_URL=postgresql://<user>:<password>@localhost:5432/crud_example
     PORT=3000
     ```
   - `npm run dev` (or `node app.js`)

## Quick setup (frontend)

1. In a separate terminal:
   - `cd frontend`
   - `npm install`
   - `npm start`
2. The frontend is configured to proxy API requests to `http://localhost:3000` using `"proxy"` in package.json.

---

## Notes

- Tailwind is loaded via CDN in `frontend/public/index.html` for simplicity (no build step required).
- This repository is intentionally minimal and educational — for production apps you should configure CORS, validation, authentication, environment variable security, and Tailwind properly.

