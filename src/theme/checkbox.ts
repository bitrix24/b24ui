/**
 * Checkbox
 * An input element to toggle between checked and unchecked states.
 * ---
 */
export default {
  slots: {
    root: 'relative flex items-start',
    base: 'cursor-pointer shrink-0 flex items-center justify-center rounded-2xs text-white dark:text-base-150 ring ring-inset ring-base-300 dark:ring-base-700 focus-visible:outline-2 focus-visible:outline-offset-2',
    container: 'flex items-center',
    wrapper: 'font-b24-primary ms-2',
    icon: 'shrink-0 size-full',
    label: 'cursor-pointer block font-regular text-base-master dark:text-base-400',
    description: 'text-base-500 dark:text-base-600'
  },
  variants: {
    color: {
      default: 'focus-visible:outline-base-900 dark:focus-visible:outline-base-350',
      danger: 'focus-visible:outline-red-500 dark:focus-visible:outline-red-600',
      success: 'focus-visible:outline-green-500 dark:focus-visible:outline-green-600',
      warning: 'focus-visible:outline-orange-500 dark:focus-visible:outline-orange-600',
      primary: 'focus-visible:outline-blue-500 dark:focus-visible:outline-blue-600',
      secondary: 'focus-visible:outline-secondary-350 dark:focus-visible:outline-secondary-500',
      collab: 'focus-visible:outline-collab-500 dark:focus-visible:outline-collab-600',
      ai: 'focus-visible:outline-ai-500 dark:focus-visible:outline-ai-600'
    },
    size: {
      xs: {
        base: 'size-3',
        container: 'h-4',
        wrapper: 'text-xs',
        label: 'leading-4'
      },
      sm: {
        base: 'size-3.5',
        container: 'h-4',
        wrapper: 'text-sm',
        label: 'leading-4'
      },
      md: {
        base: 'size-4',
        container: 'h-5',
        wrapper: 'text-md',
        label: 'leading-5'
      },
      lg: {
        base: 'size-5',
        container: 'h-5',
        wrapper: 'text-xl',
        label: 'leading-5'
      }
    },
    required: {
      true: {
        label: 'after:content-[\'*\'] after:ms-0.5 after:text-red-500 dark:after:text-red-600'
      }
    },
    disabled: {
      true: {
        base: 'cursor-not-allowed opacity-75',
        label: 'cursor-not-allowed opacity-75',
        description: 'cursor-not-allowed opacity-75'
      }
    },
    checked: {
      true: ''
    }
  },
  compoundVariants: [
    {
      color: 'default',
      checked: true,
      class: 'ring-2 ring-base-900 bg-base-900 dark:ring-base-350 dark:bg-base-350 dark:text-base-800'
    },
    {
      color: 'danger',
      checked: true,
      class: 'ring-2 ring-red-500 bg-red-500 dark:ring-red-600 dark:bg-red-600 dark:text-red-250'
    },
    {
      color: 'success',
      checked: true,
      class: 'ring-2 ring-green-500 bg-green-500 dark:ring-green-600 dark:bg-green-600 dark:text-green-250'
    },
    {
      color: 'warning',
      checked: true,
      class: 'ring-2 ring-orange-500 bg-orange-500 dark:ring-orange-600 dark:bg-orange-600 dark:text-orange-250'
    },
    {
      color: 'primary',
      checked: true,
      class: 'ring-2 ring-blue-500 bg-blue-500 dark:ring-blue-600 dark:bg-blue-600 dark:text-blue-250'
    },
    {
      color: 'secondary',
      checked: true,
      class: 'ring-2 ring-secondary-350 bg-secondary-350 dark:ring-secondary-500 dark:bg-secondary-500'
    },
    {
      color: 'collab',
      checked: true,
      class: 'ring-2 ring-collab-500 bg-collab-500 dark:ring-collab-600 dark:bg-collab-600 dark:text-collab-250'
    },
    {
      color: 'ai',
      checked: true,
      class: 'ring-2 ring-ai-500 bg-ai-500 dark:ring-ai-600 dark:bg-ai-600 dark:text-ai-250'
    }
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary'
  }
}
