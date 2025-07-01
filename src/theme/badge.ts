/**
 * Badge
 * A short text to represent a status or a category.
 * ---
 * @link /api_d7/bitrix/ui/labels/index.php
 * @see bitrix/js/ui/label/
 */
import { buttonGroupVariant } from './button-group'

export default {
  slots: {
    base: [
      'select-none font-b24-secondary font-normal',
      'inline-flex items-center',
      'transition-all duration-200 ease-linear',
      'px-2 leading-normal rounded-md'
    ].join(' '),
    wrapper: 'inline-flex items-center',
    label: 'max-w-full whitespace-nowrap text-ellipsis decoration-from-font',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailingIcon: 'shrink-0 cursor-pointer hover:rounded-full hover:bg-current/20 dark:hover:bg-current/35'
  },
  variants: {
    ...buttonGroupVariant,
    useLink: {
      true: {
        base: 'cursor-pointer',
        wrapper: 'group',
        label: 'group-hover:underline group-hover:decoration-dashed'
      }
    },
    useClose: {
      true: 'pe-2xs'
    },
    useFill: {
      true: '',
      false: 'bg-transparent'
    },
    leading: {
      true: 'ps-1'
    },
    color: {
      default: '',
      danger: '',
      success: '',
      warning: '',
      primary: '',
      secondary: '',
      collab: '',
      ai: ''
    },
    depth: {
      light: 'font-normal',
      normal: 'font-bold',
      dark: 'font-bold'
    },
    size: {
      xs: {
        base: 'text-5xs gap-0.5',
        wrapper: 'h-[14px] gap-0.5',
        label: 'underline-offset-1',
        leadingIcon: 'size-sm',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-sm '
      },
      sm: {
        base: 'text-4xs gap-1',
        wrapper: 'h-[16px] gap-1',
        label: 'underline-offset-1',
        leadingIcon: 'size-sm2',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-sm2'
      },
      md: {
        base: 'text-3xs gap-1',
        wrapper: 'h-[17px] gap-1',
        label: 'underline-offset-1',
        leadingIcon: 'size-[15px]',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-[15px]'
      },
      lg: {
        base: 'text-xs gap-1 rounded-lg',
        wrapper: 'h-[24px] gap-1',
        leadingIcon: 'size-[22px]',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-[22px]'
      },
      xl: {
        base: 'text-md gap-1 rounded-xl',
        wrapper: 'h-[31px] gap-1',
        leadingIcon: 'size-[26px]',
        leadingAvatarSize: 'xs',
        trailingIcon: 'size-[26px]'
      }
    },
    square: {
      true: ''
    }
  },
  compoundVariants: [
    // region default ////
    // TAG_LIGHT ////
    {
      color: 'default',
      depth: 'light',
      class: [
        'ring ring-inset',
        'text-base-900 bg-base-100 ring-base-100',
        'dark:text-base-900 dark:bg-base-150 dark:ring-base-150'
      ].join(' ')
    },
    // DEFAULT ////
    {
      color: 'default',
      depth: 'normal',
      class: [
        'ring ring-inset',
        'text-base-800 bg-base-150 ring-base-300',
        'dark:text-base-950 dark:bg-base-200 dark:ring-base-800'
      ].join(' ')
    },
    // LIGHT ////
    // @memo it should be LIGHT but that's equivalent to DEFAULT -> so we make it really dark ////
    {
      color: 'default',
      depth: 'dark',
      class: [
        'ring ring-inset',
        'text-white bg-base-500 ring-base-500',
        'dark:text-base-50 dark:bg-base-600 dark:ring-base-600'
      ].join(' ')
    },
    // endregion ////
    // region danger ////
    // LIGHT_RED ////
    {
      color: 'danger',
      depth: 'light',
      class: [
        'ring ring-inset',
        'text-red-800 bg-red-500/17 ring-red-500/17',
        'dark:text-red-900 dark:bg-red-300 dark:ring-red-300'
      ].join(' ')
    },
    // DANGER ////
    {
      color: 'danger',
      depth: 'normal',
      class: [
        'ring ring-inset',
        'text-red-800 bg-red-250 ring-red-250',
        'dark:text-red-800 dark:bg-red-350 dark:ring-red-350'
      ].join(' ')
    },
    // danger_dark ////
    {
      color: 'danger',
      depth: 'dark',
      class: [
        'ring ring-inset',
        'text-white bg-red-500 ring-red-500',
        'dark:text-red-250 dark:bg-red-600 dark:ring-red-600'
      ].join(' ')
    },
    // endregion ////
    // region success ////
    // LIGHT_GREEN ////
    // @memo it should be LIGHT_GREEN but that's equivalent to SUCCESS -> so we make it really light ////
    {
      color: 'success',
      depth: 'light',
      class: [
        'ring ring-inset',
        'text-green-800 bg-green-500/17 ring-green-500/17',
        'dark:text-green-900 dark:bg-green-300 dark:ring-green-300'
      ].join(' ')
    },
    // SUCCESS ////
    {
      color: 'success',
      depth: 'normal',
      class: [
        'ring ring-inset',
        'text-green-800 bg-green-300 ring-green-300',
        'dark:text-green-800 dark:bg-green-330 dark:ring-green-330'
      ].join(' ')
    },
    // success_dark ////
    {
      color: 'success',
      depth: 'dark',
      class: [
        'ring ring-inset',
        'text-white bg-green-500 ring-green-500',
        'dark:text-green-250 dark:bg-green-600 dark:ring-green-600'
      ].join(' ')
    },
    // endregion ////
    // region warning ////
    // ORANGE ////
    {
      color: 'warning',
      depth: 'light',
      class: [
        'ring ring-inset',
        'text-orange-800 bg-orange-250 ring-orange-300',
        'dark:text-orange-900 dark:bg-orange-300 dark:ring-orange-300'
      ].join(' ')
    },
    // LIGHT_ORANGE ////
    {
      color: 'warning',
      depth: 'normal',
      class: [
        'ring ring-inset',
        'text-orange-800 bg-orange-300 ring-orange-300',
        'dark:text-orange-800 dark:bg-orange-400 dark:ring-orange-400'
      ].join(' ')
    },
    // WARNING ////
    {
      color: 'warning',
      depth: 'dark',
      class: [
        'ring ring-inset',
        'text-white bg-orange-500 ring-orange-500',
        'dark:text-orange-250 dark:bg-orange-600 dark:ring-orange-600'
      ].join(' ')
    },
    // endregion ////
    // region primary ////
    // LIGHT_BLUE ////
    // @memo it should be LIGHT_BLUE but that's equivalent to PRIMARY -> so we make it really light ////
    {
      color: 'primary',
      depth: 'light',
      class: [
        'ring ring-inset',
        'text-blue-800 bg-blue-500/17 ring-blue-500/17',
        'dark:text-blue-900 dark:bg-blue-300 dark:ring-blue-300'
      ].join(' ')
    },
    // PRIMARY ////
    {
      color: 'primary',
      depth: 'normal',
      class: [
        'ring ring-inset',
        'text-blue-700 bg-blue-250 ring-blue-250',
        'dark:text-blue-700 dark:bg-blue-300 dark:ring-blue-300'
      ].join(' ')
    },
    // primary_dark ////
    {
      color: 'primary',
      depth: 'dark',
      class: [
        'ring ring-inset',
        'text-white bg-blue-500 ring-blue-500',
        'dark:text-blue-250 dark:bg-blue-600 dark:ring-blue-600'
      ].join(' ')
    },
    // endregion ////
    // region secondary ////
    // TAG_SECONDARY ////
    {
      color: 'secondary',
      depth: 'light',
      class: [
        'ring ring-inset',
        'text-base-master bg-blue-320 ring-blue-320',
        'dark:text-base-master dark:bg-blue-400 dark:ring-blue-400'
      ].join(' ')
    },
    // SECONDARY ////
    {
      color: 'secondary',
      depth: 'normal',
      class: [
        'ring ring-inset',
        'text-white bg-cyan-350 ring-cyan-350',
        'dark:text-cyan-100 dark:bg-cyan-400 dark:ring-cyan-400'
      ].join(' ')
    },
    // secondary_dark ////
    {
      color: 'secondary',
      depth: 'dark',
      class: [
        'ring ring-inset',
        'text-white bg-cyan-500 ring-cyan-500',
        'dark:text-cyan-250 dark:bg-cyan-600 dark:ring-cyan-600'
      ].join(' ')
    },
    // endregion ////
    // region collab ////
    {
      color: 'collab',
      depth: 'light',
      class: [
        'ring ring-inset',
        'text-collab-800 bg-collab-500/17 ring-collab-500/17',
        'dark:text-collab-900 dark:bg-collab-300 dark:ring-collab-300'
      ].join(' ')
    },
    {
      color: 'collab',
      depth: 'normal',
      class: [
        'ring ring-inset',
        'text-collab-800 bg-collab-300 ring-collab-300',
        'dark:text-collab-800 dark:bg-collab-300 dark:ring-collab-300'
      ].join(' ')
    },
    {
      color: 'collab',
      depth: 'dark',
      class: [
        'ring ring-inset',
        'text-white bg-collab-500 ring-collab-500',
        'dark:text-collab-250 dark:bg-collab-600 dark:ring-collab-600'
      ].join(' ')
    },
    // endregion ////
    // region ai ////
    // COPILOT_LIGHT_REVERSE ////
    {
      color: 'ai',
      depth: 'light',
      class: [
        'ring ring-inset',
        'text-ai-500 bg-white ring-ai-10',
        'dark:text-ai-500 dark:bg-ai-50 dark:ring-ai-50'
      ].join(' ')
    },
    // LAVENDER ////
    {
      color: 'ai',
      depth: 'normal',
      class: [
        'ring ring-inset',
        'text-ai-500 bg-ai-150 ring-ai-150',
        'dark:text-ai-600 dark:bg-ai-200 dark:ring-ai-200'
      ].join(' ')
    },
    // COPILOT_LIGHT ////
    {
      color: 'ai',
      depth: 'dark',
      class: [
        'ring ring-inset',
        'text-white bg-ai-330 ring-ai-330',
        'dark:text-ai-100 dark:bg-ai-400 dark:ring-ai-400'
      ].join(' ')
    },
    // endregion ////
    // region square ////
    {
      size: 'xs',
      square: true,
      class: {
        base: 'p-0 ps-0 pe-0',
        wrapper: 'p-0.5 gap-0'
      }
    },
    {
      size: 'sm',
      square: true,
      class: {
        base: 'p-0 ps-0 pe-0',
        wrapper: 'p-1 gap-0'
      }
    },
    {
      size: 'md',
      square: true,
      class: {
        base: 'p-0 ps-0 pe-0',
        wrapper: 'p-1 gap-0'
      }
    },
    {
      size: 'lg',
      square: true,
      class: {
        base: 'p-0 ps-0 pe-0',
        wrapper: 'p-1 gap-0'
      }
    },
    {
      size: 'xl',
      square: true,
      class: {
        base: 'p-0 ps-0 pe-0',
        wrapper: 'p-1 gap-0'
      }
    },
    // endregion ////
    // region useLink & useFill ////
    {
      useLink: true,
      useFill: false,
      class: [
        // 'hover:bg-base-100 dark:hover:bg-base-900'
      ].join(' ')
    },
    {
      useFill: false,
      class: 'text-base-800 dark:text-base-250 bg-transparent dark:bg-transparent'
    },
    // endregion ////
    // region useClose ////
    {
      useClose: true,
      class: ''
    },
    // endregion ////
    // region buttonGroup ////
    {
      buttonGroup: ['horizontal', 'vertical'],
      class: 'rounded-2xs'
    }
    // endregion ////
  ],
  defaultVariants: {
    color: 'default',
    depth: 'normal',
    size: 'md',
    useFill: false
  }
}
