/**
 * Prose/H1
 * Show h1
 */

export default {
  slots: {
    base: [
      'mb-2',
      'text-5xl leading-3xs font-light',
      'text-base-master dark:text-base-150',
      'scroll-mt-[calc(45px+var(--b24ui-header-height))] lg:scroll-mt-(--b24ui-header-height)'
    ].join(' '),
    link: 'inline-flex items-center gap-2'
  }
}
