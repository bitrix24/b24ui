/**
 * Prose/H3
 * Show h3
 */

export default {
  slots: {
    base: [
      'relative mb-2',
      'text-3xl leading-2xs font-light',
      '[&>a>code]:text-lg/7 [&>a>code]:font-bold',
      'text-base-master dark:text-base-150',
      'scroll-mt-[calc(32px+45px+var(--b24ui-header-height))] lg:scroll-mt-[calc(32px+var(--b24ui-header-height))]',
      '[&>a]:focus-visible:outline-info-text hover:[&>a>code]:border-info-text',
      'hover:[&>a>code]:text-info-text',
      '[&>a>code]:border-dashed [&>a>code]:transition-colors'
    ].join(' '),
    leading: [
      'absolute -ms-8 top-0.5 p-1',
      'rounded-md hidden lg:flex',
      'opacity-0 group-hover:opacity-100 group-focus:opacity-100',
      'bg-base-100 dark:bg-base-900',
      'text-base-500 dark:text-base-600',
      'hover:text-outline-info-text',
      'transition'
    ],
    leadingIcon: 'size-4 shrink-0',
    link: 'group lg:ps-2 lg:-ms-2'
  }
}
