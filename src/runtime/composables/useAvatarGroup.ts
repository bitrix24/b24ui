import { inject, provide, computed } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { AvatarGroupProps } from '../types'

export const avatarGroupInjectionKey: InjectionKey<ComputedRef<{ size: AvatarGroupProps['size'] }>> = Symbol('bitrix24-ui.avatar-group')

export function useAvatarGroup(props: { size: AvatarGroupProps['size'] }) {
  const avatarGroup = inject(avatarGroupInjectionKey, undefined)

  const size = computed(() => props.size ?? avatarGroup?.value.size)
  provide(avatarGroupInjectionKey, computed(() => ({ size: size.value })))

  return {
    size
  }
}
