/**
 * Prose/H2
 * Show h2
 */

export default {
  slots: {
    base: [
      'relative mb-2',
      'scroll-mt-[calc(48px+45px+var(--b24ui-header-height))] lg:scroll-mt-[calc(48px+var(--b24ui-header-height))]',
      'text-(length:--ui-font-size-4xl)'
    ].join(' ')
  },
  variants: {
    accent: {
      default: 'text-(--ui-color-design-plain-content)',
      thick: 'text-(--ui-color-design-plain-na-content)',
      thin: 'text-(--ui-color-design-plain-na-content-secondary)'
    }
  },
  defaultVariants: {
    accent: 'default'
  }
}
