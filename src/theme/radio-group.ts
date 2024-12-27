/**
 * RadioGroup
 * A set of radio buttons to select a single option from a list.
 * ---
 */

export default {
  slots: {
    root: 'relative',
    fieldset: 'flex',
    legend: 'mb-1.5 block font-medium text-base-master dark:text-base-400',
    item: 'flex items-start',
    base: 'cursor-pointer rounded-full ring ring-inset ring-base-300 dark:ring-base-700 focus-visible:outline-2 focus-visible:outline-offset-2',
    indicator: ' flex items-center justify-center size-full rounded-full after:bg-white dark:after:bg-base-dark after:rounded-full',
    container: 'flex items-center',
    wrapper: 'font-b24-primary font-regular ms-2',
    label: 'cursor-pointer block text-base-master dark:text-base-400',
    description: 'text-base-500 dark:text-base-600'
  },
  variants: {
    color: {
      default: {
        base: 'focus-visible:outline-base-900 dark:focus-visible:outline-base-900',
        indicator: 'bg-base-900 dark:bg-base-350'
      },
      danger: {
        base: 'focus-visible:outline-red-500 dark:focus-visible:outline-red-600',
        indicator: 'bg-red-500 dark:bg-red-600'
      },
      success: {
        base: 'focus-visible:outline-green-500 dark:focus-visible:outline-green-600',
        indicator: 'bg-green-500 dark:bg-green-600'
      },
      warning: {
        base: 'focus-visible:outline-orange-500 dark:focus-visible:outline-orange-600',
        indicator: 'bg-orange-500 dark:bg-orange-600'
      },
      primary: {
        base: 'focus-visible:outline-blue-500 dark:focus-visible:outline-blue-600',
        indicator: 'bg-blue-500 dark:bg-blue-600'
      },
      secondary: {
        base: 'focus-visible:outline-accent-aqua dark:focus-visible:outline-accent-turquoise',
        indicator: 'bg-accent-aqua dark:bg-accent-turquoise'
      },
      collab: {
        base: 'focus-visible:outline-collab-500 dark:focus-visible:outline-collab-600',
        indicator: 'bg-collab-500 dark:bg-collab-600'
      },
      ai: {
        base: 'focus-visible:outline-ai-500 dark:focus-visible:outline-ai-600',
        indicator: 'bg-ai-500 dark:bg-ai-600'
      }
    },
    orientation: {
      horizontal: {
        fieldset: 'flex-row',
        wrapper: 'me-2'
      },
      vertical: {
        fieldset: 'flex-col'
      }
    },
    size: {
      xs: {
        fieldset: 'gap-1',
        legend: 'text-xs',
        base: 'size-3',
        item: 'text-xs',
        label: 'leading-4',
        container: 'h-4',
        indicator: 'after:size-1'
      },
      sm: {
        fieldset: 'gap-1.5',
        legend: 'text-xs',
        base: 'size-3.5',
        item: 'text-sm',
        label: 'leading-4',
        container: 'h-4',
        indicator: 'after:size-1'
      },
      md: {
        fieldset: 'gap-1',
        legend: 'text-sm',
        base: 'size-4',
        item: 'text-md',
        label: 'leading-5',
        container: 'h-5',
        indicator: 'after:size-1.5'
      },
      lg: {
        fieldset: 'gap-1.5',
        legend: 'text-sm',
        base: 'size-5',
        item: 'text-xl',
        label: 'leading-5',
        container: 'h-5',
        indicator: 'after:size-2'
      }
    },
    disabled: {
      true: {
        base: 'cursor-not-allowed opacity-75',
        label: 'cursor-not-allowed opacity-75'
      }
    },
    required: {
      true: {
        label: 'after:content-[\'*\'] after:ms-0.5 after:text-red-500 dark:after:text-red-600'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'primary'
  }
}
