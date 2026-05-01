#!/usr/bin/env python3
"""
scripts/bx-translate-locales/make.py

Translates UI locale files via Claude Code skill /bx-translate-locales.

Workflow:
  1. Parse src/runtime/locale/<source>.ts (JS object literal → Python dict).
  2. Write a JSON payload to a temp file per target locale.
  3. Call `claude -p /bx-translate-locales <temp-file>` — the skill reads the
     file with the Read tool, translates all messages, and returns raw JSON.
  4. Validate the translation covers all source keys (no silent gaps).
  5. Write the result atomically to the target .ts file.
  6. Run `eslint --fix` on the locale directory.

Skill location : skills/bx-translate-locales/SKILL.md
Script location: scripts/bx-translate-locales/make.py

Usage:
    python scripts/bx-translate-locales/make.py [source_locale]

    source_locale defaults to "en".

Environment overrides (also loaded from project root .env):
    BX_TRANSLATE_WORKERS  — max parallel translation workers (default: 5)
    BX_TRANSLATE_TIMEOUT  — subprocess timeout in seconds      (default: 120)
    BX_TRANSLATE_RETRIES  — retry attempts on transient errors (default: 2)
"""

from __future__ import annotations

import json
import os
import platform
import re
import subprocess
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Any

from dotenv import load_dotenv

load_dotenv()

# ── Paths ─────────────────────────────────────────────────────────────────────

# All paths are relative to the project root (where you run the script from),
# except TEMP_DIR and LOG_FILE which live next to the script itself so they
# are easy to .gitignore without touching src/.

_SCRIPT_DIR = Path(__file__).parent

LOCALE_DIR      = Path("src/runtime/locale")
DICTIONARY_FILE = Path("src/runtime/dictionary/i18n.ts")
TEMP_DIR        = _SCRIPT_DIR / ".temp"
LOG_FILE        = _SCRIPT_DIR / "translate.log.jsonl"

# ── Tuning (overridable via env) ──────────────────────────────────────────────

CONCURRENT_TASKS = int(os.getenv("BX_TRANSLATE_WORKERS", "5"))
SUBPROCESS_TIMEOUT = int(os.getenv("BX_TRANSLATE_TIMEOUT", "120"))  # seconds
MAX_RETRIES = int(os.getenv("BX_TRANSLATE_RETRIES", "2"))

# ── Claude CLI ────────────────────────────────────────────────────────────────

CLAUDE_CMD = "claude"  # must be on PATH
# NOTE: --dangerously-skip-permissions silences the interactive consent prompt
# so the script can run unattended. The skill is locked to allowed-tools: Read,
# so the model cannot write files, run code, or make network requests.
SKILL_NAME = "/bx-translate-locales"

# ── Domain constants ──────────────────────────────────────────────────────────

CHAT_CONTEXT_MARKER = "chat"  # top-level message keys containing this substring
                               # receive extra AI-agent context in the payload.

IGNORED_FILES: set[str] = {
    # Comment out a locale to re-enable translation for it.
    # "kz.ts",
    # "ua.ts",
    # "pl.ts",
    # "br.ts",
    # "de.ts",
    # "fr.ts",
    # "it.ts",
    # "tr.ts",
    # "sc.ts",
    # "tc.ts",
    # "ja.ts",
    # "vn.ts",
    # "id.ts",
    # "ms.ts",
    # "th.ts",
    # "in.ts",
    # "ar.ts",
    # "ko.ts",
    # "hi.ts",
    # "la.ts",
    # "es.ts",
    # "pt.ts",
    # "ro.ts",
    # "sk.ts",
    # "sl.ts",
    # "sq.ts",
}

# Locales that need dir: 'rtl' in the generated .ts file.
RTL_LOCALES: frozenset[str] = frozenset({"ar", "he", "fa", "ur"})

