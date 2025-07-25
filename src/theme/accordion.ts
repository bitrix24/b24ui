/**
 * Accordion
 * A stacked set of collapsible panels.
 * ---
 */

/**
 * @todo test this UI
 */
export default {
  slots: {
    root: 'w-full',
    item: 'border-b border-default last:border-b-0',
    header: 'flex',
    trigger: 'group flex-1 flex items-center gap-1.5 font-medium text-sm py-3 focus-visible:outline-primary min-w-0 cursor-pointer',
    content: 'motion-safe:data-[state=open]:animate-[accordion-down_200ms_ease-out] motion-safe:data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none',
    body: 'text-sm pb-3',
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
