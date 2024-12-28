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
        'bg-white text-base-900 ring-base-350',
        'dark:bg-base-dark dark:text-base-400 dark:ring-base-700'
      ].join(' '),
      normal: [
        'ring ring-inset',
        'bg-base-100 text-base-master ring-base-350',
        'dark:bg-base-900/85 dark:text-base-200 dark:ring-base-700'
      ].join(' '),
      dark: [
        'bg-base-dark/85 text-white',
        'dark:bg-base-900/85 dark:text-base-200'
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