# Per-locale typography hints sent to the translation skill.
TYPOGRAPHY_RULES: dict[str, str] = {
    "ru": "Use ellipsis `…` (not `...`), em-dash `—` (not `--`). Feminine gender for тема/режим (Тёмная, Светлая, Системная).",
    "ua": "Use ellipsis `…` (not `...`), em-dash `—` (not `--`). Feminine gender for тема/режим.",
    "kz": "Use ellipsis `…` (not `...`), em-dash `—` (not `--`).",
    "ar": "Arabic punctuation: `؟` (question mark), `،` (comma), `؛` (semicolon). RTL text direction.",
    "fr": "Non-breaking space (U+00A0) before `:` `;` `!` `?`.",
    "sc": "Fullwidth punctuation: `。` `，` `？` `！`",
    "tc": "Fullwidth punctuation: `。` `，` `？` `！`",
    "ja": "Fullwidth punctuation: `。` `、` `？` `！`",
    "de": "Capitalize all nouns.",
    "th": "No spaces between Thai words.",
}

# ── Thread-safe console output ────────────────────────────────────────────────

_print_lock = threading.Lock()


def log(msg: str) -> None:
    with _print_lock:
        print(msg, flush=True)


# ── i18n dictionary parser ────────────────────────────────────────────────────

def parse_i18n_dictionary() -> list[dict[str, str]]:
    """Parse src/runtime/dictionary/i18n.ts and return the locale array.

    Extracts entries of the form  { code: '…', name: '…', file: '…' }
    without executing TypeScript.
    """
    content = DICTIONARY_FILE.read_text(encoding="utf-8")
    entries = []
    for m in re.finditer(
        r"\{\s*code:\s*'([^']+)',\s*name:\s*'([^']+)',\s*file:\s*'([^']+)'\s*\}",
        content,
    ):
        entries.append({"code": m.group(1), "name": m.group(2), "file": m.group(3)})
    if not entries:
        raise ValueError("No contentLocales entries found in i18n.ts")
    return entries


# ── JS object literal parser ─────────────────────────────────────────────────

def parse_js_object(text: str) -> dict[str, Any]:
    """Recursively parse a JS object literal into a Python dict.

    Handles nested objects and single-quoted strings with backslash escapes.
    Does not support computed keys, spread syntax, or template literals.
    """
    result: dict[str, Any] = {}
    text = text.strip()
    if text.startswith("{"):
        text = text[1:]
    if text.endswith("}"):
        text = text[:-1]

    pos, length = 0, len(text)

    while pos < length:
        # Skip commas and whitespace between key-value pairs.
        while pos < length and text[pos] in " \t\n\r,":
            pos += 1
        if pos >= length:
            break

        key_start = pos
        while pos < length and text[pos] != ":":
            pos += 1
        key = text[key_start:pos].strip()
        if not key:
            break
        pos += 1  # skip ':'

        while pos < length and text[pos] in " \t\n\r":
            pos += 1
        if pos >= length:
            break

        if text[pos] == "{":
            # Nested object: track brace depth, skip strings to avoid false matches.
            depth, start = 1, pos
            pos += 1
            while pos < length and depth > 0:
                ch = text[pos]
                if ch == "{":
                    depth += 1
                elif ch == "}":
                    depth -= 1
                elif ch == "'":
                    pos += 1
                    while pos < length and text[pos] != "'":
                        if text[pos] == "\\":
                            pos += 1
                        pos += 1
                pos += 1
            result[key] = parse_js_object(text[start:pos])

        elif text[pos] == "'":
            # Single-quoted string with simple backslash escape.
            pos += 1
            chars: list[str] = []
            while pos < length and text[pos] != "'":
                if text[pos] == "\\" and pos + 1 < length:
                    pos += 1
                    chars.append(text[pos])
                else:
                    chars.append(text[pos])
                pos += 1
            result[key] = "".join(chars)
            pos += 1  # skip closing quote

    return result


# ── Locale .ts file parser ────────────────────────────────────────────────────

def parse_locale_file(path: Path) -> dict[str, Any]:
    """Parse a locale .ts file and return its metadata and messages dict."""
    content = path.read_text(encoding="utf-8")
    meta: dict[str, Any] = {
        "name":     _extract_field(content, "name") or "",
        "code":     _extract_field(content, "code") or "",
        "locale":   _extract_field(content, "locale") or "",
        "messages": _extract_messages(content),
    }
    dir_val = _extract_field(content, "dir")
    if dir_val:
        meta["dir"] = dir_val
    return meta


