import cupCatcher from '../assets/frazil/cup_catcher.png';
import blueRazzmatazz from '../assets/frazil/flavors/BlueRazzmatazz.png';
import georgiaPeach from '../assets/frazil/flavors/GeorgiaPeach.png';
import greenApple from '../assets/frazil/flavors/GreenApple.png';
import rockNRoll from '../assets/frazil/flavors/RockNRoll.png';
import simplyMango from '../assets/frazil/flavors/SimplyMango.png';
import tigersBlood from '../assets/frazil/flavors/TigersBlood.png';
import lemonberry from '../assets/frazil/energy/Lemonberry.png';
import orangeCream from '../assets/frazil/energy/OrangeCream.png';
import pinaColada from '../assets/frazil/energy/PinaColada.png';
import smashberry from '../assets/frazil/energy/Smashberry.png';
import caramelMacchiato from '../assets/frazil/cafetango/CaramelMacchiato.png';
import espresso from '../assets/frazil/cafetango/Espresso.png';
import frenchVanilla from '../assets/frazil/cafetango/FrenchVanilla.png';
import mocha from '../assets/frazil/cafetango/Mocha.png';

export const FLAVORS = [
  // Regular — normal speed, 1–2 pts
  { id: 'bluerazzmatazz', name: 'Blue Razzmatazz',   category: 'flavor',    image: blueRazzmatazz,   color: '#1E88E5', points: 1, weight: 28, speedMult: 1.0 },
  { id: 'georgiapeach',   name: 'Georgia Peach',      category: 'flavor',    image: georgiaPeach,     color: '#FF7043', points: 1, weight: 28, speedMult: 1.1 },
  { id: 'greenapple',     name: 'Green Apple',        category: 'flavor',    image: greenApple,       color: '#43A047', points: 1, weight: 25, speedMult: 1.1 },
  { id: 'rocknroll',      name: "Rock N' Roll",       category: 'flavor',    image: rockNRoll,        color: '#E91E63', points: 2, weight: 22, speedMult: 1.2 },
  { id: 'simplymango',    name: 'Simply Mango',       category: 'flavor',    image: simplyMango,      color: '#FB8C00', points: 2, weight: 20, speedMult: 1.2 },
  { id: 'tigersblood',    name: "Tiger's Blood",      category: 'flavor',    image: tigersBlood,      color: '#E53935', points: 2, weight: 18, speedMult: 1.3 },
  // Energy — faster, 3–4 pts
  { id: 'lemonberry',     name: 'Lemonberry',         category: 'energy',    image: lemonberry,       color: '#C6D600', points: 3, weight: 10, speedMult: 1.6 },
  { id: 'orangecream',    name: 'Orange Cream',       category: 'energy',    image: orangeCream,      color: '#FF9800', points: 3, weight: 10, speedMult: 1.7 },
  { id: 'pinacolada',     name: 'Piña Colada',        category: 'energy',    image: pinaColada,       color: '#FFD600', points: 3, weight: 8,  speedMult: 1.8 },
  { id: 'smashberry',     name: 'Smashberry',         category: 'energy',    image: smashberry,       color: '#AA00FF', points: 4, weight: 8,  speedMult: 1.9 },
  // Cafetango — fastest, 4–5 pts
  { id: 'caramelmacchiato', name: 'Caramel Macchiato', category: 'cafetango', image: caramelMacchiato, color: '#FFB300', points: 4, weight: 5, speedMult: 2.0 },
  { id: 'espresso',         name: 'Espresso',          category: 'cafetango', image: espresso,         color: '#FF6F00', points: 4, weight: 5, speedMult: 2.2 },
  { id: 'frenchvanilla',    name: 'French Vanilla',    category: 'cafetango', image: frenchVanilla,    color: '#FFE57F', points: 5, weight: 4, speedMult: 2.3 },
  { id: 'mocha',            name: 'Mocha',             category: 'cafetango', image: mocha,            color: '#FF7043', points: 5, weight: 3, speedMult: 2.5 },
  // Traps — penalty cups, avoid!
  { id: 'trap_sm', name: 'Empty Cup', category: 'trap', image: cupCatcher, color: '#FCA5A5', points: -1, weight: 14, speedMult: 1.1 },
  { id: 'trap_md', name: 'Empty Cup', category: 'trap', image: cupCatcher, color: '#EF4444', points: -2, weight: 8,  speedMult: 1.4 },
  { id: 'trap_lg', name: 'Empty Cup', category: 'trap', image: cupCatcher, color: '#B91C1C', points: -3, weight: 4,  speedMult: 1.8 },
];
