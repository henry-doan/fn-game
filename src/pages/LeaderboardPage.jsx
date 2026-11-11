import Leaderboard from '../components/Leaderboard';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { routePath } from '../routes';
import { card } from '../styles/cards';
import { btn } from '../styles/buttons';

const LeaderboardPage = ({ enabled }) => {
  const { scores } = useLeaderboard();

  if (!enabled) {
    return (
      <div className={`${card.padded} max-w-md text-center flex flex-col items-center gap-4`}>
        <h2 className="text-2xl font-black">Leaderboard is off</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">The leaderboard isn't running right now.</p>
        <a href={routePath('/')} className={btn.primary}>Play the game</a>
      </div>
    );
  }

  // Updates live (via the storage event) when a game in another tab saves a score,
  // so this page can be left up on a display screen.
  return (
    <>
      <Leaderboard scores={scores} title="Top Scores" large />
      <a href={routePath('/')} className={btn.primary}>Play the game</a>
    </>
  );
};

export default LeaderboardPage;
