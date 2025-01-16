/**
 * Alert
 * A callout to draw user's attention.
 * ---
 * @link /api_d7/bitrix/ui/messages/alerts.php
 * @see bitrix/js/ui/alerts/src
 */

export default {
  slots: {
    root: 'relative overflow-hidden w-full rounded-3xs flex',
    wrapper: 'min-w-0 flex-1 flex flex-col gap-1 font-b24-primary font-normal',
    title: 'font-bold',
    description: '',
    icon: 'shrink-0 size-6',
    avatar: 'shrink-0',
    avatarSize: '',
    actions: 'flex flex-wrap gap-1.5 shrink-0',
    close: 'p-0.5'
  },
  variants: {
    color: {
      default: {
        root: [
          'text-base-950 bg-base-200',
          'dark:text-base-950 dark:bg-base-200'
        ],
        close: 'text-base-800 dark:text-base-800 hover:text-base-950 dark:hover:text-base-950'
      },
      danger: {
        root: [
          'text-red-700 bg-red-200',
          'dark:text-red-700 dark:bg-red-300'
        ],
        close: 'text-red-700 dark:text-red-700 hover:text-red-800 dark:hover:text-red-800'
      },
      success: {
        root: [
          'text-green-780 bg-green-200',
          'dark:text-green-780 dark:bg-green-300'
        ],
        close: 'text-green-780 dark:text-green-780 hover:text-green-800 dark:hover:text-green-800'
      },
      warning: {
        root: [
          'text-orange-700 bg-orange-200',
          'dark:text-orange-750 dark:bg-orange-300'
        ],
        close: 'text-orange-700 dark:text-orange-750 hover:text-orange-800 dark:hover:text-orange-800'
      },
      primary: {
        root: [
          'text-blue-700 bg-blue-200',
          'dark:text-blue-700 dark:bg-blue-300'
        ],
        close: 'text-blue-700 dark:text-blue-700 hover:text-blue-800 dark:hover:text-blue-800'
      },
      secondary: {
        root: [
          'text-cyan-700 bg-cyan-150',
          'dark:text-cyan-750 dark:bg-cyan-300'
        ],
        close: 'text-cyan-700 dark:text-cyan-750 hover:text-cyan-800 dark:hover:text-cyan-800'
      },
      collab: {
        root: [
          'text-collab-700 bg-collab-200',
          'dark:text-collab-700 dark:bg-collab-300'
        ],
        close: 'text-collab-700 dark:text-collab-700 hover:text-collab-800 dark:hover:text-collab-800'
      },
      ai: {
        root: [
          'text-ai-700 bg-ai-200',
          'dark:text-ai-700 dark:bg-ai-300'
        ],
        close: 'text-ai-700 dark:text-ai-700 hover:text-ai-800 dark:hover:text-ai-800'
      }
    },
    size: {
      sm: {
        root: 'py-xs ps-sm pe-xs gap-2',
        title: 'text-sm leading-normal',
        description: 'text-sm leading-normal',
        avatarSize: 'md'
      },
      md: {
        root: 'py-md ps-md pe-xs gap-2.5',
        title: 'text-md leading-none',
        description: 'text-md leading-[17px]',
        avatarSize: 'xl'
      }
    },
    multiline: {
      true: {
        root: 'items-start',
        actions: 'items-start mt-2'
      },
      false: {
        root: 'items-center',
        actions: 'items-center'
      }
    }
  },
  compoundVariants: [],
  defaultVariants: {
    color: 'default',
    size: 'md'
  }
}
