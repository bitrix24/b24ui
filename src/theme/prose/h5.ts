/**
 * Prose/H5
 * Show h5
 * ---
 * @todo: docs
 * @todo: playground
 */

export default {
  slots: {
    base: [
      'relative mb-2',
      'scroll-mt-[calc(32px+45px+var(--b24ui-header-height))] lg:scroll-mt-[calc(32px+var(--b24ui-header-height))]',
      'text-(length:--ui-font-size-xl)'
    ].join(' ')
  },
  variants: {
    accent: {
      'default': 'text-(--ui-color-design-plain-content)',
      'accent': 'text-(--ui-color-accent-brand-blue)',
      'accent-more': 'text-(--ui-color-accent-soft-element-blue)',
      'less': 'text-(--ui-color-design-plain-na-content)',
      'less-more': 'text-(--ui-color-design-plain-na-content-secondary)'
    }
  },
  defaultVariants: {
    accent: 'default'
  }
}
