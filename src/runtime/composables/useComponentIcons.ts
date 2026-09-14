import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { AvatarProps } from '../components/Avatar.vue'
import type { IconComponent } from '../types/icons'
import icons from '../dictionary/icons'

export interface UseComponentIconsProps {
  /**
   * Display an icon on the left side.
   * @IconComponent
   */
  icon?: IconComponent
  /** Display an avatar on the left side. */
  avatar?: AvatarProps
  /** When `true`, the loading icon will be displayed. */
  loading?: boolean
  /** When `true`, the icon will be displayed on the right side. */
  trailing?: boolean
  /**
   * Display an icon on the right side.
   * @IconComponent
   */
  trailingIcon?: IconComponent
}

/**
 * Works out which side a component's icon goes on, from the props every
 * icon-bearing component shares.
 *
 * The rules are not obvious from the props alone: `loading` replaces the icon
 * rather than joining it, `avatar` is always leading, and `trailingIcon`
 * counts as trailing unless `trailing` is explicitly `false`. Centralised here
 * so `Button`, `Badge`, `Link`, `Chip` and the inputs agree.
 *
 * @param componentProps The component's own props — a ref, getter or object.
 * @returns `isLeading` / `isTrailing`, and the resolved
 *   `leadingIconName` / `trailingIconName`.
 */
export function useComponentIcons(componentProps: MaybeRefOrGetter<UseComponentIconsProps>) {
  const props = computed(() => toValue(componentProps))

  const isLeading = computed(() => (props.value.icon && !props.value.trailing) || (props.value.loading && !props.value.trailing) || (props.value.avatar))

  const isTrailing = computed(() => (props.value.icon && props.value.trailing) || (props.value.loading && props.value.trailing) || (!!props.value.trailingIcon && props.value.trailing !== false))

  const leadingIconName = computed(() => {
    if (props.value.loading) {
      return icons.loading
    }

    return props.value.icon
  })

  const trailingIconName = computed(() => {
    if (props.value.loading && !isLeading.value) {
      return icons.loading
    }

    return props.value.trailingIcon || props.value.icon
  })

  return {
    isLeading,
    isTrailing,
    leadingIconName,
    trailingIconName
  }
}
