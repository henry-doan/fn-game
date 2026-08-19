import { useState, useCallback } from 'react';
import { leaderboardService } from '../services/leaderboard';

export const useLeaderboard = () => {
  const [scores, setScores] = useState(() => leaderboardService.getAll());

  const saveScore = useCallback((name, score) => {
    const updated = leaderboardService.save(name, score);
    setScores(updated);
  }, []);

  const clearScores = useCallback(() => {
    setScores(leaderboardService.clear());
  }, []);

  return { scores, saveScore, clearScores };
}
