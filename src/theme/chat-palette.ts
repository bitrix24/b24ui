/**
 * ChatPalette
 * A chat interface component designed to be displayed in a modal overlay.
 * ---
 */

export default {
  slots: {
    root: 'relative flex-1 flex flex-col min-h-0 min-w-0',
    prompt: 'px-0 rounded-t-none border-t border-(--ui-color-divider-default)',
    close: '',
    content: 'overflow-y-auto flex-1 flex flex-col py-3'
  }
}
