/**
 * Separator
 * Separates content horizontally or vertically.
 * ---
 * @memo use --ui-border-width-thin | --ui-color-divider-default
 */

export default {
  slots: {
    root: 'flex items-center align-center text-center',
    border: '',
    container: 'font-(family-name:--ui-font-family-primary) font-normal flex',
    icon: 'shrink-0 size-7',
    avatar: 'shrink-0',
    avatarSize: 'sm',
    label: 'text-(length:--ui-font-size-sm)'
  },
  variants: {
    accent: {
      default: {
        container: 'text-(--ui-color-design-plain-na-content-secondary)',
        border: 'border-(--ui-color-divider-default)'
      },
      accent: {
        container: 'text-(--ui-color-design-plain-na-content)',
        border: 'border-(--ui-color-divider-accent)'
      },
      less: {
        container: 'text-(--ui-color-base-6)',
        border: 'border-(--ui-color-divider-less)'
      }
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
      thin: '',
      thick: ''
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
      },
      double: {
        border: 'border-double'
      }
    }
  },
  compoundVariants: [
    // region horizontal ////
    {
      orientation: 'horizontal',
      size: 'thin',
      class: { border: 'border-t-(length:--ui-border-width-thin)' }
    },
    {
      orientation: 'horizontal',
      size: 'thick',
      class: { border: 'border-t-(length:--ui-border-width-thick)' }
    },
    // endregion ////
    // region vertical ////
    {
      orientation: 'vertical',
      size: 'thin',
      class: { border: 'border-s-(length:--ui-border-width-thin)' }
    },
    {
      orientation: 'vertical',
      size: 'thick',
      class: { border: 'border-s-(length:--ui-border-width-thick)' }
    }
    // endregion ////
  ],
  defaultVariants: {
    accent: 'default',
    size: 'thin',
    type: 'solid'
  }
}
