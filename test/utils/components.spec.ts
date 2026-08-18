import { describe, it, expect, afterAll, vi } from 'vitest'
import { consola } from 'consola'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, realpathSync } from 'node:fs'
import { globSync } from 'tinyglobby'
import { tmpdir } from 'node:os'
import { join, normalize } from 'pathe'
import { detectUsedComponents, resolveExtraScanDirs } from '../../src/utils/components'

/**
 * `experimental.componentDetection` decides which components keep their theme
 * CSS. Every failure mode here is silent in one direction or the other: a
 * component the scan misses ships unstyled, and a name the scan invents keeps
 * the include-everything fallback from firing.
 *
 * The fixtures are real directories rather than mocked `fs`, because half of
 * what is being checked is glob and module-resolution behaviour — ignore
 * patterns, `node_modules` layouts, pnpm's store — which a mock would define
 * away.
 */

const componentDir = join(process.cwd(), 'src/runtime/components')

const fixtureDirs: string[] = []

function fixtureUsing(markup: string) {
  const dir = mkdtempSync(join(tmpdir(), 'b24ui-cd-'))
  fixtureDirs.push(dir)
  writeFileSync(join(dir, 'App.vue'), `<template>${markup}</template>\n`)
  return dir
}

// `realpathSync` because module resolution returns real paths and macOS puts
// `tmpdir()` behind a `/private` symlink. `normalize` because it returns
// backslashes on Windows while `resolveExtraScanDirs` emits forward slashes.
function fixtureRoot() {
  const dir = normalize(realpathSync(mkdtempSync(join(tmpdir(), 'b24ui-cd-'))))
  fixtureDirs.push(dir)
  return dir
}

/** A stand-in component directory, for graph behaviour the real tree can't show. */
function fixtureComponents(files: Record<string, string>) {
  const dir = mkdtempSync(join(tmpdir(), 'b24ui-cmp-'))
  fixtureDirs.push(dir)
  for (const [name, contents] of Object.entries(files)) {
    const file = join(dir, name)
    mkdirSync(join(file, '..'), { recursive: true })
    writeFileSync(file, contents)
  }
  return dir
}

function fixturePackage(root: string, name: string, contents = 'module.exports = {}\n') {
  const dir = join(root, 'node_modules', name)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name, main: 'index.js' }))
  writeFileSync(join(dir, 'index.js'), contents)
  return dir
}

afterAll(() => {
  for (const dir of fixtureDirs) {
    rmSync(dir, { recursive: true, force: true })
  }
})

