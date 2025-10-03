/**
 * Prose/H3
 * Show h3
 */

export default {
  slots: {
    base: [
      'relative mb-2',
      'scroll-mt-[calc(32px+45px+24px+var(--topbar-height))] lg:scroll-mt-[calc(32px+22px+15px+var(--topbar-height))]',
      'text-(length:--ui-font-size-3xl)',
      '[&>a>code]:text-(length:--ui-font-size-2xl)/6',
      '[&>a]:focus-visible:outline-(--ui-color-accent-main-primary)',
      'hover:[&>a>code]:text-(--ui-color-accent-main-primary-alt-2)',
      'hover:[&>a>code]:bg-(--ui-color-design-selection-bg)',
      'hover:[&>a>code]:ring-(--ui-color-design-selection-stroke)'
    ].join(' '),
    leading: [
      'absolute',
      'style-tinted-no-accent-1',
      '-ms-[18px] top-[9px]',
      'opacity-0',
      'group-hover:opacity-100',
      'group-focus:opacity-100',
      'p-[1px]',
      'bg-(--b24ui-background)',
      'ring-(length:--b24ui-border-width) ring-(--b24ui-border-color)',
      'text-(--b24ui-color)',
      'hover:text-(--ui-color-accent-main-primary-alt-2)',
      'rounded-(--ui-border-radius-2xs)',
      'hidden lg:flex',
      'transition'
    ].join(' '),
    leadingIcon: 'size-[14px] shrink-0',
    link: 'group lg:ps-2 lg:-ms-2'
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
