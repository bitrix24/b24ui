/**
 * Tooltip
 * A popup that reveals information when hovering over an element.
 * ---
 * @link /api_d7/bitrix/ui/hint/index.php
 * @see bitrix/js/ui/hint/
 */

export default {
  slots: {
    content: [
      'flex items-center gap-1 shadow-sm rounded-2xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
      'min-h-6 px-2 py-1 text-xs',
      'bg-base-dark/85 text-white',
      'dark:bg-dark dark:text-base-150 dark:ring dark:ring-base-100/20'
    ],
    arrow: 'fill-base-dark dark:fill-base-100/20',
    text: 'text-pretty max-w-[200px]', // truncate
    kbds: `hidden lg:inline-flex items-center shrink-0 gap-0.5 before:content-[''] before:me-0.5`,
    kbdsSize: 'sm',
    kbdsDepth: 'normal'
  }
}
