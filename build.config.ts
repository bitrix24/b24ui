import { defineBuildConfig } from 'unbuild'
import packageInfo from './package.json'

const B24UI_VERSION = packageInfo.version

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
        // Used in development to import directly from theme
        'process.argv.includes(\'--uiDev\')': 'false',
        '__B24UI_VERSION__': B24UI_VERSION
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
