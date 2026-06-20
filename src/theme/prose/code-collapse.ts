/**
 * ProseCodeCollapse
 */
export default {
  slots: {
    root: 'relative my-5 bg-(--ui-color-design-outline-bg) [&>div]:my-0 [&_pre]:max-h-[80vh] [&_pre]:pb-[48px]',
    footer: [
      'h-[64px]',
      'absolute inset-x-px bottom-px',
      'rounded-b-(--ui-border-radius-md)',
      'flex items-center justify-center'
    ].join(' '),
    trigger: 'group',
    triggerIcon: 'group-data-[state=open]:rotate-180'
  },
  variants: {
    open: {
      true: {
        root: 'rounded-(--ui-border-radius-md)'
      },
      false: {
        root: 'max-h-[200px] overflow-hidden rounded-b-(--ui-border-radius-md) [&_pre]:overflow-hidden',
        footer: 'inset-x-0 bottom-0 border border-t-0 border-(--ui-color-design-outline-stroke) bg-linear-to-t from-(--ui-color-g-plastic-greish-bg)'
      }
    }
  }
}
