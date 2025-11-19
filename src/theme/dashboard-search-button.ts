/**
 * DashboardSearchButton
 * A pre-styled button that opens the Dashboard Search modal.
 * ---
 */

export default {
  slots: {
    base: '',
    baseLine: '',
    label: '',
    trailing: 'hidden lg:flex items-center gap-0.5 ms-auto'
  },
  variants: {
    collapsed: {
      true: {
        baseLine: 'ps-[5px] pe-[5px]',
        label: 'hidden',
        trailing: 'lg:hidden'
      }
    }
  }
}
