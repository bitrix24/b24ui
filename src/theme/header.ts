/**
 * Header
 * A header that adapts its structure and content to different screen sizes.
 * ---
 */
export default {
  slots: {
    root: 'bg-(--ui-color-bg-content-primary)/75 backdrop-blur border-b border-(--ui-color-divider-default) h-(--b24ui-header-height) sticky top-0 z-50',
    container: 'flex items-center justify-between gap-3 h-full',
    left: 'lg:flex-1 flex items-center gap-1.5',
    center: 'hidden lg:flex',
    right: 'flex items-center justify-end lg:flex-1 gap-1.5',
    title: 'shrink-0 font-bold text-xl text-(--b24ui-typography-label-color) flex items-end gap-1.5',
    toggle: 'lg:hidden',
    content: 'lg:hidden',
    overlay: 'lg:hidden',
    header: 'px-4 sm:px-6 h-(--b24ui-header-height) shrink-0 flex items-center justify-between gap-3',
    body: 'p-4 sm:p-6 overflow-y-auto'
  },
  variants: {
    toggleSide: {
      left: {
        toggle: '-ms-1.5'
      },
      right: {
        toggle: '-me-1.5'
      }
    }
  }
}
