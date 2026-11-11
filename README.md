# Frazil Flavor Catcher

A browser game: move the cup catcher to catch falling Frazil flavors before time runs out. Built with React, Vite, and Tailwind, and drawn on a `<canvas>`.

## Quick start

```bash
yarn install
cp .env.example .env.local   # then set VITE_ADMIN_PIN
yarn dev                     # http://localhost:5173
```

| Command        | What it does                     |
| -------------- | -------------------------------- |
| `yarn dev`     | Dev server with hot reload       |
| `yarn build`   | Production build into `dist/`    |
| `yarn preview` | Serve the production build       |
| `yarn lint`    | ESLint                           |

## How to play

- Move with the **mouse**, **finger drag**, or **← / →** keys.
- **Esc** / **P** or the pause button pauses. The game also pauses automatically when the tab is hidden, and it counts down 3-2-1 before starting or resuming.
- The round lasts 30s by default; admins can change it.
- Difficulty ramps up over the round: more cups, faster drops, and more penalty cups near the end.

| Category  | Points | Notes                           |
| --------- | ------ | ------------------------------- |
| Flavors   | +1–2   | Normal speed                    |
| Energy    | +3–4   | Faster, green glow              |
| Cafetango | +4–5   | Fastest, orange glow            |
| Empty cup | −1–3   | Red glow; avoid these           |

Tune these in `src/constants/flavors.js` (points, spawn weight, speed) and `DIFFICULTY` in `src/components/GameCanvas.jsx`.

## Pages

| Path           | What it is                                                                 |
| -------------- | -------------------------------------------------------------------------- |
| `/`            | The game                                                                   |
| `/leaderboard` | Top 20 scores. Updates live, so you can leave it on a display screen at an event |
| `/admin`       | PIN-protected: round length, leaderboard on/off, clear scores, embed code  |
| `/embed`       | The game only, with no header and a transparent background, for iframes    |

Every player sees their score and **personal best**. When the leaderboard is **on**, they can also save a name and see their rank. When it's **off**, the name form and `/leaderboard` are hidden.

### Where data lives

There's no backend. Scores, personal bests, and admin settings are stored in the browser's `localStorage`, so they are **per device**. That fits a kiosk or event setup: run the game and `/leaderboard` on the same machine, in two tabs or windows. A public leaderboard shared across devices would need a backend (Supabase, Firebase, a small API).

## Embedding

Grab the snippet from `/admin`, or write it by hand:

```html
<iframe
  src="https://YOUR-DOMAIN/embed?time=30&leaderboard=0&theme=light"
  title="Frazil Flavor Catcher"
  style="width:100%;max-width:720px;aspect-ratio:6/5;border:0"></iframe>
```

URL options (they also work on `/`):

| Param         | Values             | Default                 |
| ------------- | ------------------ | ----------------------- |
| `time`        | 10–300 seconds     | admin setting, else 30  |
| `leaderboard` | `1` / `0`          | admin setting, else on  |
| `theme`       | `light` / `dark`   | visitor's system theme  |

The play field scales to fit the frame. The embed sends `postMessage` events to the host page:

```js
window.addEventListener('message', (e) => {
  if (e.data?.source !== 'frazil-game') return;
  // { type: 'start' } or { type: 'gameover', score, best }
});
```

## Deploying

`yarn build` produces a static site in `dist/`. Because `/leaderboard`, `/admin`, and `/embed` are client-side routes, the host must serve `index.html` for unknown paths:

- **Netlify:** add `public/_redirects` containing `/*  /index.html  200`
- **Vercel:** add `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- **GitHub Pages:** copy `dist/index.html` to `dist/404.html` after building, and set `base` in `vite.config.js` if the site isn't served from the domain root.

Set `VITE_ADMIN_PIN` in the host's environment variables. The PIN is compiled into the JavaScript, so it keeps casual players out but isn't real security.

## Project layout

```
src/
  App.jsx               route switch (/, /leaderboard, /admin, /embed)
  routes.js             tiny path router
  pages/                GameFlow, LeaderboardPage, AdminPage
  components/           GameCanvas (game loop), StartScreen, GameOver, Leaderboard, Shell
  services/             localStorage: leaderboard, settings, personal best
  hooks/                useLeaderboard, useSettings, useTheme
  constants/flavors.js  flavor catalog and scoring
  styles/               Tailwind class maps
```
