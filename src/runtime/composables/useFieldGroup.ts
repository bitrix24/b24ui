import type { InjectionKey, ComputedRef } from 'vue'
import { inject, computed } from 'vue'
import type { FieldGroupProps } from '../components/FieldGroup.vue'
import type { GetObjectField } from '../types/utils'

export const fieldGroupInjectionKey: InjectionKey<ComputedRef<{
  size: FieldGroupProps['size']
  orientation: FieldGroupProps['orientation']
  noSplit: FieldGroupProps['noSplit']
}>> = Symbol('bitrix24-ui.field-group')

type Props<T> = {
  size?: GetObjectField<T, 'size'>
}

export function useFieldGroup<T>(props: Props<T>) {
  const fieldGroup = inject(fieldGroupInjectionKey, undefined)
  return {
    orientation: computed(() => fieldGroup?.value.orientation),
    size: computed(() => props?.size ?? fieldGroup?.value.size),
    noSplit: computed(() => (fieldGroup?.value.orientation !== 'horizontal') || fieldGroup?.value.noSplit === true)
  }
}
