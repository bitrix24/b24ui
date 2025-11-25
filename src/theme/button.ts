/**
 * Button
 * A button element that can act as a link or trigger an action.
 * ---
 * @link /api_d7/bitrix/ui/buttons/button.php
 * @see bitrix/js/ui/buttons/src/button/button-color.js
 * @see bitrix/js/ui/buttons/src/button/button-size.js
 *
 * @todo fix src/runtime/air-design-tokens/components/button.css
 * @todo fix hover:air-boost & etc
 */

import { fieldGroupVariant } from './field-group'

const safeList = [
  'invisible'
].join(' ')

export default {
  slots: {
    base: [
      'ui-btn',
      'font-[family-name:var(--ui-font-family-primary)]',
      'select-none cursor-pointer inline-flex items-center',
      'relative',
      'outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2',
      'disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-30 aria-disabled:opacity-30',
      'transition duration-0 ease-linear', // transition-colors
      'border-(length:--ui-btn-border-width)',
      'text-(--ui-btn-color) bg-(--ui-btn-background) border-(--ui-btn-border-color)',
      'hover:text-(--ui-btn-color-hover) hover:bg-(--ui-btn-background-hover) hover:border-(--ui-btn-border-color-hover)',
      'focus:text-(--ui-btn-color-hover) focus:bg-(--ui-btn-background-hover) focus:border-(--ui-btn-border-color-hover)',
      'active:text-(--ui-btn-color-active) active:bg-(--ui-btn-background-active) active:border-(--ui-btn-border-color-active)',
      'disabled:bg-(--ui-btn-background) disabled:border-(--ui-btn-border-color)',
      'aria-disabled:bg-(--ui-btn-background) aria-disabled:border-(--ui-btn-border-color)',
      'focus-visible:outline-(--ui-btn-background)',
      'ring-(--ui-btn-background-hover) focus:outline-none focus-visible:ring-(--ui-btn-background-hover)',
      'h-(--ui-btn-height)',
      'text-(length:--ui-btn-font-size) leading-(--ui-btn-height) font-(--ui-btn-font-weight)'
    ].join(' '),
    baseLoading: 'h-full w-full absolute inset-0 flex flex-row flex-nowrap items-center justify-center',
    baseLoadingWaitIcon: 'text-(--ui-btn-color) size-[calc(var(--ui-btn-wait-icon-size)_+_7px)]',
    baseLoadingClockIcon: 'text-(--ui-btn-color) size-[calc(var(--ui-btn-wait-icon-size)_+_7px)]',
    baseLoadingSpinnerIcon: 'text-(--ui-btn-color) size-(--ui-btn-wait-icon-size) animate-spin stroke-2',
    baseLine: [
      'w-full inline-flex items-center justify-center gap-(--ui-btn-icon-space)',
      'ps-(--ui-btn-padding-left) pe-(--ui-btn-padding-right)',
      'h-(--ui-btn-height)'
    ].join(' '),
    label: [
      'h-(--ui-btn-height) max-w-full',
      'inline-flex flex-row items-center',
      'tracking-(--ui-btn-letter-spacing)',
      'overflow-visible',
      'text-clip'
      // 'mt-(--ui-btn-title-compensation)'
    ].join(' '),
    labelInner: [
      'truncate',
      'inline-block',
      'max-w-full',
      'mt-(--ui-btn-title-compensation)'
    ].join(' '),
    leadingIcon: 'text-(--ui-btn-color) shrink-0 size-(--ui-btn-icon-size)',
    leadingAvatar: 'shrink-0 me-[4px]',
    leadingAvatarSize: '',
    trailingIcon: 'text-(--ui-btn-color) shrink-0 size-(--ui-btn-icon-size) mt-(--ui-btn-title-compensation)',
    safeList
  },
  variants: {
    ...fieldGroupVariant,
    color: {
      'air-primary': '--style-filled',
      'air-primary-success': '--style-filled-success',
      'air-primary-alert': '--style-filled-alert',
      'air-primary-copilot': '--style-filled-copilot',
      'air-secondary': '--style-tinted',
      'air-secondary-alert': '--style-tinted-alert',
      'air-secondary-accent': '--style-outline',
      'air-secondary-accent-1': '--style-outline-accent-1',
      'air-secondary-accent-2': '--style-outline-accent-2',
      'air-secondary-no-accent': '--style-outline-no-accent',
      'air-tertiary': '--style-plain',
      'air-tertiary-accent': '--style-plain-accent',
      'air-tertiary-no-accent': '--style-plain-no-accent',
      'air-selection': '--style-selection',
      'air-boost': {
        base: [
          '--style-filled-boost',
          'bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:bg-transparent aria-disabled:bg-transparent',
          'from-0% via-58.65% to-100%',
          'bg-radial-[110.42%_110.42%_at_-10.42%_31.25%] from-(--ui-color-design-filled-boost-bg-gradient-1) via-(--ui-color-design-filled-boost-bg-gradient-2) to-(--ui-color-design-filled-boost-bg-gradient-3)',
          'hover:bg-radial-[110.42%_110.42%_at_-10.42%_31.25%] hover:from-(--hover-color-1) via-(--hover-color-2) hover:via-58.65% hover:to-(--hover-color-3)',
          'focus:bg-radial-[110.42%_110.42%_at_-10.42%_31.25%] focus:from-(--hover-color-1) via-(--hover-color-2) focus:via-58.65% to-(--hover-color-3)',
          'active:bg-radial-[110.42%_110.42%_at_-10.42%_31.25%] active:from-(--active-color-1) via-(--active-color-2) active:via-58.65% to-(--active-color-3)',
          'disabled:bg-radial-[110.42%_110.42%_at_-10.42%_31.25%] disabled:from-(--ui-color-design-filled-boost-bg-gradient-1) via-(--ui-color-design-filled-boost-bg-gradient-2) to-(--ui-color-design-filled-boost-bg-gradient-3)',
          'aria-disabled:bg-radial-[110.42%_110.42%_at_-10.42%_31.25%] aria-disabled:from-(--ui-color-design-filled-boost-bg-gradient-1) aria-disabled:via-(--ui-color-design-filled-boost-bg-gradient-2) aria-disabled:to-(--ui-color-design-filled-boost-bg-gradient-3)'
          // 'bg-(--ui-btn-background-gradient)',
          // 'hover:bg-(--ui-btn-background-gradient-hover)',
          // 'focus:bg-(--ui-btn-background-gradient-hover)',
          // 'active:bg-(--ui-btn-background-gradient-active)',
          // 'disabled:bg-(--ui-btn-background-gradient)',
          // 'aria-disabled:bg-(--ui-btn-background-gradient)'
        ].join(' ')
      },
      // @deprecate ////
      'default': '',
      'danger': '',
      'success': '',
      'warning': '',
      'primary': '',
      'secondary': '',
      'collab': '',
      'ai': '',
      'link': ''
    },
    // @deprecate ////
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
        base: 'ui-btn-xs',
        leadingAvatarSize: '2xs'
      },
      sm: {
        base: 'ui-btn-sm',
        leadingAvatarSize: 'xs'
      },
      md: {
        base: 'ui-btn-md',
        leadingAvatarSize: 'xs'
      },
      lg: {
        base: 'ui-btn-lg',
        leadingAvatarSize: 'md'
      },
      xl: {
        base: 'ui-btn-xl',
        leadingAvatarSize: 'md'
      }
    },
    block: {
      true: {
        base: 'w-full'
      }
    },
    rounded: {
      true: 'rounded-(--ui-border-radius-lg)',
      false: 'rounded-(--ui-btn-radius)'
    },
    leading: {
      true: ''
    },
    active: {
      true: {
        base: ''
      },
      false: {
        base: ''
      }
    },
    useLabel: {
      true: '',
      false: {
        baseLine: 'ps-[4px] pe-[4px]',
        leadingAvatar: 'me-0'
      }
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
      true: 'normal-case',
      false: 'uppercase'
    },
    isAir: {
      true: '--air',
      // old theme
      false: ''
    }
  },
  compoundVariants: [
    // region default ////
    {
      color: 'default',
      depth: 'light',
      class: '--style-default-light'
    },
    {
      color: 'default',
      depth: 'normal',
      class: '--style-default'
    },
    {
      color: 'default',
      depth: 'dark',
      class: '--style-default-dark'
    },
    // endregion ////
    // region danger ////
    {
      color: 'danger',
      depth: 'light',
      class: '--style-danger-light'
    },
    {
      color: 'danger',
      depth: 'normal',
      class: '--style-danger'
    },
    {
      color: 'danger',
      depth: 'dark',
      class: '--style-danger-dark'
    },
    // endregion ////
    // region success ////
    {
      color: 'success',
      depth: 'light',
      class: '--style-success-light'
    },
    {
      color: 'success',
      depth: 'normal',
      class: '--style-success'
    },
    {
      color: 'success',
      depth: 'dark',
      class: '--style-success-dark'
    },
    // endregion ////
    // region warning ////
    {
      color: 'warning',
      depth: 'light',
      class: '--style-warning-light'
    },
    {
      color: 'warning',
      depth: 'normal',
      class: '--style-warning'
    },
    {
      color: 'warning',
      depth: 'dark',
      class: '--style-warning-dark'
    },
    // endregion ////
    // region primary ////
    {
      color: 'primary',
      depth: 'light',
      class: '--style-primary-light'
    },
    {
      color: 'primary',
      depth: 'normal',
      class: '--style-primary'
    },
    {
      color: 'primary',
      depth: 'dark',
      class: '--style-primary-dark'
    },
    // endregion ////
    // region secondary ////
    {
      color: 'secondary',
      depth: 'light',
      class: '--style-secondary-light'
    },
    {
      color: 'secondary',
      depth: 'normal',
      class: '--style-secondary'
    },
    {
      color: 'secondary',
      depth: 'dark',
      class: '--style-secondary-dark'
    },
    // endregion ////
    // region collab ////
    {
      color: 'collab',
      depth: 'light',
      class: '--style-collab-light'
    },
    {
      color: 'collab',
      depth: 'normal',
      class: '--style-collab'
    },
    {
      color: 'collab',
      depth: 'dark',
      class: '--style-collab-dark'
    },
    // endregion ////
    // region ai ////
    {
      color: 'ai',
      depth: 'light',
      class: '--style-ai-light'
    },
    {
      color: 'ai',
      depth: 'normal',
      class: '--style-ai'
    },
    {
      color: 'ai',
      depth: 'dark',
      class: '--style-ai-dark'
    },
    // endregion ////
    // region link ////
    {
      color: 'link',
      depth: 'light',
      class: '--style-link-light'
    },
    {
      color: 'link',
      depth: 'normal',
      class: '--style-link'
    },
    {
      color: 'link',
      depth: 'dark',
      class: '--style-link-dark'
    },
    // endregion ////
    {
      leading: true,
      useLabel: true,
      useDropdown: false,
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
    },
    // endregion ////
    // region single icon ////
    {
      leading: true,
      useLabel: false,
      useDropdown: false,
      class: {
        base: [
          'w-(--ui-btn-height)'
        ].join(' ')
      }
    }
    // endregion ////
  ],
  defaultVariants: {
    size: 'md',
    color: 'air-secondary-no-accent',
    depth: 'normal',
    normalCase: true,
    isAir: true
  }
}
