import { useState, useCallback, useEffect } from 'react';
import { leaderboardService } from '../services/leaderboard';

export const useLeaderboard = () => {
  const [scores, setScores] = useState(() => leaderboardService.getAll());

  // Keep in sync when another tab (e.g. the /leaderboard display screen) saves or clears
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === null || event.key === 'frazil_leaderboard') setScores(leaderboardService.getAll());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const saveScore = useCallback((name, score) => {
    const { entries, entry } = leaderboardService.save(name, score);
    setScores(entries);
    return entry ? { ...entry, rank: entries.indexOf(entry) + 1 } : null;
  }, []);

  const clearScores = useCallback(() => {
    setScores(leaderboardService.clear());
  }, []);

  return { scores, saveScore, clearScores };
};
