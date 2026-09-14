import { inject, computed } from 'vue'
import type { Ref, InjectionKey } from 'vue'

/** Where portalled content goes by default, for components whose `portal` prop is `true`. */
export const portalTargetInjectionKey: InjectionKey<Ref<boolean | string | HTMLElement>> = Symbol('bitrix24-ui.portal-target')

/**
 * Resolves a component's `portal` prop into the props reka-ui's `Teleport`
 * wants, honouring the app-wide default underneath it.
 *
 * `true` means "wherever the app said" — the target provided through
 * `portalTargetInjectionKey`, or `body` if nothing did. `false` renders in
 * place, which is what a popup inside a dialog usually needs. A string or an
 * element is used as-is.
 *
 * @param portal The component's `portal` prop, as a ref.
 * @returns `{ to, disabled }`, ready to spread onto a `Teleport`.
 */
export function usePortal(portal: Ref<boolean | string | HTMLElement | undefined>) {
  const globalPortal = inject(portalTargetInjectionKey, undefined)

  const value = computed(() => portal.value === true ? globalPortal?.value : portal.value)

  const disabled = computed(() => typeof value.value === 'boolean' ? !value.value : false)
  const to = computed(() => typeof value.value === 'boolean' ? 'body' : value.value)

  return computed(() => ({
    to: to.value,
    disabled: disabled.value
  }))
}
