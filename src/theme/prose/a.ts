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
      'text-(--ui-color-accent-main-primary)',
      'hover:underline underline-offset-2',
      'focus-visible:outline-info-text',
      'transition-colors [&>code]:transition-colors',
      '[&>code]:ring-dashed',
      'hover:[&>code]:text-(--ui-color-accent-main-primary-alt) hover:[&>code]:bg-(--ui-color-design-selection-bg) hover:[&>code]:ring-(--ui-color-design-selection-stroke)'
    ].join(' ')
  }
}
