/**
 * SidebarHeader
 * ---
 * @todo: docs
 * @todo: test
 * @todo: playground
 * @todo: demo
 * @todo: color
 */

export default {
  slots: {
    root: [
      'p-4',
      'flex flex-col',
      // 'border-b border-base-950/5 dark:border-white/5',
      '[&>[data-slot=section]+[data-slot=section]]:mt-2.5'
    ].join(' ')
  }
}
