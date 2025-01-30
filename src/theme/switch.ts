/**
 * Switch
 * A control that toggles between two states.
 * ---
 * @link bitrix/js/...
 */

/**
 * @todo at desc link to b24.ui
 */
export default {
  slots: {
    root: 'relative flex items-start',
    base: [
      'cursor-pointer inline-flex items-center shrink-0 rounded-full border-2 border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 data-[state=unchecked]:bg-base-200 dark:data-[state=unchecked]:bg-base-800',
      'transition-colors duration-200'
    ].join(' '),
    container: 'flex items-center',
    thumb: 'group pointer-events-none rounded-full bg-white dark:bg-base-100 shadow-lg ring-0 transition-transform duration-200 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:rtl:-translate-x-0 flex items-center justify-center',
    icon: [
      'absolute shrink-0 group-data-[state=unchecked]:text-base-400 dark:group-data-[state=unchecked]:text-base-700 opacity-0 p-0.5 size-10/10',
      'transition-[color,opacity] duration-200'
    ].join(' '),
    wrapper: 'font-b24-primary font-regular ms-2',
    label: 'cursor-pointer block text-base-master dark:text-base-400',
    description: 'text-base-500 dark:text-base-600'
  },
  variants: {
    color: {
      default: {
        base: 'data-[state=checked]:bg-base-900 focus-visible:outline-base-900 dark:data-[state=checked]:bg-base-100 dark:focus-visible:outline-base-100',
        icon: 'group-data-[state=checked]:text-base-900 dark:group-data-[state=checked]:text-base-900',
        thumb: 'dark:data-[state=checked]:bg-base-master'
      },
      danger: {
        base: 'data-[state=checked]:bg-red-500 focus-visible:outline-red-500 dark:data-[state=checked]:bg-red-600 dark:focus-visible:outline-red-600',
        icon: 'group-data-[state=checked]:text-red-500 dark:group-data-[state=checked]:text-red-600'
      },
      success: {
        base: 'data-[state=checked]:bg-green-500 focus-visible:outline-green-500 dark:data-[state=checked]:bg-green-600 dark:focus-visible:outline-green-600',
        icon: 'group-data-[state=checked]:text-green-500 dark:group-data-[state=checked]:text-green-600'
      },
      warning: {
        base: 'data-[state=checked]:bg-orange-500 focus-visible:outline-orange-500 dark:data-[state=checked]:bg-orange-600 dark:focus-visible:outline-orange-600',
        icon: 'group-data-[state=checked]:text-orange-500 dark:group-data-[state=checked]:text-orange-600'
      },
      primary: {
        base: 'data-[state=checked]:bg-blue-500 focus-visible:outline-blue-500 dark:data-[state=checked]:bg-blue-600 dark:focus-visible:outline-blue-600',
        icon: 'group-data-[state=checked]:text-blue-500 dark:group-data-[state=checked]:text-blue-600'
      },
      secondary: {
        base: 'data-[state=checked]:bg-cyan-350 focus-visible:outline-cyan-350 dark:data-[state=checked]:bg-cyan-500 dark:focus-visible:outline-cyan-500',
        icon: 'group-data-[state=checked]:text-cyan-350 dark:group-data-[state=checked]:text-cyan-500'
      },
      collab: {
        base: 'data-[state=checked]:bg-collab-500 focus-visible:outline-collab-500 dark:data-[state=checked]:bg-collab-600 dark:focus-visible:outline-collab-600',
        icon: 'group-data-[state=checked]:text-collab-500 dark:group-data-[state=checked]:text-collab-600'
      },
      ai: {
        base: 'data-[state=checked]:bg-ai-500 focus-visible:outline-ai-500 dark:data-[state=checked]:bg-ai-600 dark:focus-visible:outline-ai-600',
        icon: 'group-data-[state=checked]:text-ai-500 dark:group-data-[state=checked]:text-ai-600'
      }
    },
    size: {
      xs: {
        base: 'w-7',
        container: 'h-4',
        thumb: 'size-3 data-[state=checked]:translate-x-3 data-[state=checked]:rtl:-translate-x-3',
        wrapper: 'text-xs',
        label: 'leading-4'
      },
      sm: {
        base: 'w-8',
        container: 'h-4',
        thumb: 'size-3.5 data-[state=checked]:translate-x-3.5 data-[state=checked]:rtl:-translate-x-3.5',
        wrapper: 'text-sm',
        label: 'leading-4'
      },
      md: {
        base: 'w-9',
        container: 'h-5',
        thumb: 'size-4 data-[state=checked]:translate-x-4 data-[state=checked]:rtl:-translate-x-4',
        wrapper: 'text-md',
        label: 'leading-5'
      },
      lg: {
        base: 'w-10',
        container: 'h-5',
        thumb: 'size-5 data-[state=checked]:translate-x-4 data-[state=checked]:rtl:-translate-x-4',
        wrapper: 'text-xl',
        label: 'leading-5'
      }
    },
    checked: {
      true: {
        icon: 'group-data-[state=checked]:opacity-100'
      }
    },
    unchecked: {
      true: {
        icon: 'group-data-[state=unchecked]:opacity-100'
      }
    },
    loading: {
      true: {
        icon: 'animate-spin'
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
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
}
