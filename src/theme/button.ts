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
 * @todo add dark
 */
import { buttonGroupVariant } from './button-group'

export default {
  slots: {
    base: [
      'select-none cursor-pointer inline-flex items-center',
      'relative focus:outline-hidden',
      'disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:opacity-50',
      'transition duration-150 ease-linear' // transition-colors
    ],
    baseLine: [
      'inline-flex items-center'
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
        'text-white bg-[#868d95] border border-[#868d95]',
        'hover:bg-[#5b6573] hover:border-[#5b6573]',
        'active:bg-[#3b506e] active:border-[#3b506e]',
        'disabled:bg-[#868d95] aria-disabled:bg-[#868d95] disabled:border-[#868d95] aria-disabled:border-[#868d95]',
        'focus-visible:outline-[#868d95]'
      ].join(' '),
      danger: [
        'text-white bg-[#f1361a] border border-[#f1361a]',
        'hover:bg-[#cc1c00] hover:border-[#cc1c00]',
        'active:bg-[#d24430] active:border-[#d24430]',
        'disabled:bg-[#f1361a] aria-disabled:bg-[#f1361a] disabled:border-[#f1361a] aria-disabled:border-[#f1361a]',
        'focus-visible:outline-[#f1361a]'
      ].join(' '),
      // SUCCESS ////
      success: [
        'text-base-900 bg-[#bbed21] border border-[#bbed21]',
        'hover:bg-[#d2f95f] hover:border-[#d2f95f]',
        'active:bg-[#b2e232] active:border-[#b2e232]',
        'disabled:bg-[#bbed21] aria-disabled:bg-[#bbed21] disabled:border-[#bbed21] aria-disabled:border-[#bbed21]',
        'focus-visible:outline-[#bbed21]'
      ].join(' '),
      // new WARNING ////
      warning: [
        'text-white bg-orange-500 border border-orange-500',
        'hover:bg-orange-500/75 hover:border-orange-500/75',
        'active:bg-orange-500/85 active:border-orange-500/85',
        'disabled:bg-orange-500 aria-disabled:bg-orange-500 disabled:border-bg-orange-500 aria-disabled:border-bg-orange-500',
        'focus-visible:outline-orange-500'
      ].join(' '),
      // PRIMARY ////
      primary: [
        'text-white bg-[#3bc8f5] border border-[#3bc8f5]',
        'hover:bg-[#3eddff] hover:border-[#3eddff]',
        'active:bg-[#12b1e3] active:border-[#12b1e3]',
        'disabled:bg-[#3bc8f5] aria-disabled:bg-[#3bc8f5] disabled:border-[#3bc8f5] aria-disabled:border-[#3bc8f5]',
        'focus-visible:outline-[#3bc8f5]'
      ].join(' '),
      // SECONDARY ////
      secondary: [
        'text-base-900 bg-[#c5e7f4] border border-[#aee0f2]',
        'hover:bg-[#d1eef9] hover:border-[#aee0f2]',
        'active:bg-[#aee0f2] active:border-[#aee0f2]',
        'disabled:bg-[#c5e7f4] aria-disabled:bg-[#c5e7f4] disabled:border-[#aee0f2] aria-disabled:border-[#aee0f2]',
        'focus-visible:outline-[#c5e7f4]'
      ].join(' '),
      // AI ////
      ai: [
        'text-white bg-[#935BEC] border border-[#935BEC]',
        'hover:bg-[#A977FA] hover:border-[#A977FA]',
        'active:bg-[#8447E4] active:border-[#8447E4]',
        'disabled:bg-[#935BEC] aria-disabled:bg-[#935BEC] disabled:border-[#935BEC] aria-disabled:border-[#935BEC]',
        'focus-visible:outline-[#935BEC]'
      ].join(' '),
      // LINK ////
      link: [
        'no-underline decoration-solid decoration-auto',
        'text-base-900 decoration-gray-900 bg-transparent border border-transparent',
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
        base: 'h-lg2 min-w-lg2 ps-3.5 pe-3.5 text-4xs leading-none', // 22px
        baseLine: 'gap-1',
        leadingIcon: 'size-3.5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-sm'
      },
      'xs': {
        base: 'h-xl2 min-w-xl2 ps-4 pe-4 text-3xs leading-none', // 26px
        baseLine: 'gap-1',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-md2'
      },
      'sm': {
        base: 'h-3xl min-w-3xl ps-[18px] pe-[18px] text-xs leading-none', // 32px
        baseLine: 'gap-1.5',
        leadingIcon: 'size-6',
        leadingAvatarSize: 'xs',
        trailingIcon: 'size-lg'
      },
      'md': {
        base: 'h-5xl min-w-5xl ps-5 pe-5 text-xs leading-none', // 40px
        baseLine: 'gap-1.5',
        leadingIcon: 'size-xl2',
        leadingAvatarSize: 'sm',
        trailingIcon: 'size-lg'
      },
      'lg': {
        base: 'h-6xl min-w-6xl ps-[28px] pe-[28px] text-xs leading-none', // ? 48px
        baseLine: 'gap-2',
        leadingIcon: 'size-xl2',
        leadingAvatarSize: 'md',
        trailingIcon: 'size-lg'
      }
    },
    block: {
      true: {
        base: 'w-full',
        baseLine: 'w-full justify-center',
        leadingAvatarSize: 'xs',
        trailingIcon: 'ms-auto'
      }
    },
    rounded: {
      true: 'rounded-full',
      false: 'rounded-2xs'
    },
    leading: {
      true: ''
    },
    useLabel: {
      true: '',
      false: 'ps-0.5 pe-0.5 justify-center'
    },
    useDropdown: {
      true: ''
    },
    useWait: {
      true: ''
    },
    useClock: {
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
        'text-base-800 bg-base-200 border border-base-300',
        'hover:bg-[#cfd4d8] hover:border-[#cfd4d8]',
        'active:bg-[#dde2e5] active:border-[#dde2e5]',
        'disabled:bg-base-200 aria-disabled:bg-base-200 disabled:border-base-300 aria-disabled:border-base-300',
        'focus-visible:outline-base-200'
      ].join(' ')
    },
    {
      // new BASE_DARK ////
      color: 'default',
      depth: 'dark',
      class: [
        'text-white bg-base-900 border border-base-900',
        'hover:bg-base-900/75 hover:border-base-900/75',
        'active:bg-base-900/85 active:border-base-900/85',
        'disabled:bg-base-900 aria-disabled:bg-base-900 disabled:border-base-900 aria-disabled:border-base-900',
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
        'text-[#d7413c] bg-[#fdcac8]/80 border border-[#fdcac8]/80',
        'hover:bg-[#ffdcdb] hover:border-[#ffdcdb]',
        'active:bg-[#f2b6b3] active:border-[#f2b6b3]',
        'disabled:bg-[#fdcac8]/80 aria-disabled:bg-[#fdcac8]/80 disabled:border-[#fdcac8]/80 aria-disabled:border-[#fdcac8]/80',
        'focus-visible:outline-[#fdcac8]/80'
      ].join(' ')
    },
    {
      // DANGER_DARK ////
      color: 'danger',
      depth: 'dark',
      class: [
        'text-white bg-[#a21429] border border-[#a21429]',
        'hover:bg-[#c43d51] hover:border-[#c43d51]',
        'active:bg-[#851021] active:border-[#851021]',
        'disabled:bg-[#a21429] aria-disabled:bg-[#a21429] disabled:border-[#a21429] aria-disabled:border-[#a21429]',
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
        'text-[#668d13] bg-[#dfeeaf]/80 border border-[#dfeeaf]/80',
        'hover:bg-[#eaf5c5] hover:border-[#eaf5c5]',
        'active:bg-[#d3e59a] active:border-[#eaf5c5]',
        'disabled:bg-[#dfeeaf]/80 aria-disabled:bg-[#dfeeaf]/80 disabled:border-[#dfeeaf]/80 aria-disabled:border-[#dfeeaf]/80',
        'focus-visible:outline-[#dfeeaf]/80'
      ].join(' ')
    },
    {
      // SUCCESS_DARK ////
      color: 'success',
      depth: 'dark',
      class: [
        'text-white bg-[#86a732] border border-[#86a732]',
        'hover:bg-[#a2bf54] hover:border-[#a2bf54]',
        'active:bg-[#a2bf54] active:border-[#a2bf54]',
        'disabled:bg-[#86a732] aria-disabled:bg-[#86a732] disabled:border-[#86a732] aria-disabled:border-[#86a732]',
        'focus-visible:outline-[#86a732]'
      ].join(' ')
    },
    // endregion ////
    // region warning ////
    {
      // WARNING_LIGHT ////
      color: 'warning',
      depth: 'light',
      class: [
        'text-[#a07f27] bg-[#edda7b]/80 border border-[#edda7b]/80',
        'hover:bg-orange/65',
        'active:bg-[#eba51c]',
        'disabled:bg-[#edda7b]/80 aria-disabled:bg-[#edda7b]/80',
        'focus-visible:outline-[#edda7b]/80'
      ].join(' ')
    },
    {
      // new WARNING_DARK ////
      color: 'warning',
      depth: 'dark',
      class: [
        'text-white bg-orange-600 border border-orange-600',
        'hover:bg-orange-600/75 hover:border-orange-600/75',
        'active:bg-orange-600/85 active:border-orange-600/85',
        'disabled:bg-orange-600 aria-disabled:bg-orange-600 disabled:border-orange-600 aria-disabled:border-orange-600',
        'focus-visible:outline-orange-600'
      ].join(' ')
    },
    // endregion ////
    // region primary ////
    {
      // new PRIMARY_LIGHT ////
      color: 'primary',
      depth: 'light',
      class: [
        'text-blue-800 bg-blue-300 border border-blue-400',
        'hover:bg-blue-300/75 hover:border-blue-300/75',
        'active:bg-blue-300/85 active:border-blue-300/85',
        'disabled:bg-blue-300 aria-disabled:bg-blue-300 disabled:border-blue-300 aria-disabled:border-blue-300',
        'focus-visible:outline-blue-300'
      ].join(' ')
    },
    {
      // PRIMARY_DARK ////
      color: 'primary',
      depth: 'dark',
      class: [
        'text-white bg-[#399fc2] border border-[#399fc2]',
        'hover:bg-[#37aed4] hover:border-[#37aed4]',
        'active:bg-[#328ba9] active:border-[#328ba9]',
        'disabled:bg-[#399fc2] aria-disabled:bg-[#399fc2] disabled:border-[#399fc2] aria-disabled:border-[#399fc2]',
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
        'text-[#0aa0d0] bg-[#b6edff]/80 border border-[#b6edff]/80',
        'hover:bg-[#d1eef9]',
        'active:bg-[#aee0f2]',
        'disabled:bg-[#b6edff]/80 aria-disabled:bg-[#b6edff]/80',
        'focus-visible:outline-[#b6edff]/80'
      ].join(' ')
    },
    {
      // new SECONDARY_DARK ////
      color: 'secondary',
      depth: 'dark',
      class: [
        'text-base-900 bg-accent-aqua border-accent-turquoise',
        'hover:bg-accent-aqua/75',
        'active:bg-accent-aqua/85',
        'disabled:bg-accent-aqua aria-disabled:bg-accent-aqua',
        'focus-visible:outline-accent-aqua'
      ].join(' ')
    },
    // endregion ////
    // region ai ////
    {
      // new AI_LIGHT ////
      color: 'ai',
      depth: 'light',
      class: [
        'text-ai-900 bg-[#A977FA] border border-[#A977FA]',
        'hover:bg-[#A977FA]/75',
        'active:bg-[#A977FA]/85',
        'disabled:bg-[#A977FA] aria-disabled:bg-[#A977FA]',
        'focus-visible:outline-[#A977FA]'
      ].join(' ')
    },
    {
      // new AI_DARK ////
      color: 'ai',
      depth: 'dark',
      class: [
        'text-white bg-[#8447E4] border border-[#8447E4]',
        'hover:bg-[#8447E4]/75 hover:border-[#8447E4]/75',
        'active:bg-[#8447E4]/85 active:border-[#8447E4]/85',
        'disabled:bg-[#8447E4] aria-disabled:bg-[#8447E4] disabled:border-[#8447E4] aria-disabled:border-[#8447E4]',
        'focus-visible:outline-[#8447E4]'
      ].join(' ')
    },
    // endregion ////
    // region link ////
    {
      // LIGHT ////
      color: 'link',
      depth: 'light',
      class: [
        '',
        'text-base-900 bg-transparent border border-transparent',
        'hover:text-base-master hover:bg-[#f6f8f9]',
        'active:text-base-solid active:bg-[#d6f1fb]',
        'disabled:text-base-master disabled:bg-[#f6f8f9] aria-disabled:bg-[#f6f8f9]',
        'focus-visible:outline-[#f6f8f9]'
      ].join(' ')
    },
    {
      // LIGHT_BORDER ////
      color: 'link',
      depth: 'light',
      useLabel: true,
      class: 'ps-1.5 pe-1.5'
    },
    {
      // LIGHT_BORDER ////
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
    // region size && leading ////
    {
      size: '2xs',
      leading: true,
      useLabel: true,
      useDropdown: false,
      class: 'ps-1.5 pe-3'
    },
    {
      size: 'xs',
      leading: true,
      useLabel: true,
      useDropdown: false,
      class: 'ps-1.5 pe-4'
    },
    {
      size: 'sm',
      leading: true,
      useLabel: true,
      useDropdown: false,
      class: 'ps-2.5 pe-[18px]'
    },
    {
      size: 'md',
      leading: true,
      useLabel: true,
      useDropdown: false,
      class: 'ps-3.5 pe-5'
    },
    {
      size: 'lg',
      leading: true,
      useLabel: true,
      useDropdown: false,
      class: 'ps-4 pe-[28px]'
    },
    // endregion ////
    // region size && useDropdown ////
    {
      size: '2xs',
      leading: false,
      useLabel: true,
      useDropdown: true,
      class: 'ps-3 pe-1.5'
    },
    {
      size: 'xs',
      leading: false,
      useLabel: true,
      useDropdown: true,
      class: 'ps-4 pe-1.5'
    },
    {
      size: 'sm',
      leading: false,
      useLabel: true,
      useDropdown: true,
      class: 'ps-[18px] pe-1.5'
    },
    {
      size: 'md',
      leading: false,
      useLabel: true,
      useDropdown: true,
      class: 'ps-5 pe-2.5'
    },
    {
      size: 'lg',
      leading: false,
      useLabel: true,
      useDropdown: true,
      class: 'ps-[28px] pe-3.5'
    },
    // endregion ////
    // region size && leading && useDropdown ////
    {
      size: '2xs',
      leading: true,
      useLabel: true,
      useDropdown: true,
      class: 'ps-1.5 pe-1.5'
    },
    {
      size: 'xs',
      leading: true,
      useLabel: true,
      useDropdown: true,
      class: 'ps-1.5 pe-1.5'
    },
    {
      size: 'sm',
      leading: true,
      useLabel: true,
      useDropdown: true,
      class: 'ps-2.5 pe-1.5'
    },
    {
      size: 'md',
      leading: true,
      useLabel: true,
      useDropdown: true,
      class: 'ps-3.5 pe-2.5'
    },
    {
      size: 'lg',
      leading: true,
      useLabel: true,
      useDropdown: true,
      class: 'ps-4 pe-3.5'
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
