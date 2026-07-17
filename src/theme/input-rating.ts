/**
 * InputRating
 * @todo this this `A component to display and collect ratings from users.`
 * ---
 */

export default {
  slots: {
    root: '',
    item: [
      'relative inline-block',
      'cursor-pointer select-none',
      'rounded-sm',
      'has-focus-visible:outline-3',
      'outline-(--b24ui-border-color)',
      'transition'
    ].join(' '),
    indicator: [
      'absolute',
      'inset-0 overflow-hidden outline-none',
      'text-transparent',
      'w-(--reka-rating-item-step-width)',
      'opacity-(--reka-rating-item-step-opacity)',
      'z-(--reka-rating-item-step-z-index)',
      'data-[state=active]:text-(--b24ui-background)'
    ].join(' '),
    icon: 'block',
    emptyIcon: 'block w-full h-full text-legend pointer-events-none'
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'inline-flex items-center gap-0.5'
      },
      vertical: {
        root: 'inline-flex flex-col items-center gap-0.5'
      }
    },
    size: {
      xss: {
        item: 'size-2',
        icon: 'size-2'
      },
      xs: {
        item: 'size-3',
        icon: 'size-3'
      },
      sm: {
        item: 'size-4',
        icon: 'size-4'
      },
      md: {
        item: 'size-5',
        icon: 'size-5'
      },
      lg: {
        item: 'size-6',
        icon: 'size-6'
      },
      xl: {
        item: 'size-7',
        icon: 'size-7'
      }
    },
    color: {
      'air-primary': { root: 'style-filled' },
      'air-primary-success': { root: 'style-filled-success' },
      'air-primary-alert': { root: 'style-filled-alert' },
      'air-primary-copilot': { root: 'style-filled-copilot' },
      'air-primary-warning': { root: 'style-filled-warning' }
    },
    readonly: {
      true: {
        root: 'cursor-default',
        item: 'cursor-default'
      },
      false: {}
    },
    disabled: {
      true: {
        root: 'opacity-30 cursor-not-allowed',
        item: 'cursor-not-allowed pointer-events-none'
      },
      false: {}
    }
  },
  compoundVariants: [
    {
      readonly: false,
      disabled: false,
      class: {
        item: 'hover:scale-110'
      }
    }
  ],
  defaultVariants: {
    color: 'air-primary',
    size: 'md'
  }
}
