import ThemeToggle from './ThemeToggle';
import { layout } from '../styles/layout';
import { routePath } from '../routes';

const Shell = ({ theme, onToggleTheme, showLeaderboardLink, children }) => (
  <div className={layout.app}>
    <header className={layout.header}>
      <a href={routePath('/')} className={layout.logo}>Frazil Flavor Catcher</a>
      <nav className={layout.nav}>
        {showLeaderboardLink && (
          <a href={routePath('/leaderboard')} className={layout.navLink}>Leaderboard</a>
        )}
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </nav>
    </header>
    <main className={layout.main}>{children}</main>
  </div>
);

export default Shell;
