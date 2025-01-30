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
    content: "Успешно удален файл отчет-за-февраль.docs",
    autoHideDelay: 500000,
    actions: [{
      title: "Отмена",
      events: {
        click: function(event, balloon, action) {
          balloon.close();
        }
      }
    }]
  });
 */

/**
 * @todo color
 * @todo add to form demo
 */

export default {
  slots: {
    root: [
      'relative group overflow-hidden rounded-[26px] py-3.5 ps-6 pe-4 flex gap-2.5 focus:outline-none',
      'font-b24-primary',
      'dark:ring-2 dark:ring-base-900',
      'bg-base-ebony/80 dark:bg-base-dark',
      'text-sm font-normal',
      'text-white dark:text-base-150'
    ].join(' '),
    wrapper: 'w-0 flex-1 flex flex-col gap-1',
    title: 'font-medium',
    description: '',
    icon: 'shrink-0 size-6',
    avatar: 'shrink-0',
    avatarSize: 'xl',
    actions: 'flex gap-1.5 shrink-0',
    progress: 'absolute inset-x-0 bottom-0 h-1 z-[-1]',
    close: 'p-0.5 text-base-350 dark:text-base-350 hover:text-base-400 dark:hover:text-base-400'
  },
  variants: {
    color: {
      default: {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-400 dark:focus-visible:ring-base-400',
        icon: 'text-white',
        progress: 'bg-base-350 dark:bg-base-350'
      },
      danger: {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-400 dark:focus-visible:ring-red-400',
        icon: 'text-red-500',
        progress: 'bg-red-500 dark:bg-red-500'
      },
      success: {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-400 dark:focus-visible:ring-green-400',
        icon: 'text-green-500',
        progress: 'bg-green-500 dark:bg-green-500'
      },
      warning: {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-400 dark:focus-visible:ring-orange-400',
        icon: 'text-orange-500',
        progress: 'bg-orange-500 dark:bg-orange-500'
      },
      primary: {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400 dark:focus-visible:ring-blue-400',
        icon: 'text-blue-500',
        progress: 'bg-blue-500 dark:bg-blue-500'
      },
      secondary: {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400 dark:focus-visible:ring-cyan-400',
        icon: 'text-cyan-500',
        progress: 'bg-cyan-500 dark:bg-cyan-500'
      },
      collab: {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-collab-400 dark:focus-visible:ring-collab-400',
        icon: 'text-collab-500',
        progress: 'bg-collab-500 dark:bg-collab-500'
      },
      ai: {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ai-400 dark:focus-visible:ring-ai-400',
        icon: 'text-ai-500',
        progress: 'bg-ai-500 dark:bg-ai-500'
      }
    },
    multiline: {
      true: {
        root: 'items-start',
        actions: 'items-start mt-1'
      },
      false: {
        root: 'items-center',
        actions: 'items-center'
      }
    }
  },
  defaultVariants: {
    color: 'default'
  }
}
