import type { ClassValue, TVVariants, TVCompoundVariants, TVDefaultVariants } from 'tailwind-variants'

/**
 * Defines the AppConfig object based on the tailwind-variants configuration.
 */
export type TVConfig<T extends Record<string, any>> = {
  [P in keyof T]?: {
    [K in keyof T[P]as K extends 'base' | 'slots' | 'variants' | 'compoundVariants' | 'defaultVariants' ? K : never]?: K extends 'base' ? ClassValue
      : K extends 'slots' ? {
        [S in keyof T[P]['slots']]?: ClassValue
      }
        : K extends 'variants' ? TVVariants<T[P]['slots'], ClassValue, T[P]['variants']>
          : K extends 'compoundVariants' ? TVCompoundVariants<T[P]['variants'], T[P]['slots'], ClassValue, object, undefined>
            : K extends 'defaultVariants' ? TVDefaultVariants<T[P]['variants'], T[P]['slots'], object, undefined>
              : never
  }
}

/**
 * Utility type to flatten intersection types for better IDE hover information.
 * @template T The type to flatten.
 */
type Id<T> = {} & { [P in keyof T]: T[P] }

type ComponentVariants<T extends { variants?: Record<string, Record<string, any>> }> = {
  [K in keyof T['variants']]: keyof T['variants'][K]
}

type ComponentSlots<T extends { slots?: Record<string, any> }> = Id<{
  [K in keyof T['slots']]?: ClassValue
}>

type GetComponentAppConfig<A, U extends string, K extends string> =
  A extends Record<U, Record<K, any>> ? A[U][K] : {}

type ComponentAppConfig<
  T,
  A extends Record<string, any>,
  K extends string,
  U extends string = 'b24ui' | 'b24ui.content' | 'b24ui.prose'
> = A & (
  U extends 'b24ui'
    ? { b24ui?: Record<K, Partial<T>> }
    : U extends 'b24ui.content'
      ? { b24ui?: { content?: Record<K, Partial<T>> } }
      : U extends 'b24ui.prose'
        ? { b24ui?: { prose?: Record<K, Partial<T>> } }
        : never
  )

/**
 * Defines the configuration shape expected for a component.
 * @template T The component's theme imported from `#build/b24ui/*`.
 * @template A The base AppConfig type from `@nuxt/schema`.
 * @template K The key identifying the component (e.g., 'badge').
 * @template U The top-level key in AppConfig ('b24ui').
 */
export type ComponentConfig<
  T extends Record<string, any>,
  A extends Record<string, any>,
  K extends string,
  U extends 'b24ui' | 'b24ui.content' | 'b24ui.prose' = 'b24ui'
> = {
  AppConfig: ComponentAppConfig<T, A, K, U>
  variants: ComponentVariants<T & GetComponentAppConfig<A, U, K>>
  slots: ComponentSlots<T>
}
