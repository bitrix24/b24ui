/**
 * DashboardPanel
 * A resizable panel component for dashboards.
 * ---
 */
export default {
  slots: {
    root: 'relative flex flex-col min-w-0 min-h-svh lg:not-last:border-e lg:not-last:border-(--ui-color-divider-default) shrink-0',
    body: 'flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto pt-2.5 lg:p-4 scrollbar-thin',
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
