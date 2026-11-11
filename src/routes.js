// Tiny path-based router — no dependency needed for four static routes.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const routePath = (route) => `${BASE}${route}`;

export const currentRoute = () => {
  let path = window.location.pathname;
  if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length);
  path = path.replace(/\/+$/, '') || '/';
  if (path === '/embed' || path === '/leaderboard' || path === '/admin') return path;
  return '/';
};
