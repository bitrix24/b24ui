/**
 * ProseA
 * Show a
 * ---
 * @see src/theme/link.ts
 */

export default {
  slots: {
    base: [
      'cursor-pointer',
      // fix 'text-(--ui-color-accent-main-primary)',
      'text-(--ui-color-accent-main-link) dark:text-(--ui-color-blue-40)',
      'hover:underline underline-offset-2',
      'hover:text-(--ui-color-accent-main-primary-alt) dark:hover:text-(--ui-color-blue-50)',
      'focus-visible:outline-info-text',
      'focus-visible:has-[>code]:outline-0',
      'transition-colors [&>code]:transition-colors',
      // '[&>code]:ring-dashed',
      'hover:[&>code]:text-(--ui-color-accent-main-primary-alt-2)',
      'hover:[&>code]:bg-(--ui-color-design-selection-bg)',
      'hover:[&>code]:ring-(--ui-color-design-selection-stroke)',
      'focus-visible:[&>code]:ring-(--ui-color-design-selection-stroke) focus-visible:[&>code]:text-(--ui-color-accent-main-primary-alt-2)'
    ].join(' ')
  }
}
