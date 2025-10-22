/**
 * Prose/Img
 * Show img
 * ---
 * @see src/theme/modal.ts
 */

export default {
  slots: {
    base: 'rounded-md',
    overlay: 'fixed inset-0 bg-[#003366]/20 motion-safe:backdrop-blur-[2px] will-change-opacity',
    content: 'fixed inset-0 flex items-center justify-center cursor-zoom-out focus:outline-none p-4 sm:p-8',
    zoomedImage: 'w-full h-auto max-w-[95vw] max-h-[95vh] object-contain rounded-md'
  },
  variants: {
    zoom: {
      true: 'will-change-transform'
    },
    open: {
      true: ''
    }
  },
  compoundVariants: [{
    zoom: true,
    open: false,
    class: 'cursor-zoom-in'
  }]
}
