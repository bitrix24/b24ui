/**
 * Banner
 * ---
 * @see ui-notification-panel
 * @todo add color
 * @todo demo
 * @todo fix color
 */

export default {
  slots: {
    root: [
      'relative',
      'z-50',
      'w-full',
      'bg-(--b24ui-background)',
      'transition-colors'
    ].join(' '),
    container: 'flex items-center justify-between gap-3 h-12',
    left: 'hidden lg:flex-1 lg:flex lg:items-center',
    center: 'flex items-center gap-1.5 min-w-0',
    right: 'lg:flex-1 flex items-center justify-end',
    icon: [
      'size-5 shrink-0',
      'text-(--b24ui-color)',
      'pointer-events-none'
    ].join(' '),
    title: [
      'text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm)',
      'text-(--b24ui-color)',
      'font-(--ui-font-weight-medium)',
      'truncate'
    ].join(' '),
    actions: 'flex gap-1.5 shrink-0 isolate',
    close: [
      // @todo fix this - may be change color for btn
      'text-(--b24ui-color)',
      // 'text-inverted',
      // 'hover:bg-default/10',
      // 'focus-visible:bg-default/10',
      '-me-1.5 lg:me-0'
    ].join(' ')
  },
  variants: {
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
    to: {
      true: ''
    }
  },
  compoundVariants: [
    {
      // color: 'neutral',
      to: true,
      class: {
        root: 'hover:bg-(--b24ui-background)/90'
      }
    }
  ],
  defaultVariants: {
    color: 'air-primary-alert'
  }
}
