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
    icon: 'shrink-0 size-6',
    avatar: 'shrink-0',
    avatarSize: 'xl',
    actions: 'flex gap-1.5 shrink-0',
    progress: 'absolute inset-x-0 bottom-0 h-1 z-[-1]',
    close: 'p-0 text-base-350 hover:text-base-400'
  },
  variants: {
    color: {
      'air-primary': {
        icon: 'text-(--ui-color-design-filled-bg)',
        progress: 'bg-(--ui-color-design-filled-bg)'
      },
      'air-primary-success': {
        icon: 'text-(--ui-color-design-filled-success-bg)',
        progress: 'bg-(--ui-color-design-filled-success-bg)'
      },
      'air-primary-alert': {
        icon: 'text-(--ui-color-design-filled-alert-bg)',
        progress: 'bg-(--ui-color-design-filled-alert-bg)'
      },
      'air-primary-copilot': {
        icon: 'text-(--ui-color-design-filled-copilot-bg)',
        progress: 'bg-(--ui-color-design-filled-copilot-bg)'
      },
      'air-secondary': {
        icon: 'text-(--ui-color-design-tinted-content)',
        progress: 'bg-(--ui-color-design-tinted-bg)'
      },
      'air-secondary-alert': {
        icon: 'text-(--ui-color-design-tinted-alert-content)',
        progress: 'bg-(--ui-color-design-tinted-alert-bg)'
      },
      'air-secondary-accent': {
        icon: 'text-(--ui-color-design-outline-content)',
        progress: 'bg-(--ui-color-design-outline-bg)'
      },
      'air-secondary-accent-1': {
        icon: 'text-(--ui-color-design-outline-a1-content)',
        progress: 'bg-(--ui-color-design-outline-a1-stroke)'
      },
      'air-secondary-accent-2': {
        icon: 'text-(--ui-color-design-outline-a2-content)',
        progress: 'bg-(--ui-color-design-outline-a2-stroke)'
      },
      'air-secondary-no-accent': {
        icon: 'text-(--ui-color-design-outline-na-content)',
        progress: 'bg-(--ui-color-design-outline-na-bg)'
      },
      'air-tertiary': {
        icon: 'text-(--ui-color-design-plain-content)',
        progress: 'bg-(--ui-color-design-plain-content-divider)'
      },
      'air-tertiary-accent': {
        icon: 'text-(--ui-color-design-plain-a-content)',
        progress: 'bg-(--ui-color-design-plain-a-content-divider)'
      },
      'air-tertiary-no-accent': {
        icon: 'text-(--ui-color-design-plain-na-content)',
        progress: 'bg-(--ui-color-design-plain-na-content-divider)'
      },
      // @deprecate ////
      'default': {
        icon: 'text-(--ui-color-base-20)',
        progress: 'bg-(--ui-color-base-20)'
      },
      'danger': {
        icon: 'text-[#f1361a]',
        progress: 'bg-[#f1361a]'
      },
      'success': {
        icon: 'text-[#bbed21]',
        progress: 'bg-[#bbed21]'
      },
      'warning': {
        icon: 'text-[#EDDA7B]/80',
        progress: 'bg-[#EDDA7B]/80'
      },
      'primary': {
        icon: 'text-[#3bc8f5]',
        progress: 'bg-[#3bc8f5]'
      },
      'secondary': {
        icon: 'text-[#c5e7f4]',
        progress: 'bg-[#c5e7f4]'
      },
      'collab': {
        icon: 'text-[#19CC45]',
        progress: 'bg-[#19CC45]'
      },
      'ai': {
        icon: 'text-[#935BEC]',
        progress: 'bg-[#935BEC]'
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
