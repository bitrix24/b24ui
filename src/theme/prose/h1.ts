/**
 * Prose/H1
 * Show h1
 */

export default {
  slots: {
    base: [
      'mb-2',
      'text-base-master dark:text-base-150',
      'scroll-mt-[calc(45px+var(--b24ui-header-height))] lg:scroll-mt-(--b24ui-header-height)',
      'text-h1'
    ].join(' '),
    link: 'inline-flex items-center gap-2'
  }
}
