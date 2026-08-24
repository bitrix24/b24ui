import { describe, it, expect } from 'vitest'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
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
      // Asserted by behaviour, not by grep. The first version checked that the
      // script mentioned the config file — which a hardcoded copy of the list
      // passes with the comment still in place, as review demonstrated. So:
      // stand the script beside a config naming a type this repository does
      // not configure, and require it to accept that type.
      const dir = mkdtempSync(join(tmpdir(), 'b24ui-config-'))
      try {
        mkdirSync(join(dir, '.github/scripts'), { recursive: true })
        writeFileSync(join(dir, '.github/scripts/guard.mjs'), readFileSync(SCRIPT, 'utf8'))
        writeFileSync(join(dir, 'release-please-config.json'), JSON.stringify({
          packages: { '.': { 'changelog-sections': [{ type: 'invented', section: 'Invented' }] } }
        }))
        // The copy still imports `@conventional-commits/parser`, resolved by
        // walking up from its own directory — so it needs one to walk up to.
        symlinkSync(join(process.cwd(), 'node_modules'), join(dir, 'node_modules'), 'dir')

        const run = (subject: string) => {
          try {
            execFileSync('node', [join(dir, '.github/scripts/guard.mjs'), '--stdin'], { input: subject, stdio: 'pipe' })
            return 0
          } catch (error) {
            return (error as { status?: number }).status ?? -1
          }
        }

        expect(run('invented(x): a type only that config knows'), 'the config was not read').toBe(0)
        expect(run('fix(x): a type only this repository knows'), 'the list is hardcoded').toBe(1)
      } finally {
        rmSync(dir, { recursive: true, force: true })
      }
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

    // The type token runs to the first `(`, `!`, `:` or space — it is not
    // letters. Deriving it with `/^([a-z]+)/i` read `fix2(x):` as `fix` and
    // accepted it, and captured nothing at all from `2fix(x):`, printing
    // "type `undefined` has a section" and skipping the check. Both are types
    // release-please would not match, so both were silent bypasses of the one
    // thing this check exists to do. Found by review; the type now comes from
    // the parser's own AST, and these cases are what hold it there.
    it.each([
      ['a digit inside the type', 'fix2(Button): resolve hover state'],
      ['a type starting with a digit', '2fix(Button): resolve hover state'],
      ['a hyphen inside the type', 'fix-perf(Button): resolve hover state'],
      ['an underscore inside the type', 'fix_button(Button): resolve hover state']
    ])('rejects %s', (_name, subject) => {
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
   * Built against a synthetic repository rather than against this one's
   * history. The first version worktree'd onto real SHAs — 30b4c1fb, 4e42a221,
   * 1db360ac — and review found two things wrong with that. The same PR sets
   * ci.yml to `fetch-depth: 2`, so those objects are simply absent on CI and
   * all four cases fail every run; and creating worktrees in the repository
   * under test races with anything else touching it, which is not theoretical
   * — a concurrent run left a mutated script in the working tree while this
   * very branch was being reviewed.
   *
   * A fixture also states the cases plainly. "The commit at 30b4c1fb passes"
   * requires the reader to go and find out what that commit is; "a ledger entry
   * recording a no-op does not need an upstream reference" does not.
   */
  describe('ports naming the upstream commit', () => {
    /**
     * A two-commit repository: a ledger, then a change to it. Returns the
     * guard's exit code and output for the second commit.
     */
    function guardOnLedgerChange(before: object, after: object, subject: string) {
      const dir = mkdtempSync(join(tmpdir(), 'b24ui-ledger-'))
      const git = (...args: string[]) => execFileSync('git', args, { cwd: dir, stdio: 'pipe' })
      try {
        mkdirSync(join(dir, '.sync'), { recursive: true })
        git('init', '-q', '-b', 'main')
        git('config', 'user.email', 'spec@example.com')
        git('config', 'user.name', 'spec')

        const ledger = join(dir, '.sync/nuxt-ui.json')
        writeFileSync(ledger, JSON.stringify({ processed: before }, null, 2))
        git('add', '-A')
        git('commit', '-q', '-m', 'chore(sync): the ledger before')

        writeFileSync(ledger, JSON.stringify({ processed: after }, null, 2))
        git('add', '-A')
        // `--allow-empty`: the "nothing changed in the ledger" case has no diff
        // to commit, and that is exactly the case worth asserting.
        git('commit', '-q', '--allow-empty', '-m', subject)

        try {
          return { code: 0, output: execFileSync('node', [SCRIPT], { cwd: dir, encoding: 'utf8', stdio: 'pipe' }) }
        } catch (error) {
          const e = error as { status?: number, stdout?: Buffer }
          return { code: e.status ?? -1, output: String(e.stdout ?? '') }
        }
      } finally {
        rmSync(dir, { recursive: true, force: true })
      }
    }

    const PORT = { decision: 'port', pr: 1 }
    const SHA_A = 'd6c3802a12ecdc549d605ca8459fc3fbc99af63b'
    const SHA_B = 'aa5f4af0b1c2d3e4f5061728394a5b6c7d8e9f01'

    it('flags a port whose subject does not name upstream', () => {
      const { code, output } = guardOnLedgerChange({}, { [SHA_A]: PORT }, 'fix(Range): forward aria attributes')
      expect(code).toBe(1)
      expect(output).toContain('does not name the upstream commit')
      // The message has to hand back the line to use, or fixing it means a hunt
      // through the ledger for a SHA.
      expect(output).toContain(`nuxt/ui@${SHA_A.slice(0, 7)}`)
    })

    it('accepts a port that names upstream', () => {
      const subject = `fix(Range): forward aria attributes (nuxt/ui@${SHA_A.slice(0, 7)})`
      expect(guardOnLedgerChange({}, { [SHA_A]: PORT }, subject).code).toBe(0)
    })

    it('accepts a longer prefix than seven', () => {
      const subject = `fix(Range): forward aria attributes (nuxt/ui@${SHA_A.slice(0, 12)})`
      expect(guardOnLedgerChange({}, { [SHA_A]: PORT }, subject).code).toBe(0)
    })

    it('accepts the reference in any case', () => {
      const subject = `fix(Range): forward aria attributes (NUXT/UI@${SHA_A.slice(0, 7).toUpperCase()})`
      expect(guardOnLedgerChange({}, { [SHA_A]: PORT }, subject).code).toBe(0)
    })

    // §6 4b: a batched port adds several entries and can name only one.
    it('accepts a batch that names any one of its ports', () => {
      const subject = `fix(Range): port two commits (nuxt/ui@${SHA_B.slice(0, 7)})`
      expect(guardOnLedgerChange({}, { [SHA_A]: PORT, [SHA_B]: PORT }, subject).code).toBe(0)
    })

    // 70 of the ledger's entries are not ports. A commit recording one has
    // nothing upstream to point a changelog reader at, and requiring a
    // reference would redden `main` for a correct message — #442, #439 and
    // #361 are real examples the first draft flagged.
    it.each([['no-op'], ['noop'], ['skip'], ['n/a']])(
      'leaves a `%s` entry alone', (decision) => {
        const entry = { decision, pr: 1 }
        expect(guardOnLedgerChange({}, { [SHA_A]: entry }, 'chore(sync): record a skip').code).toBe(0)
      })

    it('leaves a commit that only edits existing entries alone', () => {
      // The reconciliation §6 step 4 requires: same keys, new values.
      const before = { [SHA_A]: { decision: 'port', b24ui_sha: 'pending-merge' } }
      const after = { [SHA_A]: { decision: 'port', b24ui_sha: 'abc1234' } }
      expect(guardOnLedgerChange(before, after, 'chore(sync): reconcile the last entry').code).toBe(0)
    })

    it('leaves ordinary work with no ledger change alone', () => {
      const same = { [SHA_A]: PORT }
      expect(guardOnLedgerChange(same, same, 'fix(Button): resolve hover state').code).toBe(0)
    })

    // A ledger key is data from a file. Building a `RegExp` from it turned an
    // entry keyed `(a+)+$` into a hang; it is a substring test against a key
    // checked to be a SHA now, and a key that is not one is reported.
    it('does not execute a ledger key as a pattern', () => {
      const { code, output } = guardOnLedgerChange({}, { '(a+)+$': PORT }, 'fix(x): nuxt/ui@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!X')
      expect(code).toBe(0)
      expect(output).toContain('not a SHA')
    })

    it('warns rather than passing quietly when it cannot read a side', () => {
      const script = readFileSync(SCRIPT, 'utf8')
      expect(script).toContain('::warning::cannot read .sync/nuxt-ui.json at HEAD —')
      expect(script).toContain('::warning::cannot read .sync/nuxt-ui.json at HEAD^')
    })

    it('does not run on a bare title, even where the HEAD path would fire', () => {
      // `--stdin` is the PR-title path: a title alone cannot say what a commit
      // touches, so the check must not guess. Paired with the first case above,
      // which is the same subject and does fail through the HEAD path.
      expect(guardExitCode('fix(Range): forward aria attributes')).toBe(0)
    })
  })

  describe('the script itself', () => {
    it('skips a merge commit, which release-please drops by design', () => {
      // Untested until review's mutation run: disabling `isMergeCommit()`
      // entirely, or moving its parent threshold, killed nothing. A merge
      // subject is `Merge pull request …`, which the parser rejects and
      // release-please is right to drop — failing on it would redden `main`
      // for correct behaviour.
      const dir = mkdtempSync(join(tmpdir(), 'b24ui-merge-'))
      const git = (...args: string[]) => execFileSync('git', args, { cwd: dir, stdio: 'pipe' })
      try {
        git('init', '-q', '-b', 'main')
        git('config', 'user.email', 'spec@example.com')
        git('config', 'user.name', 'spec')
        writeFileSync(join(dir, 'f.txt'), 'a')
        git('add', '-A')
        git('commit', '-q', '-m', 'feat(x): base')
        git('checkout', '-q', '-b', 'side')
        writeFileSync(join(dir, 'g.txt'), 'b')
        git('add', '-A')
        git('commit', '-q', '-m', 'feat(x): side')
        git('checkout', '-q', 'main')
        writeFileSync(join(dir, 'h.txt'), 'c')
        git('add', '-A')
        git('commit', '-q', '-m', 'feat(x): main')
        git('merge', '--no-ff', '-q', '-m', 'Merge pull request #1 from side', 'side')

        const output = execFileSync('node', [SCRIPT], { cwd: dir, encoding: 'utf8', stdio: 'pipe' })
        expect(output).toContain('merge commit')
      } finally {
        rmSync(dir, { recursive: true, force: true })
      }
    })

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
