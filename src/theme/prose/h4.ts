/**
 * Prose/H4
 * Show h4
 */

export default {
  slots: {
    base: [
      'relative mb-2',
      'scroll-mt-[calc(32px+45px+var(--b24ui-header-height))] lg:scroll-mt-[calc(32px+var(--b24ui-header-height))]',
      'text-(length:--ui-font-size-2xl)'
    ].join(' ')
  },
  variants: {
    accent: {
      'default': 'text-(--b24ui-typography-label-color)',
      'accent': 'text-(--ui-color-accent-brand-blue)',
      'accent-more': 'text-(--ui-color-accent-soft-element-blue)',
      'less': 'text-(--b24ui-typography-description-color)',
      'less-more': 'text-(--ui-color-design-plain-na-content-secondary)'
    }
  },
  defaultVariants: {
    accent: 'default'
  }
}
