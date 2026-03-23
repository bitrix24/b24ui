/**
 * Toast
 * A succinct message to provide information or feedback to the user.
 * --
 * @link /api_d7/bitrix/ui/notification/start.php
 * @see bitrix/js/ui/notification
 * @see bitrix/js/ui/notification-manager
 * @todo support `BX.UI.Notification.Center.notify({ useAirDesign: true })`
 */

/*
// @memo: run in b24
BX.UI.Notification.Center.notify({
  content: "Content message",
  useAirDesign: true,
  autoHide: false,
  autoHideDelay: 500000,
  actions: [{
    title: "Action",
    events: {
      click: function(event, balloon, action) {
        balloon.close();
      }
    }
  }]
});
*/
export default {
  slots: {
    root: [
      'dark',
      'relative group overflow-hidden',
      'rounded-[8px] p-4',
      'flex gap-4',
      'focus-visible:outline-(length:--ui-design-outline-stroke-weight) focus-visible:outline-offset-2 focus-visible:outline-(--ui-color-design-outline-content-divider)',
      'font-[family-name:var(--ui-font-family-primary)]',
      'bg-(--ui-color-base-black-fixed)/80',
      'text-(--ui-color-design-plain-na-focused-content)',
      'text-(length:--ui-font-size-sm) font-(--ui-font-weight-normal)'
    ].join(' '),
    wrapper: 'w-0 flex-1 flex flex-col',
    title: 'font-(--ui-font-weight-medium)',
    description: '',
    icon: 'shrink-0 size-6 text-(--b24ui-border-color)',
    avatar: 'shrink-0',
    avatarSize: 'xl',
    actions: 'flex gap-1.5 shrink-0',
    progress: 'absolute inset-x-0 bottom-0',
    close: 'p-0 absolute top-2 right-2'
  },
  variants: {
    color: {
      'air-primary': { root: 'style-filled' },
      'air-primary-success': { root: 'style-filled-success' },
      'air-primary-alert': { root: 'style-filled-alert' },
      'air-primary-copilot': { root: 'style-filled-copilot' },
      'air-primary-warning': { root: 'style-filled-warning' },
      'air-secondary': { root: 'style-filled-inverted' },
      // @deprecate This rule is deprecated and will be removed in version `3.0.0` ////
      'default': { root: 'old-style-default' },
      'danger': { root: 'old-style-danger' },
      'success': { root: 'old-style-success' },
      'warning': { root: 'old-style-warning' },
      'primary': { root: 'old-style-primary' },
      'secondary': { root: 'old-style-secondary' },
      'collab': { root: 'old-style-collab' },
      'ai': { root: 'old-style-ai' }
    },
    orientation: {
      horizontal: {
        root: 'items-center',
        actions: 'items-center'
      },
      vertical: {
        root: 'items-center',
        actions: 'items-start mt-1'
      }
    },
    title: {
      true: {
        description: 'mt-1'
      }
    }
  },
  defaultVariants: {
    color: 'air-secondary'
  }
}
