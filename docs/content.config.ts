import { defineCollection, z } from '@nuxt/content'

// const Image = z.object({
//   src: z.string(),
//   alt: z.string().optional(),
//   width: z.number().optional(),
//   height: z.number().optional()
// })

// const DualModeImage = z.object({
//   light: z.string(),
//   dark: z.string(),
//   width: z.number().optional(),
//   height: z.number().optional(),
//   alt: z.string().optional()
// })

const Button = z.object({
  label: z.string(),
  iconName: z.string().optional(),
  leadingIcon: z.string().optional(),
  trailingIcon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['air-primary', 'air-primary-success', 'air-primary-alert', 'air-primary-copilot', 'air-secondary', 'air-secondary-alert', 'air-secondary-accent', 'air-secondary-accent-1', 'air-secondary-accent-2', 'air-secondary-no-accent', 'air-tertiary', 'air-tertiary-accent', 'air-tertiary-no-accent', 'air-selection', 'air-boost']).optional(),
  size: z.enum(['xss', 'xs', 'sm', 'md', 'lg', 'xl']).optional(),
  id: z.string().optional(),
  target: z.enum(['_blank', '_self']).optional(),
  class: z.string().optional()
})

const BaseSection = z.object({
  title: z.string(),
  description: z.string()
})

const Feature = z.object({
  title: z.string(),
  description: z.string().optional(),
  icon: z.string(),
  to: z.string().optional()
})

// const TitleIconFeature = z.object({
//   title: z.string(),
//   icon: z.string()
// })

const PageSection = BaseSection.extend({
  links: z.array(Button).optional(),
  features: z.array(Feature).optional()
})

export const collections = {
  docs: defineCollection({
    type: 'page',
    source: [{
      include: 'docs/**/*'
    }],
    schema: z.object({
      category: z.enum(['layout', 'form', 'element', 'navigation', 'data', 'overlay', 'dashboard', 'page', 'ai', 'color-mode', 'i18n']).optional(),
      framework: z.enum(['nuxt', 'vue']).optional(),
      navigation: z.object({
        title: z.string().optional()
      }),
      links: z.array(z.object({
        label: z.string(),
        iconName: z.string(),
        avatar: z.object({
          src: z.string(),
          alt: z.string()
        }).optional(),
        to: z.string(),
        target: z.string().optional()
      }))
    })
  }),
  index: defineCollection({
    type: 'page',
    source: 'index.yml',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      hero: BaseSection.extend({
        links: z.array(Button),
        features: z.array(Feature)
      }),
      features: z.array(Feature),
      design_system: PageSection.extend({
        code: z.string()
      }),
      component_customization: PageSection.extend({
        code: z.string()
      }),
      templates: PageSection,
      community: PageSection
    })
  })
}
