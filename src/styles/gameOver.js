export const gameOverStyles = {
  wrapper: 'flex flex-col items-center w-full max-w-md gap-8',
  card: [
    'w-full bg-white dark:bg-slate-900',
    'border border-slate-200 dark:border-slate-800',
    'rounded-2xl shadow-xl p-10 text-center',
  ].join(' '),
  title: 'text-4xl font-black bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent mb-2',
  scoreNum: 'text-6xl font-black text-indigo-500 dark:text-indigo-400 leading-none my-4',
  scoreLabel: 'text-slate-500 dark:text-slate-400 text-sm mb-8',
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
