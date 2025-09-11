/**
 * Prose/H1
 * Show h1
 * @memo {B24SidebarLayout + ContentToc + PageHeader} | lg:{B24SidebarLayout + PageHeader}
 */

export default {
  slots: {
    base: [
      'relative mb-2',
      'scroll-mt-[calc(45px+24px+var(--topbar-height))] lg:scroll-mt-[calc(22px+15px+var(--topbar-height))]',
      'text-(length:--ui-font-size-5xl)',
      '[&>code]:text-(length:--ui-font-size-4xl)/7'
    ].join(' '),
    link: 'inline-flex items-center gap-[8px]'
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
