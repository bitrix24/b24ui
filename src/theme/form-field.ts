/**
 * FormField
 * A wrapper for form elements that provides validation and error handling.
 * ---
 */

export default {
  slots: {
    root: 'font-b24-system font-regular',
    wrapper: 'leading-none',
    labelWrapper: 'flex content-center items-center justify-between',
    label: 'block text-base-900 dark:text-base-400',
    hint: 'text-base-500 dark:text-base-600',
    container: 'relative',
    description: 'mt-0.5 leading-tight text-base-500 dark:text-base-600',
    error: 'mt-1 text-red-500 dark:text-red-600',
    errorIcon: 'size-lg',
    help: 'mt-1.5 leading-tight italic text-base-500 dark:text-base-600'
  },
  variants: {
    useDescription: {
      true: { wrapper: 'mb-1.5' },
      false: { wrapper: 'mb-2.5' }
    },
    size: {
      xs: { root: 'text-xs', errorIcon: 'size-md' },
      sm: { root: 'text-xs', errorIcon: 'size-md' },
      md: { root: 'text-sm', errorIcon: 'size-md2' },
      lg: { root: 'text-md' }
    },
    required: {
      true: {
        label: 'after:content-[\'*\'] after:ms-0.5 after:text-red-500 after:dark:text-red-600'
      }
    }
  },
  compoundVariants: [],
  defaultVariants: {
    size: 'md'
  }
}
