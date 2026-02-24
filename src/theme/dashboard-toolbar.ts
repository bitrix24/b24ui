/**
 * DashboardToolbar
 * A secondary action bar positioned beneath the main navigation in dashboards.
 * ---
 */
export default {
  slots: {
    root: 'shrink-0 flex items-center justify-between border-b border-(--ui-color-divider-default) px-4 sm:px-6 gap-1.5 overflow-x-auto min-h-[49px]',
    left: 'flex items-center gap-1.5',
    right: 'flex items-center gap-1.5'
  }
}
