import { inject, provide, computed } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { AvatarGroupProps } from '../types'

export const avatarGroupInjectionKey: InjectionKey<ComputedRef<{ size: AvatarGroupProps['size'] }>> = Symbol('bitrix24-ui.avatar-group')

/**
 * Reads `size` from a wrapping `<B24AvatarGroup>`.
 *
 * **Always pass the raw `_props`, never the `useComponentProps` proxy** — the
 * fallback `props.size ?? avatarGroup?.value.size` must keep the wrapping group
 * winning over `<B24Theme :props>`. To still apply theme defaults on bare avatars,
 * fall back to the proxy at the `tv()` call site: `size: size.value ?? props.size`.
 */
export function useAvatarGroup(props: { size: AvatarGroupProps['size'] }) {
  const avatarGroup = inject(avatarGroupInjectionKey, undefined)

  const size = computed(() => props.size ?? avatarGroup?.value.size)
  provide(avatarGroupInjectionKey, computed(() => ({ size: size.value })))

  return {
    size
  }
}