def _extract_field(content: str, field: str) -> str | None:
    m = re.search(rf"^\s*{field}:\s*'([^']*)'", content, re.MULTILINE)
    return m.group(1) if m else None


def _extract_messages(content: str) -> dict[str, Any]:
    """Find the messages: { … } block and parse it."""
    idx = content.find("messages:")
    if idx == -1:
        return {}
    brace_idx = content.index("{", idx)
    depth, pos, length = 1, brace_idx + 1, len(content)
    while pos < length and depth > 0:
        ch = content[pos]
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
        elif ch == "'":
            pos += 1
            while pos < length and content[pos] != "'":
                if content[pos] == "\\":
                    pos += 1
                pos += 1
        pos += 1
    return parse_js_object(content[brace_idx:pos])


# ── Source file pre-processing ────────────────────────────────────────────────

def fix_source_ellipsis(path: Path) -> bool:
    """Replace three-dot sequences inside string literals with the ellipsis char.

    Only touches content inside single-quoted strings to avoid altering code.
    Returns True if the file was rewritten.
    """
    content = path.read_text(encoding="utf-8")
    new_content = re.sub(
        r"'[^']*'",
        lambda m: m.group(0).replace("...", "\u2026"),
        content,
    )
    if new_content != content:
        _atomic_write(path, new_content)
        return True
    return False


# ── Payload helpers ───────────────────────────────────────────────────────────

def detect_chat_context_keys(messages: dict[str, Any]) -> list[str]:
    """Return top-level keys whose name contains the chat context marker."""
    return [k for k in messages if CHAT_CONTEXT_MARKER in k.lower()]


def get_typography_rules(locale_code: str) -> str:
    return TYPOGRAPHY_RULES.get(locale_code, "Use ellipsis `…` (not `...`).")


# ── Translation output validation ─────────────────────────────────────────────

def _collect_key_paths(obj: Any, prefix: str = "") -> set[str]:
    """Return all dot-joined leaf key paths from a nested dict."""
    paths: set[str] = set()
    if isinstance(obj, dict):
        for k, v in obj.items():
            full = f"{prefix}.{k}" if prefix else k
            if isinstance(v, dict):
                paths |= _collect_key_paths(v, full)
            else:
                paths.add(full)
    return paths


def validate_translation(
    source: dict[str, Any],
    translation: dict[str, Any],
) -> list[str]:
    """Return a list of key paths present in source but missing from translation."""
    src_paths = _collect_key_paths(source)
    trn_paths = _collect_key_paths(translation)
    return sorted(src_paths - trn_paths)


# ── Temp file management ──────────────────────────────────────────────────────

_SAFE_LOCALE = re.compile(r"^[a-zA-Z0-9_-]+$")


def _safe_locale_code(code: str) -> str:
    """Reject locale codes that could escape the temp directory."""
    if not _SAFE_LOCALE.match(code):
        raise ValueError(f"Unsafe locale code: {code!r}")
    return code


def write_temp_payload(locale_code: str, payload: dict[str, Any]) -> Path:
    TEMP_DIR.mkdir(parents=True, exist_ok=True)
    temp_path = TEMP_DIR / f"translate-{_safe_locale_code(locale_code)}.json"
    temp_path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    return temp_path


def cleanup_temp(locale_code: str) -> None:
    (TEMP_DIR / f"translate-{locale_code}.json").unlink(missing_ok=True)


# ── Atomic file write ─────────────────────────────────────────────────────────

def _atomic_write(path: Path, content: str) -> None:
    """Write content to path atomically using a .tmp sibling and os.replace().

    Prevents corrupted files if the process is interrupted mid-write.
    """
    tmp = path.with_suffix(".tmp")
    try:
        tmp.write_text(content, encoding="utf-8")
        tmp.replace(path)  # atomic on POSIX; best-effort on Windows
    except Exception:
        tmp.unlink(missing_ok=True)
        raise


# ── Claude invocation ────────────────────────────────────────────────────────

