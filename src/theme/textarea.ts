/**
 * Textarea
 * A textarea element to input multi-line text.
 *
 * @memo this symlink to `src/theme/input.ts`
 * @memo not use size - this input::size=xs
 * ---
 * @link /api_d7/bitrix/ui/forms/fields_types.php
 */

import { buttonGroupVariantWithRoot } from './button-group'

export default {
  slots: {
    root: 'isolate relative inline-flex items-center w-full',
    base: [
      'px-3',
      'w-full pt-[7px] pb-[8px] border-0 focus:outline-none',
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
      'text-(length:--ui-font-size-lg)/[normal]',
      'align-middle',
      'focus-visible:ring-1',
      'focus-visible:ring-inset',
      'focus-visible:ring-(--b24ui-border-color)'
    ].join(' '),
    leading: 'absolute inset-y-[7px] start-0 flex items-start px-[8px]',
    leadingIcon: [
      'shrink-0',
      'size-[18px]',
      'text-(--b24ui-icon-color)'
    ].join(' '),
    leadingAvatar: 'shrink-0 size-[20px]',
    leadingAvatarSize: '2xs',
    trailing: 'absolute inset-y-[8px] end-0 flex items-start px-[6px]',
    trailingIcon: [
      'shrink-0',
      'size-[18px]',
      'text-(--b24ui-icon-color)'
    ].join(' '),
    tag: [
      'pointer-events-none select-none',
      'absolute',
      'z-10',
      '-top-[6px]',
      'right-[12px]'
    ].join(' ')
  },
  variants: {
    ...buttonGroupVariantWithRoot,
    autoresize: { true: { base: 'resize-none' } },
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
    highlight: { true: 'ring ring-inset ring-(--b24ui-border-color)' }
  },
  compoundVariants: [
    // region ring for focus and highlight ////
    // region color ////
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
    // region leading ////
    {
      leading: true,
      noPadding: false,
      class: 'ps-[34px]'
    },
    // endregion ////
    // region trailing ////
    {
      trailing: true,
      noPadding: false,
      class: 'pe-[34px]'
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
    color: 'air-primary'
  }
}
