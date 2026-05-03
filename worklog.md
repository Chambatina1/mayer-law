---
Task ID: 1
Agent: Main Agent
Task: Fix Mayer Law site — remove Prisma, add dual-mode DB, deploy to Vercel

Work Log:
- Analyzed project state: Prisma fully removed from runtime code but deps/scripts/directory still present
- Removed prisma/ directory, db/custom.db SQLite file
- Cleaned package.json: removed @prisma/client, prisma, next-auth, prisma scripts
- Rewrote src/lib/db.ts with dual-mode support:
  - In-memory store (globalThis) for Vercel serverless
  - SQLite via bun:sqlite for local persistent storage
  - Same API surface: db.appointment.findMany(), etc.
- Added DATABASE_TYPE=sqlite env variable to toggle modes
- Created .env.example (documentation) and .env.local (local SQLite enabled)
- Added /data/ to .gitignore for local DB files
- Fixed appointments/[id] DELETE handler to use new db.appointment.delete()
- Verified bun:sqlite works with bun runtime
- Deployed to Vercel production (3 successful deployments)
- Pushed all changes to GitHub

Stage Summary:
- Site live at: https://my-project-steel-six.vercel.app
- GitHub: https://github.com/Chambatina1/mayer-law
- Architecture: Vercel (in-memory) for public site + Local SQLite (bun:sqlite) for lawyer's data
- Lawyer runs `bun run dev` locally → data persists in data/mayer_law.db
- No client data ever leaves the lawyer's computer
