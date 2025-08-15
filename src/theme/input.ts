/**
 * Input
 * An input element to enter text.
 * ---
 * @link /api_d7/bitrix/ui/forms/common.php
 * @link /api_d7/bitrix/ui/forms/icons.php
 * @link /api_d7/bitrix/ui/forms/fields_types.php
 * @see src/theme/input-number.ts
 * @see bitrix/js/ui/..
 * @todo fix docs
 */

import { buttonGroupVariantWithRoot } from './button-group'

export default {
  slots: {
    root: 'isolate relative inline-flex items-center w-full',
    base: [
      'px-3',
      'w-full py-0 border-0 focus:outline-none',
      'disabled:cursor-not-allowed',
      'disabled:pointer-events-none',
      'disabled:opacity-30',
      'disabled:resize-none',
      'appearance-none transition duration-300 ease-linear', // transition-colors
      'ring ring-inset',
      'ring-(--ui-color-design-outline-stroke)',
      'text-(--ui-color-base-1)',
      'style-blurred-bg-input',
      'placeholder:text-(--ui-color-design-plain-na-content-secondary)',
      'hover:text-(--ui-color-base-1)',
      'focus:text-(--ui-color-base-1)',
      'active:text-(--ui-color-base-1)',
      'font-[family-name:var(--ui-font-family-primary)] font-(--ui-font-weight-regular)',
      'align-middle',
      'text-ellipsis whitespace-nowrap',
      'focus-visible:ring-1',
      'focus-visible:ring-inset',
      'focus-visible:ring-(--b24ui-border-color)'
    ].join(' '),
    leading: 'absolute inset-y-0 start-0 flex items-center',
    leadingIcon: [
      'shrink-0',
      'text-(--b24ui-icon-color)'
    ].join(' '),
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailing: 'absolute inset-y-0 end-0 flex items-center',
    trailingIcon: [
      'shrink-0',
      'text-(--b24ui-icon-color)'
    ].join(' '),
    tag: [
      'pointer-events-none select-none',
      'absolute',
      'z-10',
      '-top-[6px] right-[12px]',
      'flex flex-col justify-center items-center',
    ].join(' ')
  },
  variants: {
    ...buttonGroupVariantWithRoot,
    size: {
      xss: {
        base: 'h-[20px] gap-1 text-(length:--ui-font-size-4xs)/[normal]',
        leading: 'px-1',
        trailing: 'px-1',
        leadingIcon: 'size-[12px]',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-[12px]'
      },
      xs: {
        base: 'h-[24px] gap-1 text-(length:--ui-font-size-xs)/[normal]',
        leading: 'px-1',
        trailing: 'px-1',
        leadingIcon: 'size-[14px]',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-[14px]'
      },
      sm: {
        base: 'h-[28px] gap-1.5 text-(length:--ui-font-size-sm)/[normal]',
        leading: 'px-1.5',
        trailing: 'px-1.5',
        leadingIcon: 'size-[16px]',
        leadingAvatar: 'size-[16px]',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-[16px]'
      },
      md: {
        base: 'h-[34px] gap-1.5 text-(length:--ui-font-size-lg)/[normal]',
        leading: 'px-2',
        trailing: 'px-2',
        leadingIcon: 'size-[18px]',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-[18px]'
      },
      lg: {
        base: 'h-[38px] gap-2 text-(length:--ui-font-size-lg)/[normal]',
        leading: 'px-2',
        trailing: 'px-2',
        leadingIcon: 'size-[22px]',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-[22px]'
      },
      xl: {
        base: 'h-[46px] gap-2 text-(length:--ui-font-size-2xl)/[normal]',
        leading: 'px-2',
        trailing: 'px-2',
        leadingIcon: 'size-[22px]',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-[22px]'
      }
    },
    color: {
      'air-primary': { base: 'style-filled' },
      'air-primary-success': { base: 'style-filled-success' },
      'air-primary-alert': { base: 'style-filled-alert' },
      'air-primary-copilot': { base: 'style-filled-copilot' },
      'air-primary-warning': { base: 'style-filled-warning' },
      // @deprecate ////
      'default': { base: 'style-old-default' },
      'danger': { base: 'style-old-danger' },
      'success': { base: 'style-old-success' },
      'warning': { base: 'style-old-warning' },
      'primary': { base: 'style-old-primary' },
      'secondary': { base: 'style-old-secondary' },
      'collab': { base: 'style-old-collab' },
      'ai': { base: 'style-old-ai' }
    },
    // color: {
    //   default: '',
    //   danger: '',
    //   success: '',
    //   warning: '',
    //   primary: '',
    //   secondary: '',
    //   collab: '',
    //   ai: ''
    // },
    /**
     * @memo now get from Badge
     */
    // tagColor: {},
    rounded: {
      true: 'rounded-(--ui-border-radius-3xl)',
      false: 'rounded-(--ui-border-radius-sm)'
    },
    noPadding: { true: { base: 'px-0' } },
    noBorder: { true: 'ring-0 focus-visible:ring-0 style-transparent-bg' },
    underline: {
      true: [
        'ring-0 focus-visible:ring-0 style-transparent-bg',
        'border-b-1',
        'border-b-(--ui-color-design-outline-stroke)',
        'rounded-none'
      ].join(' ')
    },
    leading: { true: '' },
    trailing: { true: '' },
    loading: { true: '' },
    highlight: { true: 'ring ring-inset ring-(--b24ui-border-color)' },
    type: {
      file: [
        'file:me-1.5',
        'file:text-(--ui-color-design-plain-na-content-secondary)',
        'file:outline-none'
      ]
    }
  },
  compoundVariants: [
    // region ring for focus and highlight ////
    // region default ////
    {
      noBorder: false,
      underline: false,
      class: ''
    },
    {
      highlight: true,
      noBorder: false,
      underline: false,
      class: 'ring ring-inset ring-(--b24ui-border-color)'
    },
    {
      noBorder: false,
      underline: true,
      class: 'focus-visible:border-(--b24ui-border-color)'
    },
    {
      highlight: true,
      noBorder: false,
      underline: true,
      class: 'border-b-(--b24ui-border-color)'
    },
    // endregion ////
    // endregion ////
    // region type file ////
    {
      type: 'file',
      size: 'xss',
      class: 'py-[2px]'
    },
    {
      type: 'file',
      size: 'xs',
      class: 'py-[4px]'
    },
    {
      type: 'file',
      size: 'sm',
      class: 'py-[5px]'
    },
    {
      type: 'file',
      size: 'md',
      class: 'py-[7px]'
    },
    {
      type: 'file',
      size: 'lg',
      class: 'py-[9px]'
    },
    {
      type: 'file',
      size: 'xl',
      class: 'py-[11px]'
    },
    // endregion ////
    // region leading ////
    {
      leading: true,
      noPadding: false,
      size: 'xss',
      class: 'ps-[20px]'
    },
    {
      leading: true,
      noPadding: false,
      size: 'xs',
      class: 'ps-[22px]'
    },
    {
      leading: true,
      noPadding: false,
      size: 'sm',
      class: 'ps-[28px]'
    },
    {
      leading: true,
      noPadding: false,
      size: 'md',
      class: 'ps-[34px]'
    },
    {
      leading: true,
      noPadding: false,
      size: 'lg',
      class: 'ps-[38px]'
    },
    {
      leading: true,
      noPadding: false,
      size: 'xl',
      class: 'ps-[38px]'
    },
    // endregion ////
    // region trailing ////
    {
      trailing: true,
      noPadding: false,
      size: 'xss',
      class: 'pe-[20px]'
    },
    {
      trailing: true,
      noPadding: false,
      size: 'xs',
      class: 'pe-[22px]'
    },
    {
      trailing: true,
      noPadding: false,
      size: 'sm',
      class: 'pe-[28px]'
    },
    {
      trailing: true,
      noPadding: false,
      size: 'md',
      class: 'pe-[34px]'
    },
    {
      trailing: true,
      noPadding: false,
      size: 'lg',
      class: 'pe-[38px]'
    },
    {
      trailing: true,
      noPadding: false,
      size: 'xl',
      class: 'pe-[38px]'
    },
    // endregion ////
    // region loading ////
    {
      loading: true,
      leading: true,
      class: {
        leadingIcon: 'size-[21px]'
      }
    },
    {
      loading: true,
      leading: false,
      trailing: true,
      class: {
        trailingIcon: 'size-[21px]'
      }
    }
    // endregion ////
  ],
  defaultVariants: {
    color: 'air-primary',
    size: 'md'
  }
}
