export const gameStyles = {
  wrapper: 'flex flex-col items-center gap-4 w-full',
  hudRow: 'flex gap-4 items-center justify-center flex-wrap',
  hudLabel: 'text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1',
  hudValue: 'text-3xl font-black text-indigo-500 dark:text-indigo-400 leading-none',
  hudValueWarn: 'text-3xl font-black text-red-500 leading-none animate-pulse-warn',
  canvasWrap: [
    'relative rounded-2xl overflow-hidden cursor-none',
    'shadow-xl shadow-indigo-100 dark:shadow-black/50',
    'border-2 border-slate-200 dark:border-slate-800',
  ].join(' '),
}
