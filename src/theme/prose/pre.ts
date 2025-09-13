/**
 * Prose/Pre
 * Show pre
 */

export default {
  slots: {
    root: [
      'style-tinted-no-accent-1',
      'relative',
      'group',
      'my-5',
      'w-full'
    ].join(' '),
    header: [
      'flex items-center gap-1.5',
      'border-(--b24ui-border-color) border-(length:--b24ui-border-width)',
      'bg-(--b24ui-background)/20',
      'border-b-0 relative',
      'rounded-t-md',
      'px-4 py-3'
    ].join(' '),
    filename: 'text-(--b24ui-color) text-(length:--ui-font-size-md)/(--ui-font-line-height-md)',
    icon: 'size-4 shrink-0',
    copy: 'absolute top-[11px] right-[11px] lg:opacity-0 lg:group-hover:opacity-100 transition',
    base: [
      // 'text-green-350'
      'group',
      'text-pretty',
      'text-(length:--ui-font-size-sm)/[normal]',
      'font-[family-name:var(--ui-font-family-system-mono)]',
      'border-(--b24ui-border-color) border-(length:--b24ui-border-width)',
      'bg-(--b24ui-background)',
      'rounded-(--ui-border-radius-md)',
      'px-4 py-3',
      'whitespace-pre-wrap',
      'break-words',
      'overflow-x-auto',
      'focus:outline-none'
    ].join(' ')
  },
  variants: {
    filename: {
      true: {
        root: '[&>pre]:rounded-t-none [&>pre]:my-0 my-5'
      }
    }
  }
}
