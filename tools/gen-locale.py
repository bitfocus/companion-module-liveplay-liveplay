#!/usr/bin/env python3
"""Regenerate src/locale.ts from the LivePlay client's own translation files.

Button labels must read exactly like the app they control, so rather than
inventing a second set of translations we lift them straight out of
liveplay/client/locales/*.json. Re-run after LivePlay adds a locale:

    python tools/gen-locale.py ../liveplay/client/locales

Keys mapped to None are deliberately untranslated: "GO", "PANIC" and
"LIMITER" are industry terms that stay recognisable in every language and
are short enough to survive a 72 px button, which the translated
equivalents ("Stop All Cues" -> "Ferma Tutti i Segnali") are not.
"""
import json
import os
import sys
import glob

# module key -> LivePlay locale key ("section.key"), or None for a literal.
MAPPING = {
    'go':           None,
    'panic':        None,
    'limiter':      None,
    'playNext':     'controls.playNext',
    'stopAll':      'controls.stopAll',
    'upNext':       'status.upNext',
    'playing':      'status.playing',
    'preview':      'status.previewing',
    'selectUp':     'controls.selectUp',
    'selectDown':   'controls.selectDown',
    'playSelected': 'controls.playSelected',
    'setAsNext':    'actions.setAsNext',
    'showMode':     'showMode.toggle',
    'master':       'playback.masterMix',
    'slot':         'cart.slot',
    'pause':        'actions.pause',
    'resume':       'actions.resume',
}

LITERALS = {'go': 'GO', 'panic': 'PANIC', 'limiter': 'LIMITER'}


def ts_string(value):
    """A single-quoted TypeScript literal, matching the repo's prettier config."""
    return "'" + value.replace('\\', '\\\\').replace("'", "\\'") + "'"


def extract(doc):
    out = {}
    for mod_key, src_key in MAPPING.items():
        if src_key is None:
            out[mod_key] = LITERALS[mod_key]
            continue
        section, leaf = src_key.split('.')
        value = doc.get(section, {}).get(leaf)
        if isinstance(value, str) and value:
            out[mod_key] = value
    return out


def main():
    locales_dir = sys.argv[1] if len(sys.argv) > 1 else '../liveplay/client/locales'
    tables = {}
    for path in sorted(glob.glob(os.path.join(locales_dir, '*.json'))):
        code = os.path.splitext(os.path.basename(path))[0]
        with open(path, encoding='utf-8') as fh:
            tables[code] = extract(json.load(fh))
    if 'en' not in tables:
        raise SystemExit(f'no en.json found in {locales_dir}')

    # English is the complete reference set; every other locale falls back to
    # it at lookup time, so only emit the keys that actually differ.
    en = tables['en']
    lines = []
    lines.append('/**')
    lines.append(' * Button labels in the operator\'s language.')
    lines.append(' *')
    lines.append(' * GENERATED FILE — do not edit by hand. Regenerate with:')
    lines.append(' *     python tools/gen-locale.py <path-to>/liveplay/client/locales')
    lines.append(' *')
    lines.append(' * Strings are lifted verbatim from the LivePlay client\'s own locale files')
    lines.append(' * so a Companion button and the on-screen control it mirrors are worded')
    lines.append(' * identically. The active locale comes from the server (`ui.locale` in the')
    lines.append(' * state summary), so changing the language in LivePlay relabels the')
    lines.append(' * Stream Deck too.')
    lines.append(' *')
    lines.append(' * "GO", "PANIC" and "LIMITER" stay in English on purpose: they are the')
    lines.append(' * industry terms operators look for, and they fit a 72 px button in a way')
    lines.append(' * the translated phrases do not.')
    lines.append(' */')
    lines.append('')
    lines.append('/** The label set every locale provides (English is the complete reference). */')
    lines.append('export type LocaleStrings = {')
    for key in MAPPING:
        lines.append(f'\t{key}: string')
    lines.append('}')
    lines.append('')
    lines.append('const EN: LocaleStrings = {')
    for key in MAPPING:
        lines.append(f'\t{key}: {ts_string(en[key])},')
    lines.append('}')
    lines.append('')
    lines.append('/** Per-locale overrides; anything missing falls back to English. */')
    lines.append('const TABLES: Record<string, Partial<LocaleStrings>> = {')
    for code in sorted(tables):
        if code == 'en':
            continue
        diff = {k: v for k, v in tables[code].items() if v != en.get(k)}
        if not diff:
            continue
        lines.append(f'\t{code}: {{')
        for key in MAPPING:
            if key in diff:
                lines.append(f'\t\t{key}: {ts_string(diff[key])},')
        lines.append('\t},')
    lines.append('}')
    lines.append('')
    lines.append('/** Locale codes this module can label buttons in. */')
    lines.append('export const SUPPORTED_LOCALES = [\'en\', ' +
                 ', '.join(f"'{c}'" for c in sorted(tables) if c != 'en') + '] as const')
    lines.append('')
    lines.append('/**')
    lines.append(' * Label lookup for a locale code. Unknown codes (and the bare-language')
    lines.append(' * prefix of a regional code, e.g. "pt-BR") degrade to English rather than')
    lines.append(' * showing raw keys on a button mid-show.')
    lines.append(' */')
    lines.append('export function strings(locale: string | undefined): LocaleStrings {')
    lines.append('\tif (!locale) return EN')
    lines.append('\t// hasOwn, not a bare lookup: the locale code comes from the server, and')
    lines.append('\t// inherited names like "constructor" must not resolve to a table.')
    lines.append('\tif (Object.hasOwn(TABLES, locale)) return { ...EN, ...TABLES[locale] }')
    lines.append('\tconst base = locale.split(/[-_]/)[0].toLowerCase()')
    lines.append('\tif (Object.hasOwn(TABLES, base)) return { ...EN, ...TABLES[base] }')
    lines.append('\treturn EN')
    lines.append('}')
    lines.append('')

    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'locale.ts')
    with open(out_path, 'w', encoding='utf-8', newline='\n') as fh:
        fh.write('\n'.join(lines))
    print(f'wrote {os.path.normpath(out_path)} ({len(tables)} locales)')


if __name__ == '__main__':
    main()
