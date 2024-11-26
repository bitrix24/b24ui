import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  // @memo fix _1 ////
  declaration: false,
  // @memo fix _1 ////
  failOnWarn: false,
  entries: [
    // Vue support
    './src/unplugin',
    './src/vite'
  ],
  rollup: {
    emitCJS: true
  },
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
