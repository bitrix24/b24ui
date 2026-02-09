/**
 * Prose/Th
 * Show th
 *
 * @see src/theme/table-wrapper.ts
 */

export default {
  slots: {
    base: ''
  },
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    }
  },
  defaultVariants: {
    align: 'left'
  }
}
