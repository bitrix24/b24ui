/**
 * PageLinks
 * ---
 * @todo add demo
 */
export default {
  slots: {
    root: 'flex flex-col gap-[12px]',
    title: [
      'text-(--b24ui-typography-legend-color)',
      'text-(length:--ui-font-size-md) leading-(--ui-font-line-height-md)',
      'font-(--ui-font-weight-semi-bold)',
      'flex items-center gap-[6px]'
    ].join(' '),
    list: 'flex flex-col gap-[8px]',
    item: 'relative',
    link: [
      'group',
      'text-(length:--ui-font-size-sm)',
      'cursor-pointer',
      'focus-visible:outline-(--ui-color-accent-main-primary)',
      'focus-visible:outline-1',
      'focus-visible:rounded-[4px]',
      'text-start',
      'text-(--ui-color-design-selection-content)',
      'underline-offset-2',
      'hover:text-(--ui-color-accent-main-primary-alt-2)',
      'hover:underline',
      'flex flex-row items-center justify-between'
    ].join(' '),
    linkWrapper: [
      'flex items-center gap-[6px]'
    ].join(' '),
    linkLeadingIcon: 'size-5 shrink-0',
    linkLabel: 'truncate',
    linkLabelExternalIcon: 'size-4 text-(--ui-color-design-selection-content) group-hover:text-(--ui-color-accent-main-primary-alt-2)'
  },
  variants: {
    active: {
      true: {
        link: 'text-(--ui-color-accent-main-primary-alt-2)',
        linkLabelExternalIcon: 'text-(--ui-color-accent-main-primary-alt-2)'
      },
      false: {
        link: ['text-(--ui-color-design-selection-content) hover:text-(--ui-color-accent-main-primary-alt-2)']
      }
    }
  }
}
