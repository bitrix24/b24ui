import { ref, computed, isRef } from 'vue'
import type { Ref } from 'vue'

export type UseLoadingProps = {
  /**
   * The id of the SidebarLayout.
   * @defaultValue useId()
   */
  id?: string
  /**
   * The storage to use for the size.
   * @defaultValue 'cookie'
   */
  storage?: 'cookie' | 'local'
  /**
   * Unique id used to auto-save size.
   * @defaultValue 'dashboard'
   */
  storageKey?: string
}

export type UseLoadingReturn = {
  elLayout: Ref<HTMLElement | null>
  isLoading: Ref<boolean>
  load: (value?: boolean) => void
}

export const useLoading = (
  _key: string,
  options: Ref<UseLoadingProps> | UseLoadingProps = {},
  { loading = ref(false) }: { loading?: Ref<boolean> } = {}
): UseLoadingReturn => {
  const elLayout = ref<HTMLElement | null>(null)

  // @memo next time we make open/close state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const opts = computed(() => ({
    ...(isRef(options) ? options.value : options)
  }))

  const isLoading = computed({
    get: () => {
      if (isRef(loading)) {
        return loading.value
      }

      return false
    },
    set: (value: boolean) => {
      if (isRef(loading)) {
        loading.value = value
      }
    }
  })

  const load = (value?: boolean) => {
    isLoading.value = (value === true)
  }

  return {
    elLayout,
    isLoading,
    load
  }
}
