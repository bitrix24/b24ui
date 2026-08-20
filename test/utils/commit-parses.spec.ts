import { describe, it, expect } from 'vitest'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { parser } from '@conventional-commits/parser'

/**
 * Guards `.github/scripts/assert-commit-parses.mjs`, which fails CI when a
 * commit message is one release-please will silently drop from the changelog
 * (#436).
 *
 * Two properties matter and they pull in opposite directions. The guard has to
 * catch what release-please drops — and it has to keep accepting the shapes this
 * repository's commits are actually made of, because a guard that reddens `main`
 * on ordinary messages would be removed within the week. The accepted list below
 * is therefore weighted by real frequency: `Co-authored-by:` appears in 83% of
 * recent commits, `Claude-Session:` in 74%, a `(#NNN)` subject in 98%, an
 * indented body line in 28%.
 *
 * Fidelity was established by sweeping all 3240 commits on `main` through both
 * this oracle and release-please's own `parseConventionalCommits`: 67 rejected
 * by both, zero disagreements either way.
 */
// `process.cwd()` rather than `import.meta.url`: vitest's transform does not
// leave a `file:` URL there. `documented-scripts.spec.ts` resolves the same way.
const SCRIPT = join(process.cwd(), '.github/scripts/assert-commit-parses.mjs')

function accepts(message: string): boolean {
  try {
    parser(message)
    return true
  } catch {
    return false
  }
}

/** Runs the real script the way CI does, returning its exit code. */
function guardExitCode(message: string): number {
  try {
    execFileSync('node', [SCRIPT, '--stdin'], { input: message, stdio: 'pipe' })
    return 0
  } catch (error) {
    return (error as { status?: number }).status ?? -1
  }
}

describe('commit messages release-please can read', () => {
  describe('shapes this repository actually produces', () => {
    // Every one of these is common here. If a parser bump ever rejects one,
    // the guard would start failing `main` on ordinary work.
    it.each([
      ['plain subject', 'fix(Button): resolve hover state'],
      ['subject with the squash suffix', 'fix(Button): resolve hover state (#427)'],
      ['type without a scope', 'docs: correct the install tab'],
      ['breaking marker after the scope', 'feat(Modal)!: drop the fullscreen prop'],
      ['slashed scope', 'feat(DropdownMenu/InputMenu/Select): share the item type'],
      ['the prescribed revert form', 'revert(Modal): drop the fullscreen prop'],
      ['bare revert', 'revert: drop the fullscreen prop'],
      ['co-author trailer', 'fix(x): s\n\nBody.\n\nCo-authored-by: Someone <s@example.com>'],
      ['session-url trailer', 'fix(x): s\n\nBody.\n\nClaude-Session: https://claude.ai/code/session_01ABC'],
      ['closes footer', 'fix(x): s\n\nBody.\n\nCloses #427'],
      ['breaking-change footer', 'feat(x)!: s\n\nBREAKING CHANGE: the prop is gone.'],
      ['port trailer, a line-leading bare token', 'fix(x): s\n\nPort of nuxt/ui@ccd48940.'],
      ['indented body line — the repair the guard recommends', 'fix(x): s\n\nBefore:\n  `.toEqual([join(a, b)])`'],
      ['a call in prose, mid-line', 'fix(x): s\n\nThe spec asserts f(g(a)) in the middle.'],
      ['a line opening with a bare paren', 'fix(x): s\n\n(g(a)) opens the line.'],
      ['a line-leading call without nesting', 'fix(x): s\n\n.toEqual(outside) is fine.'],
      ['a word before the call', 'fix(x): s\n\nsee f(g(a)) here.'],
      ['nesting in the subject text', 'fix(x): handle f(g(a)) correctly']
    ])('accepts %s', (_name, message) => {
      expect(accepts(message)).toBe(true)
    })
  })

  describe('shapes that vanish from the changelog', () => {
    // Body-position failures. Both arm the same rule — a line beginning with a
    // call-like token — and differ only in how the parentheses go wrong.
    it.each([
      ['line-leading nested call', 'fix(x): s\n\nf(g(a)) opens the line.'],
      ['line-leading nested call, backticked', 'fix(x): s\n\n`.toEqual([join(outside, "components")])`.'],
      ['line-leading unclosed call', 'fix(x): s\n\nwriteTemplates(config.root || process.cwd'],
      ['a call wrapped across two lines', 'fix(x): s\n\nwriteTemplates(\n  config.root)'],
      // The real one, reduced to the two lines that matter.
      ['the dcb3bacf shape', 'test(components): build path expectations with pathe, not node:path (#427)\n\nthe two places fed by `fixtureRoot()`: `.toEqual([outside])` and\n`.toEqual([join(outside, "components")])`.']
    ])('rejects %s', (_name, message) => {
      expect(accepts(message)).toBe(false)
    })

    // Subject-position failures are 64 of the 67 rejections in this history —
    // the dominant class, and the one the guard's error text has to name first.
    it.each([
      ['the GitHub revert button', 'Revert "feat(Modal): add fullscreen prop"'],
      ['no colon after the scope', 'chore(lint) fix the config'],
      ['space between type and scope', 'fix (ProseA): correct the spacing'],
      ['space before the colon', 'docs(typography) : correct the sample'],
      ['nothing after the scope', 'chore(process)'],
      ['breaking marker before the scope', 'feat!(Modal): drop the prop'],
      ['a leading list marker', '* fix(Button): resolve hover state']
    ])('rejects %s', (_name, message) => {
      expect(accepts(message)).toBe(false)
    })
  })

  describe('the script itself', () => {
    it('exits 0 on a message release-please can read', () => {
      expect(guardExitCode('fix(Button): resolve hover state (#427)')).toBe(0)
    })

    it('exits 1 on the message that went missing from 2.12.0', () => {
      expect(guardExitCode('test(components): s\n\n`.toEqual([join(outside, "components")])`.')).toBe(1)
    })

    it('names the subject line when that is where the failure is', () => {
      // The guard branches on the parser's reported position. Pointing a reader
      // at the body when their subject is malformed is the failure mode this
      // assertion exists to prevent — it was the first version's behaviour.
      let output = ''
      try {
        execFileSync('node', [SCRIPT, '--stdin'], { input: 'Revert "feat(x): add a prop"', stdio: 'pipe' })
      } catch (error) {
        output = String((error as { stdout?: Buffer }).stdout ?? '')
      }

      expect(output).toContain('SUBJECT line')
      expect(output).not.toContain('The failure is in the BODY')
    })
  })
})
