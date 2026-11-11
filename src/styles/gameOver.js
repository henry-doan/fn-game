export const gameOverStyles = {
  card: [
    'w-full max-w-md bg-white dark:bg-slate-900',
    'border border-slate-200 dark:border-slate-800',
    'rounded-2xl shadow-xl p-6 sm:p-10 text-center',
  ].join(' '),
  title: 'text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent mb-2',
  scoreNum: 'text-5xl sm:text-6xl font-black text-indigo-500 dark:text-indigo-400 leading-none my-3 sm:my-4 tabular-nums',
  scoreLabel: 'text-slate-500 dark:text-slate-400 text-sm mb-3',
  best: 'text-sm text-slate-500 dark:text-slate-400 mb-6',
  newBest: 'inline-block text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-full px-4 py-1 mb-6',
  rankMsg: 'text-sm text-slate-600 dark:text-slate-300 mb-6',
  rankLink: 'text-indigo-500 dark:text-indigo-400 font-semibold underline underline-offset-2 whitespace-nowrap',
  nameLabel: 'block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 text-left',
  nameInput: [
    'w-full px-4 py-3 rounded-xl text-base',
    'bg-slate-50 dark:bg-slate-800',
    'border-2 border-slate-200 dark:border-slate-700',
    'focus:border-indigo-500 dark:focus:border-indigo-400',
    'text-slate-900 dark:text-slate-100',
    'outline-none transition-colors duration-200 mb-4',
  ].join(' '),
  actions: 'flex flex-col gap-3',
}
