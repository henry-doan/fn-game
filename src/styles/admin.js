export const adminStyles = {
  wrapper: 'w-full max-w-xl flex flex-col gap-5',
  headerRow: 'flex items-center justify-between',
  pageTitle: 'text-3xl font-black',
  notice: 'text-sm text-slate-600 dark:text-slate-300 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 rounded-xl px-4 py-3',
  card: [
    'w-full max-w-xl flex flex-col gap-3 p-5 sm:p-6',
    'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm',
  ].join(' '),
  title: 'text-2xl font-black',
  sectionTitle: 'text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300',
  label: 'text-sm font-semibold text-slate-500 dark:text-slate-400',
  muted: 'text-sm text-slate-500 dark:text-slate-400',
  error: 'text-sm font-semibold text-red-500',
  code: 'font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded',
  input: [
    'w-full px-4 py-3 rounded-xl text-base mb-1',
    'bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700',
    'focus:border-indigo-500 dark:focus:border-indigo-400 text-slate-900 dark:text-slate-100',
    'outline-none transition-colors',
  ].join(' '),
  chips: 'flex flex-wrap gap-2',
  chip: (active) => [
    'px-4 py-2 rounded-full text-sm font-bold border transition-colors',
    active
      ? 'bg-indigo-500 border-indigo-500 text-white'
      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400',
  ].join(' '),
  customRow: 'flex gap-2 items-center',
  toggleRow: 'flex items-start justify-between gap-4',
  switch: (on) => [
    'relative shrink-0 w-14 h-8 rounded-full transition-colors',
    on ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700',
  ].join(' '),
  switchKnob: (on) => [
    'absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow transition-transform',
    on ? 'translate-x-6' : 'translate-x-0',
  ].join(' '),
  linkRow: 'flex items-center justify-between gap-3 flex-wrap',
  link: 'text-sm font-semibold text-indigo-500 dark:text-indigo-400 underline underline-offset-2',
  snippet: 'w-full font-mono text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 resize-none',
}