describe('detectUsedComponents', () => {
  it('detects used components and resolves their dependencies', async () => {
    const detected = await detectUsedComponents([fixtureUsing('<B24Button label="x" />')], 'B24', componentDir)

    // Button + its dependency closure, nothing else.
    expect(detected).toContain('Button')
    expect(detected).toContain('Link')
    expect(detected).not.toContain('Table')
    expect(detected!.size).toBeLessThan(10)
  })

  it('detects lazy components', async () => {
    const detected = await detectUsedComponents([fixtureUsing('<LazyB24Tooltip text="x" />')], 'B24', componentDir)

    expect(detected).toContain('Tooltip')
  })

  it('ignores declaration files', async () => {
    const dir = fixtureUsing('<B24Button label="x" />')
    // `components.d.ts` declares every component ever rendered: scanning it
    // would keep anything used once detected forever.
    writeFileSync(join(dir, 'components.d.ts'), `B24Table: typeof import('./Table.vue')['default']\n`)

    const detected = await detectUsedComponents([dir], 'B24', componentDir)

    expect(detected).toContain('Button')
    expect(detected).not.toContain('Table')
  })

  it('always includes components from includeComponents', async () => {
    const detected = await detectUsedComponents([fixtureUsing('<div>no b24ui here</div>')], 'B24', componentDir, ['Modal'])

    expect(detected).toContain('Modal')
    expect(detected).toContain('Button')
  })

  it('ignores identifiers that only look like components', async () => {
    // Anything spelled `B24Something` in ordinary code matches the script half
    // of the pattern. Junk names must not defeat the include-everything
    // fallback, which in the Vue integration would blank every theme.
    const junk = fixtureUsing('<div />')
    writeFileSync(join(junk, 'config.ts'), `import { B24Config } from './b24'\ntype B24Endpoint = string\n`)

    expect(await detectUsedComponents([junk], 'B24', componentDir)).toBeUndefined()

    const mixed = fixtureUsing('<B24Button label="x" />')
    writeFileSync(join(mixed, 'config.ts'), `import { B24Config } from './b24'\n`)
    const detected = await detectUsedComponents([mixed], 'B24', componentDir)

    expect(detected).toContain('Button')
    expect(detected).not.toContain('Config')
  })

  it('detects kebab-case component tags', async () => {
    const detected = await detectUsedComponents([fixtureUsing('<b24-alert title="x" /><lazy-b24-tooltip text="y" />')], 'B24', componentDir)

    expect(detected).toContain('Alert')
    expect(detected).toContain('Tooltip')
    expect(detected).toContain('Button')
  })

  it('detects kebab-case and PascalCase usage in the same file', async () => {
    const detected = await detectUsedComponents([fixtureUsing('<B24Card><b24-badge label="x" /></B24Card>')], 'B24', componentDir)

    expect(detected).toContain('Card')
    expect(detected).toContain('Badge')
  })

  it('warns on unknown includeComponents names without poisoning detection', async () => {
    const warn = vi.spyOn(consola, 'warn').mockImplementation(() => {})

    expect(await detectUsedComponents([fixtureUsing('<div />')], 'B24', componentDir, ['Dropdown'])).toBeUndefined()
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('Dropdown'))

    warn.mockRestore()
  })

  it('resolves dependencies of components shadowed by prose themes', async () => {
    // `prose/Tabs.vue` shares its basename with `Tabs.vue` — eight components
    // have such a twin. The graph is keyed by basename, so it must keep the
    // regular component's dependency set, not the prose one's.
    const detected = await detectUsedComponents([fixtureUsing('<B24Tabs :items="[]" />')], 'B24', componentDir)

    expect(detected).toContain('Avatar')
    expect(detected).toContain('Badge')
    expect(detected).toContain('Chip')
  })

  it('does not build graph edges to names that are not components', async () => {
    // The graph pattern matches any `B24Xxx` identifier, including ones that
    // are not components at all. An edge to one would be walked like a real
    // dependency and land in the result, so a component that merely *mentions*
    // a `B24`-prefixed helper would drag a phantom name into the source list.
    // The real tree has no such mention today, which is exactly why this needs
    // a stand-in directory rather than a fixture under `src/`.
    const components = fixtureComponents({
      'Alpha.vue': '<template><B24Beta /></template>\n<script setup>\nimport { B24Helper } from "./helper"\n</script>\n',
      'Beta.vue': '<template><div /></template>\n'
    })

    const detected = await detectUsedComponents([fixtureUsing('<B24Alpha />')], 'B24', components)

    expect(detected).toContain('Alpha')
    expect(detected).toContain('Beta')
    expect(detected).not.toContain('Helper')
  })

  it('resolves internal dependencies independently of the scan prefix', async () => {
    // b24ui's own components reference each other as `B24*` whatever prefix the
    // scan is given, so the graph pass must not follow it. Nothing in this fork
    // configures a prefix today — both call sites pass `'B24'` — which is
    // exactly why the parameter needs a test: a graph that silently followed it
    // would look fine until one did.
    const detected = await detectUsedComponents([fixtureUsing('<XAlert title="x" />')], 'X', componentDir)

    expect(detected).toContain('Alert')
    expect(detected).toContain('Button')
    expect(detected).toContain('Link')
  })

  it('scans the dist directory of a scanned package', async () => {
    // Published packages ship their code in `dist/` as `.mjs`: the project
    // build-output ignores must not apply to `scanPackages` directories.
    const root = fixtureRoot()
    const pkgDir = fixturePackage(root, 'dist-lib')
    mkdirSync(join(pkgDir, 'dist'), { recursive: true })
    writeFileSync(join(pkgDir, 'dist', 'index.mjs'), `export const render = () => h(B24Chip)\n`)

    expect(await detectUsedComponents([pkgDir], 'B24', componentDir)).toContain('Chip')
  })

  it('skips files in nested node_modules and dist directories', async () => {
    const dir = fixtureUsing('<B24Button label="x" />')
    const nested = join(dir, 'packages', 'foo', 'node_modules', 'pkg')
    const dist = join(dir, 'packages', 'foo', 'dist')
    mkdirSync(nested, { recursive: true })
    mkdirSync(dist, { recursive: true })
    writeFileSync(join(nested, 'index.js'), 'export const B24Alert = 1\n')
    writeFileSync(join(dist, 'out.js'), 'export const B24Table = 1\n')

    const detected = await detectUsedComponents([dir], 'B24', componentDir)

    expect(detected).toContain('Button')
    expect(detected).not.toContain('Alert')
    expect(detected).not.toContain('Table')
  })

  it('returns undefined when no component is detected', async () => {
    expect(await detectUsedComponents([fixtureUsing('<div>no b24ui here</div>')], 'B24', componentDir)).toBeUndefined()
  })

  it('detects usage inside a scanned package directory', async () => {
    // The dir itself sits in `node_modules`: the ignore patterns apply to paths
    // relative to it, so its files are still scanned.
    const pkgDir = fixturePackage(fixtureRoot(), 'my-lib', 'export { B24Alert } from "#components"\n')

    expect(await detectUsedComponents([pkgDir], 'B24', componentDir)).toContain('Alert')
  })
})

