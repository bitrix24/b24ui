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
  base: 'inline-flex items-center justify-center px-1 rounded-2xs font-medium font-sans',
  variants: {
    depth: {
      light: 'bg-white text-base-900 ring ring-inset ring-base-300 dark:bg-base-800 dark:text-base-200 dark:ring-base-700',
      normal: 'bg-base-100 text-base-master ring ring-inset ring-base-300 dark:bg-base-900 dark:text-base-400 dark:ring-base-700',
      dark: 'bg-base-900 text-white dark:bg-base-700 dark:text-base-100'
    },
    size: {
      sm: 'h-4 min-w-[16px] text-[10px]',
      md: 'h-5 min-w-[20px] text-[11px]',
      lg: 'h-6 min-w-[24px] text-[12px]'
    }
  },
  defaultVariants: {
    depth: 'light',
    size: 'md'
  }
}
