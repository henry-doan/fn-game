export const gameStyles = {
  // Sized by .game-stage in index.css: fills available width, but shrinks to
  // fit the viewport height (minus --reserved) so it works in landscape/iframes.
  stage: [
    'game-stage relative mx-auto rounded-2xl overflow-hidden select-none',
    'shadow-xl shadow-indigo-100 dark:shadow-black/50',
    'border-2 border-slate-200 dark:border-slate-800',
  ].join(' '),
  canvas: 'block w-full h-full cursor-none touch-none',

  hud: 'absolute top-0 inset-x-0 flex items-start gap-2 p-2 sm:p-3 pointer-events-none',
  hudPill: [
    'flex items-baseline gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full',
    'bg-white/85 dark:bg-slate-900/85 backdrop-blur',
    'border border-slate-200 dark:border-slate-700 shadow-sm',
  ].join(' '),
  hudLabel: 'text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400',
  hudValue: 'text-lg sm:text-2xl font-black text-indigo-500 dark:text-indigo-400 leading-none tabular-nums',
  hudValueWarn: 'text-lg sm:text-2xl font-black text-red-500 leading-none tabular-nums animate-pulse-warn',
  pauseBtn: [
    'ml-auto pointer-events-auto w-9 h-9 sm:w-11 sm:h-11 rounded-full grid place-items-center',
    'bg-white/85 dark:bg-slate-900/85 backdrop-blur text-xs sm:text-sm font-black',
    'text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm',
    'hover:bg-white dark:hover:bg-slate-800 transition-colors disabled:opacity-40',
  ].join(' '),

  overlay: 'absolute inset-0 grid place-items-center pointer-events-none',
  countdown: [
    'text-7xl sm:text-9xl font-black animate-countdown',
    'bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg',
  ].join(' '),
  overlayDim: 'absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/60 backdrop-blur-sm text-white cursor-auto',
  pausedTitle: 'text-4xl sm:text-5xl font-black',
  resumeBtn: [
    'bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-bold text-lg',
    'py-3 px-10 rounded-full shadow-lg hover:-translate-y-0.5 transition-transform',
  ].join(' '),
  pausedHint: 'text-sm text-slate-300 hidden sm:block',
}
