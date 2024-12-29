/**
 * Badge
 * A short text to represent a status or a category.
 * ---
 * @link /api_d7/bitrix/ui/labels/index.php
 * @see bitrix/js/ui/label/
 */

/**
 * @todo color
 * @todo depth
 * @todo dark mode
 */
export default {
  slots: {
    base: [
      'select-none font-b24-secondary font-normal',
      'inline-flex items-center',
      'transition-all duration-200 ease-linear',
      'px-2 leading-normal rounded-md'
      // 'text-base-800 dark:text-base-250'
    ],
    wrapper: 'inline-flex items-center',
    label: 'max-w-full whitespace-nowrap text-ellipsis', // truncate ////
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailingIcon: 'shrink-0 cursor-pointer  hover:rounded-full hover:bg-current/20 dark:hover:bg-current/35'
  },
  variants: {
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
      true: 'ps-2xs'
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
        base: 'gap-1 text-4xs',
        wrapper: 'h-[16px] gap-1',
        label: 'underline-offset-1',
        leadingIcon: 'size-sm2',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-sm2'
      },
      md: {
        base: 'gap-1 text-3xs',
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
        'text-base-800 bg-base-150 ring-base-150',
        'dark:text-base-950 dark:bg-base-200 dark:ring-base-200'
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
        'text-red-800 bg-red-500/17 ring ring-inset ring-red-500/17',
        'dark:text-red-900 dark:bg-red-300 dark:ring-red-300'
      ].join(' ')
    },
    // DANGER ////
    {
      color: 'danger',
      depth: 'normal',
      class: [
        'text-red-800 bg-red-250 ring ring-inset ring-red-250',
        'dark:text-red-800 dark:bg-red-350 dark:ring-red-350'
      ].join(' ')
    },
    // danger_dark ////
    {
      color: 'danger',
      depth: 'dark',
      class: [
        'text-white bg-red-500 ring ring-inset ring-red-500',
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
        'text-green-800 bg-green-500/17 ring ring-inset ring-green-500/17',
        'dark:text-green-900 dark:bg-green-300 dark:ring-green-300'
      ].join(' ')
    },
    // SUCCESS ////
    {
      color: 'success',
      depth: 'normal',
      class: [
        'text-green-800 bg-green-300 ring ring-inset ring-green-300',
        'dark:text-green-800 dark:bg-green-330 dark:ring-green-330'
      ].join(' ')
    },
    // success_dark ////
    {
      color: 'success',
      depth: 'dark',
      class: [
        'text-white bg-green-500 ring ring-inset ring-green-500',
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
        'text-orange-800 bg-orange-250 ring ring-inset ring-orange-300',
        'dark:text-orange-900 dark:bg-orange-300 dark:ring-orange-300'
      ].join(' ')
    },
    // LIGHT_ORANGE ////
    {
      color: 'warning',
      depth: 'normal',
      class: [
        'text-orange-800 bg-orange-300 ring ring-inset ring-orange-300',
        'dark:text-orange-800 dark:bg-orange-400 dark:ring-orange-400'
      ].join(' ')
    },
    // WARNING ////
    {
      color: 'warning',
      depth: 'dark',
      class: [
        'text-white bg-orange-500 ring ring-inset ring-orange-500',
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
        'text-blue-800 bg-blue-500/17 ring ring-inset ring-blue-500/17',
        'dark:text-blue-900 dark:bg-blue-300 dark:ring-blue-300'
      ].join(' ')
    },
    // PRIMARY ////
    {
      color: 'primary',
      depth: 'normal',
      class: [
        'text-blue-700 bg-blue-250 ring ring-inset ring-blue-250',
        'dark:text-blue-700 dark:bg-blue-300 dark:ring-blue-300'
      ].join(' ')
    },
    // primary_dark ////
    {
      color: 'primary',
      depth: 'dark',
      class: [
        'text-white bg-blue-500 ring ring-inset ring-blue-500',
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
        'text-base-master bg-blue-320 ring ring-inset ring-blue-320',
        'dark:text-base-master dark:bg-blue-400 dark:ring-blue-400'
      ].join(' ')
    },
    // SECONDARY ////
    {
      color: 'secondary',
      depth: 'normal',
      class: [
        'text-white bg-secondary-350 ring ring-inset ring-secondary-350',
        'dark:text-secondary-100 dark:bg-secondary-400 dark:ring-secondary-400'
      ].join(' ')
    },
    // secondary_dark ////
    {
      color: 'secondary',
      depth: 'dark',
      class: [
        'text-white bg-secondary-500 ring ring-inset ring-secondary-500',
        'dark:text-secondary-250 dark:bg-secondary-600 dark:ring-secondary-600'
      ].join(' ')
    },
    // endregion ////
    // region collab ////
    {
      color: 'collab',
      depth: 'light',
      class: [
        'text-collab-800 bg-collab-500/17 ring ring-inset ring-collab-500/17',
        'dark:text-collab-900 dark:bg-collab-300 dark:ring-collab-300'
      ].join(' ')
    },
    {
      color: 'collab',
      depth: 'normal',
      class: [
        'text-collab-800 bg-collab-300 ring ring-inset ring-collab-300',
        'dark:text-collab-800 dark:bg-collab-300 dark:ring-collab-300'
      ].join(' ')
    },
    {
      color: 'collab',
      depth: 'dark',
      class: [
        'text-white bg-collab-500 ring ring-inset ring-collab-500',
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
        'text-ai-500 bg-white ring ring-inset ring-ai-10',
        'dark:text-ai-500 dark:bg-ai-50 dark:ring-ai-50'
      ].join(' ')
    },
    // LAVENDER ////
    {
      color: 'ai',
      depth: 'normal',
      class: [
        'text-ai-500 bg-ai-150 ring ring-inset ring-ai-150',
        'dark:text-ai-600 dark:bg-ai-200 dark:ring-ai-200'
      ].join(' ')
    },
    // COPILOT_LIGHT ////
    {
      color: 'ai',
      depth: 'dark',
      class: [
        'text-white bg-ai-330 ring ring-inset ring-ai-330',
        'dark:text-ai-100 dark:bg-ai-400 dark:ring-ai-400'
      ].join(' ')
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
