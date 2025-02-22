/**
 * List colors for dropdown items
 * @see src/theme/dropdown-menu.ts
 */
export default {
  colorItem: {
    /**
     * @memo not fill - use default data
     */
    default: '',
    danger: {
      item: [
        'text-red-900 dark:text-red-150',
        'data-highlighted:text-red-900 dark:data-highlighted:text-red-200 data-highlighted:before:bg-red-100 dark:data-highlighted:before:bg-red-900',
        'data-[state=checked]:text-red-900 dark:data-[state=checked]:text-red-200 data-[state=checked]:before:bg-red-100 dark:data-[state=checked]:before:bg-red-900'
      ].join(' '),
      itemLeadingIcon: [
        'text-red-600 dark:text-red-700',
        'group-data-highlighted:text-red-900 dark:group-data-highlighted:text-red-150',
        'group-data-[state=checked]:text-red-900 dark:group-data-[state=checked]:text-red-700'
      ].join(' ')
    },
    success: {
      item: [
        'text-green-900 dark:text-green-150',
        'data-highlighted:text-green-900 dark:data-highlighted:text-green-200 data-highlighted:before:bg-green-100 dark:data-highlighted:before:bg-green-900',
        'data-[state=checked]:text-green-900 dark:data-[state=checked]:text-green-200 data-[state=checked]:before:bg-green-100 dark:data-[state=checked]:before:bg-green-900'
      ].join(' '),
      itemLeadingIcon: [
        'text-green-600 dark:text-green-700',
        'group-data-highlighted:text-green-900 dark:group-data-highlighted:text-green-150',
        'group-data-[state=checked]:text-green-900 dark:group-data-[state=checked]:text-green-700'
      ].join(' ')
    },
    warning: {
      item: [
        'text-orange-900 dark:text-orange-150',
        'data-highlighted:text-orange-900 dark:data-highlighted:text-orange-200 data-highlighted:before:bg-orange-100 dark:data-highlighted:before:bg-orange-900',
        'data-[state=checked]:text-orange-900 dark:data-[state=checked]:text-orange-200 data-[state=checked]:before:bg-orange-100 dark:data-[state=checked]:before:bg-orange-900'
      ].join(' '),
      itemLeadingIcon: [
        'text-orange-600 dark:text-orange-700',
        'group-data-highlighted:text-orange-900 dark:group-data-highlighted:text-orange-150',
        'group-data-[state=checked]:text-orange-900 dark:group-data-[state=checked]:text-orange-700'
      ].join(' ')
    },
    primary: {
      item: [
        'text-blue-900 dark:text-blue-150',
        'data-highlighted:text-blue-900 dark:data-highlighted:text-blue-200 data-highlighted:before:bg-blue-100 dark:data-highlighted:before:bg-blue-900',
        'data-[state=checked]:text-blue-900 dark:data-[state=checked]:text-blue-200 data-[state=checked]:before:bg-blue-100 dark:data-[state=checked]:before:bg-blue-900'
      ].join(' '),
      itemLeadingIcon: [
        'text-blue-600 dark:text-blue-700',
        'group-data-highlighted:text-blue-900 dark:group-data-highlighted:text-blue-150',
        'group-data-[state=checked]:text-blue-900 dark:group-data-[state=checked]:text-blue-700'
      ].join(' ')
    },
    secondary: {
      item: [
        'text-cyan-900 dark:text-cyan-150',
        'data-highlighted:text-cyan-900 dark:data-highlighted:text-cyan-200 data-highlighted:before:bg-cyan-100 dark:data-highlighted:before:bg-cyan-900',
        'data-[state=checked]:text-cyan-900 dark:data-[state=checked]:text-cyan-200 data-[state=checked]:before:bg-cyan-100 dark:data-[state=checked]:before:bg-cyan-900'
      ].join(' '),
      itemLeadingIcon: [
        'text-cyan-600 dark:text-cyan-700',
        'group-data-highlighted:text-cyan-900 dark:group-data-highlighted:text-cyan-150',
        'group-data-[state=checked]:text-cyan-900 dark:group-data-[state=checked]:text-cyan-700'
      ].join(' ')
    },
    collab: {
      item: [
        'text-collab-900 dark:text-collab-150',
        'data-highlighted:text-collab-900 dark:data-highlighted:text-collab-200 data-highlighted:before:bg-collab-100 dark:data-highlighted:before:bg-collab-900',
        'data-[state=checked]:text-collab-900 dark:data-[state=checked]:text-collab-200 data-[state=checked]:before:bg-collab-100 dark:data-[state=checked]:before:bg-collab-900'
      ].join(' '),
      itemLeadingIcon: [
        'text-collab-600 dark:text-collab-700',
        'group-data-highlighted:text-collab-900 dark:group-data-highlighted:text-collab-150',
        'group-data-[state=checked]:text-collab-900 dark:group-data-[state=checked]:text-collab-700'
      ].join(' ')
    },
    ai: {
      item: [
        'text-ai-900 dark:text-ai-150',
        'data-highlighted:text-ai-900 dark:data-highlighted:text-ai-200 data-highlighted:before:bg-ai-100 dark:data-highlighted:before:bg-ai-900',
        'data-[state=checked]:text-ai-900 dark:data-[state=checked]:text-ai-200 data-[state=checked]:before:bg-ai-100 dark:data-[state=checked]:before:bg-ai-900'
      ].join(' '),
      itemLeadingIcon: [
        'text-ai-600 dark:text-ai-700',
        'group-data-highlighted:text-ai-900 dark:group-data-highlighted:text-ai-150',
        'group-data-[state=checked]:text-ai-900 dark:group-data-[state=checked]:text-ai-700'
      ].join(' ')
    }
  }
}
