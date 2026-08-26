import type { Component } from 'vue'
import { reactive, markRaw, shallowReactive } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import type { ComponentProps, ComponentEmit } from 'vue-component-type-helpers'

type CloseEventArgTypeSimple<T> = T extends (event: 'close', arg_0: infer Arg, ...args: any[]) => void ? Arg : never
/**
 * This is a workaround for a design limitation in TypeScript.
 *
 * Conditional types only match the last function overload, not a union of all possible
 * parameter types. This workaround forces TypeScript to properly extract the 'close'
 * event argument type from component emits with multiple event signatures.
 *
 * @see https://github.com/microsoft/TypeScript/issues/32164
 */
type CloseEventArgTypeComplex<T> = T extends {
  (event: 'close', arg_0: infer Arg, ...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
  (...args: any[]): void
} ? Arg : never

type CloseEventArgType<T> = CloseEventArgTypeSimple<T> | CloseEventArgTypeComplex<T>

export type OverlayOptions<OverlayAttrs = Record<string, any>> = {
  defaultOpen?: boolean
  props?: OverlayAttrs
  destroyOnClose?: boolean
}

interface ManagedOverlayOptionsPrivate<T extends Component> {
  component?: T
  id: symbol
  isMounted: boolean
  isOpen: boolean
  originalProps?: ComponentProps<T>
  resolvePromise?: (value: any) => void
}
export type Overlay = OverlayOptions<Component> & ManagedOverlayOptionsPrivate<Component>

type OverlayInstance<T extends Component> = Omit<ManagedOverlayOptionsPrivate<T>, 'component'> & {
  id: symbol
  open: (props?: ComponentProps<T>) => OpenedOverlay<T>
  close: (value?: any) => void
  patch: (props: Partial<ComponentProps<T>>) => void
}

type OpenedOverlay<T extends Component> = Omit<OverlayInstance<T>, 'open' | 'close' | 'patch' | 'modelValue' | 'resolvePromise'> & {
  result: Promise<CloseEventArgType<ComponentEmit<T>>>
} & Promise<CloseEventArgType<ComponentEmit<T>>>

function _useOverlay() {
  const overlays = shallowReactive<Overlay[]>([])

  const create = <T extends Component>(component: T, _options?: OverlayOptions<ComponentProps<T>>): OverlayInstance<T> => {
    const { props, defaultOpen, destroyOnClose } = _options || {}

    const options = reactive<Overlay>({
      id: Symbol(import.meta.dev ? 'useOverlay' : ''),
      isOpen: !!defaultOpen,
      component: markRaw(component!),
      isMounted: !!defaultOpen,
      destroyOnClose: !!destroyOnClose,
      originalProps: props || {},
      props: { ...props }
    })

    overlays.push(options)

    return {
      ...options,
      open: <T extends Component>(props?: ComponentProps<T>) => open(options.id, props),
      close: value => close(options.id, value),
      patch: <T extends Component>(props: Partial<ComponentProps<T>>) => patch(options.id, props)
    }
  }

  const open = <T extends Component>(id: symbol, props?: ComponentProps<T>): OpenedOverlay<T> => {
    const overlay = getOverlay(id)

    // If props are provided, merge them with the original props, otherwise use the original props
    if (props) {
      overlay.props = { ...overlay.originalProps, ...props }
    } else {
      overlay.props = { ...overlay.originalProps }
    }

    overlay.isOpen = true
    overlay.isMounted = true
    const result = new Promise<any>(resolve => overlay.resolvePromise = resolve)

    return Object.assign(result, {
      id,
      isMounted: overlay.isMounted,
      isOpen: overlay.isOpen,
      result
    })
  }

  const close = (id: symbol, value?: any): void => {
    const overlay = getOverlay(id)

    overlay.isOpen = false

    // Resolve the promise if it exists
    if (overlay.resolvePromise) {
      overlay.resolvePromise(value)
      overlay.resolvePromise = undefined
    }
  }

  const closeAll = (): void => {
    overlays.forEach(overlay => close(overlay.id))
  }

  const unmount = (id: symbol): void => {
    const overlay = getOverlay(id)

    overlay.isMounted = false

    if (overlay.destroyOnClose) {
      const index = overlays.findIndex(overlay => overlay.id === id)
      overlays.splice(index, 1)
    }
  }

  const patch = <T extends Component>(id: symbol, props: Partial<ComponentProps<T>>): void => {
    const overlay = getOverlay(id)

    overlay.props = { ...overlay.props, ...props }
  }

  const getOverlay = (id: symbol): Overlay => {
    const overlay = overlays.find(overlay => overlay.id === id)

    if (!overlay) {
      throw new Error('Overlay not found')
    }

    return overlay
  }

  const isOpen = (id: symbol): boolean => {
    const overlay = getOverlay(id)

    return overlay.isOpen
  }

  return {
    overlays,
    open,
    close,
    closeAll,
    create,
    patch,
    unmount,
    isOpen
  }
}

/**
 * Opens modals, slideovers and drawers from script rather than from a template
 * — the case where the component that raises the dialog is not the one that
 * should own its markup: a route guard, a store action, a table row's menu.
 *
 * `create()` registers a component and hands back a handle. `open()` mounts it
 * and returns a promise that settles with whatever the overlay emits on
 * `close`, so a confirmation reads as one `await` instead of a callback and a
 * ref. `patch()` updates the props of an overlay that is already on screen.
 *
 * Shared across the app (`createSharedComposable`), so the same overlay cannot
 * be mounted twice by two callers, and `closeAll()` means all of them.
 *
 * Requires a `<B24OverlayProvider />` in the tree.
 *
 * @returns `overlays` plus `create`, `open`, `close`, `closeAll`, `patch`,
 *   `unmount` and `isOpen`.
 *
 * @example
 * ```ts
 * const overlay = useOverlay()
 * const modal = overlay.create(ConfirmModal)
 *
 * const confirmed = await modal.open({ title: 'Delete this deal?' }).result
 * if (confirmed) {
 *   await remove()
 * }
 * ```
 *
 * @see https://bitrix24.github.io/b24ui/docs/composables/use-overlay/
 */
export const useOverlay = /* @__PURE__ */ createSharedComposable(_useOverlay)
