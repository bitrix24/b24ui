/**
 * RadioGroup
 * A set of radio buttons to select a single option from a list.
 * ---
 */

export default {
  slots: {
    root: 'relative',
    fieldset: 'flex',
    legend: 'mb-1.5 block text-base-900 dark:text-base-400',
    item: 'flex items-start',
    base: [
      'cursor-pointer rounded-full',
      'ring ring-inset ring-base-300 dark:ring-base-700',
      'outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2'
    ].join(' '),
    indicator: ' flex items-center justify-center size-full rounded-full after:bg-white dark:after:bg-base-dark after:rounded-full',
    container: 'flex items-center',
    wrapper: 'font-b24-primary font-regular w-full',
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
        base: 'focus-visible:outline-cyan-350 dark:focus-visible:outline-cyan-500',
        indicator: 'bg-cyan-350 dark:bg-cyan-500'
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
    variant: {
      list: {
      },
      card: {
        item: 'items-center border border-base-200 dark:border-base-700 rounded-lg'
      },
      table: {
        item: 'border border-base-200 dark:border-base-900'
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
    indicator: {
      start: {
        item: 'flex-row',
        base: 'me-2'
      },
      end: {
        item: 'flex-row-reverse',
        base: 'ms-2'
      },
      hidden: {
        base: 'sr-only',
        wrapper: 'text-center'
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
  compoundVariants: [
    // region size ////
    { size: 'xs', variant: ['card', 'table'], class: { item: 'p-2.5' } },
    { size: 'sm', variant: ['card', 'table'], class: { item: 'p-3' } },
    { size: 'md', variant: ['card', 'table'], class: { item: 'p-3.5' } },
    { size: 'lg', variant: ['card', 'table'], class: { item: 'p-4' } },
    // endregion ////
    // region orientation/table ////
    {
      orientation: 'horizontal',
      variant: 'table',
      class: {
        item: 'first-of-type:rounded-s-lg last-of-type:rounded-e-lg',
        fieldset: 'gap-0 -space-x-px'
      }
    },
    {
      orientation: 'vertical',
      variant: 'table',
      class: {
        item: 'first-of-type:rounded-t-lg last-of-type:rounded-b-lg',
        fieldset: 'gap-0 -space-y-px'
      }
    },
    // endregion ////
    // region card ////
    {
      color: 'default',
      variant: 'card',
      class: {
        item: 'has-data-[state=checked]:border-base-900 dark:has-data-[state=checked]:border-base-350'
      }
    },
    {
      color: 'danger',
      variant: 'card',
      class: {
        item: 'has-data-[state=checked]:border-red-500 dark:has-data-[state=checked]:border-red-600'
      }
    },
    {
      color: 'success',
      variant: 'card',
      class: {
        item: 'has-data-[state=checked]:border-green-500 dark:has-data-[state=checked]:border-green-600'
      }
    },
    {
      color: 'warning',
      variant: 'card',
      class: {
        item: 'has-data-[state=checked]:border-orange-500 dark:has-data-[state=checked]:border-orange-600'
      }
    },
    {
      color: 'primary',
      variant: 'card',
      class: {
        item: 'has-data-[state=checked]:border-blue-500 dark:has-data-[state=checked]:border-blue-600'
      }
    },
    {
      color: 'secondary',
      variant: 'card',
      class: {
        item: 'has-data-[state=checked]:border-cyan-500 dark:has-data-[state=checked]:border-cyan-600'
      }
    },
    {
      color: 'collab',
      variant: 'card',
      class: {
        item: 'has-data-[state=checked]:border-collab-500 dark:has-data-[state=checked]:border-collab-600'
      }
    },
    {
      color: 'ai',
      variant: 'card',
      class: {
        item: 'has-data-[state=checked]:border-ai-500 dark:has-data-[state=checked]:border-ai-600'
      }
    },
    // endregion ////
    // region table ////
    {
      color: 'default',
      variant: 'table',
      class: {
        item: [
          'has-data-[state=checked]:bg-base-100 dark:has-data-[state=checked]:bg-base-900',
          'has-data-[state=checked]:border-base-900/25 dark:has-data-[state=checked]:border-base-700/25',
          'has-data-[state=checked]:z-[1]'
        ].join(' ')
      }
    },
    {
      color: 'danger',
      variant: 'table',
      class: {
        item: [
          'has-data-[state=checked]:bg-red-500/24 dark:has-data-[state=checked]:bg-red-600/24',
          'has-data-[state=checked]:border-red-500 dark:has-data-[state=checked]:border-red-600',
          'has-data-[state=checked]:z-[1]'
        ].join(' ')
      }
    },
    {
      color: 'success',
      variant: 'table',
      class: {
        item: [
          'has-data-[state=checked]:bg-green-500/24 dark:has-data-[state=checked]:bg-green-600/24',
          'has-data-[state=checked]:border-green-500 dark:has-data-[state=checked]:border-green-600',
          'has-data-[state=checked]:z-[1]'
        ].join(' ')
      }
    },
    {
      color: 'warning',
      variant: 'table',
      class: {
        item: [
          'has-data-[state=checked]:bg-orange-500/24 dark:has-data-[state=checked]:bg-orange-600/24',
          'has-data-[state=checked]:border-orange-500 dark:has-data-[state=checked]:border-orange-600',
          'has-data-[state=checked]:z-[1]'
        ].join(' ')
      }
    },
    {
      color: 'primary',
      variant: 'table',
      class: {
        item: [
          'has-data-[state=checked]:bg-blue-500/24 dark:has-data-[state=checked]:bg-blue-600/24',
          'has-data-[state=checked]:border-blue-500 dark:has-data-[state=checked]:border-blue-600',
          'has-data-[state=checked]:z-[1]'
        ].join(' ')
      }
    },
    {
      color: 'secondary',
      variant: 'table',
      class: {
        item: [
          'has-data-[state=checked]:bg-cyan-500/24 dark:has-data-[state=checked]:bg-cyan-600/24',
          'has-data-[state=checked]:border-cyan-500 dark:has-data-[state=checked]:border-cyan-600',
          'has-data-[state=checked]:z-[1]'
        ].join(' ')
      }
    },
    {
      color: 'collab',
      variant: 'table',
      class: {
        item: [
          'has-data-[state=checked]:bg-collab-500/24 dark:has-data-[state=checked]:bg-collab-600/24',
          'has-data-[state=checked]:border-collab-500 dark:has-data-[state=checked]:border-collab-600',
          'has-data-[state=checked]:z-[1]'
        ].join(' ')
      }
    },
    {
      color: 'ai',
      variant: 'table',
      class: {
        item: [
          'has-data-[state=checked]:bg-ai-500/24 dark:has-data-[state=checked]:bg-ai-600/24',
          'has-data-[state=checked]:border-ai-500 dark:has-data-[state=checked]:border-ai-600',
          'has-data-[state=checked]:z-[1]'
        ].join(' ')
      }
    }
    // endregion ////
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
    variant: 'list',
    orientation: 'vertical',
    indicator: 'start'
  }
}
