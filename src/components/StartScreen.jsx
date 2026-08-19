import { useState } from 'react';
import { FLAVORS } from '../constants/flavors';
import { startStyles as s } from '../styles/startScreen';
import { btn } from '../styles/buttons';

const CATEGORIES = [
  { key: 'flavor',    label: 'Flavors',    desc: '+1–2 pts · Normal speed',  badge: 'bg-indigo-500' },
  { key: 'energy',    label: 'Energy',     desc: '+3–4 pts · Faster drops',  badge: 'bg-lime-600' },
  { key: 'cafetango', label: 'Cafetango',  desc: '+4–5 pts · Fastest drops', badge: 'bg-orange-500' },
  { key: 'trap',      label: 'Watch Out!', desc: '−1–3 pts · Avoid these!',  badge: 'bg-red-500' },
];

const ptLabel = (pts) => pts >= 0 ? `+${pts}` : `${pts}`;

const StartScreen = ({ onStart }) => {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Frazil Flavor Catcher</h1>
      <p className={s.tagline}>Catch falling flavors before time runs out!</p>

      <button className={btn.primary} onClick={onStart}>
        Start Game
      </button>

      {/* Collapsible flavor guide */}
      <div className={s.accordion}>
        <button
          className={s.accordionToggle}
          onClick={() => setGuideOpen(o => !o)}
          aria-expanded={guideOpen}
        >
          <span>Flavor Guide & Point System</span>
          <span className={`${s.chevron} ${guideOpen ? s.chevronOpen : ''}`}>▾</span>
        </button>

        <div className={guideOpen ? s.accordionBody : s.accordionBodyHidden}>
          <div className={s.catalogWrapper}>
            {CATEGORIES.map(cat => {
              const items = cat.key === 'trap'
                ? [FLAVORS.find(f => f.category === 'trap')]
                : FLAVORS.filter(f => f.category === cat.key);
              return (
                <div key={cat.key} className={s.catSection}>
                  <div className={s.catHeader}>
                    <span className={s.catLabel}>{cat.label}</span>
                    <span className={s.catDesc}>{cat.desc}</span>
                  </div>
                  <div className={cat.key === 'flavor' ? s.grid3 : cat.key === 'trap' ? s.grid1 : s.grid4}>
                    {items.map(flavor => (
                      <div key={flavor.id} className={s.flavorCard}>
                        <img src={flavor.image} alt={flavor.name} className={s.flavorImg} />
                        <span className={s.flavorName}>{flavor.name}</span>
                        <span className={`${s.flavorPts} ${cat.badge}`}>
                          {cat.key === 'trap' ? '−1 to −3' : ptLabel(flavor.points)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <ul className={s.instructionsList}>
            {[
              'Move your mouse or use arrow keys to control the cup catcher',
              'Energy & Cafetango cups fall faster and score more points',
              'Avoid empty cups — they cost you points!',
              'You have 60 seconds — catch as many as you can!',
            ].map((tip, i) => (
              <li key={i} className={s.instructionsItem}>
                <span className={s.instructionsDot} />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
