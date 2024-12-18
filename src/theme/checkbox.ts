/**
 * Checkbox
 * An input element to toggle between checked and unchecked states.
 * ---
 */

/**
 * @todo: fix color
 * @todo: fix size
 * @todo: add dark mode
 */
export default {
  slots: {
    root: 'relative flex items-start',
    base: 'shrink-0 flex items-center justify-center rounded-2xs text-white ring ring-inset ring-base-300 focus-visible:outline-2 focus-visible:outline-offset-2',
    container: 'flex items-center',
    wrapper: 'font-b24-primary ms-2',
    icon: 'shrink-0 size-full',
    label: 'block font-regular text-base-master',
    description: 'text-base-600'
  },
  variants: {
    color: {
      default: 'focus-visible:outline-base-900',
      danger: 'focus-visible:outline-red-500',
      success: 'focus-visible:outline-green-500',
      warning: 'focus-visible:outline-orange-500',
      primary: 'focus-visible:outline-blue-500',
      secondary: 'focus-visible:outline-accent-aqua',
      ai: 'focus-visible:outline-ai-500'
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
        label: 'after:content-[\'*\'] after:ms-0.5 after:text-red-500'
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
      class: 'ring-2 ring-base-900 bg-base-900'
    },
    {
      color: 'danger',
      checked: true,
      class: 'ring-2 ring-red-500 bg-red-500'
    },
    {
      color: 'success',
      checked: true,
      class: 'ring-2 ring-green-500 bg-green-500'
    },
    {
      color: 'warning',
      checked: true,
      class: 'ring-2 ring-orange-500 bg-orange-500'
    },
    {
      color: 'primary',
      checked: true,
      class: 'ring-2 ring-blue-500 bg-blue-500'
    },
    {
      color: 'secondary',
      checked: true,
      class: 'ring-2 ring-accent-aqua bg-accent-aqua'
    },
    {
      color: 'ai',
      checked: true,
      class: 'ring-2 ring-ai-500 bg-ai-500'
    }
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary'
  }
}
