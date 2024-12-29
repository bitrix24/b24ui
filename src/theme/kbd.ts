/**
 * Kbd
 * A kbd element to display a keyboard key.
 */

/**
 * @todo make bg -> use badge
 */
export default {
  base: 'inline-flex items-center justify-center px-1 rounded-2xs font-normal font-b24-system-mono',
  variants: {
    depth: {
      light: [
        'ring ring-inset',
        'text-base-900 bg-base-800/5 ring-base-800/20',
        'dark:text-base-150 dark:bg-base-200/5 dark:ring-base-200/20'
      ].join(' '),
      normal: [
        'ring ring-inset',
        'text-base-800 bg-base-150 ring-base-150',
        'dark:text-base-950 dark:bg-base-200 dark:ring-base-200'
      ].join(' '),
      dark: [
        'ring ring-inset',
        'text-white bg-base-500 ring-base-500',
        'dark:text-base-50 dark:bg-base-600 dark:ring-base-600'
      ].join(' ')
    },
    size: {
      sm: 'h-[20px] min-w-[20px] text-[10px] leading-none',
      md: 'h-[24px] min-w-[24px] text-[14px] leading-none',
      lg: 'h-[28px] min-w-[28px] text-[18px] leading-none'
    }
  },
  defaultVariants: {
    depth: 'light',
    size: 'md'
  }
}
