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
      'py-[13px]',
      'flex flex-col',
      'border-b border-(--leftmenu-bg-divider)',
      '[&>[data-slot=section]+[data-slot=section]]:mt-2.5'
    ].join(' ')
  }
}
