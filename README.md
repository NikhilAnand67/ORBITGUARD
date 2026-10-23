# ORBITGUARD
ORBITGUARD is an AI-powered space-safety and Earth-monitoring dashboard for live satellite and debris tracking, ISS monitoring, Earth weather, air quality, flood risk, and a Claude-powered assistant. It reads current upstream feeds through server-side route handlers, caches responses in memory, and includes the animated black-hole/starfield background.

## Requirements

- Node.js 20 or newer
- npm
- Optional: Supabase project, Anthropic API key, NASA API key

## Run locally

1. Install packages:

	```powershell
	npm install
	```

2. Copy `.env.example` to `.env.local` and fill in the Supabase publishable key, `ANTHROPIC_API_KEY`, and `NASA_API_KEY`. The Supabase project URL is already set in the example. NASA falls back to `DEMO_KEY` when the key is not set.
3. Start the development server:

	```powershell
	npm run dev
	```

4. Open http://localhost:3000.

Production commands:

```powershell
npm run build
npm start
```

The production layout uses self-hosted local fonts and optimized NASA APOD images. Satellite positions are propagated only for the displayed rows, and the decorative starfield pauses when the tab is hidden or reduced motion is enabled.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable key for the health check; never use a service-role key |
| `ANTHROPIC_API_KEY` | Optional server-only Claude tool-use assistant |
| `NASA_API_KEY` | Optional NASA APOD API; falls back to `DEMO_KEY` |

Anthropic and NASA credentials are read only by route handlers. Never prefix private credentials with `NEXT_PUBLIC_`. The application does not need a direct Postgres connection string. Supabase connectivity is checked at `/api/health`; this version does not store user data.

## Deploy to Vercel

1. Push the project to a Git provider.
2. In Vercel, choose **Add New Project** and import the repository.
3. Keep the detected Next.js framework and default build command (`npm run build`).
4. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ANTHROPIC_API_KEY`, and `NASA_API_KEY` for the deployment environments you use.
5. Deploy and check `/api/health` to verify integration configuration.

The API cache is process-local in-memory cache. Serverless instances may have independent caches; no external cache service is required.

## Routes

- `/` command center
- `/satellites` CelesTrak TLE catalog and SGP4 position propagation
- `/debris` CelesTrak catalog summary and orbital-period bands
- `/earth` city weather, air quality, river discharge, and hazard feeds
- `/iss` live ISS position and NASA stream embed
- `/explore` guided tour, NASA APOD, narration, and quiz
- `/assistant` and global chat widget
- `/about` integration status and data attribution
- `/api/health` integration health

## Data sources

- CelesTrak GP and SATCAT: https://celestrak.org/
- Open-Meteo weather: https://api.open-meteo.com/
- Open-Meteo air quality: https://air-quality-api.open-meteo.com/
- Open-Meteo flood: https://flood-api.open-meteo.com/
- NASA EONET: https://eonet.gsfc.nasa.gov/api/v3/events
- NASA APOD: https://api.nasa.gov/planetary/apod
- USGS earthquakes: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
- ISS position: https://api.wheretheiss.at/v1/satellites/25544
- Supabase: https://supabase.com/

External data can be delayed or unavailable. Routes use bounded timeouts and 5–15 minute in-memory caches, except ISS position, which refreshes every five seconds. Catalog pages show bounded samples; orbit classifications and flood badges are heuristics, not certified risk assessments. Do not use ORBITGUARD for operational collision avoidance or emergency decisions.
