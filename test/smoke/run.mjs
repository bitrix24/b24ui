#!/usr/bin/env node
// Boots the built package in a real browser.
//
// Everything else in this repository tests source. `pnpm test` mounts
// components out of `src/`, `pnpm build` proves the bundler is happy, and
// neither of them ever starts an application — so #301, a client-only boot
// failure, shipped and stayed green for five weeks. This is the missing step
// (#329): take what `pnpm build` produced, put an app on top of it, load the
// page, and fail on anything the browser logs as an error.
//
//     pnpm build && pnpm test:smoke
//
// Two applications, because b24ui ships two distributions and they fail
// differently:
//
//   * `test/smoke/fixture` — a Nuxt app consuming `@bitrix24/b24ui-nuxt`
//     through the workspace link, so module registration, the runtime plugins
//     and SSR all run. Also where the `platform` plugin's server branch is
//     asserted: it reads `user-agent` off the request, which no unit test can
//     reach because the vitest environment is client-only.
//   * `playgrounds/vue` — the unplugin/Vite distribution, built as a real SPA
//     and served as static files. This is #301's shape exactly: no server, no
//     SSR, everything happens in the browser or not at all.
//
// Console errors are the assertion, not a heuristic. A Vue app that throws
// during setup still returns 200 and still renders something — `curl` cannot
// tell the difference, and that is the whole reason this file needs a browser.
import { spawn } from 'node:child_process'
import { createServer } from 'node:http'
import { createServer as createSocketServer } from 'node:net'
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import { extname, join, relative, isAbsolute, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const root = fileURLToPath(new URL('../..', import.meta.url))
const fixture = join(root, 'test/smoke/fixture')
const spa = join(root, 'playgrounds/vue/dist')

/** Collected as we go so one run reports every failure, not just the first. */
const failures = []

function check(name, ok, detail) {
  console.log(`${ok ? '  ok  ' : ' FAIL '} ${name}${ok || detail === undefined ? '' : `\n        ${detail}`}`)
  if (!ok) failures.push(name)
}

function step(name) {
  console.log(`\n${name}`)
}

// region helpers ////

/** A port the OS just told us is free. Racy in principle, fine for one runner. */
function freePort() {
  return new Promise((resolve, reject) => {
    const probe = createSocketServer()
    probe.on('error', reject)
    probe.listen(0, '127.0.0.1', () => {
      const { port } = probe.address()
      probe.close(() => resolve(port))
    })
  })
}

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })
    child.on('error', reject)
    child.on('exit', code => code === 0 ? resolve() : reject(new Error(`${command} ${args.join(' ')} exited with ${code}`)))
  })
}

/**
 * Polls `url` until it answers — or until `child` dies, which is the case
 * worth handling: a server that fails on startup would otherwise burn the full
 * timeout and report "did not answer", hiding the exit code that says why.
 */
async function waitForServer(url, child, timeoutMs = 60_000) {
  let exit = null
  child.on('exit', (code, signal) => {
    exit = signal ?? `code ${code}`
  })
  child.on('error', (error) => {
    exit = error.message
  })

  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    if (exit !== null) {
      throw new Error(`the server exited before answering (${exit}) — its output is above`)
    }
    try {
      // The body is never read, so it has to be discarded explicitly —
      // undici holds the socket open until it is, and this loop can run
      // hundreds of times before the server answers.
      const response = await fetch(url)
      await response.body?.cancel()
      return
    } catch {
      await new Promise(resolve => setTimeout(resolve, 250))
    }
  }
  throw new Error(`server at ${url} did not answer within ${timeoutMs}ms`)
}

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.webp': 'image/webp'
}

/**
 * Resolves a request path inside `dir`, or returns `null` if it points out.
 *
 * Two versions of this were wrong before this one, both for the same reason.
 * `file.startsWith(dir)` has no separator boundary, so a sibling directory
 * whose name merely begins with the root's — `dist-something` next to `dist` —
 * passes it. Its replacement, `relative(...).startsWith('..')`, has no
 * separator boundary either, in the other direction: it rejects a perfectly
 * ordinary file called `..hidden.js`, which then gets served as `index.html`
 * and looks like a routing bug.
 *
 * The question is whether the relative path contains a `..` **segment**, so
 * that is what is asked.
 */
function resolveWithin(dir, url) {
  let path
  try {
    path = decodeURIComponent(url.split('?')[0])
  } catch {
    // A malformed `%` escape throws here. Unhandled it takes down the whole
    // run from inside a request handler, skipping every cleanup below.
    return null
  }

  const file = join(dir, path)
  const rel = relative(dir, file)
  const inside = rel === '' || (!rel.split(sep).includes('..') && !isAbsolute(rel))
  return inside ? file : null
}

