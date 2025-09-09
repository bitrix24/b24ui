/**
 * Prose/Li
 * Show li
 */

export default {
  slots: {
    base: [
      'my-1.5 ps-1.5',
      'leading-relaxed',
      '[&>ul]:my-0 [&>ol]:my-0',
      'text-(--b24ui-typography-label-color)'
    ].join(' ')
  }
}
