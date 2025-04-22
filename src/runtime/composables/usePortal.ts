import { inject, provide, computed, type Ref, type InjectionKey } from 'vue'

export const portalTargetInjectionKey: InjectionKey<Ref<string | HTMLElement>> = Symbol('bitrix24-ui.portal-target')

export function usePortal(portal: Ref<string | HTMLElement | boolean | undefined>) {
  const portalTarget = inject(portalTargetInjectionKey, undefined)
  /**
   * @memo sh: fix server side
   */
  const isClient = typeof window !== 'undefined'

  const to = computed(() => {
    /**
     * @memo sh: fix server side
     */
    if (!isClient) {
      if (typeof portal.value === 'string') {
        return portal.value
      }

      return portalTarget?.value ?? 'body'
    }

    if (typeof portal.value === 'string' || portal.value instanceof HTMLElement) {
      return portal.value
    }

    return portalTarget?.value ?? 'body'
  })

  const disabled = computed(() => typeof portal.value === 'boolean' ? !portal.value : false)

  provide(portalTargetInjectionKey, computed(() => to.value))

  return computed(() => ({
    to: to.value,
    disabled: disabled.value
  }))
}
