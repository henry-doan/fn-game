import { useEffect, useRef, useState } from 'react';
import { FLAVORS } from '../constants/flavors';
import { gameStyles as s } from '../styles/gameStyles';
import cupCatcherSrc from '../assets/frazil/cup_catcher.webp';

// Logical (CSS-pixel) size of the play field. The canvas is scaled to fit its
// container and rendered at devicePixelRatio so it stays sharp on every screen.
const CANVAS_W = 600;
const CANVAS_H = 500;
const BASKET_W = 90;
const BASKET_H = 50;
const CUP_RADIUS = 28;
const BASE_SPEED = 4.5;
const KEY_SPEED = 6; // px per 60fps-frame
const FRAME_MS = 1000 / 60;
const COUNTDOWN_MS = 3600; // "3, 2, 1" (1s each) + "GO!" (0.6s)
const GO_MS = 600;

// Difficulty ramps from START to END over the course of the round, so it scales
// with whatever round length the admin picks.
const DIFFICULTY = {
  spawnInterval: [38, 14], // frames between spawns
  maxItems: [6, 12],
  speedMult: [1, 1.7],
  trapWeightMult: [1, 2.5],
};
const lerp = ([a, b], t) => a + (b - a) * t;

// Preload all images at module load time so they're ready before game start
const loadImg = (src) => { const i = new Image(); i.src = src; return i; };
const cupCatcherImg = loadImg(cupCatcherSrc);
const flavorImages = Object.fromEntries(FLAVORS.map(f => [f.id, loadImg(f.image)]));

const pickFlavor = (progress) => {
  const trapMult = lerp(DIFFICULTY.trapWeightMult, progress);
  const weightOf = (f) => f.weight * (f.category === 'trap' ? trapMult : 1);
  const total = FLAVORS.reduce((sum, f) => sum + weightOf(f), 0);
  let roll = Math.random() * total;
  for (const flavor of FLAVORS) {
    roll -= weightOf(flavor);
    if (roll <= 0) return flavor;
  }
  return FLAVORS[FLAVORS.length - 1];
};

const GLOW = { energy: ['#AEEA00', 18], cafetango: ['#FF6F00', 22], trap: ['#EF4444', 22] };

