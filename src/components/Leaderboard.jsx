import { lbStyles as s } from '../styles/leaderboard';
import { btn } from '../styles/buttons';

const RANK_LABELS = ['🥇', '🥈', '🥉'];

const Leaderboard = ({ scores, onClear }) => {
  const fmtDate = iso => {
    const date = new Date(iso);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className={s.section}>
      <div className={s.header}>
        <h3 className={s.headerTitle}>Leaderboard</h3>
        {scores.length > 0 && (
          <button
            className={btn.danger}
            onClick={() => { if (window.confirm('Clear the leaderboard? This cannot be undone.')) onClear(); }}
          >
            Clear All
          </button>
        )}
      </div>

      {scores.length === 0 ? (
        <div className={s.empty}>No scores yet — be the first!</div>
      ) : (
        <div className={s.list}>
          {scores.map((entry, index) => (
            <div key={index} className={s.entry(index)}>
              <span className={s.rank(index)}>{RANK_LABELS[index] ?? `#${index + 1}`}</span>
              <span className={s.name}>{entry.name}</span>
              <span className={s.score}>{entry.score}</span>
              <span className={s.date}>{fmtDate(entry.date)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
