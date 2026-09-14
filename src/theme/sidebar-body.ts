/**
 * SidebarBody
 * ---
 * @deprecated This component is deprecated and will be removed in version `3.0.0`
 */

export default {
  slots: {
    root: [
      'py-4',
      'flex flex-1 flex-col',
      'overflow-y-auto',
      '[&>[data-slot=section]+[data-slot=section]]:mt-8'
    ].join(' ')
  },
  variants: {
    scrollbarThin: {
      true: {
        root: 'scrollbar-thin scrollbar-transparent'
      }
    }
  },
  defaultVariants: {
    scrollbarThin: true
  }
}
