/**
 * Prose/Code
 * Show code
 *
 * @see src/theme/badge.ts
 */

export default {
  slots: {
    base: [
      'px-1.5 py-0.5',
      'font-b24-system-mono font-medium text-sm leading-normal',
      'rounded-md',
      'inline-block'
    ].join(' ')
  },
  variants: {
    color: {
      default: [
        'ring ring-inset',
        'text-base-800 bg-base-150 ring-base-300',
        'dark:text-base-950 dark:bg-base-200 dark:ring-base-800'
      ].join(' '),
      danger: [
        'ring ring-inset',
        'text-red-800 bg-red-250 ring-red-250',
        'dark:text-red-800 dark:bg-red-350 dark:ring-red-350'
      ].join(' '),
      success: [
        'ring ring-inset',
        'text-green-800 bg-green-300 ring-green-300',
        'dark:text-green-800 dark:bg-green-330 dark:ring-green-330'
      ].join(' '),
      warning: [
        'ring ring-inset',
        'text-orange-800 bg-orange-300 ring-orange-300',
        'dark:text-orange-800 dark:bg-orange-400 dark:ring-orange-400'
      ].join(' '),
      primary: [
        'ring ring-inset',
        'text-blue-700 bg-blue-250 ring-blue-250',
        'dark:text-blue-700 dark:bg-blue-300 dark:ring-blue-300'
      ].join(' '),
      secondary: [
        'ring ring-inset',
        'text-white bg-cyan-350 ring-cyan-350',
        'dark:text-cyan-100 dark:bg-cyan-400 dark:ring-cyan-400'
      ].join(' '),
      collab: [
        'ring ring-inset',
        'text-collab-800 bg-collab-300 ring-collab-300',
        'dark:text-collab-800 dark:bg-collab-300 dark:ring-collab-300'
      ].join(' '),
      ai: [
        'ring ring-inset',
        'text-ai-500 bg-ai-150 ring-ai-150',
        'dark:text-ai-600 dark:bg-ai-200 dark:ring-ai-200'
      ].join(' '),
      primaryww: 'border border-(--ui-primary)/25 bg-(--ui-primary)/10 text-(--ui-primary)',
    }
  },
  defaultVariants: {
    color: 'default'
  }
}
