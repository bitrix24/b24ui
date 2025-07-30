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
      'focus:outline-none',
      'font-[family-name:var(--ui-font-family-primary)]',
      'bg-(--ui-color-bg-content-primary)/80',
      'text-(--ui-color-base-white-fixed)',
      'text-(length:--ui-font-size-sm) font-(--ui-font-weight-normal)'
    ].join(' '),
    wrapper: 'w-0 flex-1 flex flex-col',
    title: 'font-(--ui-font-weight-medium)',
    description: '',
    icon: 'shrink-0 size-6',
    avatar: 'shrink-0',
    avatarSize: 'xl',
    actions: 'flex gap-1.5 shrink-0',
    progress: 'absolute inset-x-0 bottom-0 h-1 z-[-1]',
    close: 'p-0 text-base-350 hover:text-base-400'
  },
  variants: {
    color: {
      // @todo this this
      'air-primary': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-400',
        icon: 'text-white',
        progress: 'bg-base-350'
      },
      'air-primary-success': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-400',
        icon: 'text-white',
        progress: 'bg-base-350'
      },
      'air-primary-alert': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-400',
        icon: 'text-white',
        progress: 'bg-base-350'
      },
      'air-primary-copilot': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-400',
        icon: 'text-white',
        progress: 'bg-base-350'
      },
      'air-secondary': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-400',
        icon: 'text-white',
        progress: 'bg-base-350'
      },
      'air-secondary-alert': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-400',
        icon: 'text-white',
        progress: 'bg-base-350'
      },
      'air-secondary-accent': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-400',
        icon: 'text-white',
        progress: 'bg-base-350'
      },
      'air-secondary-accent-1': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-400',
        icon: 'text-white',
        progress: 'bg-base-350'
      },
      'air-secondary-accent-2': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-400',
        icon: 'text-white',
        progress: 'bg-base-350'
      },
      'air-secondary-no-accent': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-400',
        icon: 'text-white',
        progress: 'bg-base-350'
      },
      'air-tertiary': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-400',
        icon: 'text-white',
        progress: 'bg-base-350'
      },
      'air-tertiary-accent': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-400',
        icon: 'text-white',
        progress: 'bg-base-350'
      },
      'air-tertiary-no-accent': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-400',
        icon: 'text-white',
        progress: 'bg-base-350'
      },
      // @deprecate ////
      'default': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-400',
        icon: 'text-white',
        progress: 'bg-base-350'
      },
      'danger': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-400 dark:focus-visible:ring-red-400',
        icon: 'text-red-500',
        progress: 'bg-red-500 dark:bg-red-500'
      },
      'success': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-400 dark:focus-visible:ring-green-400',
        icon: 'text-green-500',
        progress: 'bg-green-500 dark:bg-green-500'
      },
     'warning': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-400 dark:focus-visible:ring-orange-400',
        icon: 'text-orange-500',
        progress: 'bg-orange-500 dark:bg-orange-500'
      },
      'primary': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400 dark:focus-visible:ring-blue-400',
        icon: 'text-blue-500',
        progress: 'bg-blue-500 dark:bg-blue-500'
      },
      'secondary': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400 dark:focus-visible:ring-cyan-400',
        icon: 'text-cyan-500',
        progress: 'bg-cyan-500 dark:bg-cyan-500'
      },
      'collab': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-collab-400 dark:focus-visible:ring-collab-400',
        icon: 'text-collab-500',
        progress: 'bg-collab-500 dark:bg-collab-500'
      },
      'ai': {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ai-400 dark:focus-visible:ring-ai-400',
        icon: 'text-ai-500',
        progress: 'bg-ai-500 dark:bg-ai-500'
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
