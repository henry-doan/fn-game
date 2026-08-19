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

  save(name, score) {
    const entries = this.getAll();
    entries.push({ name: name.trim() || 'Anonymous', score, date: new Date().toISOString() });
    entries.sort((entryA, entryB) => entryB.score - entryA.score);
    const trimmed = entries.slice(0, MAX_ENTRIES);
    localStorage.setItem(KEY, JSON.stringify(trimmed));
    return trimmed;
  },

  clear() {
    localStorage.removeItem(KEY);
    return [];
  },
};
