import type { CardProps } from '@bitrix24/b24ui-nuxt'
import { computed, inject, provide, ref, type ComputedRef, type InjectionKey, type Ref } from 'vue'

/**
 * Playground context configuration
 */
export interface PlaygroundContextOptions {
  /**
   * Whether to use background styling
   * @defaultValue true
   */
  isUseBg?: boolean
}

/**
 * Playground context state
 */
export interface PlaygroundContext {
  /**
   * Reactive flag indicating whether background styling is enabled
   */
  isUseBg: Ref<boolean>
}

/**
 * Card variant and class computed from playground context
 */
export interface PlaygroundCardStyles {
  /**
   * Card variant based on background setting
   */
  cardVariant: ComputedRef<CardProps['variant']>
  /**
   * Additional CSS classes for card border styling
   */
  cardBorderClass: ComputedRef<string>
}

const playgroundContextInjectionKey: InjectionKey<PlaygroundContext> = Symbol.for('playground.context')
export function createPlaygroundContext(options?: PlaygroundContextOptions): PlaygroundContext {
  return {
    isUseBg: ref(options?.isUseBg ?? true)
  }
}

export function providePlaygroundContext(context: PlaygroundContext): PlaygroundContext {
  provide(playgroundContextInjectionKey, context)
  return context
}

export function usePlaygroundContext(): PlaygroundContext {
  const context = inject(playgroundContextInjectionKey)
  if (!context) {
    throw new Error('usePlaygroundContext() must be used inside a provider')
  }
  return context
}

/**
 * Computes card variant and classes based on playground context
 * Falls back to default values if context is not available
 * @param fallbackContext - Optional context to use if injection fails
 * @returns Computed card variant and classes
 */
export function usePlaygroundCardStyles(fallbackContext?: PlaygroundContext): PlaygroundCardStyles {
  const context = inject(playgroundContextInjectionKey, null) || fallbackContext

  if (!context) {
    return {
      cardVariant: computed(() => 'outline-no-accent' as const),
      cardBorderClass: computed(() => '')
    }
  }

  const cardVariant = computed<CardProps['variant']>(() =>
    context.isUseBg.value ? 'outline-no-accent' : 'plain-no-accent'
  )
  const cardBorderClass = computed(() =>
    context.isUseBg.value ? '' : 'border-(length:--ui-design-outline-na-stroke-weight) border-transparent'
  )

  return {
    cardVariant,
    cardBorderClass
  }
}
