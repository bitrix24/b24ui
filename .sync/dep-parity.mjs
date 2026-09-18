#!/usr/bin/env node
// Regenerates `.sync/dep-parity.json` from a nuxt/ui checkout.
//
//   node .sync/dep-parity.mjs <path-to-nuxt-ui-mirror> [cursor-sha]
//
// Prints the snapshot to stdout; redirect it over the file once the diff looks
// right. Exceptions are preserved from the existing file — this only refreshes
// upstream's versions, so a hold has to be removed deliberately.
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { parse as parseYaml } from 'yaml'

const [mirror, cursorArg] = process.argv.slice(2)
if (!mirror) {
  console.error('usage: node .sync/dep-parity.mjs <path-to-nuxt-ui-mirror> [cursor-sha]')
  process.exit(1)
}

const existing = JSON.parse(readFileSync(new URL('./dep-parity.json', import.meta.url), 'utf-8'))
const cursor = cursorArg ?? JSON.parse(readFileSync(new URL('./nuxt-ui.json', import.meta.url), 'utf-8')).cursor

const SECTIONS = ['dependencies', 'devDependencies', 'peerDependencies']
const PATHS = Object.keys(existing.manifests)

const upstream = path => JSON.parse(execFileSync('git', ['-C', mirror, 'show', `${cursor}:${path}`], { encoding: 'utf-8' }))
const ours = path => JSON.parse(readFileSync(new URL(`../${path}`, import.meta.url), 'utf-8'))

/**
 * Since `nuxt/ui@d9dd8476` both trees declare shared versions in a pnpm catalog,
 * so a manifest reads `"vue": "catalog:"` rather than a range. Snapshotting that
 * literal would record the placeholder as upstream's version for ~140 packages
 * and reduce this whole file to comparing `catalog:` against `catalog:` — green,
 * and checking nothing. Resolve it here; `test/utils/dep-parity.spec.ts`
 * resolves our own side the same way when it compares.
 */
const catalogsOf = (text) => {
  const ws = parseYaml(text) ?? {}
  return { default: ws.catalog ?? {}, named: ws.catalogs ?? {} }
}
const upstreamCatalogs = catalogsOf(execFileSync('git', ['-C', mirror, 'show', `${cursor}:pnpm-workspace.yaml`], { encoding: 'utf-8' }))

const resolveSpec = (spec, name, catalogs, where) => {
  if (typeof spec !== 'string' || !spec.startsWith('catalog:')) return spec
  const which = spec.slice('catalog:'.length)
  const table = which === '' ? catalogs.default : catalogs.named[which]
  const resolved = table?.[name]
  // Loud rather than silent: an unresolvable specifier means the catalog and the
  // manifest disagree, and writing the placeholder through would hide it.
  if (resolved === undefined) throw new Error(`${where}: cannot resolve "${spec}" for ${name}`)
  return resolved
}

// Section-aware: a package upstream declares as a peer and we declare as a
// dependency is a structural divergence, not drift, and the two ranges are not
// comparable. Those pairs are left out rather than compared.
const manifests = {}
for (const path of PATHS) {
  const them = upstream(path)
  const us = ours(path)
  const perSection = {}
  for (const section of SECTIONS) {
    const shared = {}
    for (const name of Object.keys(them[section] ?? {}).sort()) {
      if (us[section]?.[name] === undefined) continue
      shared[name] = resolveSpec(them[section][name], name, upstreamCatalogs, `upstream ${path}`)
    }
    if (Object.keys(shared).length) perSection[section] = shared
  }
  manifests[path] = perSection
}

console.log(JSON.stringify({ ...existing, cursor, manifests }, null, 2))
