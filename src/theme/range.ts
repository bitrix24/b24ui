/**
 * Slider / Range
 * An input to select a numeric value within a range.
 * --
 */

/**
 * @FIXME error if range disabled at init mode
 */
export default {
  slots: {
    root: 'relative flex items-center select-none touch-none',
    track: [
      'relative',
      'rounded-(--ui-border-radius-pill)',
      'bg-(--ui-color-base-5)',
      'grow',
      'overflow-hidden'
    ].join(' '),
    range: [
      'absolute',
      'rounded-(--ui-border-radius-pill)',
      'bg-(--b24ui-background)'
    ].join(' '),
    thumb: [
      'rounded-(--ui-border-radius-pill)',
      'bg-(--ui-color-base-white-fixed)',
      'ring-2',
      'outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2',
      'ring-(--b24ui-background)',
      'focus-visible:outline-(--b24ui-background-hover)'
    ].join(' ')
  },
  variants: {
    color: {
      'air-primary': { root: 'style-filled' },
      'air-primary-success': { root: 'style-filled-success' },
      'air-primary-alert': { root: 'style-filled-alert' },
      'air-primary-copilot': { root: 'style-filled-copilot' },
      'air-primary-warning': { root: 'style-filled-warning' },
      // @deprecate ////
      'default': { root: 'style-old-default' },
      'danger': { root: 'style-old-danger' },
      'success': { root: 'style-old-success' },
      'warning': { root: 'style-old-warning' },
      'primary': { root: 'style-old-primary' },
      'secondary': { root: 'style-old-secondary' },
      'collab': { root: 'style-old-collab' },
      'ai': { root: 'style-old-ai' }
    },
    size: {
      xs: { thumb: 'size-[12px]' },
      sm: { thumb: 'size-[14px]' },
      md: { thumb: 'size-[16px]' },
      lg: { thumb: 'size-[20px]' }
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
      true: { root: 'opacity-30 cursor-not-allowed' }
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
    color: 'air-primary',
    size: 'md'
  }
}
