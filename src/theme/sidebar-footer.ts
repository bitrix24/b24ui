/**
 * SidebarFooter
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
      'py-4',
      'flex flex-col',
      'max-lg:hidden',
      // 'border-t border-(--leftmenu-bg-divider)',
      '[&>[data-component=section]+[data-component=section]]:mt-2.5'
    ].join(' ')
  }
}
