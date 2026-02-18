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
  // @todo fix this
  bxAssistant: {
    floatingInput: true,
    explainWithAi: true,
    shortcuts: {
      focusInput: 'meta_i'
    },
    faqQuestions: [
      {
        category: 'Getting Started',
        items: [
          'What is the key difference between installation for Nuxt and for Vue (with Vite/Inertia)?',
          'How can I quickly add the library to an existing Nuxt 4 project?',
          'How do I connect and use icons from @bitrix24/b24icons in a component?',
          'How do I properly set up switching between light and dark themes in an application?',
          'What is the minimum set of steps to configure internationalization (i18n) with RTL support?',
          'How do I connect and use icons from @bitrix24/b24icons in a component?'
        ]
      },
      {
        category: 'Components',
        items: [
          'Which button component (Button) should I choose for creating a link, and which for an action?',
          'How do I properly build a complex form with validation using Form, FormField, and standard inputs?',
          'What\'s the difference between Modal, Popover, and Slideover, and when should I use each?',
          'How do I create a dropdown menu (DropdownMenu) with actions for a table row?',
          'How do I implement file uploads with progress display and the ability to remove files?',
          'What methods are available for displaying data in a table (Table) if pagination and sorting are needed?',
          'How do I use the CommandPalette or DashboardSearch component for quick application-wide search?',
          'How do I create a multi-step form or display a process using the Stepper component?',
          'How do I work with Tabs and Accordion components to organize content?',
          'How do I correctly set up Toast notifications that can be triggered from different parts of the application?',
          'Which component is best for displaying system errors (Error) and empty states (Empty)?',
          'How do I create a custom Select with search and the ability to add new options?',
          'How do I connect a Calendar for date selection with an InputDate field?',
          'How do I use Skeleton to improve UX during data loading?',
          'Why is the AvatarGroup component more convenient than manually styling a group of avatars?'
        ]
      },
      {
        category: 'Composables',
        items: [
          'When and why should I use useToast instead of directly using the Toast component?',
          'How do I globally set keyboard shortcuts (hotkeys) for application functions using defineShortcuts?',
          'What scenarios is useOverlay designed for, and how do I control modal windows programmatically?',
          'How do I use useConfetti for celebratory animations after a successful user action',
          'If I\'m creating my own custom input component, how do I integrate it with the form validation system using useFormField?'
        ]
      }
    ]
  }
})