describe('resolveExtraScanDirs', () => {
  it('resolves scanPackages to their package directory', () => {
    const root = fixtureRoot()
    const pkgDir = fixturePackage(root, 'my-lib')

    expect(resolveExtraScanDirs(root, ['my-lib'])).toEqual([pkgDir])
  })

  it('resolves scoped packages', () => {
    const root = fixtureRoot()
    const pkgDir = fixturePackage(root, '@scope/my-lib')

    expect(resolveExtraScanDirs(root, ['@scope/my-lib'])).toEqual([pkgDir])
  })

  it('skips packages that cannot be resolved', () => {
    expect(resolveExtraScanDirs(fixtureRoot(), ['missing-lib'])).toEqual([])
  })

  it('keeps component dirs outside the root and drops the ones inside', () => {
    const root = fixtureRoot()
    const outside = fixtureRoot()
    mkdirSync(join(root, 'src', 'components'), { recursive: true })

    expect(resolveExtraScanDirs(root, undefined, ['src/components', outside])).toEqual([outside])
  })

  it('resolves glob dirs from their static prefix', () => {
    const root = fixtureRoot()
    const outside = fixtureRoot()
    mkdirSync(join(outside, 'components'), { recursive: true })

    expect(resolveExtraScanDirs(root, undefined, [`${outside}/components/**`])).toEqual([join(outside, 'components')])
  })
})

describe('componentDetection examples in the docs', () => {
  // Both installation guides show `componentDetection: ['Modal', …]`. Those are
  // names a reader copies into their config, and a wrong one now produces a
  // warning at build time rather than nothing — this fork's guides said
  // `Dropdown`, which has never been a component here (it is `DropdownMenu`).
  const componentNames = new Set(
    globSyncNames(join(process.cwd(), 'src/runtime/components'))
  )

  const claims = docsClaims()

  it('finds examples to check', () => {
    // The regex below is the only thing standing between this and a vacuous pass.
    expect(claims.length).toBeGreaterThan(1)
    expect(componentNames.size).toBeGreaterThan(50)
  })

  it('names components that exist', () => {
    const unknown = claims
      .filter(claim => !componentNames.has(claim.name))
      .map(claim => `${claim.file}: ${claim.name}`)
      .sort()

    expect(unknown).toEqual([])
  })
})

/** Top-level component basenames, which is what `includeComponents` accepts. */
function globSyncNames(dir: string): string[] {
  return globSync(['*.vue'], { cwd: dir }).map(file => file.replace(/\.vue$/, ''))
}

/** Every name inside a `componentDetection: [...]` array in the docs. */
function docsClaims(): Array<{ file: string, name: string }> {
  const dir = join(process.cwd(), 'docs/content')
  return globSync(['**/*.md'], { cwd: dir }).flatMap((file) => {
    const source = readFileSync(join(dir, file), 'utf-8')
    return [...source.matchAll(/componentDetection:\s*\[([^\]]*)\]/g)]
      .flatMap(match => [...match[1]!.matchAll(/'([^']+)'/g)].map(name => ({ file, name: name[1]! })))
  })
}
