import { btn } from '../styles/buttons';

const ThemeToggle = ({ theme, onToggle }) => (
  <button className={btn.theme} onClick={onToggle} aria-label="Toggle theme">
    {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
  </button>
);

export default ThemeToggle;
