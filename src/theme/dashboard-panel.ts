/**
 * DashboardPanel
 * A resizable panel component for dashboards.
 * ---
 */
export default {
  slots: {
    root: 'relative flex flex-col min-w-0 min-h-svh lg:not-last:border-e lg:not-last:border-(--ui-color-divider-default) shrink-0',
    body: 'flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin',
    handle: ''
  },
  variants: {
    size: {
      true: {
        root: 'w-full lg:w-(--width)'
      },
      false: {
        root: 'flex-1'
      }
    }
  }
}
