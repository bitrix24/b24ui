/**
 * Modal
 * A dialog window that can be used to display a message or request user input.
 * ---
 * @link: /api_d7/bitrix/ui/dialogs/dialogs.php
 * @see bitrix/js/ui/dialogs/messagebox/..
 *
 * @todo: use modal template from - What's new in Bitrix24 + set position ~> top-right
 * @todo: add command palette to docs example
 * @todo: add wizard component
 */
/*
  BX.UI.Dialogs.MessageBox.alert("Message", "Title", (messageBox, button, event) => {}, "OK");
 */
export default {
  slots: {
    overlay: 'fixed inset-0 bg-base-950/20 dark:bg-base-950/30',
    content: [
      'py-md2 px-5',
      'fixed bg-white dark:bg-base-950',
      // 'divide-y divide-base-900/10 dark:divide-white/20',
      'flex flex-col focus:outline-none'
    ].join(' '),
    header: 'pe-5 pt-0',
    body: 'flex-1 overflow-y-auto my-2.5 text-md leading-normal',
    footer: 'flex items-center justify-center gap-3 mt-2.5 pt-4 border-t border-t-1 border-t-base-900/10 dark:border-t-white/20',
    title: 'font-bold text-md leading-normal text-base-900 dark:text-base-150',
    description: 'mt-0.5 mb-1 text-base-500 dark:text-base-400 text-sm',
    close: 'absolute top-2 end-1.5 p-0.5'
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
        content: [
          'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'w-[calc(100vw-2rem)] max-w-[32rem] max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)]',
          'rounded-md shadow-lg',
          'ring ring-base-300 dark:ring-base-800'
        ].join(' ')
      }
    }
  }
}
