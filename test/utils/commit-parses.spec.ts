import { describe, it, expect } from 'vitest'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { parser } from '@conventional-commits/parser'
import config from '../../release-please-config.json'

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

/** Derived, not listed: adding a section must not need an edit here either. */
const configuredTypes = config.packages['.']['changelog-sections'].map(entry => entry.type)

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

  /**
   * The second way a commit fails to reach the changelog correctly: it parses,
   * but its type has no entry in `changelog-sections`.
   *
   * Reproduced against the real config before writing any of this, by running
   * `conventional-changelog-conventionalcommits@6.1.0`'s writer over a
   * `style(Theme)!` commit — the output puts `### style` above `### Features`,
   * exactly as #437 predicted, because an unknown group title indexes to -1.
   */
  describe('types that have no changelog section', () => {
    it('reads the type list from the config rather than restating it', () => {
      // A guard that keeps its own copy of the list is a guard that will one day
      // disagree with the file it guards, silently and in the permissive
      // direction. Asserted here so a later "simplification" has to fail a test.
      const script = readFileSync(SCRIPT, 'utf8')
      expect(script).toContain('release-please-config.json')
      expect(script).toContain('changelog-sections')
    })

    it.each(configuredTypes.map(type => [type]))('accepts the configured type `%s`', (type) => {
      expect(guardExitCode(`${type}(Button): resolve hover state`)).toBe(0)
    })

    // The twelve types #437 found in this history with no entry. Every one of
    // them is dropped when ordinary and mis-rendered when breaking.
    it.each([
      ['playground', 31], ['doc', 23], ['style', 22], ['playgrounds', 12],
      ['cli', 6], ['demo', 2], ['core', 1], ['ai', 1]
    ])('rejects `%s`, used %i times before anyone noticed', (type) => {
      expect(guardExitCode(`${type}(Button): resolve hover state`)).toBe(1)
    })

    // No list of types can cover these, which is the argument for checking the
    // type against the config instead of maintaining a denylist.
    it.each([['feal(init) Init All'], ['ix: something'], ['hore(x): something'], ['eat(x): something']])(
      'rejects the typo %s', (subject) => {
        expect(guardExitCode(subject)).toBe(1)
      })

    it('rejects a breaking commit of an unconfigured type — the #437 case itself', () => {
      expect(guardExitCode('style(Theme)!: drop the legacy palette\n\nBREAKING CHANGE: gone.')).toBe(1)
    })

    it('rejects a configured type in the wrong case', () => {
      // release-please would not match `Fix` either, so accepting it here would
      // hand back a raw `### Fix` heading.
      expect(guardExitCode('Fix(Button): resolve hover state')).toBe(1)
    })

    it('says which types are configured, so the fix does not need a file hunt', () => {
      let output = ''
      try {
        execFileSync('node', [SCRIPT, '--stdin'], { input: 'style(x): reindent', stdio: 'pipe' })
      } catch (error) {
        output = String((error as { stdout?: Buffer }).stdout ?? '')
      }

      expect(output).toContain('has no changelog section')
      for (const type of configuredTypes) expect(output).toContain(type)
    })
  })

  /**
   * Ports have to be traceable from the changelog, and the subject is the only
   * line that gets there.
   *
   * The check keys on a new entry appearing in `processed` rather than on
   * `.sync/nuxt-ui.json` being edited at all — a reconciliation commit touches
   * the same file and ports nothing. That distinction is the whole design, so
   * it is exercised against real commits below rather than fixtures.
   */
  describe('ports naming the upstream commit', () => {
    /**
     * Runs the guard at a given revision, in a throwaway worktree.
     *
     * `title` switches it to the `--stdin` path while keeping the same git
     * context, which is what makes the "not on a bare title" case below mean
     * anything: run from the repository root it would pass either way, because
     * HEAD there ports nothing.
     */
    function guardAt(revision: string, title?: string): { code: number, output: string } {
      const dir = mkdtempSync(join(tmpdir(), 'b24ui-port-'))
      const args = title === undefined ? [SCRIPT] : [SCRIPT, '--stdin']
      try {
        execFileSync('git', ['worktree', 'add', '-q', '--detach', dir, revision], { stdio: 'pipe' })
        try {
          const output = execFileSync('node', args, { cwd: dir, encoding: 'utf8', stdio: 'pipe', input: title })
          return { code: 0, output }
        } catch (error) {
          const e = error as { status?: number, stdout?: Buffer }
          return { code: e.status ?? -1, output: String(e.stdout ?? '') }
        }
      } finally {
        execFileSync('git', ['worktree', 'remove', '--force', dir], { stdio: 'pipe' })
        rmSync(dir, { recursive: true, force: true })
      }
    }

    // #467 reconciled four ledger entries and ported nothing. Requiring an
    // upstream reference there would be wrong, and this is the case that makes
    // "new key in `processed`" the trigger instead of "file changed".
    it('leaves a bookkeeping commit alone', () => {
      expect(guardAt('30b4c1fb').code).toBe(0)
    })

    // A real port from before the rule existed. Flagged, which is the point:
    // the guard runs forward from here, and this is what it will catch.
    it('flags a port whose subject does not name upstream', () => {
      const { code, output } = guardAt('4e42a221')
      expect(code).toBe(1)
      expect(output).toContain('does not name the upstream commit')
      // The message has to hand back the exact line to use, or the fix is a
      // hunt through the ledger for a SHA.
      expect(output).toContain('nuxt/ui@')
    })

    it('leaves ordinary local work alone', () => {
      expect(guardAt('1db360ac').code).toBe(0)
    })

    it('is skipped, loudly, when it cannot see the previous revision', () => {
      // The check is inert without HEAD^, and silence there would read exactly
      // like a pass. ci.yml fetches depth 2 so this warning stays theoretical.
      const script = readFileSync(SCRIPT, 'utf8')
      expect(script).toContain('::warning::cannot read .sync/nuxt-ui.json at HEAD^')
    })

    it('does not run on a bare title, even standing on a port', () => {
      // `--stdin` is the PR-title path: a title alone cannot say what a commit
      // touches, so the check must not guess. Asserted at 4e42a221, where the
      // HEAD path does fire — from the repository root this would pass whether
      // the guard respected `--stdin` or not, and prove nothing.
      const title = 'fix(Range): forward aria attributes to the thumb'
      expect(guardAt('4e42a221').code, 'the HEAD path must flag this revision').toBe(1)
      expect(guardAt('4e42a221', title).code).toBe(0)
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
