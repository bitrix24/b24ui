export default defineAppConfig({
  toaster: {
    position: 'top-right' as const,
    duration: 5000,
    max: 5,
    expand: true
  },
  b24ui: {},
  colorMode: true,
  colorModeInitialValue: 'edge-dark' as const, // edge-dark | edge-light | light
  colorModeTypeLight: 'edge-dark' as const, // edge-dark | edge-light | light
  bxAssistant: {
    floatingInput: true,
    explainWithAi: true,
    shortcuts: {
      focusInput: 'meta_i'
    },
    faqQuestions: [
      {
        category: 'Components',
        items: [
          'How to build a dashboard layout?',
          'How to build a table with pagination?',
          'How to create a form with validation?'
        ]
      },
      {
        category: 'Composables',
        items: [
          'How to show toast notifications?',
          'How to define keyboard shortcuts?',
          'How do I open a modal programmatically?'
        ]
      }
    ]
  }
})
