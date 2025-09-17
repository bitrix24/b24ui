import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { AvatarProps, IconComponent } from '../types'
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

export function useComponentIcons(componentProps: MaybeRefOrGetter<UseComponentIconsProps>) {
  const props = computed(() => toValue(componentProps))

  const isLeading = computed(() => (props.value.icon && !props.value.trailing) || (props.value.loading && !props.value.trailing) || (props.value.avatar))

  const isTrailing = computed(() => (props.value.icon && props.value.trailing) || (props.value.loading && props.value.trailing) || !!props.value.trailingIcon)

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
