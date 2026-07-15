/**
 * ChatShimmer
 * Apply a shimmer loading effect to text.
 * ---
 */

export default {
  base: [
    'text-transparent',
    'bg-clip-text',
    'bg-no-repeat',
    'bg-size-[calc(200%+var(--spread)*2+2px)_100%,auto]',
    'bg-[image:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--b24ui-typography-label-color),#0000_calc(50%+var(--spread))),linear-gradient(var(--ui-color-design-plain-na-content-secondary),var(--ui-color-design-plain-na-content-secondary))]',
    'motion-safe:animate-[shimmer_var(--duration)_linear_infinite]',
    'motion-safe:rtl:animate-[shimmer-rtl_var(--duration)_linear_infinite]',
    'will-change-[background-position]',
    'motion-reduce:bg-none motion-reduce:text-muted'
  ].join(' ')
}
