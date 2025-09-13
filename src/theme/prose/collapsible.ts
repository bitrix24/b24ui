/**
 * ProseCollapsible
 */
export default {
  slots: {
    root: 'my-[20px]',
    trigger: [
      'group',
      'relative',
      'rounded-(--ui-border-radius-md)',
      'inline-flex items-center gap-[4px]',
      'text-(--b24ui-typography-description-color)',
      'hover:text-(--b24ui-typography-label-color)',
      'text-(length:--ui-font-size-3xs) leading-(--ui-font-line-height-2xs)',
      'focus-visible:ring-2',
      'focus-visible:ring-(--ui-color-design-selection-stroke)',
      'focus:outline-none',
      'cursor-pointer',
      'transition-colors'
    ].join(' '),
    triggerIcon: [
      'size-[14px] shrink-0',
      'motion-safe:group-data-[state=open]:rotate-180 transition-transform duration-200'
    ].join(' '),
    triggerLabel: 'truncate',
    content: '*:first:mt-2.5 *:last:mb-0 *:my-1.5'
  }
}
