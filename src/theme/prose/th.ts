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
      left: 'text-start',
      center: 'text-center',
      right: 'text-end'
    }
  },
  defaultVariants: {
    align: 'left'
  }
}