/**
 * Static files with an SPA fallback — the same shape as any host serving a
 * built Vite app, and enough for the router to hand out its own routes.
 */
async function serveStatic(dir) {
  const port = await freePort()
  const server = createServer((req, res) => {
    let file = resolveWithin(dir, req.url)
    if (file === null || !existsSync(file) || statSync(file).isDirectory()) {
      file = join(dir, 'index.html')
    }
    res.setHeader('content-type', MIME[extname(file)] ?? 'application/octet-stream')

    // Without this listener a read error — a deleted `index.html`, a bad
    // permission — is an unhandled `error` event, which is fatal. Failing the
    // request instead lets the browser report it and the checks below say so.
    const body = createReadStream(file)
    body.on('error', () => {
      res.statusCode = 500
      res.end()
    })
    body.pipe(res)
  })
  await new Promise(resolve => server.listen(port, '127.0.0.1', resolve))
  return { url: `http://127.0.0.1:${port}`, close: () => new Promise(resolve => server.close(resolve)) }
}

/**
 * Loads `url` and returns everything the browser complained about.
 *
 * `pageerror` catches uncaught exceptions, `console` type `error` catches what
 * Vue's own error handler reports — a failing `setup()` reaches the second and
 * not always the first, which is how a broken app can look fine from Node.
 */
async function boot(browser, url, probe) {
  const page = await browser.newPage()
  // A `Set`: Vue re-renders a broken component once per parent, so one defect
  // arrives as twenty identical lines and buries everything else.
  const problems = new Set()
  page.on('console', message => message.type() === 'error' && problems.add(`console.error: ${message.text().split('\n')[0]}`))
  page.on('pageerror', error => problems.add(`pageerror: ${error.message.split('\n')[0]}`))

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 })

    // `networkidle` says the network went quiet, not that the app finished.
    // Anything logged from `onMounted`, a deferred plugin or a microtask after
    // the last response lands after it — without a settle window this check
    // passes or fails by how fast the runner is.
    await page.waitForTimeout(SETTLE_MS)
  } catch (error) {
    await page.close()
    throw error
  }

  // Playwright's `Locator#innerText()`, not the DOM property the lint rule is
  // about — and the right one here: `textContent` would also return the text
  // of `<script>` and `<template>` nodes, so a page that rendered nothing
  // would still look full.
  // eslint-disable-next-line unicorn/prefer-dom-node-text-content
  const text = (await page.locator('body').innerText()).trim()
  const links = await page.locator('a[href]').count()

  let probed
  try {
    probed = await probe?.(page)
  } finally {
    await page.close()
  }

  return { problems: [...problems], text, links, probed }
}

/**
 * How long to keep listening after the network goes quiet. Long enough for a
 * deferred plugin or an `onMounted` to throw, short enough that two page loads
 * cost a second between them.
 */
const SETTLE_MS = 750

/**
 * How many links the playground's navigation renders when the router works.
 * Well under the real count, so adding or removing a demo page does not fail
 * the smoke run — but far above what survives a dead `RouterLink`, which is
 * the case this number exists to separate.
 */
const SPA_MIN_LINKS = 20

// endregion ////

step('the package under test')

// Without this the whole run is theatre: `dev:prepare` leaves `dist/` as a
// jiti stub pointing back at `src/`, so a smoke run against it would boot the
// sources under a different name and report success for a package nobody built.
const moduleEntry = join(root, 'dist/module.mjs')
const built = existsSync(moduleEntry) && !readFileSync(moduleEntry, 'utf8').includes('createJiti')
check('dist/ holds a real build, not a `--stub`', built, 'run `pnpm build` first — a stubbed dist re-exports src/ and proves nothing here')
if (!built) process.exit(1)

step('building the applications')
// `pnpm exec`, not `npx`: `npx` falls back to fetching from the registry when
// it cannot resolve a binary locally, which would quietly undo the pinned
// `playwright-core` and the frozen lockfile this repository insists on.
await run('pnpm', ['exec', 'nuxt', 'build'], fixture)
await run('pnpm', ['dev:vue:build'], root)

// Everything started below has to be stopped, including when the thing after
// it fails to start. Declared first and torn down in one `finally`, each step
// guarded so a failure in one does not strand the others.
let browser
let server
let staticServer

