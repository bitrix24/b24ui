/**
 * InputMenu
 * An autocomplete input with real-time suggestions.
 * ---
 * @link /api_d7/bitrix/ui/entity_selector/tag_selector/index.php
 * @link /api_d7/bitrix/ui/select/index.php
 * @link /api_d7/bitrix/ui/forms/fields_types.php
 * @see bitrix/js/ui/select..
 */
import { defuFn } from 'defu'
import input from './input'

export default () => {
  return defuFn({
    slots: {
      base: [
        'w-full py-0 border-0 focus:outline-none',
        'disabled:cursor-not-allowed',
        'disabled:pointer-events-none',
        'disabled:select-none',
        'disabled:opacity-30',
        'disabled:resize-none',
        'appearance-none transition duration-300 ease-linear transition-colors', // transition-colors
        'text-(--ui-color-base-1)',
        'style-blurred-bg-input',
        'hover:text-(--ui-color-base-1)',
        'focus:text-(--ui-color-base-1)',
        'active:text-(--ui-color-base-1)',
        'placeholder:text-(--ui-color-design-plain-na-content-secondary)',
        'font-[family-name:var(--ui-font-family-primary)] font-(--ui-font-weight-regular)',
        'align-middle'
      ].join(' '),
      trailing: [
        'group',
        'absolute inset-y-0 end-0 flex items-center',
        'disabled:cursor-not-allowed',
        'disabled:opacity-30'
      ].join(' '),
      content: [
        'base-mode',
        // w-(--reka-combobox-trigger-width)
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
        'scroll-py-1',
        'w-[240px] max-h-[40vh]',
        'overflow-x-hidden overflow-y-auto scrollbar-thin' // scrollbar-transparent
      ].join(' '),
      arrow: 'fill-(--ui-color-bg-content-primary)', // for content bottom|top::start -> ml-[12px]
      group: 'grid',
      empty: [
        'h-(--popup-window-delimiter-section-height)',
        // 'mt-(--menu-item-block-stack-space)',
        'py-[8px]',
        'select-none outline-none whitespace-nowrap',
        'text-center',
        'text-(length:--ui-size-sm)/(--ui-font-line-height-lg)',
        'text-(--b24ui-typography-legend-color)',
        'font-(--ui-font-weight-normal)'
      ].join(' '),
      label: [
        'w-full min-w-[195px] h-(--popup-window-delimiter-section-height)',
        'px-[18px] mt-(--menu-item-block-stack-space)',
        'flex flex-row rtl:flex-row-reverse items-center',
        'select-none outline-none whitespace-nowrap',
        'text-start',
        'text-(length:--ui-size-sm)',
        'text-(--b24ui-typography-legend-color)',
        'font-(--ui-font-weight-normal)',
        'after:ms-[10px] after:block after:flex-1 after:min-w-[15px] after:h-px after:bg-(--ui-color-divider-vibrant-default)'
      ].join(' '),
      separator: 'my-[8px] mx-[18px] h-[1px] bg-(--ui-color-divider-vibrant-default)',
      item: [
        'group',
        'w-full min-w-[195px] h-[36px]',
        'px-[18px] mt-(--menu-item-block-stack-space)',
        'relative',
        'flex flex-row rtl:flex-row-reverse items-center',
        'select-none outline-none whitespace-nowrap',
        'cursor-pointer',
        'data-disabled:cursor-not-allowed data-disabled:opacity-30',
        'data-disabled:select-none',
        'text-start',
        'text-(length:--ui-font-size-md)',
        'text-(--b24ui-typography-legend-color) hover:text-(--b24ui-typography-label-color)',
        'data-highlighted:not-data-disabled:text-(--b24ui-typography-label-color)',
        'data-[state=open]:text-(--b24ui-typography-label-color)',
        'data-[state=checked]:text-(--b24ui-typography-label-color)',
        'hover:bg-(--ui-color-divider-optical-1-alt)',
        'data-highlighted:bg-(--ui-color-divider-optical-1-alt)',
        'data-[state=open]:bg-(--ui-color-divider-optical-1-alt)',
        'transition-colors'
      ].join(' '),
      itemLeadingIcon: [
        'shrink-0',
        'size-[18px]',
        'text-(--ui-color-design-plain-content-icon-secondary)',
        'group-data-highlighted:not-data-disabled:text-(--ui-color-accent-main-primary)',
        'group-data-[state=open]:text-(--ui-color-accent-main-primary)',
        'group-data-[state=checked]:text-(--ui-color-accent-main-primary)',
        'transition-colors'
      ].join(' '),
      itemLeadingAvatar: 'shrink-0 size-[16px]', // @memo 18-2px
      itemLeadingAvatarSize: '2xs', // @memo this wrong
      itemLeadingChip: 'shrink-0 size-[16px]',
      itemLeadingChipSize: 'sm',
      itemTrailing: 'ml-auto rtl:ml-0 rtl:mr-auto inline-flex gap-1.5 items-center',
      itemTrailingIcon: 'shrink-0 size-[24px] text-(--ui-color-design-plain-content-icon-secondary)',
      itemWrapper: 'flex-1 flex flex-col min-w-0',
      itemLabel: [
        'truncate ms-[2px] -mt-px',
        'group-data-[state=checked]:text-(--ui-color-accent-main-primary)'
      ].join(' '),
      itemDescription: 'truncate -mt-[6px] text-(--b24ui-typography-description-color) text-(length:--ui-font-size-sm)',
      tagsItem: [
        'ps-[13px] pe-[6px]',
        'rounded-(--ui-border-radius-xs)',
        'h-(--main-ui-square-item-height)',
        'leading-(--main-ui-square-item-height)',
        'font-[family-name:var(--ui-font-family-primary)] font-(--ui-font-weight-regular)',
        'inline-flex items-center gap-1',
        'data-disabled:cursor-not-allowed data-disabled:opacity-30',
        'data-disabled:select-none',
        'text-(--ui-color-design-tinted-content)',
        'bg-(--ui-color-design-tinted-bg-alt)'
      ].join(' '),
      tagsItemText: 'truncate max-w-[180px]',
      tagsItemDelete: [
        'cursor-pointer',
        'inline-flex items-center',
        'disabled:pointer-events-none',
        'text-(--b24ui-icon-color-secondary)',
        'hover:text-(--b24ui-icon-color-secondary-hover)',
        'transition-none'
      ].join(' '),
      tagsItemDeleteIcon: '',
      tagsInput: ''
    },
    variants: {
      virtualize: {
        true: {
          viewport: 'p-1 isolate'
        },
        false: {
          viewport: '' // divide-y divide-(--ui-color-design-tinted-na-stroke)
        }
      },
      addNew: {
        true: {
          group: '', // p-0 isolate -m-px
          item: [
            'text-(--b24ui-typography-legend-color)',
            'data-highlighted:not-data-disabled:text-(--b24ui-typography-label-color)',
            'data-[state=checked]:text-(--b24ui-typography-label-color)'
          ].join(' '),
          itemLabel: 'flex flex-row flex-nowrap items-center justify-start gap-2',
          itemLeadingIcon: [
            'size-[20px] rounded-full',
            'text-(--ui-color-base-white-fixed)',
            'bg-(--ui-color-design-selection-content-icon-secondary)',
            'group-data-highlighted:not-data-disabled:text-(--ui-color-base-white-fixed)',
            'group-data-highlighted:not-data-disabled:bg-(--ui-color-design-selection-content-icon)',
            'group-data-[state=checked]:text-(--ui-color-base-white-fixed)',
            'group-data-[state=checked]:bg-(--ui-color-design-selection-content-icon)'
          ].join(' ')
        }
      },
      multiple: {
        true: {
          root: 'flex-wrap',
          base: [
            'py-[6px] ps-[6px] pe-[39px]'
          ].join(' '),
          tagsInput: [
            'flex-1',
            'border-0',
            'bg-transparent',
            'ps-[6px] pe-[0px] py-0',
            'placeholder:text-(--ui-color-design-plain-na-content-secondary)',
            'focus:outline-none',
            'disabled:cursor-not-allowed',
            'disabled:pointer-events-none',
            'disabled:select-none',
            'disabled:opacity-30',
            'focus:ring-0 focus-visible:ring-0'
          ].join(' ')
        },
        false: {
          base: [
            'px-3',
            'placeholder:text-(--ui-color-design-plain-na-content-secondary)',
            'focus:outline-none',
            'disabled:cursor-not-allowed',
            'disabled:pointer-events-none',
            'disabled:select-none',
            'disabled:opacity-30'
          ].join(' ')
        }
      },
      size: {
        xss: {
          base: '[--main-ui-square-item-height:12px] h-[20px] gap-1 text-(length:--ui-font-size-4xs)/[normal]',
          leading: 'px-1',
          trailing: 'px-1',
          leadingIcon: 'size-[12px]',
          itemLeadingAvatar: 'size-[12px]',
          itemLeadingAvatarSize: '3xs', // @memo this wrong
          trailingIcon: 'size-[12px]',
          tagsInput: 'text-(length:--ui-font-size-4xs)/[normal]',
          tagsItem: [
            'text-(length:--ui-font-size-5xs)/(--main-ui-square-item-height)',
            'gap-0.5'
          ].join(' '),
          tagsItemDeleteIcon: 'size-[10px]'
        },
        xs: {
          base: '[--main-ui-square-item-height:16px] h-[24px] gap-1 text-(length:--ui-font-size-4xs)/[normal]',
          leading: 'px-1',
          trailing: 'px-1',
          leadingIcon: 'size-[14px]',
          itemLeadingAvatar: 'size-[14px]',
          itemLeadingAvatarSize: '3xs', // @memo this wrong
          trailingIcon: 'size-[14px]',
          tagsInput: 'text-(length:--ui-font-size-xs)/[normal]',
          tagsItem: [
            'text-(length:--ui-font-size-5xs)/(--main-ui-square-item-height)',
            'gap-0.5'
          ].join(' '),
          tagsItemDeleteIcon: 'size-[10px]'
        },
        sm: {
          base: '[--main-ui-square-item-height:20px] h-[28px] gap-1.5 text-(length:--ui-font-size-xs)/[normal]',
          leading: 'px-1.5',
          trailing: 'px-1.5',
          leadingIcon: 'size-[16px]',
          itemLeadingAvatar: 'size-[16px]',
          itemLeadingAvatarSize: '2xs', // @memo this wrong
          trailingIcon: 'size-[16px]',
          tagsInput: 'text-(length:--ui-font-size-sm)/[normal]',
          tagsItem: [
            'text-(length:--ui-font-size-5xs)/(--main-ui-square-item-height)',
            'gap-0.5'
          ].join(' '),
          tagsItemDeleteIcon: 'size-[12px]'
        },
        md: {
          base: '[--main-ui-square-item-height:24px] h-[34px] gap-1.5 text-(length:--ui-font-size-lg)/[normal]',
          leading: 'px-2',
          trailing: 'px-2',
          leadingIcon: 'size-[18px]',
          itemLeadingAvatarSize: '2xs', // @memo this wrong
          trailingIcon: 'size-[18px]',
          tagsInput: 'text-(length:--ui-font-size-lg)/[normal]',
          tagsItem: [
            'text-(length:--ui-font-size-sm)/(--main-ui-square-item-height)',
            'gap-[4px]'
          ].join(' '),
          tagsItemDeleteIcon: 'size-[18px]'
        },
        lg: {
          base: '[--main-ui-square-item-height:28px] h-[38px] gap-2 text-(length:--ui-font-size-lg)/[normal]',
          leading: 'px-2',
          trailing: 'px-2',
          leadingIcon: 'size-[22px]',
          itemLeadingAvatarSize: '2xs',
          trailingIcon: 'size-[22px]',
          tagsInput: 'text-(length:--ui-font-size-lg)/[normal]',
          tagsItem: [
            'text-(length:--ui-font-size-md)/(--main-ui-square-item-height)',
            'gap-1'
          ].join(' '),
          tagsItemDeleteIcon: 'size-[22px]'
        },
        xl: {
          base: '[--main-ui-square-item-height:32px] h-[46px] gap-2 text-(length:--ui-font-size-2xl)/[normal]',
          leading: 'px-2',
          trailing: 'px-2',
          leadingIcon: 'size-[22px]',
          itemLeadingAvatarSize: '2xs',
          trailingIcon: 'size-[22px]',
          tagsInput: 'text-(length:--ui-font-size-2xl)/[normal]',
          tagsItem: [
            'text-(length:--ui-font-size-xl)/(--main-ui-square-item-height)',
            'gap-1'
          ].join(' '),
          tagsItemDeleteIcon: 'size-[22px]'
        }
      },
      colorItem: {
        'air-primary': { item: 'style-filled' },
        'air-primary-success': { item: 'style-filled-success' },
        'air-primary-alert': { item: 'style-filled-alert' },
        'air-primary-copilot': { item: 'style-filled-copilot' },
        'air-primary-warning': { item: 'style-filled-warning' },
        'default': { item: 'style-old-default' },
        'danger': { item: 'style-old-danger' },
        'success': { item: 'style-old-success' },
        'warning': { item: 'style-old-warning' },
        'primary': { item: 'style-old-primary' },
        'secondary': { item: 'style-old-secondary' },
        'collab': { item: 'style-old-collab' },
        'ai': { item: 'style-old-ai' }
      }
    },
    compoundVariants: [
      // 'has-focus-visible:ring-1 has-focus-visible:ring-red-500'
      // from dropdown-menu
      {
        colorItem: ['air-primary', 'air-primary-success', 'air-primary-alert', 'air-primary-copilot', 'air-primary-warning'],
        active: false,
        class: {
          item: [
            'text-(--b24ui-background) data-highlighted:text-(--b24ui-background-hover) data-[state=open]:text-(--b24ui-background-hover)'
          ].join(' '),
          itemLeadingIcon: [
            'text-(--b24ui-background) group-data-highlighted:text-(--b24ui-background-hover) group-data-[state=open]:text-(--b24ui-background-hover)'
          ].join(' ')
        }
      },
      {
        colorItem: ['air-primary', 'air-primary-success', 'air-primary-alert', 'air-primary-copilot', 'air-primary-warning'],
        active: true,
        class: {
          item: [
            'text-(--b24ui-background-active)'
          ].join(' '),
          itemLeadingIcon: [
            'text-(--b24ui-background-active) group-data-[state=open]:text-(--b24ui-background-active)'
          ].join(' ')
        }
      },
      {
        colorItem: 'default',
        active: false,
        class: ''
      },
      {
        colorItem: 'default',
        active: true,
        class: ''
      },
      {
        colorItem: ['danger', 'success', 'warning', 'primary', 'secondary', 'collab', 'ai'],
        active: false,
        class: {
          item: [
            'text-(--b24ui-background-active) data-highlighted:text-(--b24ui-background-hover) data-[state=open]:text-(--b24ui-background-hover)'
          ].join(' '),
          itemLeadingIcon: [
            'text-(--b24ui-icon) group-data-highlighted:text-(--b24ui-icon) group-data-[state=open]:text-(--b24ui-icon)'
          ].join(' ')
        }
      },
      {
        colorItem: ['danger', 'success', 'warning', 'primary', 'secondary', 'collab', 'ai'],
        active: true,
        class: {
          item: [
            'text-(--b24ui-background-active)'
          ].join(' '),
          itemLeadingIcon: [
            'text-(--b24ui-background-active) group-data-[state=open]:text-(--b24ui-background-active)'
          ].join(' ')
        }
      },
      // region multiple.size -> h-auto ////
      {
        size: 'xss',
        multiple: true,
        class: { base: 'min-h-[20px] h-auto py-[2px] ps-[4px]' }
      },
      {
        size: 'xs',
        multiple: true,
        class: { base: 'min-h-[24px] h-auto py-[2px] ps-[4px]' }
      },
      {
        size: 'sm',
        multiple: true,
        class: { base: 'min-h-[28px] h-auto py-[4px] ps-[4px]' }
      },
      {
        size: 'md',
        multiple: true,
        class: { base: 'min-h-[34px] h-auto py-[4px] ps-[4px]' }
      },
      {
        size: 'lg',
        multiple: true,
        class: { base: 'min-h-[38px] h-auto py-[4px] ps-[4px]' }
      },
      {
        size: 'xl',
        multiple: true,
        class: { base: 'min-h-[46px] h-auto' }
      }
      // endregion ////
    ]
  }, input)
}
