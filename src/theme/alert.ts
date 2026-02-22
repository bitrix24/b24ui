/**
 * Alert
 * A callout to draw user's attention.
 * ---
 * @link /api_d7/bitrix/ui/messages/alerts.php
 * @see bitrix/js/ui/alerts/src
 */
export default {
  slots: {
    root: [
      'relative overflow-hidden w-full flex',
      'text-(--b24ui-color)',
      'bg-(--b24ui-background)',
      'border-(--b24ui-border-color) border-(length:--b24ui-border-width)',
      'rounded-(--ui-border-radius-md)'
    ].join(' '),
    wrapper: [
      'min-w-0 flex-1 flex flex-col',
      'font-[family-name:var(--ui-font-family-primary)]'
    ].join(' '),
    title: 'font-(--ui-font-weight-bold)',
    description: '',
    icon: 'shrink-0 size-6',
    avatar: 'shrink-0',
    avatarSize: '',
    actions: 'flex flex-wrap gap-1.5 shrink-0',
    close: [
      'p-0',
      // @memo change color|bg for btn
      '[--ui-btn-color:var(--b24ui-color)]',
      'hover:bg-(--ui-color-base-white-fixed)/10',
      'focus-visible:bg-(--ui-color-base-white-fixed)/10',
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
      'air-tertiary': { root: 'style-outline-no-accent' },
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
      sm: {
        root: 'py-xs ps-sm pe-xs gap-2',
        title: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-lg)',
        description: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-lg)',
        avatarSize: 'md'
      },
      md: {
        root: 'py-md ps-md pe-xs gap-2.5',
        title: 'text-(length:--ui-font-size-md)/(--ui-font-line-height-reset)',
        description: 'text-(length:--ui-font-size-md)/(--ui-font-line-height-3xs)',
        avatarSize: 'xl'
      }
    },
    orientation: {
      horizontal: {
        root: 'items-center',
        actions: 'items-center'
      },
      vertical: {
        root: 'items-start',
        actions: 'items-start mt-2'
      }
    },
    title: {
      true: {
        description: 'mt-1'
      }
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
