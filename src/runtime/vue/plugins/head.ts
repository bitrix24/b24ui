import { createHead } from '@unhead/vue/client'
import type { Plugin } from 'vue'

export default {
  install(app) {
    // check for existing head instance to avoid replacement
    // bit hacky, but we can't use injectHead() here
    if (app._context.provides.usehead) {
      return
    }

    const head = createHead()
    app.use(head)

    /**
     * @memo Add b24ui version
     */
    head.push({
      meta: [{ name: 'b24ui', content: '0.8.0' }]
    })
  }
} satisfies Plugin
