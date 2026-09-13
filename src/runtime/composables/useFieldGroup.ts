import type { InjectionKey, ComputedRef } from 'vue'
import { computed, defineComponent, inject, provide } from 'vue'
import type { FieldGroupProps } from '../components/FieldGroup.vue'
import type { GetObjectField } from '../types/utils'

/** The `size`, `orientation` and `noSplit` a `FieldGroup` imposes on the controls inside it. */
export const fieldGroupInjectionKey: InjectionKey<ComputedRef<{
  size: FieldGroupProps['size']
  orientation: FieldGroupProps['orientation']
  noSplit: FieldGroupProps['noSplit']
}>> = Symbol('bitrix24-ui.field-group')

type Props<T> = {
  size?: GetObjectField<T, 'size'>
}

/**
 * Reads `size` / `orientation` from a wrapping `<B24FieldGroup>` (or `<B24ButtonGroup>`, etc.).
 *
 * **Always pass the raw `_props`, never the `useComponentProps` proxy** — the
 * fallback `props?.size ?? fieldGroup?.value.size` must keep the closer context
 * winning over `<B24Theme :props>`. To still apply theme defaults on bare inputs,
 * fall back to the proxy at the `tv()` call site: `size: groupSize.value ?? props.size`.
 */
export function useFieldGroup<T>(props: Props<T>) {
  const fieldGroup = inject(fieldGroupInjectionKey, undefined)
  return {
    orientation: computed(() => fieldGroup?.value.orientation),
    size: computed(() => props?.size ?? fieldGroup?.value.size),
    noSplit: computed(() => (fieldGroup?.value.orientation !== 'horizontal') || fieldGroup?.value.noSplit === true)
  }
}

/**
 * Opts a subtree out of the surrounding `FieldGroup`.
 *
 * Wrap a control in it when the group's `size` and `orientation` should not
 * reach it — a standalone button inside a joined input row, say. Renders its
 * slot and nothing else.
 */
export const FieldGroupReset = defineComponent({
  name: 'FieldGroupReset',
  setup(_, { slots }) {
    provide(fieldGroupInjectionKey, computed(() => ({
      size: undefined,
      orientation: undefined,
      noSplit: undefined
    })))
    return () => slots.default?.()
  }
})
