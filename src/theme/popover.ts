/**
 * Popover
 * A non-modal popup window for showing messages or gathering user input.
 * ---
 * @see src/theme/dropdown-menu.ts
 */
export default {
  slots: {
    content: [
      'bg-white dark:bg-base-dark',
      'shadow-lg rounded-2xs ring ring-base-300 dark:ring-base-800',
      'motion-safe:data-[state=open]:animate-[scale-in_100ms_ease-out] motion-safe:data-[state=closed]:animate-[scale-out_100ms_ease-in]',
      'origin-(--reka-popover-content-transform-origin)',
      'focus:outline-none pointer-events-auto'
    ].join(' '),
    arrow: 'fill-white dark:fill-base-dark stroke-base-300 dark:stroke-base-800'
  }
}
