/**
 * Button
 * A button element that can act as a link or trigger an action.
 * ---
 * @link /api_d7/bitrix/ui/buttons/button.php
 * @see bitrix/js/ui/buttons/src/button/button-color.js
 * @see bitrix/js/ui/buttons/src/button/button-size.js
 */

import { buttonGroupVariant } from './button-group'

const safeList = [
  'h-full w-full absolute inset-0 flex flex-row flex-nowrap items-center justify-center',
  'w-[28px] h-[28px]',
  'size-lg animate-spin stroke-2',
  'invisible'
].join(' ')

export default {
  slots: {
    base: [
      'ui-btn',
      'select-none cursor-pointer inline-flex items-center',
      'relative',
      'outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2',
      'disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:opacity-50',
      'transition duration-150 ease-linear', // transition-colors
      'border',
      'text-(--ui-btn-color) bg-(--ui-btn-background) border-(--ui-btn-border-color)',
      'hover:text-(--ui-btn-color-hover) hover:bg-(--ui-btn-background-hover) hover:border-(--ui-btn-border-color-hover)',
      'focus:text-(--ui-btn-color-hover) focus:bg-(--ui-btn-background-hover) focus:border-(--ui-btn-border-color-hover)',
      'active:text-(--ui-btn-color-active) active:bg-(--ui-btn-background-active) active:border-(--ui-btn-border-color-active)',
      'disabled:bg-(--ui-btn-background) disabled:border-(--ui-btn-border-color)',
      'aria-disabled:bg-(--ui-btn-background) aria-disabled:border-(--ui-btn-border-color)',
      'focus-visible:outline-(--ui-btn-background)',
      'ring-(--ui-btn-background-hover) focus:outline-none focus-visible:ring-(--ui-btn-background-hover)'
    ],
    baseLine: [
      'inline-flex items-center' // justify-center
    ].join(' '),
    label: 'truncate',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailingIcon: 'shrink-0',
    safeList
  },
  variants: {
    ...buttonGroupVariant,
    color: {
      'default': '',
      'danger': '',
      'success': '',
      'warning': '',
      'primary': '',
      'secondary': '',
      'collab': '',
      'ai': '',
      'link': '',
      'air-primary': '--style-filled',
      'air-primary-success': '--style-filled-success',
      'air-primary-alert': '--style-filled-alert',
      'air-primary-copilot': '--style-filled-copilot',
      'air-secondary': '--style-tinted',
      'air-secondary-alert': '--style-tinted-alert',
      'air-secondary-accent': '--style-outline',
      'air-secondary-accent-1': '--style-outline-accent-1',
      'air-secondary-accent-2': '--style-outline-accent-2',
      'air-tertiary': '--style-plain',
      'air-tertiary-accent': '--style-plain-accent',
      'air-tertiary-no-accent': '--style-outline-no-accent',
      'air-selection': '--style-selection'
    },
    depth: {
      light: '',
      normal: '',
      dark: ''
    },
    size: {
      xss: {
        // fixbase: 'h-xl2 ps-4 pe-4 text-3xs leading-none', // 26px
        base: 'h-xl2 ps-[9px] pe-[9px] text-3xs leading-none', // 26px
        baseLine: 'gap-1',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-md2'
      },
      xs: {
        // fixbase: 'h-xl2 ps-4 pe-4 text-3xs leading-none', // 26px
        base: 'h-xl2 ps-[9px] pe-[9px] text-3xs leading-none', // 26px
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
      },
      xl: {
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
    },
    active: {
      true: {
        base: ''
      },
      false: {
        base: ''
      }
    },
    isAir: {
      true: [
        '--air'
      ].join(' '),
      // old theme
      false: [
        ''
      ].join(' ')
    }
  },
  compoundVariants: [
    // region default ////
    {
      color: 'default',
      depth: 'light',
      class: [
        '--style-default-light'
      ].join(' ')
    },
    {
      color: 'default',
      depth: 'normal',
      class: [
        '--style-default'
      ].join(' ')
    },
    {
      color: 'default',
      depth: 'dark',
      class: [
        '--style-default-dark'
      ].join(' ')
    },
    // endregion ////
    // region danger ////
    {
      color: 'danger',
      depth: 'light',
      class: [
        '--style-danger-light'
      ].join(' ')
    },
    {
      color: 'danger',
      depth: 'normal',
      class: [
        '--style-danger'
      ].join(' ')
    },
    {
      color: 'danger',
      depth: 'dark',
      class: [
        '--style-danger-dark'
      ].join(' ')
    },
    // endregion ////
    // region success ////
    {
      color: 'success',
      depth: 'light',
      class: [
        '--style-success-light'
      ].join(' ')
    },
    {
      color: 'success',
      depth: 'normal',
      class: [
        '--style-success'
      ].join(' ')
    },
    {
      color: 'success',
      depth: 'dark',
      class: [
        '--style-success-dark'
      ].join(' ')
    },
    // endregion ////
    // region warning ////
    {
      color: 'warning',
      depth: 'light',
      class: [
        '--style-warning-light'
      ].join(' ')
    },
    {
      color: 'warning',
      depth: 'normal',
      class: [
        '--style-warning'
      ].join(' ')
    },
    {
      color: 'warning',
      depth: 'dark',
      class: [
        '--style-warning-dark'
      ].join(' ')
    },
    // endregion ////
    // region primary ////
    {
      color: 'primary',
      depth: 'light',
      class: [
        '--style-primary-light'
      ].join(' ')
    },
    {
      color: 'primary',
      depth: 'normal',
      class: [
        '--style-primary'
      ].join(' ')
    },
    {
      color: 'primary',
      depth: 'dark',
      class: [
        '--style-primary-dark'
      ].join(' ')
    },
    // endregion ////
    // region secondary ////
    {
      color: 'secondary',
      depth: 'light',
      class: [
        '--style-secondary-light'
      ].join(' ')
    },
    {
      color: 'secondary',
      depth: 'normal',
      class: [
        '--style-secondary'
      ].join(' ')
    },
    {
      color: 'secondary',
      depth: 'dark',
      class: [
        '--style-secondary-dark'
      ].join(' ')
    },
    // endregion ////
    // region collab ////
    {
      color: 'collab',
      depth: 'light',
      class: [
        '--style-collab-light'
      ].join(' ')
    },
    {
      color: 'collab',
      depth: 'normal',
      class: [
        '--style-collab'
      ].join(' ')
    },
    {
      color: 'collab',
      depth: 'dark',
      class: [
        '--style-collab-dark'
      ].join(' ')
    },
    // endregion ////
    // region ai ////
    {
      color: 'ai',
      depth: 'light',
      class: [
        '--style-ai-light'
      ].join(' ')
    },
    {
      color: 'ai',
      depth: 'normal',
      class: [
        '--style-ai'
      ].join(' ')
    },
    {
      color: 'ai',
      depth: 'dark',
      class: [
        '--style-ai-dark'
      ].join(' ')
    },
    // endregion ////
    // region link ////
    {
      color: 'link',
      depth: 'light',
      class: [
        '--style-link-light'
        // // 'text-base-900 dark:text-base-300 bg-transparent border border-transparent', // fix
        // // 'hover:text-base-master dark:hover:text-base-100 hover:bg-base-30 dark:hover:bg-base-850 hover:focus-visible:ring-0', // fix
        // 'hover:bg-(--button-link-light-bg-hover) hover:focus-visible:ring-0',
        // // 'active:text-base-ebony active:bg-blue-270 dark:active:text-base-100 dark:active:bg-slate-850 active:focus-visible:ring-0', // fix
        // 'active:bg-(--button-link-light-bg-active) active:focus-visible:ring-0',
        // // 'disabled:text-base-master disabled:bg-base-30 aria-disabled:bg-base-30 dark:disabled:text-base-100 dark:aria-disabled:text-base-100 dark:disabled:bg-base-850 dark:aria-disabled:bg-base-850', // fix
        // // 'focus-visible:outline-base-30 dark:focus-visible:outline-base-850' // fix
      ].join(' ')
    },
    {
      color: 'link',
      depth: 'light',
      useLabel: true,
      class: 'ps-1.5 pe-1.5'
    },
    {
      color: 'link',
      depth: 'normal',
      class: [
        '--style-link'
      ].join(' ')
    },
    {
      color: 'link',
      depth: 'normal',
      useLabel: true,
      class: 'ps-0 pe-0'
    },
    {
      color: 'link',
      depth: 'dark',
      class: [
        '--style-link-dark'
        // '',
        // 'border',
        // // 'text-base-900 bg-transparent border-base-330 dark:text-base-300 dark:border-base-800', // fix
        // 'text-(--ui-color-design-outline-content) bg-transparent border-(--ui-color-design-outline-stroke)',
        // // 'hover:text-base-900 dark:hover:text-base-900 hover:bg-base-320 hover:border-base-330 hover:focus-visible:ring-0', // fix
        // 'hover:bg-(--button-link-light-bg-hover) hover:focus-visible:ring-0',
        // // 'active:text-base-900 dark:active:text-base-900 active:bg-base-250 active:border-base-550 active:focus-visible:ring-0', // fix
        // 'active:bg-(--button-link-light-bg-active) active:focus-visible:ring-0',
        // // 'disabled:bg-transparent disabled:border-base-330 aria-disabled:bg-transparent aria-disabled:border-base-330', // fix
        // // 'dark:disabled:text-base-900 dark:aria-disabled:text-base-900', // fix
        // // 'dark:disabled:border-base-900 dark:aria-disabled:border-base-900', // fix
        // // 'focus-visible:outline-base-330' // fix
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
      size: 'md',
      class: 'text-md'
    },
    {
      normalCase: true,
      size: 'lg',
      class: 'text-md'
    }
    // endregion ////
  ],
  defaultVariants: {
    size: 'md',
    // @todo fix docs ////
    color: 'air-tertiary-no-accent',
    depth: 'normal',
    normalCase: true,
    isAir: true
  }
}
