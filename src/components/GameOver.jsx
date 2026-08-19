import { useState } from 'react';
import { gameOverStyles as s } from '../styles/gameOver';
import { btn } from '../styles/buttons';

const GameOver = ({ score, onSave, onRestart }) => {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(name || 'Anonymous', score);
    setSaved(true);
  };

  return (
    <div className={s.card}>
      <h2 className={s.title}>Time's Up!</h2>
      <div className={s.scoreNum}>{score}</div>
      <p className={s.scoreLabel}>points scored</p>

      {!saved ? (
        <>
          <label className={s.nameLabel} htmlFor="player-name">
            Enter your name for the leaderboard
          </label>
          <input
            id="player-name"
            className={s.nameInput}
            type="text"
            placeholder="Your name..."
            maxLength={20}
            value={name}
            onChange={event => setName(event.target.value)}
            onKeyDown={event => event.key === 'Enter' && handleSave()}
            autoFocus
          />
          <div className={s.actions}>
            <button className={btn.primary} style={{ maxWidth: '100%' }} onClick={handleSave}>
              Save Score
            </button>
            <button className={btn.secondary} onClick={onRestart}>
              Skip &amp; Play Again
            </button>
          </div>
        </>
      ) : (
        <div className={s.actions}>
          <button className={btn.primary} style={{ maxWidth: '100%' }} onClick={onRestart}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GameOver;