def call_claude_translate(temp_path: Path) -> dict[str, Any]:
    """Invoke the /bx-translate-locales skill and return the parsed JSON result.

    The skill (skills/bx-translate-locales/SKILL.md) reads the payload file
    using the Read tool, translates the messages, and outputs raw JSON.

    Raises RuntimeError on non-zero exit, empty output, or JSON parse failure.
    """
    cmd = [
        CLAUDE_CMD, "-p", f"{SKILL_NAME} {temp_path}",
        "--output-format", "json",
        "--tools", "Read",
        "--dangerously-skip-permissions",
        # ^^ Suppresses the interactive consent prompt for unattended runs.
        #    Safe here because the skill declares allowed-tools: Read only.
    ]
    proc = subprocess.run(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        universal_newlines=True,
        encoding="utf-8",
        errors="replace",
        timeout=SUBPROCESS_TIMEOUT,  # prevents silent hangs
    )

    if proc.returncode != 0:
        details = (proc.stderr or proc.stdout or "<no output>")[:1000]
        raise RuntimeError(f"claude exited {proc.returncode}:\n{details}")

    if not proc.stdout.strip():
        raise RuntimeError("claude returned empty stdout")

    outer = json.loads(proc.stdout)

    if outer.get("is_error"):
        raise RuntimeError(f"claude reported error: {outer.get('result', outer)}")

    return _extract_json(outer.get("result", ""))


def _extract_json(text: str) -> dict[str, Any]:
    """Extract a JSON object from model output that may contain markdown fences."""
    text = text.strip()

    # Ideal case: the entire response is valid JSON.
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # Common case: model wrapped JSON in a ```json … ``` block.
    m = re.search(r"```(?:json)?\s*\n(.*?)\n\s*```", text, re.DOTALL)
    if m:
        try:
            return json.loads(m.group(1))
        except json.JSONDecodeError:
            pass

    # Fallback: greedily grab the outermost { … } block.
    m = re.search(r"\{.*\}", text, re.DOTALL)
    if m:
        try:
            return json.loads(m.group(0))
        except json.JSONDecodeError:
            pass

    raise ValueError(f"Could not extract JSON from model response:\n{text[:500]}")


# ── Retry wrapper ─────────────────────────────────────────────────────────────

def with_retry(fn: Any, retries: int = MAX_RETRIES, base_delay: float = 5.0) -> Any:
    """Call fn(), retrying on exception with exponential back-off.

    Uses a fixed base_delay of 5 s, doubling each attempt (5 s, 10 s, …).
    Re-raises the last exception if all attempts are exhausted.
    """
    last_exc: Exception | None = None
    for attempt in range(retries + 1):
        try:
            return fn()
        except Exception as exc:
            last_exc = exc
            if attempt < retries:
                wait = base_delay * (2 ** attempt)
                log(f"    Attempt {attempt + 1} failed ({exc}); retrying in {wait:.0f}s…")
                time.sleep(wait)
    raise last_exc  # type: ignore[misc]


# ── .ts file serialiser ───────────────────────────────────────────────────────

def serialize_messages(obj: dict[str, Any], indent: int = 4) -> str:
    """Render a nested dict as a JS object body (single-quoted strings, no trailing comma)."""
    lines: list[str] = []
    keys = list(obj.keys())
    for i, key in enumerate(keys):
        value = obj[key]
        comma = "" if i == len(keys) - 1 else ","
        pad = " " * indent
        if isinstance(value, dict):
            lines.append(f"{pad}{key}: {{")
            inner = serialize_messages(value, indent + 2)
            if inner:
                lines.append(inner)
            lines.append(f"{pad}}}{comma}")
        else:
            escaped = str(value).replace("'", "\\'")
            lines.append(f"{pad}{key}: '{escaped}'{comma}")
    return "\n".join(lines)


def generate_ts_content(meta: dict[str, Any], messages: dict[str, Any]) -> str:
    """Assemble the full .ts locale file content from metadata and messages."""
    dir_line = f"  dir: '{meta['dir']}',\n" if "dir" in meta else ""
    messages_block = serialize_messages(messages, indent=4)
    return (
        "import type { Messages } from '../types'\n"
        "import { defineLocale } from '../composables/defineLocale'\n"
        "\n"
        "export default defineLocale<Messages>({\n"
        f"  name: '{meta['name']}',\n"
        f"  code: '{meta['code']}',\n"
        f"  locale: '{meta['locale']}',\n"
        f"{dir_line}"
        "  messages: {\n"
        f"{messages_block}\n"
        "  }\n"
        "})\n"
    )


