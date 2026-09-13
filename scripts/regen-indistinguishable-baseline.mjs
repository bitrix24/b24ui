#!/usr/bin/env node
// Rewrites the baseline that `test/utils/indistinguishable-snapshots.spec.ts`
// compares against: every group of snapshot entries in a file whose rendered
// bodies are byte-identical.
//
// Run it when a change to the corpus is understood and intended — a case fixed
// so it now renders something of its own, or a genuinely indistinguishable
// variant added. Never to make a red build green: the guard failing means a new
// case proves nothing, and regenerating past it records that as acceptable.
//
//     pnpm snapshots:baseline
import { writeFileSync } from 'node:fs'
import { collectGroups } from './indistinguishable-snapshots.mjs'

const groups = collectGroups()

writeFileSync(
  'test/utils/__fixtures__/indistinguishable-snapshots.json',
  JSON.stringify(groups, null, 2) + '\n'
)

console.log(`groups written: ${groups.length}, entries: ${groups.reduce((n, g) => n + g.names.length, 0)}`)
