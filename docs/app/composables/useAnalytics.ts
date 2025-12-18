// import { track } from '@vercel/analytics'

type AllowedPropertyValues = string | number | boolean | null | undefined
type PlainFlags = Record<string, unknown>
type FlagsDataInput = (string | PlainFlags)[] | PlainFlags

export function useAnalytics() {
  function track(
    _name: string,
    _properties?: Record<string, AllowedPropertyValues>,
    _options?: { flags?: FlagsDataInput }
  ): void {
    // dummy
  }

  return {
    track
  }
}
