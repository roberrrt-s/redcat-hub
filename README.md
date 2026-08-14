# redcat-hub

The front door of the RedCat browser-port project: one page listing the twelve
Davilex RedCat titles (1996–1998), linking to whichever ports are live. Each
port lives in its own repo and deploys as its own Netlify site; this hub only
navigates.

Currently live: **De Spannende Stedentocht**.

## Stack

Vite + React + TypeScript. The title list is a single data array in
[`src/App.tsx`](src/App.tsx) — bringing a port online is filling in its `url`.
Baloo 2 is self-hosted via `@fontsource`; the favicon is RedCat's ship from
the game's own sprites, shared with the Stedentocht port.

## Develop

```bash
npm install
npm run dev
```

## Deploy

Git-connected Netlify CI (`netlify.toml` holds build, headers and caching).
The game ports do NOT use CI — their assets are generated from the original
discs and are pushed with `netlify deploy --prod` from a machine that has
them; see the Stedentocht repo for that story.

All game content © Davilex. This project is a technical reconstruction for
preservation's sake.
