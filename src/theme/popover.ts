/**
 * Popover
 * A non-modal popup window for showing messages or gathering user input.
 * ---
 * @see src/theme/dropdown-menu.ts
 */
export default {
  slots: {
    content: [
      'light --ui-context-content-light',
      'bg-(--ui-color-bg-content-primary)',
      'shadow-(--popup-window-box-shadow)',
      'rounded-(--popup-window-border-radius) will-change-[opacity]',
      'motion-safe:data-[state=open]:animate-[scale-in_100ms_ease-out] motion-safe:data-[state=closed]:animate-[scale-out_100ms_ease-in]',
      'origin-(--reka-popover-content-transform-origin)',
      'focus:outline-none pointer-events-auto'
    ].join(' '),
    // fix arrow: 'fill-white dark:fill-base-dark stroke-base-300 dark:stroke-base-800'
    // box-shadow: 0 0 21px #535c6921;
    arrow: 'fill-(--ui-color-bg-content-primary)'
  }
}
