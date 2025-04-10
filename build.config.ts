import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    // component-meta support
    './src/meta',
    // Vue support
    './src/unplugin',
    './src/vite'
  ],
  replace: {
    'process.env.DEV': 'false'
  },
  hooks: {
    'mkdist:entry:options'(ctx, entry, options) {
      options.addRelativeDeclarationExtensions = false
    }
  },
  externals: ['#build/b24ui', 'vite']
})
