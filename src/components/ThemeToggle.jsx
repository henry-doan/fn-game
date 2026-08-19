import { useTheme } from '../hooks/useTheme';
import { btn } from '../styles/buttons';

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  return (
    <button className={btn.theme} onClick={toggle} aria-label="Toggle theme">
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};

export default ThemeToggle;
