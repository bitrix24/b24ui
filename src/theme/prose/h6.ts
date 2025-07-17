/**
 * Prose/H6
 * Show h6
 * ---
 * @todo: docs
 * @todo: playground
 */

export default {
  slots: {
    base: [
      'relative mb-2',
      'scroll-mt-[calc(32px+45px+var(--b24ui-header-height))] lg:scroll-mt-[calc(32px+var(--b24ui-header-height))]',
      'text-h6'
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
