/**
 * DashboardSidebar
 * A resizable and collapsible sidebar component for dashboards.
 * ---
 */
export default {
  slots: {
    root: [
      'relative hidden lg:flex flex-col min-h-svh min-w-16 w-(--width) shrink-0',
      'backdrop-blur-sm bg-(--ui-color-bg-content-primary)/20 light:bg-transparent dark:bg-(--ui-color-bg-content-primary)/70',
      'light:bg-transparent light:[--leftmenu-group-stroke:var(--ui-color-base-30)]'
    ].join(' '),
    header: 'h-(--b24ui-header-height) shrink-0 flex items-center gap-1.5 ps-4 pe-4',
    body: 'flex flex-col gap-4 flex-1 overflow-y-auto py-2 ps-4 pe-4 md:pe-2 scrollbar-thin scrollbar-transparent',
    footer: [
      'shrink-0 flex items-center gap-1.5 py-2 ps-4 pe-4',
      'lg:border-t lg:border-(--ui-color-divider-default)',
      'light:lg:border-(--ui-color-base-30)'
    ].join(' '),
    toggle: '',
    handle: '',
    content: 'lg:hidden',
    overlay: 'lg:hidden'
  },
  variants: {
    menu: {
      true: {
        header: 'sm:px-6',
        body: 'sm:px-6',
        footer: 'sm:px-6'
      }
    },
    side: {
      left: {
        root: 'border-e border-e-0 border-(--ui-color-divider-accent)'
      },
      right: {
        root: ''
      }
    },
    toggleSide: {
      left: {
        toggle: ''
      },
      right: {
        toggle: 'ms-auto'
      }
    }
  }
}