const drawCup = (ctx, x, y, flavor) => {
  const size = CUP_RADIUS * 2.4;
  const img = flavorImages[flavor.id];

  ctx.save();
  const glow = GLOW[flavor.category];
  if (glow) {
    ctx.shadowColor = glow[0];
    ctx.shadowBlur = glow[1];
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

/**
 * @param {number} duration   round length in seconds
 * @param {number} reservedHeight  px of viewport height used by surrounding UI,
 *                                 so the play field fits on short/landscape screens
 */
const GameCanvas = ({ duration, onGameOver, reservedHeight = 120 }) => {
  const canvasRef = useRef(null);
  const controlsRef = useRef(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [phase, setPhase] = useState('countdown'); // countdown | playing | paused | over
  const [countdownLabel, setCountdownLabel] = useState('3');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const durationMs = duration * 1000;

    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = CANVAS_W * dpr;
    canvas.height = CANVAS_H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // All mutable game state lives here, scoped to this effect run.
    const st = {
      phase: 'countdown',
      countdownLeft: COUNTDOWN_MS,
      countdownLabel: '3',
      items: [],
      floats: [],
      basketX: CANVAS_W / 2,
      score: 0,
      elapsed: 0,
      shownSeconds: duration,
      nextId: 0,
      spawnTimer: 0,
    };
    const keys = {};
    let rafId = null;
    let lastTs = null;
    let gameOverTimeout = null;

    const setGamePhase = (next) => {
      st.phase = next;
      setPhase(next);
    };

    const startCountdown = () => {
      st.countdownLeft = COUNTDOWN_MS;
      st.countdownLabel = '3';
      setCountdownLabel('3');
      setGamePhase('countdown');
    };

    const pause = () => {
      if (st.phase !== 'playing' && st.phase !== 'countdown') return;
      for (const k of Object.keys(keys)) keys[k] = false;
      setGamePhase('paused');
    };

    const resume = () => {
      if (st.phase === 'paused') startCountdown();
    };

    controlsRef.current = {
      togglePause: () => (st.phase === 'paused' ? resume() : pause()),
      resume,
    };

    const getCanvasX = (clientX) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = CANVAS_W / rect.width;
      return Math.max(BASKET_W / 2, Math.min(CANVAS_W - BASKET_W / 2, (clientX - rect.left) * scaleX));
    };
    const canMove = () => st.phase === 'playing' || st.phase === 'countdown';

    const onPointerMove = event => {
      if (canMove()) st.basketX = getCanvasX(event.clientX);
    };
    const onTouch = event => {
      event.preventDefault();
      if (canMove()) st.basketX = getCanvasX(event.touches[0].clientX);
    };
    const onKeyDown = event => {
      if (event.key === 'Escape' || event.key === 'p' || event.key === 'P') {
        controlsRef.current.togglePause();
        return;
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') event.preventDefault();
      keys[event.key] = true;
    };
    const onKeyUp = event => { keys[event.key] = false; };
    const onVisibility = () => { if (document.hidden) pause(); };

    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('touchstart', onTouch, { passive: false });
    canvas.addEventListener('touchmove', onTouch, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    document.addEventListener('visibilitychange', onVisibility);

    const spawnItem = (progress) => {
      if (st.items.length >= Math.round(lerp(DIFFICULTY.maxItems, progress))) return;
      const flavor = pickFlavor(progress);
      const margin = CUP_RADIUS * 1.5;
      st.items.push({
        id: st.nextId++,
        x: margin + Math.random() * (CANVAS_W - margin * 2),
        y: -CUP_RADIUS * 2,
        flavor,
        speed: BASE_SPEED * flavor.speedMult * lerp(DIFFICULTY.speedMult, progress),
      });
    };

    const update = (dt) => {
      const ms = dt * FRAME_MS;

      if (st.phase === 'countdown') {
        st.countdownLeft -= ms;
        const label = st.countdownLeft > GO_MS ? String(Math.ceil((st.countdownLeft - GO_MS) / 1000)) : 'GO!';
        if (label !== st.countdownLabel) {
          st.countdownLabel = label;
          setCountdownLabel(label);
        }
        if (st.countdownLeft <= 0) setGamePhase('playing');
      }

      if (st.phase === 'countdown' || st.phase === 'playing') {
        if (keys['ArrowLeft']) st.basketX = Math.max(BASKET_W / 2, st.basketX - KEY_SPEED * dt);
        if (keys['ArrowRight']) st.basketX = Math.min(CANVAS_W - BASKET_W / 2, st.basketX + KEY_SPEED * dt);
      }

      // Floating "+N" labels keep fading even while paused/over
      for (const float of st.floats) float.age += 0.04 * dt;
      st.floats = st.floats.filter(float => float.age < 1);

      if (st.phase !== 'playing') return;

      st.elapsed = Math.min(durationMs, st.elapsed + ms);
      const progress = st.elapsed / durationMs;
      const seconds = Math.ceil((durationMs - st.elapsed) / 1000);
      if (seconds !== st.shownSeconds) {
        st.shownSeconds = seconds;
        setTimeLeft(seconds);
      }

      st.spawnTimer += dt;
      if (st.spawnTimer >= lerp(DIFFICULTY.spawnInterval, progress)) {
        st.spawnTimer = 0;
        spawnItem(progress);
      }

      const basketY = CANVAS_H - BASKET_H - 10;
      const hitY = basketY - CUP_RADIUS * 0.5;
      const remove = new Set();

      for (const item of st.items) {
        const step = item.speed * dt;
        item.y += step;
        if (item.y >= hitY && item.y < hitY + step + 10 && Math.abs(item.x - st.basketX) < BASKET_W * 0.55) {
          remove.add(item.id);
          const pts = item.flavor.points;
          st.score += pts;
          setScore(st.score);
          st.floats.push({ x: item.x, y: item.y, text: pts >= 0 ? `+${pts}` : `${pts}`, color: item.flavor.color, age: 0 });
        } else if (item.y > CANVAS_H + CUP_RADIUS * 2) {
          remove.add(item.id);
        }
      }
      if (remove.size) st.items = st.items.filter(item => !remove.has(item.id));

      if (st.elapsed >= durationMs) {
        setGamePhase('over');
        gameOverTimeout = setTimeout(() => onGameOver(st.score), 400);
      }
    };

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDark ? '#0f172a' : '#f1f5f9';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      for (const item of st.items) drawCup(ctx, item.x, item.y, item.flavor);
      drawBasket(ctx, st.basketX, CANVAS_H - BASKET_H - 10);

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
    };

    const loop = (ts) => {
      if (lastTs === null) lastTs = ts;
      const dt = Math.min((ts - lastTs) / FRAME_MS, 3);
      lastTs = ts;
      update(dt);
      draw();
      if (st.phase !== 'over' || st.floats.length) rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(gameOverTimeout);
      controlsRef.current = null;
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('touchstart', onTouch);
      canvas.removeEventListener('touchmove', onTouch);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [duration, onGameOver]);

  const lowTime = phase === 'playing' && timeLeft <= 10;

  return (
    <div className={s.stage} style={{ '--reserved': `${reservedHeight}px` }}>
      <canvas ref={canvasRef} className={s.canvas} aria-label="Game area" />

      <div className={s.hud}>
        <div className={s.hudPill}>
          <span className={s.hudLabel}>Score</span>
          <span className={s.hudValue}>{score}</span>
        </div>
        <div className={s.hudPill}>
          <span className={s.hudLabel}>Time</span>
          <span className={lowTime ? s.hudValueWarn : s.hudValue}>{timeLeft}s</span>
        </div>
        <button
          className={s.pauseBtn}
          onClick={() => controlsRef.current?.togglePause()}
          aria-label={phase === 'paused' ? 'Resume' : 'Pause'}
          disabled={phase === 'over'}
        >
          {phase === 'paused' ? '▶' : '❚❚'}
        </button>
      </div>

      {phase === 'countdown' && (
        <div className={s.overlay} aria-live="assertive">
          <span key={countdownLabel} className={s.countdown}>{countdownLabel}</span>
        </div>
      )}

      {phase === 'paused' && (
        <div className={s.overlayDim}>
          <div className={s.pausedTitle}>Paused</div>
          <button className={s.resumeBtn} onClick={() => controlsRef.current?.resume()}>
            Resume
          </button>
          <div className={s.pausedHint}>Press Esc or P to resume</div>
        </div>
      )}
    </div>
  );
};

export default GameCanvas;
