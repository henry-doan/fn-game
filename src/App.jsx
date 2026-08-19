import { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import GameCanvas from './components/GameCanvas';
import GameOver from './components/GameOver';
import Leaderboard from './components/Leaderboard';
import ThemeToggle from './components/ThemeToggle';
import { useLeaderboard } from './hooks/useLeaderboard';
import { layout } from './styles/layout';

const App = () => {
  const [screen, setScreen] = useState('start');
  const [lastScore, setLastScore] = useState(0);
  const { scores, saveScore, clearScores } = useLeaderboard();

  const handleStart = useCallback(() => setScreen('game'), []);
  const handleGameOver = useCallback((score) => {
    setLastScore(score);
    setScreen('gameover');
  }, []);
  const handleSave = useCallback((name, score) => saveScore(name, score), [saveScore]);
  const handleRestart = useCallback(() => setScreen('game'), []);
  const handleHome = useCallback(() => setScreen('start'), []);

  return (
    <div className={layout.app}>
      <header className={layout.header}>
        <span className={layout.logo}>Frazil Flavor Catcher</span>
        <ThemeToggle />
      </header>

      <main className={layout.main}>
        {screen === 'start' && (
          <>
            <StartScreen onStart={handleStart} />
            <Leaderboard scores={scores} onClear={clearScores} />
          </>
        )}

        {screen === 'game' && (
          <GameCanvas onGameOver={handleGameOver} />
        )}

        {screen === 'gameover' && (
          <>
            <GameOver score={lastScore} onSave={handleSave} onRestart={handleRestart} />
            <Leaderboard scores={scores} onClear={clearScores} />
            <button
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-200 underline underline-offset-2"
              onClick={handleHome}
            >
              ← Back to Home
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
