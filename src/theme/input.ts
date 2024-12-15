/**
 * Input
 * An input element to enter text.
 * ---
 * @link /api_d7/bitrix/ui/forms/common.php
 * @link /api_d7/bitrix/ui/forms/icons.php
 * @link /api_d7/bitrix/ui/forms/fields_types.php
 * @see bitrix/js/ui/..
 */

/**
 * @todo add @see uri
 * @todo set disabled:opacity
 * @todo fix color
 * @todo remove color link
 * @todo remove animate-spin
 * @todo add tad
 * @todo add test color && rounded && etc
 * @todo test noSplit from buttonGroupVariantWithRoot
 * @todo add dark
 */
import { buttonGroupVariantWithRoot } from './button-group'

export default {
  slots: {
    root: 'relative inline-flex items-center',
    base: [
      'w-full border-0 placeholder:text-base-400 focus:outline-none',
      'disabled:cursor-not-allowed disabled:opacity-75',
      'transition-colors',
      'text-base-900 bg-white',
      'ring ring-inset ring-base-300'
    ],
    leading: 'absolute inset-y-0 start-0 flex items-center',
    leadingIcon: 'shrink-0 text-base-400',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailing: 'absolute inset-y-0 end-0 flex items-center',
    trailingIcon: 'shrink-0 text-base-400'
  },
  variants: {
    ...buttonGroupVariantWithRoot,
    size: {
      xs: {
        base: 'px-2 py-1 text-xs gap-1',
        leading: 'ps-2',
        trailing: 'pe-2',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4'
      },
      sm: {
        base: 'px-2.5 py-1.5 text-xs gap-1.5',
        leading: 'ps-2.5',
        trailing: 'pe-2.5',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4'
      },
      md: {
        base: 'px-2.5 py-1.5 text-sm gap-1.5',
        leading: 'ps-2.5',
        trailing: 'pe-2.5',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5'
      },
      lg: {
        base: 'px-3 py-2 text-sm gap-2',
        leading: 'ps-3',
        trailing: 'pe-3',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5'
      }
    },
    color: {
      default: '',
      danger: '',
      success: '',
      primary: '',
      secondary: '',
      ai: '',
      link: ''
    },
    rounded: {
      true: 'rounded-full',
      false: 'rounded-2xs'
    },
    leading: {
      true: ''
    },
    loading: {
      true: ''
    },
    highlight: {
      true: ''
    },
    type: {
      file: 'file:me-1.5 file:font-medium file:text-base-500 file:outline-none'
    }
  },
  compoundVariants: [
    // region default ////
    {
      color: 'default',
      class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-900'
    },
    {
      color: 'default',
      highlight: true,
      class: 'ring ring-inset ring-base-900'
    },
    // endregion ////
    // region danger ////
    {
      color: 'danger',
      class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500'
    },
    {
      color: 'danger',
      highlight: true,
      class: 'ring ring-inset ring-red-500'
    },
    // endregion ////
    // region success ////
    {
      color: 'success',
      class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-500'
    },
    {
      color: 'success',
      highlight: true,
      class: 'ring ring-inset ring-green-500'
    },
    // endregion ////
    // region warning ////
    {
      color: 'warning',
      class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500'
    },
    {
      color: 'warning',
      highlight: true,
      class: 'ring ring-inset ring-orange-500'
    },
    // endregion ////
    // region primary ////
    {
      color: 'primary',
      class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500'
    },
    {
      color: 'warning',
      highlight: true,
      class: 'ring ring-inset ring-blue-500'
    },
    // endregion ////
    // region secondary ////
    {
      color: 'secondary',
      class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-aqua'
    },
    {
      color: 'secondary',
      highlight: true,
      class: 'ring ring-inset ring-accent-aqua'
    },
    // endregion ////
    // region ai ////
    {
      color: 'ai',
      class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ai-500'
    },
    {
      color: 'ai',
      highlight: true,
      class: 'ring ring-inset ring-ai-500'
    },
    // endregion ////
    // region link ////
    {
      color: 'link',
      class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-900'
    },
    {
      color: 'link',
      highlight: true,
      class: 'ring ring-inset ring-base-900'
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
      class: 'ps-9'
    },
    {
      leading: true,
      size: 'lg',
      class: 'ps-10'
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
      class: 'pe-9'
    },
    {
      trailing: true,
      size: 'lg',
      class: 'pe-10'
    },
    // endregion ////
    // region loading ////
    {
      loading: true,
      leading: true,
      class: {
        leadingIcon: 'animate-spin'
      }
    },
    {
      loading: true,
      leading: false,
      trailing: true,
      class: {
        trailingIcon: 'animate-spin'
      }
    }
    // endregion ////
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary'
  }
}
