/**
 * Prose/P
 * Show p
 * ---
 * @todo: docs
 * @todo: playground
 */

export default {
  slots: {
    base: [
      'mb-2 last:mb-0',
      'leading-relaxed',
      'text-pretty'
    ].join(' ')
  },
  variants: {
    small: {
      true: 'text-sm',
      false: 'text-base'
    },
    accent: {
      'default': 'text-(--ui-color-design-plain-content)',
      'accent': 'text-(--ui-color-accent-brand-blue)',
      'accent-more': 'text-(--ui-color-accent-soft-element-blue)',
      'less': 'text-(--ui-color-design-plain-na-content)',
      'less-more': 'text-(--ui-color-design-plain-na-content-secondary)'
    }
  },
  defaultVariants: {
    small: false,
    accent: 'default'
  }
}
