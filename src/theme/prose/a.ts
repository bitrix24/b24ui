/**
 * Prose/A
 * Show a
 *
 * @see src/theme/link.ts
 */

export default {
  slots: {
    base: [
      'cursor-pointer',
      'text-blue-700 dark:text-blue-300',
      'hover:underline underline-offset-2',
      'focus-visible:outline-info-text',
      'transition-colors [&>code]:transition-colors',
      '[&>code]:ring-dashed',
      'hover:[&>code]:text-blue-700 hover:[&>code]:bg-blue-250 hover:[&>code]:ring-blue-250',
      'dark:hover:[&>code]:text-blue-700 dark:hover:[&>code]:bg-blue-250 dark:hover:[&>code]:ring-blue-250'
    ].join(' ')
  }
}
