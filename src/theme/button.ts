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
        'text-white dark:text-base-100 bg-base-650 border border-base-650',
        'hover:bg-base-850 hover:border-base-850 hover:focus-visible:ring-0',
        'active:bg-slate-850 active:border-slate-850 active:focus-visible:ring-0',
        'disabled:bg-base-650 aria-disabled:bg-base-650 disabled:border-base-650 aria-disabled:border-base-650',
        'focus-visible:outline-base-650',
        'ring-base-850 focus-visible:ring-base-850'
      ].join(' '),
      danger: [
        'text-white dark:text-red-100 bg-red-720 border border-red-720',
        'hover:bg-red-790 hover:border-red-790 hover:focus-visible:ring-0',
        'active:bg-red-730 active:border-red-730 active:focus-visible:ring-0',
        'disabled:bg-red-720 aria-disabled:bg-red-720 disabled:border-red-720 aria-disabled:border-red-720',
        'focus-visible:outline-red-720',
        'ring-red-800 focus-visible:ring-red-800'
      ].join(' '),
      // SUCCESS ////
      success: [
        'text-base-900 bg-green-450 border border-green-450',
        'hover:bg-green-370 hover:border-green-370 hover:focus-visible:ring-0',
        'active:bg-green-430 active:border-green-430 active:focus-visible:ring-0',
        'disabled:bg-green-450 aria-disabled:bg-green-450 disabled:border-green-450 aria-disabled:border-green-450',
        'focus-visible:outline-green-450',
        'ring-green-500 focus-visible:ring-green-500'
      ].join(' '),
      // new WARNING ////
      warning: [
        'text-white dark:text-orange-100 bg-orange-500 border border-orange-500',
        'hover:bg-orange-500/75 hover:border-orange-500/75 hover:focus-visible:ring-0',
        'active:bg-orange-500/85 active:border-orange-500/85 active:focus-visible:ring-0',
        'disabled:bg-orange-500 aria-disabled:bg-orange-500 disabled:border-bg-orange-500 aria-disabled:border-bg-orange-500',
        'focus-visible:outline-orange-500',
        'ring-orange-800 focus-visible:ring-orange-800'
      ].join(' '),
      // PRIMARY ////
      primary: [
        'text-white dark:text-blue-100 bg-blue-530 border border-blue-530',
        'hover:bg-blue-450 hover:border-blue-450 hover:focus-visible:ring-0',
        'active:bg-blue-550 active:border-blue-550 active:focus-visible:ring-0',
        'disabled:bg-blue-530 aria-disabled:bg-blue-530 disabled:border-blue-530 aria-disabled:border-blue-530',
        'focus-visible:outline-blue-530',
        'ring-blue-800 focus-visible:ring-blue-800'
      ].join(' '),
      // SECONDARY ////
      secondary: [
        'text-base-900 bg-cyan-160 border border-cyan-230',
        'hover:bg-cyan-150 hover:border-cyan-230 hover:focus-visible:ring-0',
        'active:bg-cyan-230 active:border-cyan-230 active:focus-visible:ring-0',
        'disabled:bg-cyan-160 aria-disabled:bg-cyan-160 disabled:border-cyan-230 aria-disabled:border-cyan-230',
        'focus-visible:outline-cyan-160',
        'ring-cyan-500 focus-visible:ring-cyan-500'
      ].join(' '),
      // COLLAB ////
      collab: [
        'text-white dark:text-collab-100 bg-collab-600 border border-collab-600',
        'hover:bg-collab-500 hover:border-collab-500 hover:focus-visible:ring-0',
        'active:bg-collab-700 active:border-collab-700 active:focus-visible:ring-0',
        'disabled:bg-collab-600 aria-disabled:bg-collab-600 disabled:border-collab-600 aria-disabled:border-collab-600',
        'focus-visible:outline-collab-600',
        'ring-collab-900 focus-visible:ring-collab-900'
      ].join(' '),
      // AI ////
      ai: [
        'text-white dark:text-ai-100 bg-ai-450 border border-ai-450',
        'hover:bg-ai-370 hover:border-ai-370 hover:focus-visible:ring-0',
        'active:bg-ai-550 active:border-ai-550 active:focus-visible:ring-0',
        'disabled:bg-ai-450 aria-disabled:bg-ai-450 disabled:border-ai-450 aria-disabled:border-ai-450',
        'focus-visible:outline-ai-450',
        'ring-ai-900 focus-visible:ring-ai-900'
      ].join(' '),
      // LINK ////
      link: [
        'no-underline decoration-solid decoration-auto',
        'text-base-900 decoration-gray-900 bg-transparent border border-transparent dark:text-base-300',
        'hover:text-base-750 dark:hover:text-base-400 hover:focus-visible:ring-0',
        'active:text-base-900 dark:active:text-base-700 active:focus-visible:ring-0',
        'disabled:text-base-900 aria-disabled:text-base-900 dark:disabled:text-base-300 dark:aria-disabled:disabled:text-base-300',
        'focus-visible:outline-base-400',
        'ring-base-850 focus-visible:ring-base-850'
      ].join(' ')
    },
    depth: {
      light: '',
      normal: '',
      dark: ''
    },
    size: {
      xs: {
        base: 'h-xl2 ps-4 pe-4 text-3xs leading-none', // 26px
        baseLine: 'gap-1',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-md2'
      },
      sm: {
        base: 'h-3xl ps-[18px] pe-[18px] text-xs leading-none', // 32px
        baseLine: 'gap-1.5',
        leadingIcon: 'size-6',
        leadingAvatarSize: 'xs',
        trailingIcon: 'size-lg'
      },
      md: {
        base: 'h-5xl ps-5 pe-5 text-xs leading-none', // 40px
        baseLine: 'gap-1.5',
        leadingIcon: 'size-xl2',
        leadingAvatarSize: 'sm',
        trailingIcon: 'size-lg'
      },
      lg: {
        base: 'h-6xl ps-[28px] pe-[28px] text-xs leading-none', // ? 48px
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
      false: 'ps-1.5 pe-1.5 justify-center'
    },
    useDropdown: {
      true: 'ps-2 pe-2'
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
        'text-base-800 dark:text-base-800 bg-base-200 border border-base-300',
        'hover:bg-base-320 hover:border-base-320 hover:focus-visible:ring-0',
        'active:bg-base-250 active:border-base-250 active:focus-visible:ring-0',
        'disabled:bg-base-200 aria-disabled:bg-base-200 disabled:border-base-300 aria-disabled:border-base-300',
        'focus-visible:outline-base-200'
      ].join(' ')
    },
    {
      // new BASE_DARK ////
      color: 'default',
      depth: 'dark',
      class: [
        'text-white dark:text-base-100 bg-base-900 border border-base-900',
        'hover:bg-base-900/75 hover:border-base-900/75 hover:focus-visible:ring-0',
        'active:bg-base-900/85 active:border-base-900/85 active:focus-visible:ring-0',
        'disabled:bg-base-900 aria-disabled:bg-base-900 disabled:border-base-900 aria-disabled:border-base-900',
        'focus-visible:outline-base-900',
        'ring-base-700 focus-visible:ring-base-700'
      ].join(' ')
    },
    // endregion ////
    // region danger ////
    {
      // DANGER_LIGHT ////
      color: 'danger',
      depth: 'light',
      class: [
        'text-red-750 dark:text-red-760 bg-red-270 border border-red-270',
        'hover:bg-red-250 hover:border-red-250 dark:hover:bg-red-200 dark:hover:border-red-200 hover:focus-visible:ring-0',
        'active:bg-red-350 active:border-red-350 dark:active:bg-red-350 dark:active:border-red-350 active:focus-visible:ring-0',
        'disabled:bg-red-270 aria-disabled:bg-red-270 disabled:border-red-270 aria-disabled:border-red-270',
        'dark:disabled:bg-red-270 dark:aria-disabled:bg-red-270 dark:disabled:border-red-270 dark:aria-disabled:border-red-270',
        'focus-visible:outline-red-270'
      ].join(' ')
    },
    {
      // DANGER_DARK ////
      color: 'danger',
      depth: 'dark',
      class: [
        'text-white dark:text-red-100 bg-red-850 border border-red-850',
        'hover:bg-red-760 hover:border-red-760 hover:focus-visible:ring-0',
        'active:bg-red-930 active:border-red-930 active:focus-visible:ring-0',
        'disabled:bg-red-850 aria-disabled:bg-red-850 disabled:border-red-850 aria-disabled:border-red-850',
        'focus-visible:outline-red-850',
        'ring-red-950 focus-visible:ring-red-950'
      ].join(' ')
    },
    // endregion ////
    // region success ////
    {
      // SUCCESS_LIGHT ////
      color: 'success',
      depth: 'light',
      class: [
        'text-green-780 bg-green-280 border border-green-280',
        'hover:bg-green-270 hover:border-green-270 hover:focus-visible:ring-0',
        'dark:hover:bg-green-200 dark:hover:border-green-200',
        'active:bg-green-330 active:border-green-270 active:focus-visible:ring-0',
        'dark:active:bg-green-330 dark:active:border-green-270',
        'disabled:bg-green-280 aria-disabled:bg-green-280 disabled:border-green-280 aria-disabled:border-green-280',
        'dark:disabled:bg-green-280 dark:aria-disabled:bg-green-280 dark:disabled:border-green-280 dark:aria-disabled:border-green-280',
        'focus-visible:outline-green-280'
      ].join(' ')
    },
    {
      // SUCCESS_DARK ////
      color: 'success',
      depth: 'dark',
      class: [
        'text-white dark:text-green-100 bg-green-730 border border-green-730',
        'hover:bg-green-570 hover:border-green-570 hover:focus-visible:ring-0',
        'active:bg-green-570 active:border-green-570 active:focus-visible:ring-0',
        'disabled:bg-green-730 aria-disabled:bg-green-730 disabled:border-green-730 aria-disabled:border-green-730',
        'focus-visible:outline-green-730',
        'ring-green-900 focus-visible:ring-green-900'
      ].join(' ')
    },
    // endregion ////
    // region warning ////
    {
      // WARNING_LIGHT ////
      color: 'warning',
      depth: 'light',
      class: [
        'text-orange-750 dark:text-orange-750 bg-orange-350/80 border border-orange-350/80 dark:bg-orange-230 dark:border-orange-230',
        'hover:bg-orange-500/65 hover:border-orange-500/65 dark:hover:bg-orange-400 dark:hover:border-orange-400 hover:focus-visible:ring-0',
        'active:bg-orange-550 active:border-orange-550 dark:active:bg-orange-600 dark:active:border-orange-600 active:focus-visible:ring-0',
        'disabled:bg-orange-230 aria-disabled:bg-orange-230 disabled:border-orange-230 aria-disabled:border-orange-230 dark:disabled:bg-orange-230 dark:aria-disabled:bg-orange-230 dark:disabled:border-orange-230 dark:aria-disabled:border-orange-230',
        'focus-visible:outline-orange-230'
      ].join(' ')
    },
    {
      // new WARNING_DARK ////
      color: 'warning',
      depth: 'dark',
      class: [
        'text-white dark:text-orange-100 bg-orange-700 border border-orange-700',
        'hover:bg-orange-700/75 hover:border-orange-700/75 hover:focus-visible:ring-0',
        'active:bg-orange-700/85 active:border-orange-700/85 active:focus-visible:ring-0',
        'disabled:bg-orange-700 aria-disabled:bg-orange-700 disabled:border-orange-700 aria-disabled:border-orange-700',
        'focus-visible:outline-orange-700'
      ].join(' ')
    },
    // endregion ////
    // region primary ////
    {
      // new PRIMARY_LIGHT ////
      color: 'primary',
      depth: 'light',
      class: [
        'text-blue-800 dark:text-blue-800 bg-blue-300 border border-blue-400',
        'hover:bg-blue-300/75 hover:border-blue-300/75 hover:focus-visible:ring-0',
        'active:bg-blue-300/85 active:border-blue-300/85 active:focus-visible:ring-0',
        'disabled:bg-blue-300 aria-disabled:bg-blue-300 disabled:border-blue-300 aria-disabled:border-blue-300',
        'focus-visible:outline-blue-300'
      ].join(' ')
    },
    {
      // PRIMARY_DARK ////
      color: 'primary',
      depth: 'dark',
      class: [
        'text-white dark:text-blue-100 bg-blue-650 border border-blue-650',
        'hover:bg-blue-630 hover:border-blue-630 hover:focus-visible:ring-0',
        'active:bg-blue-750 active:border-blue-750 active:focus-visible:ring-0',
        'disabled:bg-blue-650 aria-disabled:bg-blue-650 disabled:border-blue-650 aria-disabled:border-blue-650',
        'focus-visible:outline-blue-650'
      ].join(' ')
    },
    // endregion ////
    // region secondary ////
    {
      // SECONDARY_LIGHT ////
      color: 'secondary',
      depth: 'light',
      class: [
        'text-blue-620 dark:text-blue-850 bg-blue-310 border border-blue-310',
        'hover:bg-cyan-150 hover:border-cyan-150 hover:focus-visible:ring-0',
        'active:bg-cyan-230 active:border-cyan-230 active:focus-visible:ring-0',
        'disabled:bg-blue-310 aria-disabled:bg-blue-310 disabled:border-blue-310 aria-disabled:border-blue-310',
        'focus-visible:outline-blue-310'
      ].join(' ')
    },
    {
      // new SECONDARY_DARK ////
      color: 'secondary',
      depth: 'dark',
      class: [
        'text-base-900 bg-cyan-350 border-cyan-500',
        'hover:bg-cyan-350/75 hover:focus-visible:ring-0',
        'active:bg-cyan-350/85 active:focus-visible:ring-0',
        'disabled:bg-cyan-350 aria-disabled:bg-cyan-350',
        'focus-visible:outline-cyan-350',
        'ring-cyan-900 focus-visible:ring-cyan-900'
      ].join(' ')
    },
    // endregion ////
    // region collab ////
    {
      // new collab_LIGHT ////
      color: 'collab',
      depth: 'light',
      class: [
        'text-collab-900 dark:text-collab-900 bg-collab-300 border border-collab-400',
        'hover:bg-collab-300/75 hover:border-collab-300/75 hover:focus-visible:ring-0',
        'active:bg-collab-300/85 active:border-collab-300/85 active:focus-visible:ring-0',
        'disabled:bg-collab-300 aria-disabled:bg-collab-300 disabled:border-collab-300 aria-disabled:border-collab-300',
        'focus-visible:outline-collab-300'
      ].join(' ')
    },
    {
      // new collab_DARK ////
      color: 'collab',
      depth: 'dark',
      class: [
        'text-white dark:text-collab-100 bg-collab-700 border border-collab-700',
        'hover:bg-collab-700/75 hover:border-collab-700/75 hover:focus-visible:ring-0',
        'active:bg-collab-700/85 active:border-collab-700/85 active:focus-visible:ring-0',
        'disabled:bg-collab-700 aria-disabled:bg-collab-700 disabled:border-collab-700 aria-disabled:border-collab-700',
        'focus-visible:outline-collab-700'
      ].join(' ')
    },
    // endregion ////
    // region ai ////
    {
      // new AI_LIGHT ////
      color: 'ai',
      depth: 'light',
      class: [
        'text-ai-900 dark:text-ai-900 bg-ai-300 border border-ai-400',
        'hover:bg-ai-300/75 hover:border-ai-300/75 hover:focus-visible:ring-0',
        'active:bg-ai-300/85 active:border-ai-300/85 active:focus-visible:ring-0',
        'disabled:bg-ai-300 aria-disabled:bg-ai-300 disabled:border-ai-300 aria-disabled:border-ai-300',
        'focus-visible:outline-ai-300'
      ].join(' ')
    },
    {
      // new AI_DARK ////
      color: 'ai',
      depth: 'dark',
      class: [
        'text-white dark:text-ai-100 bg-ai-550 border border-ai-550',
        'hover:bg-ai-550/75 hover:border-ai-550/75 hover:focus-visible:ring-0',
        'active:bg-ai-550/85 active:border-ai-550/85 active:focus-visible:ring-0',
        'disabled:bg-ai-550 aria-disabled:bg-ai-550 disabled:border-ai-550 aria-disabled:border-ai-550',
        'focus-visible:outline-ai-550',
        'ring-ai-900 focus-visible:ring-ai-900'
      ].join(' ')
    },
    // endregion ////
    // region link ////
    {
      // LIGHT ////
      color: 'link',
      depth: 'light',
      class: [
        'text-base-900 dark:text-base-300 bg-transparent border border-transparent',
        'hover:text-base-master dark:hover:text-base-100 hover:bg-base-30 dark:hover:bg-base-850 hover:focus-visible:ring-0',
        'active:text-base-ebony active:bg-blue-270 dark:active:text-base-100 dark:active:bg-slate-850 active:focus-visible:ring-0',
        'disabled:text-base-master disabled:bg-base-30 aria-disabled:bg-base-30 dark:disabled:text-base-100 dark:aria-disabled:text-base-100 dark:disabled:bg-base-850 dark:aria-disabled:bg-base-850',
        'focus-visible:outline-base-30 dark:focus-visible:outline-base-850'
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
        'text-base-900 bg-transparent border-base-330 dark:text-base-300 dark:border-base-800',
        'hover:text-base-900 dark:hover:text-base-900 hover:bg-base-320 hover:border-base-330 hover:focus-visible:ring-0',
        'active:text-base-900 dark:active:text-base-900 active:bg-base-250 active:border-base-550 active:focus-visible:ring-0',
        'disabled:bg-transparent disabled:border-base-330 aria-disabled:bg-transparent aria-disabled:border-base-330',
        'dark:disabled:text-base-900 dark:aria-disabled:text-base-900',
        'dark:disabled:border-base-900 dark:aria-disabled:border-base-900',
        'focus-visible:outline-base-330'
      ].join(' ')
    },
    // endregion ////
    // region size && leading ////
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
      size: 'xs',
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
