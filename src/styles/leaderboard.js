export const lbStyles = {
  section: 'w-full max-w-lg',
  sectionLarge: 'w-full max-w-2xl',
  headerTitleLarge: 'text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent',
  header: 'flex items-center justify-between mb-4',
  headerTitle: 'text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400',
  empty: [
    'text-center text-slate-500 dark:text-slate-400',
    'bg-white dark:bg-slate-900',
    'border border-slate-200 dark:border-slate-800',
    'rounded-2xl p-8 text-sm',
  ].join(' '),
  list: 'flex flex-col gap-2',
  entry: (rank) => {
    const base = [
      'flex items-center gap-3',
      'bg-white dark:bg-slate-900',
      'border rounded-xl px-4 py-3 shadow-sm',
      'transition-colors duration-200',
    ].join(' ');
    if (rank === 0) return base + ' border-amber-400 dark:border-amber-500';
    if (rank === 1) return base + ' border-slate-400 dark:border-slate-500';
    if (rank === 2) return base + ' border-orange-400 dark:border-orange-600';
    return base + ' border-slate-200 dark:border-slate-800';
  },
  rank: (rank) => {
    const base = 'text-sm font-black min-w-[28px] text-center';
    if (rank === 0) return base + ' text-amber-500';
    if (rank === 1) return base + ' text-slate-400';
    if (rank === 2) return base + ' text-orange-500 dark:text-orange-400';
    return base + ' text-slate-400 dark:text-slate-500';
  },
  name: 'flex-1 min-w-0 truncate font-semibold text-sm text-slate-800 dark:text-slate-200',
  score: 'font-black text-lg text-indigo-500 dark:text-indigo-400',
  date: 'text-xs text-slate-400 dark:text-slate-500 min-w-[44px] text-right',
}
