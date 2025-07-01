/**
 * Tabs
 * A set of tab panels that are displayed one at a time.
 * Like this:
 * - crm.entity.detail -> tabs
 * - slider -> left items
 * - slider.Settings -> in content
 * ---
 */

/**
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
      'group relative inline-flex items-center min-w-0',
      'data-[state=inactive]:text-base-600 dark:data-[state=inactive]:text-base-600',
      'hover:data-[state=inactive]:not-disabled:text-base-master dark:hover:data-[state=inactive]:not-disabled:text-base-150',
      'font-medium rounded-xl',
      'cursor-pointer disabled:cursor-not-allowed disabled:opacity-75',
      'transition-colors'
    ].join(' '),
    content: 'focus:outline-none w-full',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    label: ''
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
        list: 'bg-base-100 dark:bg-transparent rounded-md',
        trigger: 'grow',
        indicator: 'rounded-xl shadow-xs'
      },
      link: {
        list: 'border-base-300 dark:border-base-800',
        indicator: 'rounded-full',
        trigger: 'focus:outline-none'
      }
    },
    orientation: {
      horizontal: {
        root: 'flex-col',
        list: 'w-full',
        indicator: 'left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)',
        trigger: 'justify-center'
      },
      vertical: {
        list: 'flex-col',
        indicator: 'top-0 h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position)'
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
        indicator: 'bg-base-900 dark:bg-base-900',
        trigger: [
          'data-[state=active]:text-white focus-visible:outline-base-900',
          'dark:data-[state=active]:text-base-200 dark:focus-visible:outline-base-900',
          'focus-visible:outline-2 focus-visible:outline-offset-2]'
        ]
      }
    },
    {
      color: 'default',
      variant: 'link',
      class: {
        indicator: 'bg-base-900 dark:dark:bg-base-350',
        trigger: [
          'focus-visible:ring-2 focus-visible:ring-inset',
          'data-[state=active]:text-base-900 focus-visible:ring-base-900',
          'dark:data-[state=active]:text-base-350 dark:focus-visible:ring-base-350'
        ]
      }
    },
    // endregion ////
    // region color.danger ////
    {
      color: 'danger',
      variant: 'pill',
      class: {
        indicator: 'bg-red-900 dark:bg-red-900',
        trigger: [
          'data-[state=active]:text-white focus-visible:outline-red-900',
          'dark:data-[state=active]:text-red-200 dark:focus-visible:outline-red-900',
          'focus-visible:outline-2 focus-visible:outline-offset-2]'
        ]
      }
    },
    {
      color: 'danger',
      variant: 'link',
      class: {
        indicator: 'bg-red-900 dark:dark:bg-red-300',
        trigger: [
          'focus-visible:ring-2 focus-visible:ring-inset',
          'data-[state=active]:text-red-900 focus-visible:ring-red-900',
          'dark:data-[state=active]:text-red-300 dark:focus-visible:ring-red-300'
        ]
      }
    },
    // endregion ////
    // region color.success ////
    {
      color: 'success',
      variant: 'pill',
      class: {
        indicator: 'bg-green-900 dark:bg-green-900',
        trigger: [
          'data-[state=active]:text-white focus-visible:outline-green-900',
          'dark:data-[state=active]:text-green-200 dark:focus-visible:outline-green-900',
          'focus-visible:outline-2 focus-visible:outline-offset-2]'
        ]
      }
    },
    {
      color: 'success',
      variant: 'link',
      class: {
        indicator: 'bg-green-900 dark:dark:bg-green-300',
        trigger: [
          'focus-visible:ring-2 focus-visible:ring-inset',
          'data-[state=active]:text-green-900 focus-visible:ring-green-900',
          'dark:data-[state=active]:text-green-300 dark:focus-visible:ring-green-300'
        ]
      }
    },
    // endregion ////
    // region color.warning ////
    {
      color: 'warning',
      variant: 'pill',
      class: {
        indicator: 'bg-orange-900 dark:bg-orange-900',
        trigger: [
          'data-[state=active]:text-white focus-visible:outline-orange-900',
          'dark:data-[state=active]:text-orange-200 dark:focus-visible:outline-orange-900',
          'focus-visible:outline-2 focus-visible:outline-offset-2]'
        ]
      }
    },
    {
      color: 'warning',
      variant: 'link',
      class: {
        indicator: 'bg-orange-900 dark:dark:bg-orange-300',
        trigger: [
          'focus-visible:ring-2 focus-visible:ring-inset',
          'data-[state=active]:text-orange-900 focus-visible:ring-orange-900',
          'dark:data-[state=active]:text-orange-300 dark:focus-visible:ring-orange-300'
        ]
      }
    },
    // endregion ////
    // region color.primary ////
    {
      color: 'primary',
      variant: 'pill',
      class: {
        indicator: 'bg-blue-900 dark:bg-blue-900',
        trigger: [
          'data-[state=active]:text-white focus-visible:outline-blue-900',
          'dark:data-[state=active]:text-blue-200 dark:focus-visible:outline-blue-900',
          'focus-visible:outline-2 focus-visible:outline-offset-2]'
        ]
      }
    },
    {
      color: 'primary',
      variant: 'link',
      class: {
        indicator: 'bg-blue-900 dark:dark:bg-blue-300',
        trigger: [
          'focus-visible:ring-2 focus-visible:ring-inset',
          'data-[state=active]:text-blue-900 focus-visible:ring-blue-900',
          'dark:data-[state=active]:text-blue-300 dark:focus-visible:ring-blue-300'
        ]
      }
    },
    // endregion ////
    // region color.secondary ////
    {
      color: 'secondary',
      variant: 'pill',
      class: {
        indicator: 'bg-cyan-900 dark:bg-cyan-900',
        trigger: [
          'data-[state=active]:text-white focus-visible:outline-cyan-900',
          'dark:data-[state=active]:text-cyan-200 dark:focus-visible:outline-cyan-900',
          'focus-visible:outline-2 focus-visible:outline-offset-2]'
        ]
      }
    },
    {
      color: 'secondary',
      variant: 'link',
      class: {
        indicator: 'bg-cyan-900 dark:dark:bg-cyan-300',
        trigger: [
          'focus-visible:ring-2 focus-visible:ring-inset',
          'data-[state=active]:text-cyan-900 focus-visible:ring-cyan-900',
          'dark:data-[state=active]:text-cyan-300 dark:focus-visible:ring-cyan-300'
        ]
      }
    },
    // endregion ////
    // region color.collab ////
    {
      color: 'collab',
      variant: 'pill',
      class: {
        indicator: 'bg-collab-900 dark:bg-collab-900',
        trigger: [
          'data-[state=active]:text-white focus-visible:outline-collab-900',
          'dark:data-[state=active]:text-collab-200 dark:focus-visible:outline-collab-900',
          'focus-visible:outline-2 focus-visible:outline-offset-2]'
        ]
      }
    },
    {
      color: 'collab',
      variant: 'link',
      class: {
        indicator: 'bg-collab-900 dark:dark:bg-collab-300',
        trigger: [
          'focus-visible:ring-2 focus-visible:ring-inset',
          'data-[state=active]:text-collab-900 focus-visible:ring-collab-900',
          'dark:data-[state=active]:text-collab-300 dark:focus-visible:ring-collab-300'
        ]
      }
    },
    // endregion ////
    // region color.ai ////
    {
      color: 'ai',
      variant: 'pill',
      class: {
        indicator: 'bg-ai-900 dark:bg-ai-900',
        trigger: [
          'data-[state=active]:text-white focus-visible:outline-ai-900',
          'dark:data-[state=active]:text-ai-200 dark:focus-visible:outline-ai-900',
          'focus-visible:outline-2 focus-visible:outline-offset-2]'
        ]
      }
    },
    {
      color: 'ai',
      variant: 'link',
      class: {
        indicator: 'bg-ai-900 dark:dark:bg-ai-300',
        trigger: [
          'focus-visible:ring-2 focus-visible:ring-inset',
          'data-[state=active]:text-ai-900 focus-visible:ring-ai-900',
          'dark:data-[state=active]:text-ai-300 dark:focus-visible:ring-ai-300'
        ]
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
