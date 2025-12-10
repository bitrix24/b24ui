/**
 * Tooltip
 * A popup that reveals information when hovering over an element.
 * ---
 * @link /api_d7/bitrix/ui/hint/index.php
 * @see bitrix/js/ui/hint/
 */

/**
 * @memo bg-base-dark/85 - has some problem at render by tw -> fix to bg-base-dark
 */
export default {
  slots: {
    content: [
      'dark',
      'flex flex-row items-center justify-between gap-[5px] will-change-[opacity]',
      'min-h-[37px]',
      'shadow-xl/20',
      'select-none',
      'motion-safe:data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] motion-safe:data-[state=closed]:animate-[scale-out_100ms_ease-in]',
      'p-[10px]',
      'text-(length:--ui-font-size-sm)/(--ui-font-line-height-reset) font-[family-name:var(--ui-font-family-primary)]',
      'bg-(--ui-color-bg-content-primary)/80',
      'text-(--ui-color-design-plain-na-focused-content)',
      'rounded-[calc(var(--ui-border-radius-xl)-2px)]',
      // @memo see components/popup.css
      // 'border border-(--popup-window-border)'
      'origin-(--reka-tooltip-content-transform-origin)',
      'pointer-events-auto'
    ].join(' '),
    arrow: 'fill-(--ui-color-bg-content-primary)/80',
    text: 'text-pretty max-w-[200px] min-w-[100px]', // truncate
    kbds: `hidden lg:inline-flex items-center shrink-0 gap-0.5 not-first-of-type:before:content-[''] not-first-of-type:before:me-0.5`,
    kbdsSize: 'sm',
    kbdsAccent: 'default'
  }
}
