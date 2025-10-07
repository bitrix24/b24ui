import { z } from 'zod'
import { defineCollection } from '@nuxt/content'

// const Image = z.object({
//   src: z.string(),
//   alt: z.string().optional(),
//   width: z.number().optional(),
//   height: z.number().optional()
// })

const Avatar = z.object({
  src: z.string(),
  alt: z.string().optional()
})

const Button = z.object({
  label: z.string(),
  iconName: z.string().optional(),
  icon: z.string().optional(),
  avatar: Avatar.optional(),
  leadingIcon: z.string().optional(),
  trailingIcon: z.string().optional(),
  to: z.string().optional(),
  target: z.enum(['_blank', '_self']).optional(),
  color: z.enum(['air-primary', 'air-primary-success', 'air-primary-alert', 'air-primary-copilot', 'air-secondary', 'air-secondary-alert', 'air-secondary-accent', 'air-secondary-accent-1', 'air-secondary-accent-2', 'air-secondary-no-accent', 'air-tertiary', 'air-tertiary-accent', 'air-tertiary-no-accent', 'air-selection', 'air-boost']).optional(),
  size: z.enum(['xss', 'xs', 'sm', 'md', 'lg', 'xl']).optional(),
  // variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  id: z.string().optional(),
  class: z.string().optional()
})

const PageFeature = z.object({
  title: z.string(),
  description: z.string().optional(),
  icon: z.string(),
  to: z.string().optional(),
  target: z.enum(['_blank', '_self']).optional()
})

const PageHero = z.object({
  title: z.string(),
  description: z.string(),
  links: z.array(Button).optional()
})

const PageSection = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  links: z.array(Button).optional(),
  features: z.array(PageFeature).optional()
})

const Page = z.object({
  title: z.string(),
  description: z.string(),
  hero: PageHero
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
      badge: z.string().optional(),
      navigation: z.object({
        title: z.string().optional()
      }),
      links: z.array(Button)
    })
  }),
  index: defineCollection({
    type: 'page',
    source: 'index.yml',
    schema: Page.extend({
      hero: PageHero.extend({
        features: z.array(PageFeature)
      }),
      features: z.array(PageFeature),
      design_system: PageSection.extend({
        code: z.string()
      }),
      css_variables: PageSection.extend({
        code: z.string()
      }),
      components: PageSection.extend({
        code: z.string()
      }),
      templates: PageSection,
      community: PageSection
    })
  }),
  // figma: defineCollection({
  //   type: 'page',
  //   source: 'figma.yml',
  //   schema: Page.extend({
  //     features1: PageSection,
  //     cta1: PageSection,
  //     section1: PageSection.extend({
  //       tabs: z.array(z.object({
  //         label: z.string(),
  //         src: z.string(),
  //         width: z.number().optional(),
  //         height: z.number().optional(),
  //         alt: z.string().optional()
  //       })).optional()
  //     }),
  //     section2: PageSection.extend({
  //       image: Image
  //     }),
  //     section3: PageSection.extend({
  //       image: Image
  //     }),
  //     features2: PageSection,
  //     section4: PageSection.extend({
  //       steps: z.array(z.object({
  //         title: z.string(),
  //         description: z.string(),
  //         to: z.string().optional(),
  //         target: z.string().optional(),
  //         image: Image
  //       }))
  //     }),
  //     customers: PageSection.extend({
  //       items: z.array(z.object({
  //         src: z.string(),
  //         alt: z.string()
  //       }))
  //     }),
  //     faq: PageSection.extend({
  //       items: z.array(z.object({
  //         label: z.string(),
  //         content: z.string(),
  //         defaultOpen: z.boolean().optional()
  //       }))
  //     })
  //   })
  // }),
  showcase: defineCollection({
    type: 'page',
    source: 'showcase.yml',
    schema: Page.extend({
      items: z.array(z.object({
        name: z.string(),
        url: z.string(),
        screenshotUrl: z.string().optional(),
        screenshotOptions: z.object({
          delay: z.number()
        }).optional()
      }))
    })
  }),
  templates: defineCollection({
    type: 'page',
    source: 'templates.yml',
    schema: Page.extend({
      items: z.array(z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
        framework: z.enum(['nuxt', 'vue']),
        features: z.array(PageFeature).optional(),
        links: z.array(Button).optional(),
        deploy_links: z.array(Button).optional()
      }))
    })
  })
  // community: defineCollection({
  //   type: 'page',
  //   source: 'community.yml',
  //   schema: Page.extend({
  //     items: z.array(z.object({
  //       label: z.string(),
  //       description: z.string(),
  //       avatar: Avatar,
  //       user: z.object({
  //         name: z.string(),
  //         avatar: Avatar,
  //         to: z.string()
  //       }),
  //       to: z.string()
  //     }))
  //   })
  // }),
  // team: defineCollection({
  //   type: 'page',
  //   source: 'team.yml',
  //   schema: Page
  // }),
  // releases: defineCollection({
  //   type: 'page',
  //   source: 'releases.yml',
  //   schema: Page
  // })
}
