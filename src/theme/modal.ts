/**
 * Modal
 * A dialog window that can be used to display a message or request user input.
 * ---
 * @link: /api_d7/bitrix/ui/dialogs/dialogs.php
 * @see bitrix/js/ui/dialogs/messagebox/..
 */
export default {
  slots: {
    overlay: 'fixed inset-0 bg-base-100/75 dark:bg-base-100/75 ',
    content: 'fixed w-full h-dvh bg-white dark:bg-base-dark divide-y divide-base-30 dark:divide-base-800 flex flex-col focus:outline-none',
    header: 'px-4 py-5 sm:px-6',
    body: 'flex-1 overflow-y-auto p-4 sm:p-6',
    footer: 'flex items-center gap-1.5 p-4 sm:px-6',
    title: 'text-(--ui-text-highlighted) font-semibold',
    description: 'mt-1 text-(--ui-text-muted) text-sm',
    close: 'absolute top-4 end-4'
  },
  variants: {
    transition: {
      true: {
        overlay: 'data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]',
        content: 'data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]'
      }
    },
    fullscreen: {
      true: {
        content: 'inset-0'
      },
      false: {
        content: 'top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] sm:max-w-[512px] sm:h-auto sm:max-h-[calc(100vh-4rem)] sm:rounded-md sm:shadow-lg sm:ring ring-base-300 dark:ring-base-800'
      }
    }
  }
}
