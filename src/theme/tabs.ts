/**
 * Tabs
 * A set of tab panels that are displayed one at a time.
 * Like this:
 * - crm.entity.detail -> tabs
 * - slider -> left items
 * - slider.settings -> in content
 * ---
 */

/**
 * @todo color
 * @todo dark mode
 * @todo font
 * @todo variant crm.detail
 * @todo variant slider.lef.menu
 * @todo variant settings.content
 * @todo scroll / flex-wrap long list tabs
 */

export default {
  slots: {
    root: 'flex items-center gap-2',
    list: 'relative flex p-1 group',
    indicator: 'absolute transition-[translate,width] duration-200',
    trigger: [
      'group relative inline-flex items-center shrink-0 min-w-0',
      'data-[state=inactive]:text-[var(--ui-text-muted)]',
      'hover:data-[state=inactive]:not-disabled:text-[var(--ui-text)]',
      'font-medium rounded-xl',
      'disabled:cursor-not-allowed disabled:opacity-75 focus:outline-hidden',
      'transition-colors'
    ],
    content: 'focus:outline-none w-full',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    label: 'truncate'
  },
  variants: {
    color: {
      default: '',
      danger: '',
      success: '',
      warning: '',
      primary: '',
      secondary: '',
      collab: '',
      ai: ''
    },
    variant: {
      pill: {
        list: 'bg-[var(--ui-bg-elevated)] rounded-[calc(var(--ui-radius)*2)]',
        trigger: 'flex-1 w-full',
        indicator: 'rounded-xl shadow-xs'
      },
      link: {
        list: 'border-[var(--ui-border)]',
        indicator: 'rounded-full'
      }
    },
    orientation: {
      horizontal: {
        root: 'flex-col',
        list: 'w-full',
        indicator: 'left-0 w-[var(--reka-tabs-indicator-size)] translate-x-[var(--reka-tabs-indicator-position)]',
        trigger: 'justify-center'
      },
      vertical: {
        list: 'flex-col',
        indicator: 'top-0 h-[var(--reka-tabs-indicator-size)] translate-y-[var(--reka-tabs-indicator-position)]'
      }
    },
    size: {
      xs: {
        trigger: 'px-2 py-1 text-xs gap-1',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs'
      },
      sm: {
        trigger: 'px-2.5 py-1.5 text-xs gap-1.5',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs'
      },
      md: {
        trigger: 'px-3 py-1.5 text-sm gap-1.5',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs'
      },
      lg: {
        trigger: 'px-3 py-2 text-sm gap-2',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs'
      },
      xl: {
        trigger: 'px-3 py-2 text-base gap-2',
        leadingIcon: 'size-6',
        leadingAvatarSize: 'xs'
      }
    }
  },
  compoundVariants: [
    // region orientation ////
    // region orientation horizontal.pill ////
    {
      orientation: 'horizontal',
      variant: 'pill',
      class: {
        indicator: 'inset-y-1'
      }
    },
    // endregion ////
    // region orientation horizontal.link ////
    {
      orientation: 'horizontal',
      variant: 'link',
      class: {
        list: 'border-b -mb-px',
        indicator: '-bottom-px h-px'
      }
    },
    // endregion ////
    // region orientation vertical.pill ////
    {
      orientation: 'vertical',
      variant: 'pill',
      class: {
        indicator: 'inset-x-1',
        list: 'items-center'
      }
    },
    // endregion ////
    // region orientation vertical.link ////
    {
      orientation: 'vertical',
      variant: 'link',
      class: {
        list: 'border-s -ms-px',
        indicator: '-start-px w-px'
      }
    },
    // endregion ////
    // endregion ////
    // region color ////
    // region color.default ////
    {
      color: 'default',
      variant: 'pill',
      class: {
        indicator: 'bg-[var(--ui-bg-inverted)]',
        trigger: 'data-[state=active]:text-[var(--ui-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-border-inverted)]'
      }
    },
    {
      color: 'default',
      variant: 'link',
      class: {
        indicator: 'bg-[var(--ui-bg-inverted)]',
        trigger: 'data-[state=active]:text-[var(--ui-text-highlighted)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-border-inverted)]'
      }
    }
    // endregion ////
    // endregion ////
  ],
  defaultVariants: {
    color: 'default',
    variant: 'link',
    size: 'md'
  }
}
