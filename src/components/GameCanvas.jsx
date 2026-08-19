import { useEffect, useRef, useState, useCallback } from 'react';
import { FLAVORS } from '../constants/flavors';
import { gameStyles as s } from '../styles/gameStyles';
import { card } from '../styles/cards';
import cupCatcherSrc from '../assets/frazil/cup_catcher.png';

const CANVAS_W = 600;
const CANVAS_H = 500;
const BASKET_W = 90;
const BASKET_H = 50;
const CUP_RADIUS = 28;
const GAME_DURATION = 60;
const MAX_ITEMS = 8;
const BASE_SPEED = 4.5;

// Preload all images at module load time so they're ready before game start
const loadImg = (src) => { const i = new Image(); i.src = src; return i; };
const cupCatcherImg = loadImg(cupCatcherSrc);
const flavorImages = Object.fromEntries(FLAVORS.map(f => [f.id, loadImg(f.image)]));

const weightedRandom = (flavors) => {
  const total = flavors.reduce((sum, flavor) => sum + flavor.weight, 0);
  let roll = Math.random() * total;
  for (const flavor of flavors) {
    roll -= flavor.weight;
    if (roll <= 0) return flavor;
  }
  return flavors[flavors.length - 1];
};

const drawCup = (ctx, x, y, flavor) => {
  const size = CUP_RADIUS * 2.4;
  const img = flavorImages[flavor.id];

  ctx.save();
  if (flavor.category === 'energy') {
    ctx.shadowColor = '#AEEA00';
    ctx.shadowBlur = 18;
  } else if (flavor.category === 'cafetango') {
    ctx.shadowColor = '#FF6F00';
    ctx.shadowBlur = 22;
  } else if (flavor.category === 'trap') {
    ctx.shadowColor = '#EF4444';
    ctx.shadowBlur = 22;
  }

  if (img?.complete && img.naturalWidth > 0) {
    ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
  } else {
    ctx.beginPath();
    ctx.arc(x, y, CUP_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = flavor.color;
    ctx.fill();
  }
  ctx.restore();
};

const drawBasket = (ctx, x, y) => {
  if (cupCatcherImg?.complete && cupCatcherImg.naturalWidth > 0) {
    const drawW = 130;
    const drawH = (cupCatcherImg.naturalHeight / cupCatcherImg.naturalWidth) * drawW;
    ctx.drawImage(cupCatcherImg, x - drawW / 2, y - drawH / 2, drawW, drawH);
  } else {
    ctx.save();
    ctx.shadowColor = 'rgba(99,102,241,0.4)';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(x - BASKET_W / 2, y - BASKET_H / 2);
    ctx.lineTo(x + BASKET_W / 2, y - BASKET_H / 2);
    ctx.lineTo(x + BASKET_W * 0.4, y + BASKET_H / 2);
    ctx.lineTo(x - BASKET_W * 0.4, y + BASKET_H / 2);
    ctx.closePath();
    ctx.fillStyle = '#6366f1';
    ctx.fill();
    ctx.restore();
  }
};

const GameCanvas = ({ onGameOver }) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    items: [], basketX: CANVAS_W / 2, score: 0, timeLeft: GAME_DURATION,
    nextId: 0, spawnTimer: 0, spawnInterval: 30, floats: [],
  });
  const [displayScore, setDisplayScore] = useState(0);
  const [displayTime, setDisplayTime] = useState(GAME_DURATION);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const timerRef = useRef(null);
  const gameOverTimeoutRef = useRef(null);

  const spawnItem = useCallback(() => {
    const st = stateRef.current;
    if (st.items.length >= MAX_ITEMS) return;
    const flavor = weightedRandom(FLAVORS);
    const margin = CUP_RADIUS * 1.5;
    st.items.push({
      id: st.nextId++,
      x: margin + Math.random() * (CANVAS_W - margin * 2),
      y: -CUP_RADIUS * 2,
      flavor,
      speed: BASE_SPEED * flavor.speedMult * (1 + (GAME_DURATION - st.timeLeft) * 0.005),
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const getCanvasX = (clientX) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = CANVAS_W / rect.width;
      return Math.max(BASKET_W / 2, Math.min(CANVAS_W - BASKET_W / 2, (clientX - rect.left) * scaleX));
    };

    const onMouseMove = event => {
      stateRef.current.basketX = getCanvasX(event.clientX);
    };

    const onTouchStart = event => {
      event.preventDefault();
      stateRef.current.basketX = getCanvasX(event.touches[0].clientX);
    };

    const onTouchMove = event => {
      event.preventDefault();
      stateRef.current.basketX = getCanvasX(event.touches[0].clientX);
    };

    const keys = {};
    const onKeyDown = event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') event.preventDefault();
      keys[event.key] = true;
    };
    const onKeyUp = event => { keys[event.key] = false; };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    timerRef.current = setInterval(() => {
      const st = stateRef.current;
      st.timeLeft = Math.max(0, st.timeLeft - 1);
      setDisplayTime(st.timeLeft);
      if (st.timeLeft === 0) {
        clearInterval(timerRef.current);
        cancelAnimationFrame(rafRef.current);
        // Track the timeout so cleanup can cancel it if the component unmounts first
        gameOverTimeoutRef.current = setTimeout(() => onGameOver(st.score), 300);
      }
    }, 1000);

    const loop = (ts) => {
      if (!lastTimeRef.current) lastTimeRef.current = ts;
      const dt = Math.min((ts - lastTimeRef.current) / 16.67, 3);
      lastTimeRef.current = ts;

      const st = stateRef.current;
      if (st.timeLeft <= 0) return;

      const kSpeed = 6;
      if (keys['ArrowLeft']) st.basketX = Math.max(BASKET_W / 2, st.basketX - kSpeed);
      if (keys['ArrowRight']) st.basketX = Math.min(CANVAS_W - BASKET_W / 2, st.basketX + kSpeed);

      st.spawnTimer += dt;
      if (st.spawnTimer >= st.spawnInterval) {
        st.spawnTimer = 0;
        spawnItem();
      }

      const basketY = CANVAS_H - BASKET_H - 10;
      const caught = [];
      const missed = [];

      for (const item of st.items) {
        item.y += item.speed * dt;
        const hitY = basketY - CUP_RADIUS * 0.5;
        if (item.y >= hitY && item.y < hitY + item.speed * dt + 10) {
          const dx = Math.abs(item.x - st.basketX);
          if (dx < BASKET_W * 0.55) {
            caught.push(item.id);
            st.score += item.flavor.points;
            setDisplayScore(st.score);
            const pts = item.flavor.points;
            st.floats.push({ id: item.id, x: item.x, y: item.y, text: pts >= 0 ? `+${pts}` : `${pts}`, color: item.flavor.color, age: 0 });
            continue;
          }
        }
        if (item.y > CANVAS_H + CUP_RADIUS * 2) missed.push(item.id);
      }

      const remove = new Set([...caught, ...missed]);
      st.items = st.items.filter(item => !remove.has(item.id));
      st.floats = st.floats.filter(float => float.age < 1);
      for (const float of st.floats) float.age += 0.04 * dt;

      const isDark = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDark ? '#0f172a' : '#f1f5f9';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      for (const item of st.items) drawCup(ctx, item.x, item.y, item.flavor);
      drawBasket(ctx, st.basketX, basketY);

      for (const float of st.floats) {
        ctx.save();
        ctx.globalAlpha = 1 - float.age;
        ctx.fillStyle = float.color;
        ctx.font = 'bold 22px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = float.color;
        ctx.shadowBlur = 8;
        ctx.fillText(float.text, float.x, float.y - float.age * 60);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(timerRef.current);
      clearTimeout(gameOverTimeoutRef.current);
      // Reset timestamp so a re-mount starts fresh without a giant dt spike
      lastTimeRef.current = null;
      // Release item references held in the state array
      stateRef.current.items = [];
      stateRef.current.floats = [];
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [onGameOver, spawnItem]);

  return (
    <div className={s.wrapper}>
      <div className={s.hudRow}>
        <div className={card.hud}>
          <div className={s.hudLabel}>Score</div>
          <div className={s.hudValue}>{displayScore}</div>
        </div>
        <div className={card.hud}>
          <div className={s.hudLabel}>Time</div>
          <div className={displayTime <= 10 ? s.hudValueWarn : s.hudValue}>{displayTime}s</div>
        </div>
      </div>
      <div className={s.canvasWrap}>
        <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} />
      </div>
    </div>
  );
};

export default GameCanvas;
