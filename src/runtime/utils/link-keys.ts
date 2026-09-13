/**
 * The props `Link` owns, in one place.
 *
 * Every component that can render as a link splits its props on this list, so
 * a prop added to `Link` reaches all of them by being added here — and cannot
 * be forwarded by one component and swallowed by another.
 */
export const linkKeys = [
  'active',
  'activeClass',
  'ariaCurrentValue',
  'as',
  'disabled',
  'download',
  'exact',
  'exactActiveClass',
  'exactHash',
  'exactQuery',
  'external',
  'form',
  'formaction',
  'formenctype',
  'formmethod',
  'formnovalidate',
  'formtarget',
  'href',
  'hreflang',
  'inactiveClass',
  'locale',
  'media',
  'noPrefetch',
  'noRel',
  'onClick',
  'ping',
  'prefetch',
  'prefetchOn',
  'prefetchedClass',
  'referrerpolicy',
  'rel',
  'replace',
  'target',
  'title',
  'to',
  'trailingSlash',
  'type',
  'viewTransition'
] as const
