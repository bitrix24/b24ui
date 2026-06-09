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
      // positioned by tiptap/floating-ui (not reka) — reka transform-origin var is never set here, so use a static, RTL-safe origin for the scale animation
      'origin-top',
      'font-[family-name:var(--ui-font-family-primary)]',
      'relative',
      'isolate',
      'px-0 py-(--menu-popup-padding)',
      'pointer-events-auto'
    ].join(' '),
    viewport: [
      'relative',
      'w-full max-h-[40vh] min-w-48 max-w-60',
      'overflow-x-hidden overflow-y-auto scrollbar-thin' // scrollbar-transparent
    ].join(' '),
    group: 'grid', // p-1 isolate
    label: [
      'w-full h-(--popup-window-delimiter-section-height)',
      'mt-(--menu-item-block-stack-space)',
      'flex flex-row rtl:flex-row-reverse items-center',
      'select-none outline-none whitespace-nowrap',
      'text-start',
      'text-legend',
      'font-(--ui-font-weight-normal)',
      'after:ms-[10px] after:block after:flex-1 after:min-w-[15px] after:h-px after:bg-(--ui-color-divider-vibrant-default)'
    ].join(' '),
    item: [
      'group',
      'w-full ', // min-w-[195px]
      'mt-(--menu-item-block-stack-space)',
      'relative',
      'flex flex-row rtl:flex-row-reverse items-center',
      'select-none outline-none whitespace-nowrap',
      'cursor-pointer',
      'data-disabled:cursor-not-allowed data-disabled:opacity-30',
      'text-start',
      'text-legend hover:text-label',
      'data-highlighted:text-label',
      'data-[state=open]:text-label',
      'hover:bg-(--ui-color-base-black-fixed)/3 dark:hover:bg-(--ui-color-base-black-fixed)',
      'active:bg-(--ui-color-base-black-fixed)/6 dark:active:bg-(--ui-color-base-black-fixed)',
      'data-highlighted:not-active:bg-(--ui-color-base-black-fixed)/3 dark:data-highlighted:not-active:bg-(--ui-color-base-black-fixed)',
      'data-[state=open]:bg-(--ui-color-base-black-fixed)/6 dark:data-[state=open]:bg-(--ui-color-base-black-fixed)',
      'transition-colors'
    ].join(' '),
    itemLeadingIcon: 'size-[25px] shrink-0 text-(--ui-color-base-5)',
    itemLeadingAvatar: 'shrink-0',
    itemLeadingAvatarSize: '',
    itemWrapper: 'ms-[4px] flex-1 flex flex-col text-start min-w-0',
    itemLabel: 'max-w-60 truncate -mt-px',
    itemDescription: 'max-w-60 truncate -mt-[6px] text-description text-(length:--ui-font-size-sm)',
    itemLabelExternalIcon: 'inline-block size-[25px] text-(--ui-color-base-5)'
  },
  variants: {
    size: {
      xss: {
        label: 'px-[14px] text-(length:--ui-font-size-4xs)/[normal] gap-[14px]',
        item: 'px-[14px] :text-(length:--ui-font-size-4xs)/[normal] gap-[14px]',
        itemLeadingIcon: 'size-4 text-(length:--ui-font-size-sm)/[normal]',
        itemLeadingAvatarSize: '3xs'
      },
      xs: {
        label: 'px-[14px] text-(length:--ui-font-size-4xs)/[normal] gap-[14px]',
        item: 'px-[14px] :text-(length:--ui-font-size-xs)/[normal] gap-[14px]',
        itemLeadingIcon: 'size-4 text-(length:--ui-font-size-sm)/[normal]',
        itemLeadingAvatarSize: '3xs'
      },
      sm: {
        label: 'px-4.5 text-(length:--ui-font-size-xs)/[normal] gap-4.5',
        item: 'px-4.5 :text-(length:--ui-font-size-xs)/[normal] gap-4.5',
        itemLeadingIcon: 'size-4 text-(length:--ui-font-size-sm)/[normal]',
        itemLeadingAvatarSize: '3xs'
      },
      md: {
        label: 'px-4.5 text-(length:--ui-font-size-sm)/[normal] gap-4.5',
        item: 'h-[36px] px-4.5 text-(length:--ui-font-size-sm)/[normal] gap-4.5',
        itemLeadingIcon: 'size-4.5 text-(length:--ui-font-size-lg)/[normal]',
        itemLeadingAvatar: 'size-[16px] me-2', // @memo 18-2px
        itemLeadingAvatarSize: '2xs' // @memo this wrong
      },
      lg: {
        label: 'px-[20px] :text-(length:--ui-font-size-sm)/[normal] gap-[20px]',
        item: 'px-[20px] text-(length:--ui-font-size-sm)/[normal] gap-[20px]',
        itemLeadingIcon: 'size-4.5 text-(length:--ui-font-size-lg)/[normal]',
        itemLeadingAvatar: 'size-[16px] me-2', // @memo 18-2px
        itemLeadingAvatarSize: '2xs' // @memo this wrong
      },
      xl: {
        label: 'px-[20px] text-(length:--ui-font-size-sm)/[normal] gap-[20px]',
        item: 'px-[20px] text-(length:--ui-font-size-lg)/[normal] gap-[20px]',
        itemLeadingIcon: 'size-[20px] text-(length:--ui-font-size-2xl)/[normal]',
        itemLeadingAvatar: 'size-[16px] me-2', // @memo 18-2px
        itemLeadingAvatarSize: 'xs' // @memo this wrong
      }
    },
    active: {
      true: {
        item: '', // bg-(--ui-color-base-black-fixed)/3
        itemLeadingIcon: [
          'text-(--ui-color-accent-main-primary)',
          'hover:text-(--ui-color-accent-main-primary)',
          'group-data-[state=open]:text-(--ui-color-accent-main-primary)'
        ].join(' ')
      },
      false: {}
    }
  },
  defaultVariants: {
    size: 'md'
  }
}
