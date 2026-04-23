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
      'light',
      'flex flex-row items-center justify-between gap-[5px] will-change-[opacity]',
      'min-h-[37px]',
      'shadow-xl/20',
      'select-none',
      'motion-safe:data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] motion-safe:data-[state=closed]:animate-[scale-out_100ms_ease-in]',
      'p-[13px]',
      'text-(length:--ui-font-size-lg)/[normal] font-[family-name:var(--ui-font-family-system)]',
      'bg-(--ui-color-bg-content-inapp)',
      'text-(--ui-color-base-8)',
      'rounded-[calc(var(--ui-border-radius-3xl)-2px)]',
      'ring ring-(--ui-color-bg-content-inapp)',
      'origin-(--reka-tooltip-content-transform-origin)',
      'pointer-events-auto'
    ].join(' '),
    arrow: 'fill-(--ui-color-bg-content-inapp) stroke-(--ui-color-bg-content-inapp)',
    text: 'text-pretty max-w-[344px] min-w-[100px]', // truncate
    kbds: `hidden lg:inline-flex items-center shrink-0 gap-0.5 not-first-of-type:before:content-[''] not-first-of-type:before:me-0.5`,
    kbdsSize: 'sm',
    kbdsAccent: 'default'
  }
}
