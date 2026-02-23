/**
 * FooterColumns
 * A set of link columns to organize navigation and information in the footer.
 * ---
 */
export default {
  slots: {
    root: 'xl:grid xl:grid-cols-3 xl:gap-8',
    left: 'mb-10 xl:mb-0',
    center: 'flex flex-col lg:grid grid-flow-col auto-cols-fr gap-8 xl:col-span-2',
    right: 'mt-10 xl:mt-0',
    label: 'text-(length:--ui-font-size-lg)/[normal] font-(--ui-font-weight-semi-bold)',
    list: 'mt-6 space-y-4',
    item: 'relative',
    link: 'group text-sm flex items-center gap-1.5 focus-visible:outline-primary',
    linkLeadingIcon: 'size-5 shrink-0',
    linkLabel: 'truncate',
    linkLabelExternalIcon: 'inline-block size-[14px] text-(--ui-color-design-plain-content-icon-secondary)'
  },
  variants: {
    active: {
      true: {
        link: 'text-primary font-medium'
      },
      false: {
        link: [
          'text-(--b24ui-typography-description-color) hover:text-(--b24ui-typography-label-color)',
          'transition-colors'
        ].join(' ')
      }
    }
  }
}
