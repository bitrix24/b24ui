/**
 * SidebarSection
 * ---
 * @deprecated This component is deprecated and will be removed in version `3.0.0`
 */

export default {
  slots: {
    root: [
      'ps-(--menu-items-block-padding-x) rtl:pe-(--menu-items-block-padding-x)',
      'pe-xs rtl:ps-xs',
      'flex flex-col gap-0.5'
    ].join(' ')
  }
}
