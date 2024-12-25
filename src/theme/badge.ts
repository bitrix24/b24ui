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
 * @todo font
 */
export default {
  slots: {
    base: 'font-medium inline-flex items-center',
    label: 'truncate',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailingIcon: 'shrink-0'
  },
  variants: {
    color: {
      default: '',
      danger: '',
      success: '',
      warning: '',
      primary: '',
      secondary: '',
      ai: ''
    },
    depth: {
      light: '',
      normal: '',
      dark: ''
    },
    size: {
      xs: {
        base: 'text-[8px]/3 px-1 py-0.5 gap-1 rounded-2xs',
        leadingIcon: 'size-lg2',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-lg2'
      },
      sm: {
        base: 'text-[10px]/3 px-1.5 py-1 gap-1 rounded-2xs',
        leadingIcon: 'size-lg2',
        leadingAvatarSize: 'xs',
        trailingIcon: 'size-lg2'
      },
      md: {
        base: 'text-xs px-2 py-1 gap-1 rounded-md',
        leadingIcon: 'size-[24px]',
        leadingAvatarSize: 'sm',
        trailingIcon: 'size-[24px]'
      },
      lg: {
        base: 'text-sm px-2 py-1 gap-1.5 rounded-md',
        leadingIcon: 'size-[24px]',
        leadingAvatarSize: 'md',
        trailingIcon: 'size-[24px]'
      }
    }
  },
  compoundVariants: [
    // region default ////
    {
      color: 'default',
      depth: 'light',
      class: [
        'ring ring-inset ring-base-300 text-black bg-white',
        'dark:ring-base-700 dark:text-base-150 dark:bg-dark:base-dark'
      ].join(' ')
    },
    {
      color: 'default',
      depth: 'normal',
      class: [
        'dark:text-black bg-base-100',
        'dark:text-base-150 dark:bg-base-900'
      ].join(' ')
    },
    {
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
      color: 'danger',
      depth: 'light',
      class: 'text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)]'
    },
    {
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
      color: 'success',
      depth: 'light',
      class: 'text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)]'
    },
    {
      color: 'success',
      depth: 'normal',
      class: 'ring ring-inset ring-[var(--ui-border-accented)] text-[var(--ui-text)] bg-[var(--ui-bg)]'
    },
    {
      color: 'success',
      depth: 'dark',
      class: 'text-[var(--ui-text)] bg-[var(--ui-bg-elevated)]'
    },
    // endregion ////
    // region warning ////
    {
      color: 'warning',
      depth: 'light',
      class: 'text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)]'
    },
    {
      color: 'warning',
      depth: 'normal',
      class: 'ring ring-inset ring-[var(--ui-border-accented)] text-[var(--ui-text)] bg-[var(--ui-bg)]'
    },
    {
      color: 'warning',
      depth: 'dark',
      class: 'text-[var(--ui-text)] bg-[var(--ui-bg-elevated)]'
    },
    // endregion ////
    // region primary ////
    {
      color: 'primary',
      depth: 'light',
      class: 'text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)]'
    },
    {
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
      color: 'secondary',
      depth: 'light',
      class: 'text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)]'
    },
    {
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
      color: 'ai',
      depth: 'light',
      class: 'text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)]'
    },
    {
      color: 'ai',
      depth: 'normal',
      class: 'ring ring-inset ring-[var(--ui-border-accented)] text-[var(--ui-text)] bg-[var(--ui-bg)]'
    },
    {
      color: 'ai',
      depth: 'dark',
      class: 'text-[var(--ui-text)] bg-[var(--ui-bg-elevated)]'
    },
    // endregion ////
    // region DEMO @todo remove ////
    ...([]).map((color: string) => ({
      color,
      depth: 'light',
      class: `bg-[var(--ui-${color})] text-[var(--ui-bg)]`
    })),
    ...([]).map((color: string) => ({
      color,
      depth: 'normal',
      class: `text-[var(--ui-${color})] ring ring-inset ring-[var(--ui-${color})]/50`
    })),
    ...([]).map((color: string) => ({
      color,
      depth: 'dark',
      class: `bg-[var(--ui-${color})]/10 text-[var(--ui-${color})]`
    }))
    // endregion ////
  ],
  defaultVariants: {
    color: 'default',
    depth: 'normal',
    size: 'md'
  }
}
