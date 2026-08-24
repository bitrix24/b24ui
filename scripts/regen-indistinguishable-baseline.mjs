#!/usr/bin/env node
// Rewrites the baseline that `test/utils/indistinguishable-snapshots.spec.ts`
// compares against: every group of snapshot entries in a file whose rendered
// bodies are byte-identical.
//
// Run it when a change to the corpus is understood and intended — a case fixed
// so it now renders something of its own, or a genuinely indistinguishable
// variant added. Never to make a red build green: the guard failing means a new
// case proves nothing, and regenerating past it records that as acceptable.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = 'test/components/__snapshots__'
const groups = []
for (const f of readdirSync(dir).filter(f => f.endsWith('.snap')).sort()) {
  const byBody = new Map()
  for (const m of readFileSync(join(dir, f), 'utf8').matchAll(/^exports\[`([^`]+)`\] = `\n?([\s\S]*?)\n?`;$/gm)) {
    const k = m[2].trim()
    if (!byBody.has(k)) byBody.set(k, [])
    byBody.get(k).push(m[1])
  }
  for (const [, names] of byBody) if (names.length > 1) groups.push([f, names.sort()])
}
groups.sort((a, b) => a[0].localeCompare(b[0]) || a[1][0].localeCompare(b[1][0]))
writeFileSync('test/utils/__fixtures__/indistinguishable-snapshots.json',
  JSON.stringify(groups.map(([file, names]) => ({ file, names })), null, 2) + '\n')
console.log(`записано групп: ${groups.length}, записей: ${groups.reduce((n, g) => n + g[1].length, 0)}`)
