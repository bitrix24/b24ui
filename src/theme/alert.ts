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
      'bg-(--b24ui-background-hover)',
      'border-(--b24ui-border-color-hover) border-(length:--b24ui-border-width)',
      'rounded-(--ui-border-radius-md)'
    ].join(' '),
    wrapper: [
      'min-w-0 flex-1 flex flex-col',
      'font-[family-name:var(--ui-font-family-primary)]',
      'font-normal font-(--ui-font-weight-normal)'
    ].join(' '),
    title: 'font-bold',
    description: '',
    icon: 'shrink-0 size-6',
    avatar: 'shrink-0',
    avatarSize: '',
    actions: 'flex flex-wrap gap-1.5 shrink-0',
    close: 'p-0'
  },
  variants: {
    color: {
      'air-primary': { root: '--air-primary' },
      'air-primary-success': { root: '--air-primary-success' },
      'air-primary-alert': { root: '--air-primary-alert' },
      'air-primary-copilot': { root: '--air-primary-copilot' },
      'air-secondary': { root: '--air-secondary' },
      'air-secondary-alert': { root: '--air-secondary-alert' },
      'air-secondary-accent': { root: '--air-secondary-accent' },
      'air-secondary-accent-1': { root: '--air-secondary-accent-1' },
      'air-secondary-accent-2': { root: '--air-secondary-accent-2' },
      'air-secondary-no-accent': { root: '--air-secondary-no-accent' },
      'air-tertiary': { root: '--air-tertiary' },
      'air-tertiary-accent': { root: '--air-tertiary-accent' },
      'air-tertiary-no-accent': { root: '--air-tertiary-no-accent' },
      // @deprecate ////
      'default': { root: '--old-style-default' },
      'danger': { root: '--old-style-danger' },
      'success': { root: '--old-style-success' },
      'warning': { root: '--old-style-warning' },
      'primary': { root: '--old-style-primary' },
      'secondary': { root: '--old-style-secondary' },
      'collab': { root: '--old-style-collab' },
      'ai': { root: '--old-style-ai' }
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
    }
  },
  compoundVariants: [],
  defaultVariants: {
    color: 'air-secondary-no-accent',
    size: 'md'
  }
}
