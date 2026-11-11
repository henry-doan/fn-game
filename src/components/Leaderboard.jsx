import { lbStyles as s } from '../styles/leaderboard';

const RANK_LABELS = ['🥇', '🥈', '🥉'];

const fmtDate = iso => {
  const date = new Date(iso);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const Leaderboard = ({ scores, title = 'Leaderboard', large = false }) => (
  <div className={large ? s.sectionLarge : s.section}>
    <div className={s.header}>
      <h2 className={large ? s.headerTitleLarge : s.headerTitle}>{title}</h2>
    </div>

    {scores.length === 0 ? (
      <div className={s.empty}>No scores yet — be the first!</div>
    ) : (
      <ol className={s.list}>
        {scores.map((entry, index) => (
          <li key={entry.id ?? `${entry.date}-${index}`} className={s.entry(index)}>
            <span className={s.rank(index)}>{RANK_LABELS[index] ?? `#${index + 1}`}</span>
            <span className={s.name}>{entry.name}</span>
            <span className={s.score}>{entry.score}</span>
            <span className={s.date}>{fmtDate(entry.date)}</span>
          </li>
        ))}
      </ol>
    )}
  </div>
);

export default Leaderboard;
