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
  'invisible'
].join(' ')

export default {
  slots: {
    base: [
      'ui-btn',
      'font-(family-name:--ui-font-family-primary)',
      'select-none cursor-pointer inline-flex items-center',
      'relative',
      'outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2',
      'disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:opacity-50',
      'transition duration-0 ease-linear', // transition-colors
      'border',
      'text-(--ui-btn-color) bg-(--ui-btn-background) border-(--ui-btn-border-color)',
      'hover:text-(--ui-btn-color-hover) hover:bg-(--ui-btn-background-hover) hover:border-(--ui-btn-border-color-hover)',
      'focus:text-(--ui-btn-color-hover) focus:bg-(--ui-btn-background-hover) focus:border-(--ui-btn-border-color-hover)',
      'active:text-(--ui-btn-color-active) active:bg-(--ui-btn-background-active) active:border-(--ui-btn-border-color-active)',
      'disabled:bg-(--ui-btn-background) disabled:border-(--ui-btn-border-color)',
      'aria-disabled:bg-(--ui-btn-background) aria-disabled:border-(--ui-btn-border-color)',
      'focus-visible:outline-(--ui-btn-background)',
      'ring-(--ui-btn-background-hover) focus:outline-none focus-visible:ring-(--ui-btn-background-hover)',
      'h-(--ui-btn-height)',
      'text-(length:--ui-btn-font-size) leading-(--ui-btn-height) font-(--ui-btn-font-weight)',
      ''
    ],
    baseLoading: 'h-full w-full absolute inset-0 flex flex-row flex-nowrap items-center justify-center',
    baseLoadingWaitIcon: 'text-(--ui-btn-color) size-[calc(var(--ui-btn-wait-icon-size)_+_7px)]',
    baseLoadingClockIcon: 'text-(--ui-btn-color) size-[calc(var(--ui-btn-wait-icon-size)_+_7px)]',
    baseLoadingSpinnerIcon: 'text-(--ui-btn-color) size-(--ui-btn-wait-icon-size) animate-spin stroke-2',
    baseLine: [
      // fix 'inline-flex items-center' // justify-center
      'w-full inline-flex items-center justify-center gap-(--ui-btn-icon-space)',
      'ps-(--ui-btn-padding-left) pe-(--ui-btn-padding-right)'
    ].join(' '),
    // fix label: 'truncate',
    label: [
      'h-(--ui-btn-height) max-w-full',
      'inline-flex items-center',
      'tracking-(--ui-btn-letter-spacing)',
      'overflow-visible',
      'text-clip',
      'mt-(--ui-btn-title-compensation)'
    ].join(' '),
    labelInner: [
      'truncate',
      'inline-block',
      'max-w-full',
      'mt-(--ui-btn-title-compensation)'
    ].join(' '),
    // fix leadingIcon: 'shrink-0',
    leadingIcon: 'shrink-0 size-(--ui-btn-icon-size)',
    leadingAvatar: 'shrink-0 me-[4px]',
    leadingAvatarSize: '',
    trailingIcon: 'shrink-0 size-(--ui-btn-icon-size) mt-(--ui-btn-title-compensation)',
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
        base: 'ui-btn-xss',
        leadingAvatarSize: '2xs'
      },
      xs: {
        // fix base: 'h-xl2 ps-4 pe-4 text-3xs leading-none', // 26px
        // base: 'h-xl2 ps-[9px] pe-[9px] text-3xs leading-none', // 26px
        // baseLine: 'gap-1',
        // leadingIcon: 'size-5',
        // leadingAvatarSize: '2xs',
        // trailingIcon: 'size-md2'
        base: 'ui-btn-xs',
        leadingAvatarSize: '2xs'
      },
      sm: {
        // fix base: 'h-3xl ps-[18px] pe-[18px] text-xs leading-none', // 32px
        // fix baseLine: 'gap-1.5',
        // fix leadingIcon: 'size-6',
        // fix leadingAvatarSize: 'xs',
        // fix trailingIcon: 'size-lg'
        base: 'ui-btn-sm',
        leadingAvatarSize: 'xs'
      },
      md: {
        // base: 'h-5xl ps-5 pe-5 text-xs leading-none', // 40px
        // baseLine: 'gap-1.5',
        // leadingIcon: 'size-xl2',
        // leadingAvatarSize: 'sm',
        // trailingIcon: 'size-lg'
        base: 'ui-btn-md',
        leadingAvatarSize: 'xs'
      },
      lg: {
        // base: 'h-6xl ps-[28px] pe-[28px] text-xs leading-none', // ? 48px
        // baseLine: 'gap-2',
        // leadingIcon: 'size-xl2',
        // leadingAvatarSize: 'md',
        // trailingIcon: 'size-lg'
        base: 'ui-btn-lg',
        leadingAvatarSize: 'md'
      },
      xl: {
        // base: 'h-6xl ps-[28px] pe-[28px] text-xs leading-none', // ? 48px
        // baseLine: 'gap-2',
        // leadingIcon: 'size-xl2',
        // leadingAvatarSize: 'md',
        // trailingIcon: 'size-lg'
        base: 'ui-btn-xl',
        leadingAvatarSize: 'md'
      }
    },
    block: {
      true: {
        base: 'w-full'
        // baseLine: 'w-full justify-center',
        // trailingIcon: 'ms-auto'
      }
    },
    rounded: {
      true: 'rounded-(--ui-border-radius-lg)',
      false: 'rounded-(--ui-btn-radius)'
    },
    leading: {
      true: ''
    },
    useLabel: {
      true: '',
      // fix false: 'ps-1.5 pe-1.5 justify-center'
      false: {
        baseLine: 'ps-[4px] pe-[4px]',
        leadingAvatar: 'me-0'
      }
    },
    useDropdown: {
      // fix true: 'ps-2 pe-2'
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
      // fix true: 'font-semibold normal-case',
      true: 'normal-case',
      // fix false: 'font-bold uppercase'
      false: 'uppercase'
    },
    // active: {
    //   true: '',
    //   false: ''
    // },
    isAir: {
      true: [
        '--air'
      ].join(' '),
      // old theme
      false: ''
    }
  },
  compoundVariants: [
    // region default ////
    {
      color: 'default',
      depth: 'light',
      class: [
        '--style-default-light'
        // '--style-outline'
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
      ].join(' ')
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
    {
      leading: true,
      useLabel: true,
      useDropdown: false,
      // fix class: 'ps-2.5 pe-[18px]'
      class: {
        baseLine: 'ps-[calc(var(--ui-btn-padding-left)_-_var(--ui-btn-icon-compensation))]'
      }
    },
    // endregion ////
    // region size && useDropdown ////
    // @todo ////
    {
      leading: false,
      useLabel: true,
      useDropdown: true,
      class: {
        baseLine: 'pe-[calc(var(--ui-btn-padding-right)_-_var(--ui-btn-icon-compensation))]'
      }
    },
    // endregion ////
    // region size && leading && useDropdown ////
    // @todo ////
    {
      leading: true,
      useLabel: true,
      useDropdown: true,
      class: {
        baseLine: [
          'ps-[calc(var(--ui-btn-padding-left)_-_var(--ui-btn-icon-compensation))]',
          'pe-[calc(var(--ui-btn-padding-right)_-_var(--ui-btn-icon-compensation))]'
        ].join(' ')
      }
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