try {
  browser = await chromium.launch()

  const fixturePort = await freePort()
  const fixtureUrl = `http://127.0.0.1:${fixturePort}`
  server = spawn(process.execPath, [join(fixture, '.output/server/index.mjs')], {
    cwd: fixture,
    stdio: 'inherit',
    env: { ...process.env, PORT: String(fixturePort), HOST: '127.0.0.1', NITRO_PORT: String(fixturePort) }
  })

  await waitForServer(fixtureUrl, server)

  step('platform detection on the server (the branch no unit test can reach)')

  // `src/runtime/plugins/platform.ts` reads the user-agent from the request
  // during SSR and writes `data-platform` / `data-version` onto `<html>`. The
  // Tailwind `bitrix-mobile:` and `bitrix-desktop:` variants key on those
  // attributes, so if this branch breaks the first paint is styled for the
  // wrong platform — inside a Bitrix24 frame, which is the one place b24ui is
  // meant to run.
  //
  // Only the first two cases can fail if the branch breaks — `web` / `air` is
  // the fallback, so it renders the same whether the header was read or not.
  // It is kept as the other half of the pair: it fails if a widened regex
  // starts matching plain browsers as Bitrix clients. Verified by making the
  // server branch return nothing and watching exactly the first two go red.
  for (const [ua, platform, version] of [
    ['BitrixMobile/Version=25', 'bitrix-mobile', '25'],
    ['BitrixDesktop/7.5.2', 'bitrix-desktop', '7.5.2'],
    ['Mozilla/5.0 (X11; Linux x86_64)', 'web', 'air']
  ]) {
    const html = await fetch(fixtureUrl, { headers: { 'user-agent': ua } }).then(r => r.text())
    const tag = html.match(/<html[^>]*>/)?.[0] ?? '(no <html> tag in the response)'
    const ok = tag.includes(`data-platform="${platform}"`) && tag.includes(`data-version="${version}"`)
    check(`${ua} renders data-platform="${platform}" data-version="${version}"`, ok, tag)
  }

  step('booting the built package in a browser')

  // The click is the hydration check. Everything else on this page is in the
  // server-rendered HTML before any client code runs, so a hydration that hangs
  // quietly — a promise that never settles, no exception anywhere — would pass
  // the console and content checks and still ship an app nobody can use.
  const nuxtBoot = await boot(browser, fixtureUrl, async (page) => {
    await page.getByTestId('press').click()
    // Playwright's locator method, not the DOM property the rule is about.
    // eslint-disable-next-line unicorn/prefer-dom-node-text-content
    return (await page.getByTestId('counter').innerText()).trim()
  })

  check('the Nuxt app logs nothing to the console', nuxtBoot.problems.length === 0, nuxtBoot.problems.join('\n        '))
  check('the Nuxt app rendered its content', nuxtBoot.text.includes('The package booted.'), `body text was: ${JSON.stringify(nuxtBoot.text.slice(0, 200))}`)
  check('the Nuxt app hydrated — a click moves the counter', nuxtBoot.probed === '1', `the badge read ${JSON.stringify(nuxtBoot.probed)} after one click`)

  staticServer = await serveStatic(spa)
  const spaBoot = await boot(browser, staticServer.url)
  check('the Vue SPA logs nothing to the console', spaBoot.problems.length === 0, spaBoot.problems.join('\n        '))
  // A Vue app that dies during setup still serves a 200 and an empty `<div
  // id="app">`, so "no console errors" alone would pass on a blank page.
  //
  // Counting the navigation's links rather than the length of the body text.
  // The first version measured `text.length > 100` and was very nearly
  // vacuous: the playground carries enough static copy that killing
  // `RouterLink` outright — the bug this whole file found — left it green.
  // Every one of those links is a `RouterLink`, so this is the assertion that
  // was meant.
  check(`the Vue SPA rendered its navigation (${spaBoot.links} links)`, spaBoot.links >= SPA_MIN_LINKS, `expected at least ${SPA_MIN_LINKS} rendered <a href>; body text was: ${JSON.stringify(spaBoot.text.slice(0, 200))}`)
} finally {
  // Each one independently and each one guarded. An earlier version awaited
  // `browser.close()` first and let a rejection there skip the rest, which
  // strands the Nitro server on its port and hangs the job — the comment said
  // the steps were independent while only the first one was.
  for (const stop of [() => browser?.close(), () => staticServer?.close(), () => server?.kill()]) {
    try {
      await stop()
    } catch (error) {
      console.error(`  (cleanup) ${error.message}`)
    }
  }
}

console.log()
if (failures.length) {
  console.error(`smoke failed: ${failures.length} of the checks above did not pass`)
  process.exit(1)
}
console.log('smoke passed: the built package boots in both distributions')
