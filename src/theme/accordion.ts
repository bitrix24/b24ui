/**
 * Accordion
 * A stacked set of collapsible panels.
 * ---
 * @see Separator.accent
 */

export default {
  slots: {
    root: 'w-full',
    item: 'text-(--b24ui-typography-label-color) border-b border-(--ui-color-divider-vibrant-accent-more) last:border-b-0',
    header: 'flex',
    trigger: [
      'min-w-0 group flex-1 flex items-center gap-1.5',
      'py-3',
      'font-(--ui-font-weight-medium) text-(length:--ui-font-size-sm)',
      'focus-visible:outline-(--ui-color-accent-soft-element-blue)',
      'cursor-pointer'
    ].join(' '),
    content: 'motion-safe:data-[state=open]:animate-[accordion-down_200ms_ease-out] motion-safe:data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none',
    body: 'text-(length:--ui-font-size-sm) pb-3',
    leadingIcon: 'shrink-0 size-5',
    trailingIcon: 'shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-transform duration-200',
    label: 'text-start break-words'
  },
  variants: {
    disabled: {
      true: {
        trigger: 'cursor-not-allowed opacity-75'
      }
    }
  }
}
