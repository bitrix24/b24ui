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
      'min-h-(--topbar-height)',
      'flex flex-col',
      'text-(--ui-color-base-1)',
      'border-b border-(--leftmenu-bg-divider)',
      '[&>[data-component=section]+[data-component=section]]:mt-2.5'
    ].join(' ')
  }
}
