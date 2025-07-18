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
      'flex items-center gap-1 shadow-sm rounded-2xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
      'min-h-6 px-2.5 py-1 text-xs',
      'bg-base-dark text-white',
      'dark:bg-base-dark dark:text-base-150 dark:ring dark:ring-base-100/20',
      'origin-(--reka-tooltip-content-transform-origin)',
      'pointer-events-auto'
    ].join(' '),
    arrow: 'fill-base-dark dark:fill-base-100/20',
    text: 'text-pretty max-w-[200px]', // truncate
    kbds: `hidden lg:inline-flex items-center shrink-0 gap-0.5 before:content-[''] before:me-0.5`,
    kbdsSize: 'sm',
    kbdsDepth: 'normal'
  }
}
