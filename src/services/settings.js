const KEY = 'frazil_settings';

export const DURATION_OPTIONS = [30, 45, 60, 90, 120];

export const DEFAULT_SETTINGS = {
  gameDuration: 30,
  leaderboardEnabled: true,
};

const clampDuration = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return DEFAULT_SETTINGS.gameDuration;
  return Math.min(300, Math.max(10, Math.round(n)));
};

const readStored = () => {
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(KEY)) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
};

// URL params override stored settings (handy for iframe embeds on other sites,
// where this device's admin settings don't apply): ?time=45&leaderboard=0
const readUrlOverrides = () => {
  const params = new URLSearchParams(window.location.search);
  const overrides = {};
  if (params.has('time')) overrides.gameDuration = clampDuration(params.get('time'));
  if (params.has('leaderboard')) overrides.leaderboardEnabled = !['0', 'false', 'off'].includes(params.get('leaderboard'));
  return overrides;
};

export const settingsService = {
  /** Effective settings: stored admin settings + URL overrides. */
  get() {
    const merged = { ...readStored(), ...readUrlOverrides() };
    merged.gameDuration = clampDuration(merged.gameDuration);
    return merged;
  },

  /** Stored settings only (what the admin panel edits). */
  getStored() {
    return readStored();
  },

  save(patch) {
    const next = { ...readStored(), ...patch };
    next.gameDuration = clampDuration(next.gameDuration);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // storage unavailable (private mode, blocked in iframe) — settings stay in memory
    }
    return next;
  },
};
