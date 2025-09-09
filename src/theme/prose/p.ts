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
      true: 'text-(length:--ui-font-size-3xs) leading-(--ui-font-line-height-2xs)',
      false: 'text-(length:--ui-font-size-xl) leading-(--ui-font-line-height-lg)'
    },
    accent: {
      'default': 'text-(--b24ui-typography-label-color)',
      'accent': 'text-(--ui-color-accent-brand-blue)',
      'accent-more': 'text-(--ui-color-accent-soft-element-blue)',
      'less': 'text-(--b24ui-typography-description-color)',
      'less-more': 'text-(--ui-color-design-plain-na-content-secondary)'
    }
  },
  defaultVariants: {
    small: false,
    accent: 'default'
  }
}
