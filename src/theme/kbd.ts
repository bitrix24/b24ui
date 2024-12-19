/**
 * Kbd
 * A kbd element to display a keyboard key.
 */

/**
 * @todo fix depth
 * @todo fix size
 * @todo fix dark mode color
 * @todo fix font family
 */
export default {
  base: 'inline-flex items-center justify-center px-1 rounded-2xs font-normal font-b24-system-mono',
  variants: {
    depth: {
      light: [
        'ring ring-inset',
        'bg-white text-base-900 ring-base-350',
        'dark:bg-base-dark dark:text-base-400 dark:ring-base-700'
      ].join(' '),
      normal: [
        'ring ring-inset',
        'bg-base-100 text-base-master ring-base-350',
        'dark:bg-base-900/85 dark:text-base-350 dark:ring-base-700'
      ].join(' '),
      dark: [
        'bg-base-900 text-white',
        'dark:bg-base-350 dark:text-base-900'
      ].join(' ')
    },
    size: {
      sm: 'h-[16px] min-w-[16px] text-3xs leading-none',
      md: 'h-[20px] min-w-[20px] text-xs leading-none',
      lg: 'h-[24px] min-w-[24px] text-md leading-none'
    }
  },
  defaultVariants: {
    depth: 'light',
    size: 'md'
  }
}
