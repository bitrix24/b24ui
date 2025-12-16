/**
 * Prose/Pre
 * Show pre
 */

export default {
  slots: {
    root: [
      'relative',
      'group',
      'my-5',
      'w-full'
    ].join(' '),
    header: [
      'flex items-center gap-1.5',
      'border border-(--ui-color-design-tinted-na-stroke)',
      'bg-(--ui-color-base-8)',
      'text-(--ui-color-design-tinted-na-content)',
      'border-b-0 relative',
      'rounded-t-md',
      'px-4 py-3'
    ].join(' '),
    filename: 'text-(--ui-color-design-tinted-na-content) text-(length:--ui-font-size-md)/(--ui-size-xl)',
    icon: 'size-[16px] shrink-0 mt-px',
    copy: 'absolute top-[11px] right-[11px] lg:opacity-0 lg:group-hover:opacity-100 transition',
    base: [
      'text-green-350',
      'group',
      'text-pretty',
      'text-(length:--ui-font-size-md)/(--ui-font-line-height-md)',
      'font-[family-name:var(--ui-font-family-system-mono)]',
      'border border-(--ui-color-design-tinted-na-stroke)',
      'bg-(--ui-color-g-plastic-greish-bg)',
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
