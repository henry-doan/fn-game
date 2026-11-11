import { useState, useCallback } from 'react';
import StartScreen from '../components/StartScreen';
import GameCanvas from '../components/GameCanvas';
import GameOver from '../components/GameOver';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { personalBestService } from '../services/personalBest';
import { layout } from '../styles/layout';

// Vertical space taken by everything except the play field:
// page = sticky header + main padding; embed = just its padding.
const RESERVED_PAGE = 110;
const RESERVED_EMBED = 16;

/** Tell the host page (when embedded in an iframe) what happened. */
const notifyParent = (message) => {
  if (window.parent !== window) window.parent.postMessage({ source: 'frazil-game', ...message }, '*');
};

const GameFlow = ({ settings, embedded = false }) => {
  const [screen, setScreen] = useState('start');
  const [result, setResult] = useState(null);
  const [best, setBest] = useState(() => personalBestService.get());
  const [round, setRound] = useState(0);
  const { saveScore } = useLeaderboard();

  const handleStart = useCallback(() => {
    setRound(r => r + 1);
    setScreen('game');
    notifyParent({ type: 'start' });
  }, []);

  const handleGameOver = useCallback((score) => {
    const { best: newBest, isNewBest } = personalBestService.record(score);
    setBest(newBest);
    setResult({ score, isNewBest });
    setScreen('gameover');
    notifyParent({ type: 'gameover', score, best: newBest });
  }, []);

  const content = (
    <>
      {screen === 'start' && (
        <StartScreen onStart={handleStart} best={best} duration={settings.gameDuration} compact={embedded} />
      )}

      {screen === 'game' && (
        <GameCanvas
          key={round}
          duration={settings.gameDuration}
          onGameOver={handleGameOver}
          reservedHeight={embedded ? RESERVED_EMBED : RESERVED_PAGE}
        />
      )}

      {screen === 'gameover' && result && (
        <>
          <GameOver
            score={result.score}
            best={best}
            isNewBest={result.isNewBest}
            leaderboardEnabled={settings.leaderboardEnabled}
            onSave={saveScore}
            onRestart={handleStart}
            embedded={embedded}
          />
          <button className={layout.textLink} onClick={() => setScreen('start')}>
            ← Back to start
          </button>
        </>
      )}
    </>
  );

  return embedded ? <div className={layout.embed}>{content}</div> : content;
};

export default GameFlow;
