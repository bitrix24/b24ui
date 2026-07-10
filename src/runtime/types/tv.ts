import type { ClassValue, TVVariants, TVCompoundVariants, TVDefaultVariants } from 'tailwind-variants'

/**
 * A function form for a slot class that **replaces** the slot's default classes
 * instead of merging onto them. It receives the slot's fully resolved default
 * class string and returns the classes to use in its place.
 * @example title: defaults => 'text-xl font-bold'
 */
export type SlotClassReplacer = (defaults: string) => ClassValue

/**
 * The value accepted for a slot in `:b24ui`, the `class` prop or `app.config.b24ui`:
 * either classes to merge (the default) or a {@link SlotClassReplacer} to replace.
 */
export type SlotClass = ClassValue | SlotClassReplacer

/**
 * Defines the AppConfig object based on the tailwind-variants configuration.
 */
export type TVConfig<T extends Record<string, any>> = {
  [P in keyof T]?: P extends 'prose' ? TVConfig<T[P]> : {
    [K in keyof T[P]as K extends 'base' | 'slots' | 'variants' | 'compoundVariants' | 'defaultVariants' ? K : never]?: K extends 'base' ? SlotClass
      : K extends 'slots' ? {
        [S in keyof T[P]['slots']]?: SlotClass
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
  [K in keyof T['slots']]?: SlotClass
}>

type ComponentUI<T extends { slots?: Record<string, any> }> = Id<{
  [K in keyof Required<T['slots']>]: (props?: Record<string, any>) => string
}>

type GetComponentAppConfig<A, U extends string, K extends string>
  = A extends Record<U, Record<K, any>> ? A[U][K] : {}

type ComponentAppConfig<
  T,
  A extends Record<string, any>,
  K extends string,
  U extends string = 'b24ui' | 'b24ui.prose'
> = Omit<A, 'b24ui'> & {
  b24ui: U extends 'b24ui.prose'
    ? (A extends { b24ui: infer B24UI } ? Omit<B24UI, 'prose'> : Record<string, never>) & {
      prose?: (A extends { b24ui: { prose?: infer P } } ? Omit<NonNullable<P>, K> : Record<string, never>) & {
        [k in K]?: Partial<T>
      }
    }
    : (A extends { b24ui: infer B24UI } ? Omit<B24UI, K> : Record<string, never>) & {
      [k in K]?: Partial<T>
    }
}

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
  U extends 'b24ui' | 'b24ui.prose' = 'b24ui'
> = {
  AppConfig: ComponentAppConfig<T, A, K, U>
  variants: ComponentVariants<T & GetComponentAppConfig<A, U, K>>
  slots: ComponentSlots<T>
  b24ui: ComponentUI<T>
}
