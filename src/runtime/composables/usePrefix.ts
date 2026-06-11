import { useAppConfig } from '#imports'

/**
 * Prefixes Tailwind utility class strings with the configured `theme.prefix`,
 * so static utility classes inside Bitrix24 UI components match the consumer's
 * Tailwind `prefix(...)` configuration.
 */
export function usePrefix() {
  const appConfig = useAppConfig() as { b24ui?: { prefix?: string } }
  const prefix = appConfig.b24ui?.prefix

  return (classString: string): string => {
    if (!prefix || !classString) {
      return classString
    }
    return classString
      .split(/\s+/)
      .filter(Boolean)
      .map(cls => `${prefix}:${cls}`)
      .join(' ')
  }
}
