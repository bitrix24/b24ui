/**
 * Slider
 * An input to select a numeric value within a range.
 * --
 */

/**
 * @FIXME error if range disabled at init mode
 */
export default {
  slots: {
    root: 'relative flex items-center select-none touch-none',
    track: 'relative bg-base-200 dark:bg-base-800 overflow-hidden rounded-full grow',
    range: 'absolute rounded-full',
    thumb: 'rounded-full bg-white dark:bg-base-100 ring-2 focus-visible:outline-2 focus-visible:outline-offset-2'
  },
  variants: {
    color: {
      default: {
        range: 'bg-base-900 dark:bg-base-350',
        thumb: 'ring-base-900 dark:ring-base-400 focus-visible:outline-base-900/50 dark:focus-visible:outline-base-700/50'
      },
      danger: {
        range: 'bg-red-500 dark:bg-red-600',
        thumb: 'ring-red-500 dark:ring-red-600 focus-visible:outline-red-500/50 dark:focus-visible:outline-red-600/50'
      },
      success: {
        range: 'bg-green-500 dark:bg-green-600',
        thumb: 'ring-green-500 dark:ring-green-600 focus-visible:outline-green-500/50 dark:focus-visible:outline-green-600/50'
      },
      warning: {
        range: 'bg-orange-500 dark:bg-orange-600',
        thumb: 'ring-orange-500 dark:ring-orange-600 focus-visible:outline-orange-500/50 dark:focus-visible:outline-orange-600/50'
      },
      primary: {
        range: 'bg-blue-500 dark:bg-blue-600',
        thumb: 'ring-blue-500 dark:ring-blue-600 focus-visible:outline-blue-500/50 dark:focus-visible:outline-blue-600/50'
      },
      secondary: {
        range: 'bg-secondary-350 dark:bg-secondary-500',
        thumb: 'ring-secondary-350 dark:ring-secondary-500 focus-visible:outline-secondary-350/50 dark:focus-visible:outline-secondary-500/50'
      },
      collab: {
        range: 'bg-collab-500 dark:bg-collab-600',
        thumb: 'ring-collab-500 dark:ring-collab-600 focus-visible:outline-collab-500/50 dark:focus-visible:outline-collab-600/50'
      },
      ai: {
        range: 'bg-ai-500 dark:bg-ai-600',
        thumb: 'ring-ai-500 dark:ring-ai-600 focus-visible:outline-ai-500/50 dark:focus-visible:outline-ai-600/50'
      }
    },
    size: {
      xs: {
        thumb: 'size-3'
      },
      sm: {
        thumb: 'size-3.5'
      },
      md: {
        thumb: 'size-4'
      },
      lg: {
        thumb: 'size-5'
      }
    },
    orientation: {
      horizontal: {
        root: 'w-full',
        range: 'h-full'
      },
      vertical: {
        root: 'flex-col h-full',
        range: 'w-full'
      }
    },
    disabled: {
      true: {
        root: 'opacity-75 cursor-not-allowed'
      }
    }
  },
  compoundVariants: [
    // region horizontal ////
    {
      orientation: 'horizontal',
      size: 'xs',
      class: {
        track: 'h-[6px]'
      }
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: {
        track: 'h-[7px]'
      }
    },
    {
      orientation: 'horizontal',
      size: 'md',
      class: {
        track: 'h-[8px]'
      }
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: {
        track: 'h-[9px]'
      }
    },
    {
      orientation: 'horizontal',
      size: 'xl',
      class: {
        track: 'h-[10px]'
      }
    },
    // endregion ////
    // region vertical ////
    {
      orientation: 'vertical',
      size: 'xs',
      class: {
        track: 'w-[6px]'
      }
    },
    {
      orientation: 'vertical',
      size: 'sm',
      class: {
        track: 'w-[7px]'
      }
    },
    {
      orientation: 'vertical',
      size: 'md',
      class: {
        track: 'w-[8px]'
      }
    },
    {
      orientation: 'vertical',
      size: 'lg',
      class: {
        track: 'w-[9px]'
      }
    },
    {
      orientation: 'vertical',
      size: 'xl',
      class: {
        track: 'w-[10px]'
      }
    }
    // endregion ////
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary'
  }
}
