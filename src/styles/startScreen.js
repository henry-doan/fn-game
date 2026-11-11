export const startStyles = {
  wrapper: 'flex flex-col items-center text-center w-full max-w-2xl gap-0',
  title: 'text-4xl sm:text-5xl font-black bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent tracking-tight mb-2',
  titleCompact: 'text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent tracking-tight mb-2',
  tagline: 'text-slate-500 dark:text-slate-400 text-base sm:text-lg mb-6',
  best: 'mt-4 text-sm text-slate-500 dark:text-slate-400',

  // Accordion
  accordion: 'w-full mt-5',
  accordionToggle: [
    'w-full flex items-center justify-between px-5 py-3.5',
    'bg-white dark:bg-slate-900',
    'border border-slate-200 dark:border-slate-700',
    'rounded-2xl text-sm font-semibold text-slate-700 dark:text-slate-200',
    'hover:bg-slate-50 dark:hover:bg-slate-800',
    'transition-colors duration-150 cursor-pointer',
  ].join(' '),
  chevron: 'text-lg text-slate-400 transition-transform duration-200',
  chevronOpen: 'rotate-180',
  accordionBody: [
    'mt-2 px-4 pt-4 pb-5',
    'bg-white dark:bg-slate-900',
    'border border-slate-200 dark:border-slate-700',
    'rounded-2xl',
  ].join(' '),
  accordionBodyHidden: 'hidden',

  // Flavor catalog inside accordion
  catalogWrapper: 'flex flex-col gap-5 mb-5',
  catSection: 'w-full',
  catHeader: 'flex items-baseline gap-2 mb-2 text-left',
  catLabel: 'text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-200',
  catDesc: 'text-xs text-slate-400 dark:text-slate-500',

  grid3: 'grid grid-cols-3 sm:grid-cols-6 gap-2',
  grid4: 'grid grid-cols-2 sm:grid-cols-4 gap-2',
  grid1: 'grid grid-cols-1 max-w-[130px]',

  flavorCard: [
    'flex flex-col items-center gap-1 p-2 rounded-xl',
    'bg-slate-50 dark:bg-slate-800',
    'border border-slate-200 dark:border-slate-700',
  ].join(' '),
  flavorImg: 'w-12 h-12 object-contain',
  flavorName: 'text-xs font-medium text-slate-600 dark:text-slate-300 text-center leading-tight',
  flavorPts: 'text-xs font-bold px-2 py-0.5 rounded-full text-white',

  // Instructions inside accordion
  instructionsList: 'flex flex-col gap-2 text-left border-t border-slate-100 dark:border-slate-800 pt-4',
  instructionsItem: 'flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm',
  instructionsDot: 'w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0',
}
