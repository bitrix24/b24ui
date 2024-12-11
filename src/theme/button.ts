/**
 * Button
 * A button element that can act as a link or trigger an action.
 * ---
 * @link /api_d7/bitrix/ui/buttons/button.php
 * @see bitrix/js/ui/buttons/src/button/button-color.js
 * @see bitrix/js/ui/buttons/src/button/button-size.js
 */

/**
 * @todo add linkHelp: 'text-sm h-auto py-0 text-gray-700 font-normal rounded-none border border-x-0 border-t-0 border-dashed border-b-gray-700 hover:text-red-900 hover:border-b-red-900 focus-visible:outline-gray-700',
 */
import { buttonGroupVariant } from './button-group'

export default {
  slots: {
    base: [
      'select-none cursor-pointer rounded-2xs',
      'inline-flex items-center focus:outline-hidden',
      'disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-40 aria-disabled:opacity-40',
      'transition duration-150 ease-linear' // transition-colors
    ],
    label: 'truncate',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailingIcon: 'shrink-0'
  },
  variants: {
    ...buttonGroupVariant,
    color: {
      // DEFAULT ////
      default: [
        'text-white bg-[#868d95]',
        'hover:bg-[#5b6573]',
        'active:bg-[#3b506e]',
        'disabled:bg-[#868d95] aria-disabled:bg-[#868d95]',
        'focus-visible:outline-[#868d95]'
      ].join(' '),
      danger: [
        'text-white bg-[#f1361a]',
        'hover:bg-[#cc1c00]',
        'active:bg-[#d24430]',
        'disabled:bg-[#f1361a] aria-disabled:bg-[#f1361a]',
        'focus-visible:outline-[#f1361a]'
      ].join(' '),
      // SUCCESS ////
      success: [
        'text-base-900 bg-[#bbed21]',
        'hover:bg-[#d2f95f]',
        'active:bg-[#b2e232]',
        'disabled:bg-[#bbed21] aria-disabled:bg-[#bbed21]',
        'focus-visible:outline-[#bbed21]'
      ].join(' '),
      // new WARNING ////
      warning: [
        'text-[#a07f27] bg-[#edda7b]',
        'hover:bg-orange-500',
        'active:bg-[#eba51c]',
        'disabled:bg-[#edda7b] aria-disabled:bg-[#edda7b]',
        'focus-visible:outline-[#edda7b]'
      ].join(' '),
      // PRIMARY ////
      primary: [
        'text-white bg-[#3bc8f5]',
        'hover:bg-[#3eddff]',
        'active:bg-[#12b1e3]',
        'disabled:bg-[#3bc8f5] aria-disabled:bg-[#3bc8f5]',
        'focus-visible:outline-[#3bc8f5]'
      ].join(' '),
      // SECONDARY ////
      secondary: [
        'text-base-900 bg-[#c5e7f4]',
        'hover:bg-[#d1eef9]',
        'active:bg-[#aee0f2]',
        'disabled:bg-[#c5e7f4] aria-disabled:bg-[#c5e7f4]',
        'focus-visible:outline-[#c5e7f4]'
      ].join(' '),
      // AI ////
      ai: [
        'text-white bg-[#935BEC]',
        'hover:bg-[#A977FA]',
        'active:bg-[#8447E4]',
        'disabled:bg-[#935BEC] aria-disabled:bg-[#935BEC]',
        'focus-visible:outline-[#935BEC]'
      ].join(' '),
      // LINK ////
      link: [
        'no-underline decoration-solid decoration-auto',
        'text-base-900 decoration-gray-900 bg-transparent',
        'hover:text-[#80868e]',
        'active:text-base-900',
        'disabled:text-base-900 aria-disabled:text-base-900',
        'focus-visible:outline-base-400'
      ].join(' ')
    },
    depth: {
      light: '',
      normal: '',
      dark: ''
    },
    size: {
      '2xs': {
        base: 'h-lg2 px-3.5 text-4xs leading-none gap-1',
        leadingIcon: 'size-lg2', // 22px
        leadingAvatarSize: '3xs', // size-4
        trailingIcon: 'size-lg'
      },
      'xs': {
        base: 'h-xl2 px-4 text-3xs leading-none gap-1',
        leadingIcon: 'size-xl2', // 26px
        leadingAvatarSize: '3xs', // size-4
        trailingIcon: 'size-xl2'
      },
      'sm': {
        base: 'h-3xl px-[18px] text-xs leading-none gap-1.5',
        leadingIcon: 'size-3xl', // 32px
        leadingAvatarSize: '3xs', // size-4
        trailingIcon: 'size-3xl'
      },
      'md': {
        base: 'h-5xl px-5 text-xs leading-none gap-1.5',
        leadingIcon: 'size-5xl', // 40px
        leadingAvatarSize: '2xs', // size-5
        trailingIcon: 'size-5xl'
      },
      'lg': {
        base: 'h-6xl px-[28px] text-xs leading-none gap-2',
        leadingIcon: 'size-6xl', // ? 48px
        leadingAvatarSize: '2xs', // size-5
        trailingIcon: 'size-6xl'
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
    },
    normalCase: {
      true: 'font-semibold normal-case',
      false: 'font-bold uppercase'
    }
  },
  compoundVariants: [
    // region default ////
    {
      // BASE_LIGHT ////
      color: 'default',
      depth: 'light',
      class: [
        'text-base-800 bg-base-200 border border-base-200',
        'hover:bg-[#cfd4d8] hover:border-[#c6cdd3]',
        'active:bg-[#dde2e5] active:border-[#9fa4ab]',
        'disabled:bg-[base-200] aria-disabled:bg-[base-200] disabled:border-[base-200] aria-disabled:border-base-200',
        'focus-visible:outline-[base-200]'
      ].join(' ')
    },
    {
      // new BASE_DARK ////
      color: 'default',
      depth: 'dark',
      class: [
        'text-white bg-base-900',
        'hover:bg-base-black',
        'active:bg-base-dark',
        'disabled:bg-[base-900] aria-disabled:bg-[base-900]',
        'focus-visible:outline-[base-900]'
      ].join(' ')
    },
    // endregion ////
    // region danger ////
    {
      // DANGER_LIGHT ////
      color: 'danger',
      depth: 'light',
      class: [
        'text-[#d7413c] bg-[#fdcac8]/80',
        'hover:bg-[#ffdcdb]',
        'active:bg-[#f2b6b3]',
        'disabled:bg-[#fdcac8]/80 aria-disabled:bg-[#fdcac8]/80',
        'focus-visible:outline-[#fdcac8]/80'
      ].join(' ')
    },
    {
      // DANGER_DARK ////
      color: 'danger',
      depth: 'dark',
      class: [
        'text-white bg-[#a21429]',
        'hover:bg-[#c43d51]',
        'active:bg-[#851021]',
        'disabled:bg-[#a21429] aria-disabled:bg-[#a21429]',
        'focus-visible:outline-[#a21429]'
      ].join(' ')
    },
    // endregion ////
    // region success ////
    {
      // SUCCESS_LIGHT ////
      color: 'success',
      depth: 'light',
      class: [
        'text-[#668d13] bg-[#dfeeaf]/80',
        'hover:bg-[#eaf5c5]',
        'active:bg-[#d3e59a]',
        'disabled:bg-[#dfeeaf]/80 aria-disabled:bg-[#dfeeaf]/80',
        'focus-visible:outline-[#dfeeaf]/80'
      ].join(' ')
    },
    {
      // SUCCESS_DARK ////
      color: 'success',
      depth: 'dark',
      class: [
        'text-white bg-[#86a732]',
        'hover:bg-[#a2bf54]',
        'active:bg-[#a2bf54]',
        'disabled:bg-[#86a732] aria-disabled:bg-[#86a732]',
        'focus-visible:outline-[#86a732]'
      ].join(' ')
    },
    // endregion ////
    // region warning ////
    {
      // WARNING_LIGHT ////
      color: 'warning',
      depth: 'light',
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
      // PRIMARY_DARK ////
      color: 'primary',
      depth: 'dark',
      class: [
        'text-white bg-[#399fc2]',
        'hover:bg-[#37aed4]',
        'active:bg-[#328ba9]',
        'disabled:bg-[#399fc2] aria-disabled:bg-[#399fc2]',
        'focus-visible:outline-[#399fc2]'
      ].join(' ')
    },
    // endregion ////
    // region secondary ////
    {
      // SECONDARY_LIGHT ////
      color: 'secondary',
      depth: 'light',
      class: [
        'text-white bg-[#b6edff]/80',
        'hover:bg-[#d1eef9]',
        'active:bg-[#aee0f2]',
        'disabled:bg-[#b6edff]/80 aria-disabled:bg-[#b6edff]/80',
        'focus-visible:outline-[#b6edff]/80'
      ].join(' ')
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
      depth: 'dark',
      class: ''
    },
    // endregion ////
    // region link ////
    {
      // LIGHT ////
      color: 'link',
      depth: 'light',
      class: [
        'px-1.5',
        'text-base-900 bg-transparent',
        'hover:text-base-master hover:bg-[#f6f8f9]',
        'active:text-base-solid active:bg-[#d6f1fb]',
        'disabled:text-base-master disabled:bg-[#f6f8f9] aria-disabled:bg-[#f6f8f9]',
        'focus-visible:outline-[#f6f8f9]'
      ].join(' ')
    },
    // LIGHT_BORDER ////
    {
      color: 'link',
      depth: 'dark',
      class: [
        '',
        'border',
        'text-base-900 bg-transparent border-[#c6cdd3]',
        'hover:bg-[#cfd4d8] hover:border-[#c6cdd3]',
        'active:bg-[#dde2e5] active:border-[#9fa4ab]',
        'disabled:bg-transparent disabled:border-[#c6cdd3] aria-disabled:bg-transparent aria-disabled:border-[#c6cdd3]',
        'focus-visible:outline-[#c6cdd3]'
      ].join(' ')
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
    },
    // endregion ////
    // region noCaps ////
    {
      normalCase: true,
      size: ['2xs', 'xs'],
      class: 'text-xs'
    },
    {
      normalCase: true,
      size: 'sm',
      class: 'text-sm'
    },
    {
      normalCase: true,
      size: ['md', 'lg'],
      class: 'text-md'
    }
    // endregion ////
  ],
  defaultVariants: {
    size: 'md',
    color: 'default',
    depth: 'normal'
  }
}
