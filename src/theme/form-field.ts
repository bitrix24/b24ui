/**
 * FormField
 * A wrapper for form elements that provides validation and error handling.
 * ---
 */

/**
 * @todo add dark mode
 */
export default {
  slots: {
    root: '',
    wrapper: '',
    labelWrapper: 'flex content-center items-center justify-between',
    label: 'block font-medium text-base-master',
    container: 'mt-1 relative',
    description: 'text-base-500',
    error: 'mt-2 text-red-500',
    hint: 'text-base-500',
    help: 'mt-2 text-base-500'
  },
  variants: {
    size: {
      xs: { root: 'text-xs' },
      sm: { root: 'text-xs' },
      md: { root: 'text-sm' },
      lg: { root: 'text-sm' }
    },
    required: {
      true: {
        label: `after:content-['*'] after:ms-0.5 after:text-red-500`
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
}
