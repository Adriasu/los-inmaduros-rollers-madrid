# Los Inmaduros  Rollers Madrid 

A community site for the Los Inmaduros urban skating group  create & announce rides, browse pre-designed routes (GPX + embedded maps), and manage reviews and photos.

---

##  Overview
Los Inmaduros Roller Madrid is a Next.js app (app-router) that:
- Displays curated routes (some with GPX files in `public/routes/`) and embedded Google Maps
- Serves a Firestore-backed REST-like API (`/api/routes`) with CRUD (GET, POST, PUT, DELETE)
- Supports user authentication via Clerk and basic protection via middleware
- Includes a script to upload an initial set of routes (`scripts/uploadRoutes.mjs`)

---

##  Key features
- Route browsing with route pages and reviews
- Preloaded route dataset (see `src/components/dataRoutes.js`)
- GPX route files included in `public/routes/`
- Firestore database for persistence (`lib/fireBase.mjs`)
- Clerk authentication + middleware protection for non-public routes
- UI built with PrimeReact + Tailwind + Swiper + Leaflet

---

##  Project structure (high level)
- `src/app/`  Next.js app pages/components (app-router)
- `src/app/api/routes/route.js`  API handler (Firestore)
- `lib/fireBase.mjs`  Firebase initialization used by API and scripts
- `scripts/uploadRoutes.mjs`  upload script to seed Firestore with predesigned routes
- `public/routes/`  GPX files and route assets
- `src/components/` & `src/context/`  UI components and React contexts

---

##  Quick start  Local development

Prerequisites:
- Node.js >= 18
- npm

Steps:
1. Install dependencies
   ```bash
   npm install
   ```
2. Run development server
   ```bash
   npm run dev
   ```
3. Visit http://localhost:3000

Seed the database (uploads the built-in routes):
```bash
npm run upload-routes
# this runs: node scripts/uploadRoutes.mjs
```

Notes:
- `package.json` includes an `init-db` script, but `scripts/initDb.mjs` is **not present**  consider removing or implementing it.
- The repository currently contains Firebase credentials in `lib/fireBase.mjs`; see Security section.

---

##  Environment & configuration

Current repo: Firebase config is hard-coded in `lib/fireBase.mjs`. For security and portability, replace the config with environment variables:

Example (create `.env.local`):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
CLERK_FRONTEND_API=...
CLERK_API_KEY=...
```

Recommended change:
- Update `lib/fireBase.mjs` to read these values with `process.env.*` (do not commit secrets).

---

##  API  Routes endpoint
Path: `/api/routes` (serverless route)

Available methods:
- GET  list all routes
- POST  create a route (accepts JSON; server adds `id`, `reviews`, `gallery`, `rating` defaults)
- PUT  update route (requires `{ id, ...updateData }`)
- DELETE  delete route (requires `{ id }`)

Example GET response:
```json
[
  {
    "id": "abc123",
    "name": "Héroes",
    "image": "...",
    "approximateDistance": "18 km",
    "description": "...",
    "map": "https://www.google.com/maps/d/...",
    "reviews": [],
    "gallery": [],
    "level": ["Medio"],
    "rating": ""
  }
]
```

---

##  Uploading & GPX files
- GPX files live in `public/routes/`  to add a new GPX, place it there and reference it on the route page/component as needed.
- Use `npm run upload-routes` to seed Firestore with the built-in `routes` data (`scripts/uploadRoutes.mjs`).

---

##  Security & deployment notes
- The repo currently includes Firebase credentials in `lib/fireBase.mjs`. These are sensitive; move them to environment variables and remove credentials from the repo. (If you've used a demo key intentionally, still consider moving to env vars.)
- Clerk is used for authentication and the middleware file (`src/middleware.js`) protects all routes except:
  - `/sign-in`, `/sign-up`, `/`, `/routesRoller` and `/api/routes`.
- CORS allowed origins are configured in `src/middleware.js` (localhost & Vercel URL). Update before changing deployment domains.
- Recommended deployment: Vercel (Next.js first-class support). Add environment variables in Vercel project settings.

---

##  Run & build scripts (from package.json)
- `npm run dev`  development
- `npm run build`  production build
- `npm run start`  start server
- `npm run lint`  ESLint
- `npm run upload-routes`  upload initial routes to Firestore
- `npm run init-db`  exists in scripts but `scripts/initDb.mjs` is missing (review)

---

##  Tips & TODOs
- Move sensitive keys to `.env.local` and use `process.env`.
- Add or implement `scripts/initDb.mjs` or remove the `init-db` script.
- Add unit/integration tests for API handlers.
- Add a CONTRIBUTING.md and basic issue/PR templates.
- Add screenshots and a short demo/gif to this README (I can generate placeholders if you want).

---

##  Contributing
Contributions welcome. Please:
1. Fork the repo
2. Create a branch (feature/xxxx)
3. Open a pull request with description & screenshots

---

##  Contact
For help or to add routes/content, open an issue or contact the project maintainer.

---

##  License
Add your preferred license (e.g., MIT). Let me know which license you prefer and Ill add the file.
