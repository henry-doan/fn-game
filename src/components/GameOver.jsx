import { useState } from 'react';
import { gameOverStyles as s } from '../styles/gameOver';
import { btn } from '../styles/buttons';
import { routePath } from '../routes';

const GameOver = ({ score, best, isNewBest, leaderboardEnabled, onSave, onRestart, embedded }) => {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(null); // { placed: boolean, rank?: number }

  const handleSave = () => {
    const entry = onSave(name || 'Anonymous', score);
    setSaved(entry ? { placed: true, rank: entry.rank } : { placed: false });
  };

  const showSaveForm = leaderboardEnabled && !saved;

  return (
    <div className={s.card}>
      <h2 className={s.title}>Time's Up!</h2>
      <div className={s.scoreNum}>{score}</div>
      <p className={s.scoreLabel}>points scored</p>

      {isNewBest ? (
        <p className={s.newBest}>🎉 New personal best!</p>
      ) : (
        <p className={s.best}>Your best: <strong>{best}</strong></p>
      )}

      {showSaveForm && (
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
            autoFocus={!embedded}
          />
        </>
      )}

      {saved && (
        <p className={s.rankMsg}>
          {saved.placed ? <>You placed <strong>#{saved.rank}</strong> on the leaderboard!</> : "Score saved — not quite top 20 this time."}
          {' '}
          <a href={routePath('/leaderboard')} target={embedded ? '_blank' : undefined} rel="noreferrer" className={s.rankLink}>
            View leaderboard
          </a>
        </p>
      )}

      <div className={s.actions}>
        {showSaveForm ? (
          <>
            <button className={btn.primary} style={{ maxWidth: '100%' }} onClick={handleSave}>Save Score</button>
            <button className={btn.secondary} onClick={onRestart}>Skip &amp; Play Again</button>
          </>
        ) : (
          <button className={btn.primary} style={{ maxWidth: '100%' }} onClick={onRestart} autoFocus={!embedded}>Play Again</button>
        )}
      </div>
    </div>
  );
};

export default GameOver;
