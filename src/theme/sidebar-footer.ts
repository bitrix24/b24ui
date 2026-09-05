/**
 * SidebarFooter
 * ---
 * @deprecated This component is deprecated and will be removed in version `3.0.0`
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
