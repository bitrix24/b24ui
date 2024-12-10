export default {
  slots: {
    root: 'inline-flex justify-end',
    base: 'relative rounded-full ring-white dark:ring-base-700 last:me-0'
  },
  variants: {
    size: {
      '2xs': {
        base: 'ring -me-0.5'
      },
      'xs': {
        base: 'ring -me-0.5'
      },
      'sm': {
        base: 'ring -me-1.5'
      },
      'md': {
        base: 'ring-2 -me-1.5'
      },
      'lg': {
        base: 'ring-2 -me-1.5'
      },
      'xl': {
        base: 'ring-3 -me-2'
      },
      '2xl': {
        base: 'ring-3 -me-2'
      },
      '3xl': {
        base: 'ring-3 -me-2'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
}