# ── Single locale pipeline ────────────────────────────────────────────────────

def process_single_target(
    source_locale: str,
    source_messages: dict[str, Any],
    target: dict[str, str],
    chat_keys: list[str],
) -> dict[str, Any]:
    """Translate one target locale and write the result to disk.

    Steps:
      1. Read existing metadata (or derive it for new locales).
      2. Build and write the JSON payload to a temp file.
      3. Invoke Claude (with retry on transient failure).
      4. Validate that all source keys are present in the translation.
      5. Write the .ts file atomically.
    """
    target_code = target["code"]
    target_file = target["file"]
    target_path = LOCALE_DIR / target_file

    log(f"  >> {target_file} ({target['name']}) — translating…")

    if target_path.exists():
        # Preserve hand-edited metadata; only replace messages.
        existing = parse_locale_file(target_path)
        meta: dict[str, Any] = {
            "name":   existing["name"],
            "code":   existing["code"],
            "locale": existing["locale"],
        }
        if "dir" in existing:
            meta["dir"] = existing["dir"]
    else:
        # New file: derive metadata from the i18n dictionary entry.
        meta = {"name": target["name"], "code": target_code, "locale": target_code}
        if target_code in RTL_LOCALES:
            meta["dir"] = "rtl"

    payload = {
        "source_locale":   source_locale,
        "target_locale":   target_code,
        "target_name":     target["name"],
        "source_messages": source_messages,
        "chat_context_keys": chat_keys,
        "typography_rules": get_typography_rules(target_code),
    }

    temp_path = write_temp_payload(target_code, payload)
    try:
        result = with_retry(lambda: call_claude_translate(temp_path))
        translations: dict[str, Any] = result.get("translations", result)

        # Safety: ensure the model didn't silently drop any keys.
        missing = validate_translation(source_messages, translations)
        if missing:
            raise ValueError(
                f"Translation is missing {len(missing)} key(s): "
                + ", ".join(missing[:10])
                + (" …" if len(missing) > 10 else "")
            )

        content = generate_ts_content(meta, translations)
        _atomic_write(target_path, content)

        return {"file": target_file, "code": target_code, "status": "success"}
    finally:
        cleanup_temp(target_code)


# ── Parallel orchestration ────────────────────────────────────────────────────

def process_all_targets(
    source_locale: str,
    source_messages: dict[str, Any],
    targets: list[dict[str, str]],
    chat_keys: list[str],
) -> list[dict[str, Any]]:
    """Translate all target locales in parallel, up to CONCURRENT_TASKS at once."""
    results: list[dict[str, Any]] = []
    total = len(targets)
    completed = 0

    with ThreadPoolExecutor(max_workers=CONCURRENT_TASKS) as executor:
        future_to_target = {
            executor.submit(
                process_single_target, source_locale, source_messages, t, chat_keys
            ): t
            for t in targets
        }
        for future in as_completed(future_to_target):
            completed += 1
            target = future_to_target[future]
            try:
                result = future.result()
                results.append(result)
                log(f"  [{completed}/{total}] {target['file']} ({target['name']}) — OK")
            except Exception as exc:
                results.append({
                    "file":   target["file"],
                    "code":   target["code"],
                    "status": "error",
                    "error":  str(exc),
                })
                log(f"  [{completed}/{total}] {target['file']} ({target['name']}) — ERROR: {exc}")

    return results


# ── ESLint ────────────────────────────────────────────────────────────────────

def run_eslint() -> None:
    """Run eslint --fix on the locale directory to normalize code style."""
    # On Windows, pnpm is a .cmd file and needs shell=True to resolve.
    shell = platform.system() == "Windows"
    result = subprocess.run(
        ["pnpm", "exec", "eslint", "--fix", f"{LOCALE_DIR}/"],
        capture_output=True,
        text=True,
        timeout=60,
        shell=shell,
    )
    # Non-zero exit is common with warnings-only ESLint runs; only print if there's output.
    if result.returncode != 0 and result.stderr:
        print(f"   ESLint warnings:\n{result.stderr[:500]}")
    else:
        print("   ESLint OK")


# ── Consistency check ─────────────────────────────────────────────────────────

