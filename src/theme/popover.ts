/**
 * Popover
 * A non-modal popup window for showing messages or gathering user input.
 * ---
 * @see src/theme/dropdown-menu.ts
 */
export default {
  slots: {
    content: [
      'base-mode',
      'bg-(--ui-color-bg-content-primary)',
      'shadow-(--popup-window-box-shadow)',
      'rounded-(--ui-border-radius-xl) will-change-[opacity]',
      'motion-safe:data-[state=open]:animate-[scale-in_100ms_ease-out] motion-safe:data-[state=closed]:animate-[scale-out_100ms_ease-in]',
      'origin-(--reka-popover-content-transform-origin)',
      'focus:outline-none pointer-events-auto'
    ].join(' '),
    arrow: 'fill-(--ui-color-bg-content-primary)'
  }
}
