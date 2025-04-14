import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    // component-meta support
    './src/meta',
    // Vue support
    './src/unplugin',
    './src/vite'
  ],
  rollup: {
    replace: {
      delimiters: ['', ''],
      values: {
        'process.argv.at(-1) === \'--uiDev\'': 'false'
      }
    }
  },
  hooks: {
    'mkdist:entry:options'(ctx, entry, options) {
      options.addRelativeDeclarationExtensions = false
    }
  },
  externals: ['#build/b24ui', 'vite']
})
