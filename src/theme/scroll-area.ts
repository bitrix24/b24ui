/**
 * ScrollArea
 * A flexible scrollable viewport component that implements virtualization to handle large datasets with optimal performance.
 * ---
 */

export default {
  slots: {
    root: 'relative',
    viewport: 'relative flex',
    item: ''
  },
  variants: {
    orientation: {
      vertical: {
        root: 'overflow-y-auto overflow-x-hidden',
        viewport: 'flex-col',
        item: ''
      },
      horizontal: {
        root: 'overflow-x-auto overflow-y-hidden',
        viewport: 'flex-row',
        item: ''
      }
    }
  }
}
