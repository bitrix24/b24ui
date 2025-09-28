/**
 * Pagination
 * A navigation component with buttons or links for pagination.
 * ---
 * @todo add docs
 * @todo add demo
 * @todo add color
 */
export default {
  slots: {
    root: '',
    list: 'flex items-center gap-1',
    ellipsis: 'pointer-events-none',
    label: 'text-center', // min-w-[20px]
    first: '',
    prev: '',
    item: '',
    next: '',
    last: ''
  }
}