def check_consistency(locales: list[dict[str, str]]) -> None:
    """Warn if any i18n.ts entry is missing on disk, or if an orphan .ts exists."""
    dict_files = {entry["file"] for entry in locales}
    for loc in locales:
        if not (LOCALE_DIR / loc["file"]).exists():
            print(f"   WARNING: {loc['file']} listed in i18n.ts not found in {LOCALE_DIR}")
    for fpath in LOCALE_DIR.glob("*.ts"):
        if fpath.name != "index.ts" and fpath.name not in dict_files:
            print(f"   WARNING: {fpath.name} in {LOCALE_DIR} is not listed in i18n.ts")


# ── Error log ─────────────────────────────────────────────────────────────────

def log_error_events(records: list[dict[str, Any]]) -> None:
    """Append error records (one JSON object per line) to the error log file."""
    if not records:
        return
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        for r in records:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")


# ── Entry point ───────────────────────────────────────────────────────────────

def main() -> None:
    source_locale = sys.argv[1] if len(sys.argv) > 1 else "en"
    print(f"Source locale: {source_locale}")
    print(f"Workers: {CONCURRENT_TASKS}  Timeout: {SUBPROCESS_TIMEOUT}s  Retries: {MAX_RETRIES}")

    # Step 1 — Parse the locale dictionary.
    print("\n1. Reading i18n.ts…")
    try:
        locales = parse_i18n_dictionary()
    except (ValueError, FileNotFoundError) as exc:
        log_error_events([{"phase": "startup", "status": "error", "error": str(exc)}])
        print(str(exc))
        sys.exit(1)
    print(f"   Found {len(locales)} locale(s)")

    source_entry = next((l for l in locales if l["code"] == source_locale), None)
    if not source_entry:
        msg = f"Locale '{source_locale}' not found in i18n.ts"
        log_error_events([{"phase": "startup", "status": "error", "error": msg}])
        print(msg)
        sys.exit(1)

    targets = [
        l for l in locales
        if l["code"] != source_locale and l["file"] not in IGNORED_FILES
    ]
    ignored = [l for l in locales if l["file"] in IGNORED_FILES]
    if ignored:
        print(f"   Ignored: {', '.join(l['code'] for l in ignored)}")
    print(f"   Targets ({len(targets)}): {', '.join(t['file'] for t in targets)}")

    # Step 2 — Read and pre-process the source locale file.
    source_path = LOCALE_DIR / source_entry["file"]
    if not source_path.exists():
        msg = f"Source file not found: {source_path}"
        log_error_events([{"phase": "startup", "status": "error", "error": msg}])
        print(msg)
        sys.exit(1)

    print(f"\n2. Reading {source_path}…")
    if fix_source_ellipsis(source_path):
        print("   Fixed '...' → '…' in source file")

    source_data = parse_locale_file(source_path)
    source_messages = source_data["messages"]

    chat_keys = detect_chat_context_keys(source_messages)
    if chat_keys:
        print(f"   Chat-context keys: {', '.join(chat_keys)}")

    # Step 3 — Translate all targets in parallel.
    print(f"\n3. Translating (up to {CONCURRENT_TASKS} in parallel)…")
    results = process_all_targets(source_locale, source_messages, targets, chat_keys)

    # Step 4 — Normalise code style.
    print("\n4. Running eslint --fix…")
    run_eslint()

    # Step 5 — Summary.
    success = sum(1 for r in results if r["status"] == "success")
    errors = len(results) - success
    print(f"\n5. Done: {success} succeeded, {errors} failed")

    if errors:
        print("\n   Errors:")
        for r in results:
            if r["status"] == "error":
                print(f"     {r['file']}: {r['error']}")

    # Step 6 — Structural consistency check (warnings only, does not exit non-zero).
    print("\n6. Checking consistency…")
    check_consistency(locales)

    error_results = [r for r in results if r.get("status") == "error"]
    log_error_events(error_results)
    if error_results:
        print(f"\nTranslation errors written to: {LOG_FILE}")

    # Clean up temp dir if empty.
    if TEMP_DIR.exists() and not any(TEMP_DIR.iterdir()):
        TEMP_DIR.rmdir()


if __name__ == "__main__":
    main()
