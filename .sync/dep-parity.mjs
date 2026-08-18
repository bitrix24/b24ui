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
      if (us[section]?.[name] !== undefined) shared[name] = them[section][name]
    }
    if (Object.keys(shared).length) perSection[section] = shared
  }
  manifests[path] = perSection
}

console.log(JSON.stringify({ ...existing, cursor, manifests }, null, 2))
