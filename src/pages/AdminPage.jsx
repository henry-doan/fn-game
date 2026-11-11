import { useState } from 'react';
import Leaderboard from '../components/Leaderboard';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { DURATION_OPTIONS } from '../services/settings';
import { routePath } from '../routes';
import { adminStyles as s } from '../styles/admin';
import { btn } from '../styles/buttons';

const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN;
const UNLOCK_KEY = 'frazil_admin_unlocked';

const isUnlocked = () => {
  try {
    return sessionStorage.getItem(UNLOCK_KEY) === '1';
  } catch {
    return false;
  }
};

const PinGate = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!ADMIN_PIN) {
    return (
      <div className={s.card}>
        <h2 className={s.title}>Admin not configured</h2>
        <p className={s.muted}>
          Set <code className={s.code}>VITE_ADMIN_PIN</code> in <code className={s.code}>.env.local</code> (or your
          host's environment variables) and rebuild to enable the admin panel.
        </p>
      </div>
    );
  }

  const submit = (event) => {
    event.preventDefault();
    if (pin === ADMIN_PIN) {
      try {
        sessionStorage.setItem(UNLOCK_KEY, '1');
      } catch {
        // storage unavailable — unlock lasts until reload
      }
      onUnlock();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <form className={s.card} onSubmit={submit}>
      <h2 className={s.title}>Admin</h2>
      <label htmlFor="admin-pin" className={s.label}>Enter PIN</label>
      <input
        id="admin-pin"
        type="password"
        inputMode="numeric"
        autoComplete="off"
        className={s.input}
        value={pin}
        onChange={event => { setPin(event.target.value); setError(false); }}
        autoFocus
      />
      {error && <p className={s.error}>Incorrect PIN</p>}
      <button type="submit" className={btn.primary} style={{ maxWidth: '100%' }}>Unlock</button>
    </form>
  );
};

const Toggle = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={s.switch(checked)}
  >
    <span className={s.switchKnob(checked)} />
  </button>
);

const AdminPage = ({ settings, onUpdate }) => {
  const [unlocked, setUnlocked] = useState(isUnlocked);
  const { scores, clearScores } = useLeaderboard();
  const [customTime, setCustomTime] = useState('');

  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />;

  const lock = () => {
    try {
      sessionStorage.removeItem(UNLOCK_KEY);
    } catch {
      // ignore
    }
    setUnlocked(false);
  };

  const embedParams = new URLSearchParams({
    time: String(settings.gameDuration),
    leaderboard: settings.leaderboardEnabled ? '1' : '0',
  });
  const embedUrl = `${window.location.origin}${routePath('/embed')}?${embedParams}`;
  const embedSnippet = `<iframe src="${embedUrl}" title="Frazil Flavor Catcher" style="width:100%;max-width:720px;aspect-ratio:6/5;border:0" allow="fullscreen"></iframe>`;

  return (
    <div className={s.wrapper}>
      <div className={s.headerRow}>
        <h1 className={s.pageTitle}>Admin</h1>
        <button className={btn.secondary + ' !w-auto !py-2 text-sm'} onClick={lock}>Lock</button>
      </div>

      <p className={s.notice}>
        Settings are saved in <strong>this browser</strong> and apply to games played on this device (kiosk/event mode).
        For embeds on other sites, use the embed code below — its settings travel in the URL.
      </p>

      <section className={s.card}>
        <h2 className={s.sectionTitle}>Round length</h2>
        <div className={s.chips}>
          {DURATION_OPTIONS.map(sec => (
            <button
              key={sec}
              className={s.chip(settings.gameDuration === sec)}
              onClick={() => onUpdate({ gameDuration: sec })}
            >
              {sec}s
            </button>
          ))}
        </div>
        <form
          className={s.customRow}
          onSubmit={event => { event.preventDefault(); if (customTime) { onUpdate({ gameDuration: customTime }); setCustomTime(''); } }}
        >
          <input
            type="number"
            min={10}
            max={300}
            placeholder="Custom (10–300)"
            className={s.input + ' !mb-0'}
            value={customTime}
            onChange={event => setCustomTime(event.target.value)}
          />
          <button type="submit" className={btn.secondary + ' !w-auto !py-2'}>Set</button>
        </form>
        <p className={s.muted}>Current: <strong>{settings.gameDuration} seconds</strong></p>
      </section>

      <section className={s.card}>
        <div className={s.toggleRow}>
          <div>
            <h2 className={s.sectionTitle}>Leaderboard</h2>
            <p className={s.muted}>
              When off, players still see their score and personal best, but can't save a name
              and <code className={s.code}>/leaderboard</code> is hidden.
            </p>
          </div>
          <Toggle
            label="Leaderboard enabled"
            checked={settings.leaderboardEnabled}
            onChange={enabled => onUpdate({ leaderboardEnabled: enabled })}
          />
        </div>
        <div className={s.linkRow}>
          <a href={routePath('/leaderboard')} target="_blank" rel="noreferrer" className={s.link}>Open leaderboard display ↗</a>
          {scores.length > 0 && (
            <button
              className={btn.danger}
              onClick={() => { if (window.confirm('Clear the leaderboard? This cannot be undone.')) clearScores(); }}
            >
              Clear all ({scores.length})
            </button>
          )}
        </div>
        <Leaderboard scores={scores.slice(0, 5)} title="Top 5" />
      </section>

      <section className={s.card}>
        <h2 className={s.sectionTitle}>Embed code</h2>
        <p className={s.muted}>Paste on any site to show just the game. Uses the settings above.</p>
        <textarea readOnly className={s.snippet} value={embedSnippet} onFocus={event => event.target.select()} rows={4} />
        <button
          className={btn.secondary + ' !w-auto !py-2 text-sm self-start'}
          onClick={() => navigator.clipboard?.writeText(embedSnippet)}
        >
          Copy
        </button>
      </section>
    </div>
  );
};

export default AdminPage;
