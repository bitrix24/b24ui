/**
 * Separator
 * Separates content horizontally or vertically.
 * ---
 */

export default {
  slots: {
    root: 'flex items-center align-center text-center',
    border: '',
    container: 'font-b24-primary font-normal text-base-500 flex',
    icon: 'shrink-0 size-7',
    avatar: 'shrink-0',
    avatarSize: 'sm',
    label: 'text-sm'
  },
  variants: {
    color: {
      default: { border: 'border-base-master/10 dark:border-base-100/20' },
      danger: { border: 'border-red-500 dark:border-red-600' },
      success: { border: 'border-green-500 dark:border-green-600' },
      warning: { border: 'border-orange-500 dark:border-orange-600' },
      primary: { border: 'border-blue-500 dark:border-blue-600' },
      secondary: { border: 'border-secondary-350 dark:border-secondary-500' },
      collab: { border: 'border-collab-500 dark:border-collab-600' },
      ai: { border: 'border-ai-500 dark:border-ai-600' }
    },
    orientation: {
      horizontal: {
        root: 'w-full flex-row',
        border: 'w-full',
        container: 'mx-3 whitespace-nowrap'
      },
      vertical: {
        root: 'h-full flex-col',
        border: 'h-full',
        container: 'my-2'
      }
    },
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: ''
    },
    type: {
      solid: {
        border: 'border-solid'
      },
      dashed: {
        border: 'border-dashed'
      },
      dotted: {
        border: 'border-dotted'
      }
    }
  },
  compoundVariants: [
    // region horizontal ////
    {
      orientation: 'horizontal',
      size: 'xs',
      class: { border: 'border-t' }
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: { border: 'border-t-[2px]' }
    },
    {
      orientation: 'horizontal',
      size: 'md',
      class: { border: 'border-t-[3px]' }
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: { border: 'border-t-[4px]' }
    },
    {
      orientation: 'horizontal',
      size: 'xl',
      class: { border: 'border-t-[5px]' }
    },
    // endregion ////
    // region vertical ////
    {
      orientation: 'vertical',
      size: 'xs',
      class: { border: 'border-s' }
    },
    {
      orientation: 'vertical',
      size: 'sm',
      class: { border: 'border-s-[2px]' }
    },
    {
      orientation: 'vertical',
      size: 'md',
      class: { border: 'border-s-[3px]' }
    },
    {
      orientation: 'vertical',
      size: 'lg',
      class: { border: 'border-s-[4px]' }
    },
    {
      orientation: 'vertical',
      size: 'xl',
      class: { border: 'border-s-[5px]' }
    }
    // endregion ////
  ],
  defaultVariants: {
    color: 'default',
    size: 'xs',
    type: 'solid'
  }
}
