/**
 * Prose/Td
 * Show td
 *
 * @see src/theme/content/table-wrapper.ts
 */

export default {
  slots: {
    base: [
      '[&_code]:text-xs/5',
      '[&_p]:my-0 [&_p]:leading-6',
      '[&_ul]:my-0 [&_ol]:my-0 [&_ul]:ps-4.5 [&_ol]:ps-4.5',
      '[&_li]:leading-6 [&_li]:my-0.5'
    ].join(' ')
  }
}
