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
      default: 'text-(--ui-color-design-plain-content)',
      thick: 'text-(--ui-color-design-plain-na-content)',
      thin: 'text-(--ui-color-design-plain-na-content-secondary)'
    }
  },
  defaultVariants: {
    small: false,
    accent: 'default'
  }
}
