# Cute Credentials Worker

This project uses Cloudflare Workers Static Assets for the webpage and a Worker API for saving non-sensitive text to D1.

## Files
- `public/index.html` — cute webpage
- `worker.js` — `/api/submit` endpoint
- `wrangler.jsonc` — Workers Static Assets configuration

## D1
The Worker expects a D1 binding named `DB` and a table named `submissions` with:
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `value` TEXT NOT NULL
- `created_at` TEXT NOT NULL

Do not use this form to collect passwords, authentication tokens, or other secrets.

## Deploy
Deploy with Wrangler from the project directory. If the existing dashboard D1 binding is not included in your Wrangler configuration, verify/re-add the `DB` binding after deployment.
