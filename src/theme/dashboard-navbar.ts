/**
 * DashboardNavbar
 * A responsive navigation bar for dashboards.
 * ---
 */
export default {
  slots: {
    root: 'h-(--b24ui-header-height) shrink-0 flex items-center justify-between ps-2 pe-4 lg:ps-4 lg:pe-4 gap-1.5',
    left: 'flex items-center gap-1.5 min-w-0',
    icon: 'shrink-0 size-5 self-center me-1.5',
    title: 'flex items-center gap-1.5 text-[length:25px] bitrix-mobile:text-[length:18px] font-medium text-(--ui-color-base-1) truncate',
    center: 'hidden lg:flex',
    right: 'flex items-center shrink-0 gap-3',
    toggle: ''
  },
  variants: {
    toggleSide: {
      left: {
        toggle: ''
      },
      right: {
        toggle: ''
      }
    }
  }
}
