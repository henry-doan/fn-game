import { useEffect } from 'react';
import Shell from './components/Shell';
import GameFlow from './pages/GameFlow';
import LeaderboardPage from './pages/LeaderboardPage';
import AdminPage from './pages/AdminPage';
import { useTheme } from './hooks/useTheme';
import { useSettings } from './hooks/useSettings';
import { currentRoute } from './routes';

const route = currentRoute();

const App = () => {
  const { theme, toggle } = useTheme();
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    document.documentElement.classList.toggle('embed', route === '/embed');
  }, []);

  if (route === '/embed') {
    return <GameFlow settings={settings} embedded />;
  }

  return (
    <Shell theme={theme} onToggleTheme={toggle} showLeaderboardLink={settings.leaderboardEnabled && route !== '/leaderboard'}>
      {route === '/leaderboard' && <LeaderboardPage enabled={settings.leaderboardEnabled} />}
      {route === '/admin' && <AdminPage settings={settings} onUpdate={updateSettings} />}
      {route === '/' && <GameFlow settings={settings} />}
    </Shell>
  );
};

export default App;
