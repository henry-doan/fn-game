const KEY = 'frazil_leaderboard';
const MAX_ENTRIES = 20;

export const leaderboardService = {
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  },

  /** Saves a score; returns { entries, entry } where entry is the saved row (or null if it didn't make the cut). */
  save(name, score) {
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim() || 'Anonymous',
      score,
      date: new Date().toISOString(),
    };
    const entries = [...this.getAll(), entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_ENTRIES);
    try {
      localStorage.setItem(KEY, JSON.stringify(entries));
    } catch {
      // ignore — storage unavailable
    }
    return { entries, entry: entries.includes(entry) ? entry : null };
  },

  clear() {
    try {
      localStorage.removeItem(KEY);
    } catch {
      // ignore
    }
    return [];
  },
};
