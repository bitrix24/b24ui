/**
 * PageList
 * A vertical list layout for stacking content items.
 * ----
 */

export default {
  base: 'relative flex flex-col',
  variants: {
    divide: {
      true: '*:not-last:after:absolute *:not-last:after:inset-x-1 *:not-last:after:bottom-0 *:not-last:after:bg-(--ui-color-divider-vibrant-default) *:not-last:after:h-px'
    }
  }
}
