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
import { extname, join } from 'node:path'
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

async function waitForServer(url, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      await fetch(url)
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
 * Static files with an SPA fallback — the same shape as any host serving a
 * built Vite app, and enough for the router to hand out its own routes.
 */
async function serveStatic(dir) {
  const port = await freePort()
  const server = createServer((req, res) => {
    let file = join(dir, decodeURIComponent(req.url.split('?')[0]))
    if (!file.startsWith(dir) || !existsSync(file) || statSync(file).isDirectory()) {
      file = join(dir, 'index.html')
    }
    res.setHeader('content-type', MIME[extname(file)] ?? 'application/octet-stream')
    createReadStream(file).pipe(res)
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
async function boot(browser, url) {
  const page = await browser.newPage()
  // A `Set`: Vue re-renders a broken component once per parent, so one defect
  // arrives as twenty identical lines and buries everything else.
  const problems = new Set()
  page.on('console', message => message.type() === 'error' && problems.add(`console.error: ${message.text().split('\n')[0]}`))
  page.on('pageerror', error => problems.add(`pageerror: ${error.message.split('\n')[0]}`))

  await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 })
  // Playwright's `Locator#innerText()`, not the DOM property the lint rule is
  // about — and the right one here: `textContent` would also return the text
  // of `<script>` and `<template>` nodes, so a page that rendered nothing
  // would still look full.
  // eslint-disable-next-line unicorn/prefer-dom-node-text-content
  const text = (await page.locator('body').innerText()).trim()
  await page.close()

  return { problems: [...problems], text }
}

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
await run('npx', ['nuxt', 'build'], fixture)
await run('pnpm', ['dev:vue:build'], root)

const browser = await chromium.launch()
const fixturePort = await freePort()
const fixtureUrl = `http://127.0.0.1:${fixturePort}`
const server = spawn(process.execPath, [join(fixture, '.output/server/index.mjs')], {
  cwd: fixture,
  stdio: 'inherit',
  env: { ...process.env, PORT: String(fixturePort), HOST: '127.0.0.1', NITRO_PORT: String(fixturePort) }
})

let staticServer

try {
  await waitForServer(fixtureUrl)

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

  const nuxtBoot = await boot(browser, fixtureUrl)
  check('the Nuxt app logs nothing to the console', nuxtBoot.problems.length === 0, nuxtBoot.problems.join('\n        '))
  check('the Nuxt app rendered its content', nuxtBoot.text.includes('The package booted.'), `body text was: ${JSON.stringify(nuxtBoot.text.slice(0, 200))}`)

  staticServer = await serveStatic(spa)
  const spaBoot = await boot(browser, staticServer.url)
  check('the Vue SPA logs nothing to the console', spaBoot.problems.length === 0, spaBoot.problems.join('\n        '))
  // A Vue app that dies during setup still serves a 200 and an empty `<div
  // id="app">`, so "no console errors" alone would pass on a blank page.
  check('the Vue SPA rendered its content', spaBoot.text.length > 100, `body text was: ${JSON.stringify(spaBoot.text.slice(0, 200))}`)
} finally {
  await browser.close()
  await staticServer?.close()
  server.kill()
}

console.log()
if (failures.length) {
  console.error(`smoke failed: ${failures.length} of the checks above did not pass`)
  process.exit(1)
}
console.log('smoke passed: the built package boots in both distributions')
