/**
 * EditorSuggestionMenu
 * A slash command menu that displays formatting and action suggestions when typing /.
 * ---
 * @see src/theme/dropdown-menu.ts
 * @memo itemWrapper: 'ms-[4px] ...'
 */

export default {
  slots: {
    content: [
      'base-mode',
      'bg-(--ui-color-bg-content-primary)',
      'shadow-(--popup-window-box-shadow)',
      'rounded-(--ui-border-radius-xl) will-change-[opacity]',
      'motion-safe:data-[state=open]:animate-[scale-in_100ms_ease-out] motion-safe:data-[state=closed]:animate-[scale-out_100ms_ease-in]',
      'origin-(--reka-dropdown-menu-content-transform-origin)',
      'font-[family-name:var(--ui-font-family-primary)]',
      'relative',
      'isolate',
      'px-0 py-(--menu-popup-padding)',
      'pointer-events-auto'
    ].join(' '),
    viewport: [
      'relative',
      'w-full max-h-[40vh] min-w-[192px] max-w-[240px]',
      'overflow-x-hidden overflow-y-auto scrollbar-thin' // scrollbar-transparent
    ].join(' '),
    group: 'grid', // p-1 isolate
    label: [
      'w-full h-(--popup-window-delimiter-section-height)',
      'px-[18px] mt-(--menu-item-block-stack-space)',
      'flex flex-row rtl:flex-row-reverse items-center',
      'select-none outline-none whitespace-nowrap',
      'text-start',
      'text-(length:--ui-size-sm)',
      'text-(--b24ui-typography-legend-color)',
      'font-(--ui-font-weight-normal)',
      'after:ms-[10px] after:block after:flex-1 after:min-w-[15px] after:h-px after:bg-(--ui-color-divider-vibrant-default)'
    ].join(' '),
    item: [
      'group',
      'w-full h-[36px]', // min-w-[195px]
      'px-[18px] mt-(--menu-item-block-stack-space)',
      'relative',
      'flex flex-row rtl:flex-row-reverse items-center',
      'select-none outline-none whitespace-nowrap',
      'cursor-pointer',
      'data-disabled:cursor-not-allowed data-disabled:opacity-30',
      'text-start',
      'text-(length:--ui-font-size-md)',
      'text-(--b24ui-typography-legend-color) hover:text-(--b24ui-typography-label-color)',
      'data-highlighted:text-(--b24ui-typography-label-color)',
      'data-[state=open]:text-(--b24ui-typography-label-color)',
      'hover:bg-(--ui-color-divider-optical-1-alt)',
      'data-highlighted:bg-(--ui-color-divider-optical-1-alt)',
      'data-[state=open]:bg-(--ui-color-divider-optical-1-alt)',
      'transition-colors'
    ].join(' '),
    itemLeadingIcon: [
      'shrink-0',
      'size-[18px]',
      'text-(--ui-color-design-plain-content-icon-secondary)',
      'group-data-highlighted:text-(--ui-color-accent-main-primary)',
      'group-data-[state=open]:text-(--ui-color-accent-main-primary)',
      'group-data-[state=checked]:text-(--ui-color-accent-main-primary)',
      'transition-colors'
    ].join(' '),
    itemLeadingAvatar: 'shrink-0 size-[16px] me-[8px]', // @memo 18-2px
    itemLeadingAvatarSize: '2xs', // @memo this wrong
    itemWrapper: 'ms-[4px] flex-1 flex flex-col text-start min-w-0',
    itemLabel: [
      'max-w-[240px] truncate -mt-px',
      'group-data-[state=checked]:text-(--ui-color-accent-main-primary)'
    ].join(' '),
    itemDescription: 'max-w-[240px] truncate -mt-[6px] text-(--b24ui-typography-description-color) text-(length:--ui-font-size-sm)',
    itemLabelExternalIcon: 'inline-block size-[16px] text-(--ui-color-design-plain-content-icon-secondary)'
  },
  variants: {
    active: {
      true: {
        item: [
          'text-(--ui-color-accent-main-primary)',
          'hover:text-(--ui-color-accent-main-primary)'
        ].join(' '),
        itemLeadingIcon: [
          'text-(--ui-color-accent-main-primary)',
          'hover:text-(--ui-color-accent-main-primary)',
          'group-data-[state=open]:text-(--ui-color-accent-main-primary)'
        ].join(' ')
      },
      false: {}
    }
  }
}
