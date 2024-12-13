import { computed, toValue, type MaybeRefOrGetter, type DefineComponent } from 'vue'
import type { AvatarProps } from '../types'
// import icons from '../../theme/icons'
//

export interface UseComponentIconsProps {
  /** Display an icon on the left side. */
  icon?: DefineComponent
  /** Display an avatar on the left side. */
  avatar?: AvatarProps
  /** When `true`, the loading icon will be displayed. */
  loading?: boolean
}

export function useComponentIcons(componentProps: MaybeRefOrGetter<UseComponentIconsProps>) {
  const props = computed(() => toValue(componentProps))

  const isLeading = computed(() => (props.value.icon) || (props.value.avatar))

  const leadingIconName = computed(() => {
    return props.value.icon
  })

  return {
    isLeading,
    leadingIconName
  }
}
