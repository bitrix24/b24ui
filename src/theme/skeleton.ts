/**
 * Skeleton
 * A placeholder to show while content is loading.
 * ---
 * @see bitrix/images/intranet/slider/task-add.svg
 */

export default {
  slots: {
    base: 'animate-pulse rounded-(--ui-border-radius-md) '
  },
  variants: {
    accent: {
      default: 'bg-(--ui-color-g-glass-grey-bg-1)',
      accent: 'bg-(--ui-color-g-glass-grey-bg-2)',
      less: 'bg-(--ui-color-g-glass-grey-bg-3)'
    }
  },
  defaultVariants: {
    accent: 'default'
  }
}
