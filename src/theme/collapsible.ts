/**
 * Collapsible
 * A collapsible component for showing or hiding its content.
 * ---
 */

export default {
  slots: {
    root: '',
    content: [
      'motion-safe:data-[state=open]:animate-[collapsible-down_200ms_var(--ease-out)] motion-safe:data-[state=closed]:animate-[collapsible-up_200ms_var(--ease-out)]',
      'overflow-hidden'
    ].join(' ')
  }
}
