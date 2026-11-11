export const btn = {
  primary: [
    'block text-center w-full max-w-xs bg-gradient-to-r from-indigo-500 to-cyan-400',
    'text-white font-bold text-lg py-4 px-12 rounded-full',
    'shadow-lg shadow-indigo-200 dark:shadow-indigo-900',
    'hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-300 dark:hover:shadow-indigo-800',
    'active:translate-y-0 transition-all duration-200',
  ].join(' '),

  secondary: [
    'w-full bg-slate-100 dark:bg-slate-800',
    'text-slate-700 dark:text-slate-300',
    'border border-slate-200 dark:border-slate-700',
    'font-semibold py-3 px-6 rounded-full',
    'hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200',
  ].join(' '),

  danger: [
    'bg-transparent text-red-500 border border-red-400',
    'font-semibold text-sm py-1.5 px-4 rounded-full',
    'hover:bg-red-500 hover:text-white transition-all duration-200',
  ].join(' '),

  theme: [
    'flex items-center gap-2 bg-slate-100 dark:bg-slate-800',
    'border border-slate-200 dark:border-slate-700',
    'text-slate-700 dark:text-slate-300',
    'rounded-full px-4 py-2 text-sm font-medium',
    'hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200',
  ].join(' '),
}
