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
 * @todo close icon
 * @todo link mode
 */
export default {
  slots: {
    base: [
      'select-none font-b24-primary font-normal leading-none inline-flex items-center transition-all duration-200 ease-linear',
      'px-2 text-xs leading-none  rounded-md'
    ],
    label: 'max-w-full whitespace-nowrap text-ellipsis', // truncate ////
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailingIcon: 'shrink-0 cursor-pointer'
  },
  variants: {
    useLink: {
      true: {
        base: 'cursor-pointer group',
        label: 'group-hover:border-b group-hover:border-dashed group-hover:border-t group-hover:border-t-transparent'
      }
    },
    useClose: {
      true: 'pe-0.5'
    },
    useFill: {
      true: '',
      false: 'bg-transparent'
    },
    leading: {
      true: 'ps-2xs'
    },
    color: {
      default: 'font-semibold',
      //danger: '',
      success: '',
      warning: 'font-semibold',
      //primary: '',
     // secondary: '',
     // collab: '',
     // ai: ''
    },
    depth: {
      //light: '',
      normal: '',
     // dark: ''
    },
    size: {
      xs: {
        base: 'h-[15px] text-3xs leading-none gap-0.5', // 15px
        label: 'underline-offset-1',
        leadingIcon: 'size-sm',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-sm '
      },
      sm: {
        base: 'h-[17px] gap-1', // 17px
        label: 'underline-offset-1',
        leadingIcon: 'size-sm2',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-sm2'
      },
      md: {
        base: 'h-[19px] gap-1', // 19px
        leadingIcon: 'size-[18px]',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-[18px]'
      },
      lg: {
        base: 'h-[25px] gap-1 rounded-lg',
        leadingIcon: 'size-[22px]',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-[22px]'
      },
      xl: {
        base: 'h-[31px] text-md leading-none gap-1 rounded-xl',
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
        'ring ring-inset ring-base-300 text-black bg-white',
        'dark:ring-base-700 dark:text-base-150 dark:bg-dark:base-dark'
      ].join(' ')
    },
    // DEFAULT ////
    {
      color: 'default',
      depth: 'normal',
      class: [
        'text-base-800 bg-base-150 ring ring-inset ring-base-150',
        'dark:text-base-250 dark:bg-base-600 dark:ring-base-600'
      ].join(' ')
    },
    {
      // LIGHT ////
      color: 'default',
      depth: 'dark',
      class: [
        'text-white bg-base-900',
        'dark:text-base-100 dark:bg-base-350'
      ].join(' ')
    },
    // endregion ////
    // region danger ////
    {
      // LIGHT_RED ////
      color: 'danger',
      depth: 'light',
      class: 'text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)]'
    },
    {
      // DANGER ////
      color: 'danger',
      depth: 'normal',
      class: 'ring ring-inset ring-[var(--ui-border-accented)] text-[var(--ui-text)] bg-[var(--ui-bg)]'
    },
    {
      color: 'danger',
      depth: 'dark',
      class: 'text-[var(--ui-text)] bg-[var(--ui-bg-elevated)]'
    },
    // endregion ////
    // region success ////
    {
      // LIGHT_GREEN ////
      color: 'success',
      depth: 'light',
      class: 'text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)]'
    },
    // SUCCESS ////
    {
      color: 'success',
      depth: 'normal',
      class: [
        'text-green-800 bg-green-300 ring ring-inset ring-green-300',
        'dark:text-green-250 dark:bg-green-600 dark:ring-green-600'
      ].join(' ')
    },
    {
      color: 'success',
      depth: 'dark',
      class: 'text-[var(--ui-text)] bg-[var(--ui-bg-elevated)]'
    },
    // endregion ////
    // region warning ////
    {
      // LIGHT_ORANGE ////
      color: 'warning',
      depth: 'light',
      class: 'text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)]'
    },
    // WARNING ////
    {
      color: 'warning',
      depth: 'normal',
      class: [
        'text-white bg-orange-500 ring ring-inset ring-orange-500',
        'dark:text-orange-250 dark:bg-orange-600 dark:ring-orange-600'
      ].join(' ')
    },
    {
      // ORANGE ////
      color: 'warning',
      depth: 'dark',
      class: 'text-[var(--ui-text)] bg-[var(--ui-bg-elevated)]'
    },
    // endregion ////
    // region primary ////
    {
      // LIGHT_BLUE ////
      color: 'primary',
      depth: 'light',
      class: 'text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)]'
    },
    {
      // PRIMARY ////
      color: 'primary',
      depth: 'normal',
      class: 'ring ring-inset ring-[var(--ui-border-accented)] text-[var(--ui-text)] bg-[var(--ui-bg)]'
    },
    {
      color: 'primary',
      depth: 'dark',
      class: 'text-[var(--ui-text)] bg-[var(--ui-bg-elevated)]'
    },
    // endregion ////
    // region secondary ////
    {
      // TAG_SECONDARY ////
      color: 'secondary',
      depth: 'light',
      class: 'text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)]'
    },
    {
      // SECONDARY ////
      color: 'secondary',
      depth: 'normal',
      class: 'ring ring-inset ring-[var(--ui-border-accented)] text-[var(--ui-text)] bg-[var(--ui-bg)]'
    },
    {
      color: 'secondary',
      depth: 'dark',
      class: 'text-[var(--ui-text)] bg-[var(--ui-bg-elevated)]'
    },
    // endregion ////
    // region ai ////
    {
      // COPILOT_LIGHT ////
      color: 'ai',
      depth: 'light',
      class: 'text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)]'
    },
    {
      // LAVENDER ////
      color: 'ai',
      depth: 'normal',
      class: 'ring ring-inset ring-[var(--ui-border-accented)] text-[var(--ui-text)] bg-[var(--ui-bg)]'
    },
    {
      // COPILOT_LIGHT_REVERSE ////
      color: 'ai',
      depth: 'dark',
      class: 'text-[var(--ui-text)] bg-[var(--ui-bg-elevated)]'
    },
    // endregion ////
    // region useLink & useFill ////
    {
      useLink: true,
      useFill: false,
      class: [
        'hover:bg-base-100 dark:hover:bg-base-900'
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
