/**
 * Input
 * An input element to enter text.
 * ---
 * @link /api_d7/bitrix/ui/forms/common.php
 * @link /api_d7/bitrix/ui/forms/icons.php
 * @link /api_d7/bitrix/ui/forms/fields_types.php
 * @see bitrix/js/ui/..
 */

import { buttonGroupVariantWithRoot } from './button-group'

export default {
  slots: {
    root: 'relative inline-flex items-center w-full',
    base: [
      'w-full py-0 border-0 focus:outline-none',
      'disabled:cursor-not-allowed disabled:bg-base-30/37 disabled:resize-none disabled:text-base-500',
      'dark:disabled:bg-base-900/37 dark:disabled:text-base-800',
      'appearance-none transition duration-300 ease-linear', // transition-colors
      'ring ring-inset ring-base-300',
      'dark:ring-base-800',
      'text-black bg-white placeholder:text-base-400 hover:text-base-900 focus:text-base-900 active:text-base-900',
      'dark:text-base-300 dark:bg-transparent dark:placeholder:text-base-300 dark:hover:text-base-350 dark:focus:text-base-350 dark:active:text-base-350',
      'font-b24-primary font-regular text-md leading-none',
      'align-middle',
      'text-ellipsis whitespace-nowrap'
    ],
    leading: 'absolute inset-y-0 start-0 flex items-center',
    leadingIcon: 'shrink-0 text-base-400',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailing: 'absolute inset-y-0 end-0 flex items-center',
    trailingIcon: 'shrink-0 text-base-400',
    tag: [
      'pointer-events-none select-none',
      'absolute z-10 -top-1.5 right-3 h-sm px-1.5 flex flex-col justify-center items-center',
      'font-b24-primary font-bold text-6xs leading-none uppercase rounded-full'
    ]
  },
  variants: {
    ...buttonGroupVariantWithRoot,
    size: {
      xs: {
        base: 'px-3 h-xl2 gap-1', // 26px
        leading: 'px-1',
        trailing: 'px-1',
        leadingIcon: 'size-lg2',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-lg2'
      },
      sm: {
        base: 'px-3 h-8 gap-1.5', // 32px
        leading: 'px-1.5',
        trailing: 'px-1.5',
        leadingIcon: 'size-lg2',
        leadingAvatarSize: 'xs',
        trailingIcon: 'size-lg2'
      },
      md: {
        base: 'px-3 h-10 gap-1.5', // 40px
        leading: 'px-2',
        trailing: 'px-2',
        leadingIcon: 'size-[24px]',
        leadingAvatarSize: 'sm',
        trailingIcon: 'size-[24px]'
      },
      lg: {
        base: 'px-3 h-12 gap-2', // 48px
        leading: 'px-2',
        trailing: 'px-2',
        leadingIcon: 'size-[24px]',
        leadingAvatarSize: 'md',
        trailingIcon: 'size-[24px]'
      }
    },
    color: {
      default: '',
      danger: '',
      success: '',
      warning: '',
      primary: '',
      secondary: '',
      ai: ''
    },
    tagColor: {
      default: {
        tag: 'text-white bg-base-900 dark:text-base-100 dark:bg-base-900'
      },
      danger: {
        tag: 'text-white bg-red-500 dark:text-red-250 dark:bg-red-600'
      },
      success: {
        tag: 'text-white bg-green-500 dark:text-green-250 dark:bg-green-600'
      },
      warning: {
        tag: 'text-white bg-orange-500 dark:text-orange-250 dark:bg-orange-600'
      },
      primary: {
        tag: 'text-white bg-blue-500 dark:text-blue-250 dark:bg-blue-600'
      },
      secondary: {
        tag: 'text-white bg-accent-aqua dark:text-base-100 dark:bg-accent-turquoise'
      },
      ai: {
        tag: 'text-white bg-ai-500 dark:text-ai-200 dark:bg-ai-800'
      }
    },
    rounded: {
      true: 'rounded-3xl',
      false: 'rounded-2xs'
    },
    noPadding: {
      true: {
        base: 'px-0'
      }
    },
    noBorder: {
      true: 'ring-0 focus-visible:ring-0'
    },
    underline: {
      true: 'ring-0 focus-visible:ring-0 border-b border-b-base-300 rounded-none'
    },
    leading: {
      true: ''
    },
    trailing: {
      true: ''
    },
    loading: {
      true: ''
    },
    highlight: {
      true: ''
    },
    type: {
      file: 'file:me-1.5 file:text-base-500 file:outline-none'
    }
  },
  compoundVariants: [
    // region ring for focus and highlight ////
    // region default ////
    {
      color: 'default',
      noBorder: false,
      underline: false,
      class: 'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-base-900 dark:focus-visible:ring-base-350'
    },
    {
      color: 'default',
      highlight: true,
      noBorder: false,
      underline: false,
      class: 'ring ring-inset ring-base-900 dark:ring-base-350'
    },
    {
      color: 'default',
      noBorder: false,
      underline: true,
      class: 'focus-visible:border-base-900 dark:focus-visible:border-b-base-350'
    },
    {
      color: 'default',
      highlight: true,
      noBorder: false,
      underline: true,
      class: 'border-b-base-900 dark:border-b-base-350'
    },
    // endregion ////
    // region danger ////
    {
      color: 'danger',
      noBorder: false,
      underline: false,
      class: 'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-red-500 dark:focus-visible:ring-red-600'
    },
    {
      color: 'danger',
      highlight: true,
      noBorder: false,
      underline: false,
      class: 'ring ring-inset ring-red-500 dark:ring-red-600'
    },
    {
      color: 'danger',
      noBorder: false,
      underline: true,
      class: 'focus-visible:border-b-red-500 dark:focus-visible:border-b-red-600'
    },
    {
      color: 'danger',
      highlight: true,
      noBorder: false,
      underline: true,
      class: 'border-b-red-500 dark:border-b-red-600'
    },
    // endregion ////
    // region success ////
    {
      color: 'success',
      noBorder: false,
      underline: false,
      class: 'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-green-500 dark:focus-visible:ring-green-600'
    },
    {
      color: 'success',
      highlight: true,
      noBorder: false,
      underline: false,
      class: 'ring ring-inset ring-green-500 dark:ring-green-600'
    },
    {
      color: 'success',
      noBorder: false,
      underline: true,
      class: 'focus-visible:border-b-green-500 dark:focus-visible:border-b-green-600'
    },
    {
      color: 'success',
      highlight: true,
      noBorder: false,
      underline: true,
      class: 'border-b-green-500 dark:border-b-green-600'
    },
    // endregion ////
    // region warning ////
    {
      color: 'warning',
      noBorder: false,
      underline: false,
      class: 'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-orange-500 dark:focus-visible:ring-orange-600'
    },
    {
      color: 'warning',
      highlight: true,
      noBorder: false,
      underline: false,
      class: 'ring ring-inset ring-orange-500 dark:ring-orange-600'
    },
    {
      color: 'warning',
      noBorder: false,
      underline: true,
      class: 'focus-visible:border-b-orange-500 dark:focus-visible:border-b-orange-600'
    },
    {
      color: 'warning',
      highlight: true,
      noBorder: false,
      underline: true,
      class: 'border-b-orange-500 dark:border-b-orange-600'
    },
    // endregion ////
    // region primary ////
    {
      color: 'primary',
      noBorder: false,
      underline: false,
      class: 'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-blue-500 dark:focus-visible:ring-blue-600'
    },
    {
      color: 'primary',
      highlight: true,
      noBorder: false,
      underline: false,
      class: 'ring ring-inset ring-blue-500 dark:ring-blue-600'
    },
    {
      color: 'primary',
      noBorder: false,
      underline: true,
      class: 'focus-visible:border-b-blue-500 dark:focus-visible:border-b-blue-600'
    },
    {
      color: 'primary',
      highlight: true,
      noBorder: false,
      underline: true,
      class: 'border-b-blue-500 dark:border-b-blue-600'
    },
    // endregion ////
    // region secondary ////
    {
      color: 'secondary',
      noBorder: false,
      underline: false,
      class: 'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent-aqua dark:focus-visible:ring-accent-turquoise'
    },
    {
      color: 'secondary',
      highlight: true,
      noBorder: false,
      underline: false,
      class: 'ring ring-inset ring-accent-aqua dark:ring-accent-turquoise'
    },
    {
      color: 'secondary',
      noBorder: false,
      underline: true,
      class: 'focus-visible:border-b-accent-aqua dark:focus-visible:border-b-accent-turquoise'
    },
    {
      color: 'secondary',
      highlight: true,
      noBorder: false,
      underline: true,
      class: 'border-b-accent-aqua dark:border-b-accent-turquoise'
    },
    // endregion ////
    // region ai ////
    {
      color: 'ai',
      noBorder: false,
      underline: false,
      class: 'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ai-500 dark:focus-visible:ring-ai-600'
    },
    {
      color: 'ai',
      highlight: true,
      noBorder: false,
      underline: false,
      class: 'ring ring-inset ring-ai-500 dark:ring-ai-600'
    },
    {
      color: 'ai',
      noBorder: false,
      underline: true,
      class: 'focus-visible:border-b-ai-500 dark:focus-visible:border-b-ai-600'
    },
    {
      color: 'ai',
      highlight: true,
      noBorder: false,
      underline: true,
      class: 'border-b-ai-500 dark:border-b-ai-600'
    },
    // endregion ////
    // endregion ////
    // region type file ////
    {
      type: 'file',
      size: 'xs',
      class: 'py-1.5'
    },
    {
      type: 'file',
      size: 'sm',
      class: 'py-2.5'
    },
    {
      type: 'file',
      size: 'md',
      class: 'py-3'
    },
    {
      type: 'file',
      size: 'lg',
      class: 'py-4'
    },
    // endregion ////
    // region leading ////
    {
      leading: true,
      size: 'xs',
      class: 'ps-7'
    },
    {
      leading: true,
      size: 'sm',
      class: 'ps-8'
    },
    {
      leading: true,
      size: 'md',
      class: 'ps-[39px]'
    },
    {
      leading: true,
      size: 'lg',
      class: 'ps-[42px]'
    },
    // endregion ////
    // region trailing ////
    {
      trailing: true,
      size: 'xs',
      class: 'pe-7'
    },
    {
      trailing: true,
      size: 'sm',
      class: 'pe-8'
    },
    {
      trailing: true,
      size: 'md',
      class: 'pe-[39px]'
    },
    {
      trailing: true,
      size: 'lg',
      class: 'pe-[39px]'
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
    size: 'md',
    color: 'primary',
    tagColor: 'primary'
  }
}
