/**
 * Button
 * A button element that can act as a link or trigger an action.
 * ---
 * @link /api_d7/bitrix/ui/buttons/button.php
 * @see bitrix/js/ui/buttons/src/button/button-color.js
 * @see bitrix/js/ui/buttons/src/button/button-size.js
 */
import { buttonGroupVariant } from './button-group'

export default {
  slots: {
    base: [
      'cursor-pointer rounded-md font-medium inline-flex items-center focus:outline-hidden',
      'disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75',
      'transition-colors'
    ],
    label: 'truncate',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailingIcon: 'shrink-0'
  },
  /*
    custom: '',
    default: 'border text-white border-[#868d95] bg-[#868d95] active:text-white active:border-[#3b506e] active:bg-[#3b506e] hover:text-white hover:border-[#5b6573] hover:bg-[#5b6573] disabled:text-white disabled:border-[#868d95] disabled:bg-[#868d95] focus-visible:outline-[#868d95]',
    success: 'border text-base-900 border-[#bbed21] bg-[#bbed21] active:text-base-900 active:border-[#b2e232] active:bg-[#b2e232] hover:text-base-900 hover:border-[#d2f95f] hover:bg-[#d2f95f] disabled:border-[#bbed21] disabled:bg-[#bbed21] focus-visible:outline-[#bbed21]',
    successLight: 'border text-[#668d13] border-[#dfeeafcc] bg-[#dfeeafcc] active:text-[#668d13] active:border-[#d3e59a] active:bg-[#d3e59a] hover:text-[#668d13] hover:border-[#eaf5c5] hover:bg-[#eaf5c5] disabled:border-[#dfeeafcc] disabled:bg-[#dfeeafcc] focus-visible:outline-[#dfeeafcc]',
    danger: 'border text-white border-[#f1361a] bg-[#f1361a] active:text-white active:border-[#d24430] active:bg-[#d24430] hover:text-white hover:border-[#cc1c00] hover:bg-[#cc1c00] disabled:text-white disabled:border-[#f1361a] disabled:bg-[#f1361a] focus-visible:outline-[#f1361a]',
    dangerDark: 'border text-white border-[#a21429] bg-[#a21429] active:text-white active:border-[#851021] active:bg-[#851021] hover:text-white hover:border-[#c43d51] hover:bg-[#c43d51] disabled:text-white disabled:border-[#a21429] disabled:bg-[#a21429] focus-visible:outline-[#a21429]',
    dangerLight: 'border text-[#d7413c] border-[#fdcac8cc] bg-[#fdcac8cc] active:text-[#d7413c] active:border-[#f2b6b3] active:bg-[#f2b6b3] hover:text-[#d7413c] hover:border-[#ffdcdb] hover:bg-[#ffdcdb] disabled:text-[#d7413c] disabled:border-[#fdcac8cc] disabled:bg-[#fdcac8cc] focus-visible:outline-[#fdcac8cc]',
    primary: 'border text-white border-[#3bc8f5] bg-[#3bc8f5] active:text-white active:border-[#12b1e3] active:bg-[#12b1e3] hover:text-white hover:border-[#3eddff] hover:bg-[#3eddff] disabled:text-white disabled:border-[#3bc8f5] disabled:bg-[#3bc8f5] focus-visible:outline-[#3bc8f5]',
    primaryDark: 'border text-white border-[#399fc2] bg-[#399fc2] active:text-white active:border-[#328ba9] active:bg-[#328ba9] hover:text-white hover:border-[#37aed4] hover:bg-[#37aed4] disabled:text-white disabled:border-[#399fc2] disabled:bg-[#399fc2] focus-visible:outline-[#399fc2]',
    secondary: 'border text-base-900 border-[#aee0f2] bg-[#c5e7f4] active:text-base-900 active:border-[#aee0f2] active:bg-[#aee0f2] hover:text-base-900 hover:border-[#aee0f2] hover:bg-[#d1eef9] disabled:text-base-900 disabled:border-[#aee0f2] disabled:bg-[#c5e7f4] focus-visible:outline-[#c5e7f4]',
    link: 'px-0 border text-base-900 decoration-gray-900 bg-transparent border-transparent hover:text-[#80868e] focus-visible:outline-base-400',
    linkHelp: 'text-sm h-auto px-0 py-0 text-gray-700 font-normal rounded-none border border-x-0 border-t-0 border-dashed border-b-gray-700 hover:text-red-900 hover:border-b-red-900 focus-visible:outline-gray-700',
    light: 'text-base-900 bg-transparent active:text-base-solid active:border-[#d6f1fb] active:bg-[#d6f1fb] hover:text-base-master hover:border-[#f6f8f9] hover:bg-[#f6f8f9] disabled:text-base-master disabled:border-[#f6f8f9] disabled:bg-[#f6f8f9] focus-visible:outline-[#f6f8f9]',
    lightBorder: 'border text-base-900 border-[#c6cdd3] bg-transparent active:text-base-900 active:border-[#9fa4ab] active:bg-[#dde2e5] hover:text-base-900 hover:border-[#c6cdd3] hover:bg-[#cfd4d8] disabled:text-base-900 disabled:border-[#c6cdd3] disabled:bg-transparent focus-visible:outline-[#c6cdd3]',
  */
  variants: {
    ...buttonGroupVariant,
    color: {
      default: 'bg-base-500 dark:bg-base-900 dark:text-base-100',
      danger: 'bg-red-500 dark:bg-red-600 dark:text-red-250',
      success: 'bg-green-500 dark:bg-green-600 dark:text-green-250',
      warning: 'bg-orange-500 dark:bg-orange-600 dark:text-orange-250',
      primary: 'bg-blue-500 dark:bg-blue-600 dark:text-blue-250',
      secondary: 'bg-accent-aqua dark:bg-accent-turquoise',
      ai: 'bg-ai-500 dark:bg-ai-600 dark:text-ai-250',
      link: 'bg-base-900/85 text-white dark:bg-white/85 dark:text-base-900'
    },
    depth: {
      light: '',
      normal: '',
      dark: ''
    },
    size: {
      '2xs': {
        base: 'px-2 py-1 text-xs gap-1',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4'
      },
      'xs': {
        base: 'px-2 py-1 text-xs gap-1',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4'
      },
      'sm': {
        base: 'px-2.5 py-1.5 text-xs gap-1.5',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4'
      },
      'md': {
        base: 'px-2.5 py-1.5 text-sm gap-1.5',
        leadingIcon: 'size-10',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-10'
      },
      'lg': {
        base: 'px-3 py-2 text-sm gap-2',
        leadingIcon: 'size-15',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-15'
      },
      'xl': {
        base: 'px-3 py-2 text-sm gap-2',
        leadingIcon: 'size-15',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-15'
      }
    },
    block: {
      true: {
        base: 'w-full justify-center',
        leadingAvatarSize: 'xs',
        trailingIcon: 'ms-auto'
      }
    },
    square: {
      true: ''
    },
    leading: {
      true: ''
    },
    trailing: {
      true: ''
    },
    loading: {
      true: ''
    }
  },
  compoundVariants: [
    // region default ////
    {
      color: 'default',
      depth: 'light',
      class: ''
    },
    {
      color: 'default',
      depth: 'normal',
      class: ''
    },
    {
      color: 'default',
      depth: 'dark',
      class: ''
    },
    // endregion ////
    // region danger ////
    {
      color: 'danger',
      depth: 'light',
      class: ''
    },
    {
      color: 'danger',
      depth: 'normal',
      class: ''
    },
    {
      color: 'danger',
      depth: 'dark',
      class: ''
    },
    // endregion ////
    // region success ////
    {
      color: 'success',
      depth: 'light',
      class: ''
    },
    {
      color: 'success',
      depth: 'normal',
      class: ''
    },
    {
      color: 'success',
      depth: 'dark',
      class: ''
    },
    // endregion ////
    // region warning ////
    {
      color: 'warning',
      depth: 'light',
      class: ''
    },
    {
      color: 'warning',
      depth: 'normal',
      class: ''
    },
    {
      color: 'warning',
      depth: 'dark',
      class: ''
    },
    // endregion ////
    // region primary ////
    {
      color: 'primary',
      depth: 'light',
      class: ''
    },
    {
      color: 'primary',
      depth: 'normal',
      class: ''
    },
    {
      color: 'primary',
      depth: 'dark',
      class: ''
    },
    // endregion ////
    // region secondary ////
    {
      color: 'secondary',
      depth: 'light',
      class: ''
    },
    {
      color: 'secondary',
      depth: 'normal',
      class: ''
    },
    {
      color: 'secondary',
      depth: 'dark',
      class: ''
    },
    // endregion ////
    // region ai ////
    {
      color: 'ai',
      depth: 'light',
      class: ''
    },
    {
      color: 'ai',
      depth: 'normal',
      class: ''
    },
    {
      color: 'ai',
      depth: 'dark',
      class: ''
    },
    // endregion ////
    // region link ////
    {
      color: 'link',
      depth: 'light',
      class: ''
    },
    {
      color: 'link',
      depth: 'normal',
      class: ''
    },
    {
      color: 'link',
      depth: 'dark',
      class: ''
    },
    // endregion ////
    // region size && square ////
    {
      size: '2xs',
      square: true,
      class: 'p-0.5'
    },
    {
      size: 'xs',
      square: true,
      class: 'p-1'
    },
    {
      size: 'sm',
      square: true,
      class: 'p-1.5'
    },
    {
      size: 'md',
      square: true,
      class: 'p-1.5'
    },
    {
      size: 'lg',
      square: true,
      class: 'p-2'
    },
    {
      size: 'xl',
      square: true,
      class: 'p-2'
    },
    // endregion ////
    // region loading | leading ////
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
    color: 'default',
    depth: 'normal'
  }
}
