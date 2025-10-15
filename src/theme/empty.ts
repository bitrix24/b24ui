/**
 * Empty
 * An empty state component.
 * ---
 */
export default {
  slots: {
    root: [
      'relative',
      'flex flex-col items-center justify-center gap-4',
      'rounded-lg',
      'p-4 sm:p-6 lg:p-8',
      'min-w-0',
      'bg-(--b24ui-background)',
      'ring ring-(--b24ui-border-color) ring-(length:--b24ui-border-width)'
    ].join(' '),
    header: [
      'flex flex-col items-center gap-2',
      'max-w-[384px] text-center'
    ].join(' '),
    indicator: [
      'rounded-full',
      'text-(--b24ui-color)',
      'bg-(--b24ui-background-active)',
      'flex items-center justify-center',
      'mb-2'
    ].join(' '),
    icon: 'shrink-0',
    title: 'text-(--b24ui-color) text-pretty font-(--ui-font-weight-medium)',
    description: 'text-balance text-center text-(--b24ui-color)',
    body: 'flex flex-col items-center gap-4 max-w-[384px]',
    actions: 'flex flex-wrap justify-center gap-2 shrink-0',
    footer: 'flex flex-col items-center gap-2 max-w-[384px]'
  },
  variants: {
    size: {
      xs: {
        icon: 'size-[26px]',
        title: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-lg)',
        description: 'text-(length:--ui-font-size-xs)'
      },
      sm: {
        icon: 'size-[28px]',
        title: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-lg)',
        description: 'text-(length:--ui-font-size-xs)'
      },
      md: {
        icon: 'size-[38px]',
        title: 'text-base',
        description: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-lg)'
      },
      lg: {
        icon: 'size-[44px]',
        title: 'text-base',
        description: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-lg)'
      },
      xl: {
        icon: 'size-[56px]',
        title: 'text-(length:--ui-font-size-xl)/(--ui-font-line-height-3xs)',
        description: 'text-(length:--ui-font-size-lg)/(--ui-font-line-height-3xs)'
      }
    },
    color: {
      'air-primary': { root: 'style-filled' },
      'air-primary-success': { root: 'style-filled-success' },
      'air-primary-alert': { root: 'style-filled-alert' },
      'air-primary-copilot': { root: 'style-filled-copilot' },
      'air-primary-warning': { root: 'style-filled-warning' },
      'air-secondary': { root: 'style-tinted' },
      'air-secondary-alert': { root: 'style-tinted-alert' },
      'air-secondary-accent': { root: 'style-outline' },
      'air-secondary-accent-1': { root: 'style-outline-accent-1' },
      'air-secondary-accent-2': { root: 'style-outline-accent-2' },
      'air-tertiary': { root: 'style-outline-no-accent' }
    },
    inverted: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    // region color ////
    {
      inverted: true,
      color: 'air-primary',
      class: {
        root: 'style-filled-inverted'
      }
    },
    {
      inverted: true,
      color: 'air-primary-success',
      class: {
        root: 'style-filled-success-inverted'
      }
    },
    {
      inverted: true,
      color: 'air-primary-alert',
      class: {
        root: 'style-filled-alert-inverted'
      }
    },
    {
      inverted: true,
      color: 'air-primary-copilot',
      class: {
        root: 'style-filled-copilot-inverted'
      }
    },
    {
      inverted: true,
      color: 'air-primary-warning',
      class: {
        root: 'style-filled-warning-inverted'
      }
    }
    // endregion ////
  ],
  defaultVariants: {
    color: 'air-secondary-accent',
    size: 'md',
    inverted: false
  }
}
