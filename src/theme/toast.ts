/**
 * Toast
 * A succinct message to provide information or feedback to the user.
 * --
 * @link /api_d7/bitrix/ui/notification/start.php
 * @see bitrix/js/ui/notification
 */

/*
// @memo: use at b24
BX.UI.Notification.Center.notify({
  content: "Content message",
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
      'dark --ui-context-content-dark',
      'relative group overflow-hidden',
      'rounded-[26px] py-3.5 ps-6 pe-4',
      'flex items-center gap-2.5',
      'focus-visible:outline-(length:--ui-design-outline-stroke-weight) focus-visible:outline-offset-2 focus-visible:outline-(--ui-color-design-outline-content-divider)',
      'font-[family-name:var(--ui-font-family-primary)]',
      'bg-(--ui-color-bg-content-primary)/80',
      'text-(--ui-color-base-white-fixed)',
      'text-(length:--ui-font-size-sm) font-(--ui-font-weight-normal)'
    ].join(' '),
    wrapper: 'w-0 flex-1 flex flex-col',
    title: 'font-(--ui-font-weight-medium)',
    description: '',
    icon: 'shrink-0 size-6 text-(--b24ui-icon)',
    avatar: 'shrink-0',
    avatarSize: 'xl',
    actions: 'flex gap-1.5 shrink-0',
    progress: 'absolute inset-x-0 bottom-0 h-1 z-[-1] bg-(--b24ui-border-color)',
    close: 'p-0 text-base-350 hover:text-base-400'
  },
  variants: {
    color: {
      'air-primary': {
        root: '--air-primary'
      },
      'air-primary-success': {
        root: '--air-primary-success'
      },
      'air-primary-alert': {
        root: '--air-primary-alert'
      },
      'air-primary-copilot': {
        root: '--air-primary-copilot'
      },
      'air-secondary': {
        root: '--air-secondary'
      },
      'air-secondary-alert': {
        root: '--air-secondary-alert'
      },
      'air-secondary-accent': {
        root: '--air-secondary-accent'
      },
      'air-secondary-accent-1': {
        root: '--air-secondary-accent-1'
      },
      'air-secondary-accent-2': {
        root: '--air-secondary-accent-2'
      },
      'air-secondary-no-accent': {
        root: '--air-secondary-no-accent'
      },
      'air-tertiary': {
        root: '--air-tertiary'
      },
      'air-tertiary-accent': {
        root: '--air-tertiary-accent'
      },
      'air-tertiary-no-accent': {
        root: '--air-tertiary-no-accent'
      },
      // @deprecate ////
      'default': {
        root: '--old-style-default'
      },
      'danger': {
        root: '--old-style-danger'
      },
      'success': {
        root: '--old-style-success'
      },
      'warning': {
        root: '--old-style-warning'
      },
      'primary': {
        root: '--old-style-primary'
      },
      'secondary': {
        root: '--old-style-secondary'
      },
      'collab': {
        root: '--old-style-collab'
      },
      'ai': {
        root: '--old-style-ai'
      }
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
    color: 'air-secondary-no-accent'
  }
}
