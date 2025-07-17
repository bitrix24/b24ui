/**
 * Prose/H1
 * Show h1
 */

export default {
  slots: {
    base: [
      'relative mb-2',
      'scroll-mt-[calc(45px+var(--b24ui-header-height))] lg:scroll-mt-(--b24ui-header-height)',
      'text-(length:--ui-font-size-5xl)'
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
