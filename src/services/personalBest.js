const KEY = 'frazil_best';

export const personalBestService = {
  get() {
    try {
      return Number(localStorage.getItem(KEY)) || 0;
    } catch {
      return 0;
    }
  },

  /** Records a score; returns { best, isNewBest }. */
  record(score) {
    const previous = this.get();
    const isNewBest = score > previous;
    if (isNewBest) {
      try {
        localStorage.setItem(KEY, String(score));
      } catch {
        // ignore — storage unavailable
      }
    }
    return { best: Math.max(score, previous), isNewBest: isNewBest && score > 0 };
  },
};
