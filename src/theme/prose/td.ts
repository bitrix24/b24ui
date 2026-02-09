/**
 * Prose/Td
 * Show td
 *
 * @see src/theme/table-wrapper.ts
 */

export default {
  slots: {
    base: [
      '[&_code]:text-(length:--ui-font-size-xs)/5',
      '[&_p]:my-0 [&_p]:leading-6',
      '[&_ul]:my-0 [&_ol]:my-0 [&_ul]:ps-4.5 [&_ol]:ps-4.5',
      '[&_li]:leading-6 [&_li]:my-0.5'
    ].join(' ')
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
