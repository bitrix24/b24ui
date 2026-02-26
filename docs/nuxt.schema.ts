import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    assistant: group({
      title: 'Assistant',
      description: 'Assistant configuration.',
      fields: {
        floatingInput: field({
          type: 'boolean',
          title: 'Floating Input',
          description: 'Show the floating input at the bottom of documentation pages.',
          default: true
        }),
        explainWithAi: field({
          type: 'boolean',
          title: 'Explain with AI',
          description: 'Show the "Explain with AI" button in the documentation sidebar.',
          default: true
        }),
        faqQuestions: field({
          type: 'array',
          title: 'FAQ Questions',
          description: 'List of FAQ questions. Can be an array of strings or an array of categories with questions.',
          default: []
        }),
        shortcuts: group({
          title: 'Shortcuts',
          description: 'Keyboard shortcuts configuration.',
          fields: {
            focusInput: field({
              type: 'string',
              title: 'Focus Input',
              description: 'Shortcut to focus the floating input (e.g., meta_i, ctrl_k).',
              default: 'meta_i'
            })
          }
        }),
        icons: group({
          title: 'Icons',
          description: 'Icons configuration.',
          fields: {
            trigger: field({
              type: 'component',
              title: 'Trigger',
              description: 'Icon for the AI chat trigger button and slideover header.'
            }),
            explain: field({
              type: 'component',
              title: 'Explain',
              description: 'Icon for the "Explain with AI" button.'
            })
          }
        })
      }
    })
  }
})
