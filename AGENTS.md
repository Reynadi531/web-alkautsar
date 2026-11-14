# AGENTS.md

## Style

Terse. Sacrifice grammar for concision in explanations and questions. Fragments OK. Drop articles, filler, pleasantries. Keep technical terms, code, paths, errors exact.

## When unsure: ask

Unclear requirement, ambiguous design, multiple valid approaches, missing asset/copy, risky or irreversible change → stop and ask user before acting. Guessing costs more than asking.

Question format: short, specific, options listed, recommendation first.

> Hero image missing in design. Options: (a) placeholder, (b) reuse `masjid.jpg`, (c) wait. Rec: (a).

## Before done: verify in ego-browser

Work is done only after seen working in real browser. Load `ego-browser` skill, then:

1. Run dev server (`bun run dev:web`, port 3001) if not running.
2. Open every changed page/route.
3. Check desktop + mobile width.
4. Exercise changed interactions (search, filters, nav, forms).
5. Check console for errors.
6. Fix issues, re-verify. Repeat until clean.

Report: what checked, what passed, anything left broken. Unverified work = not done; say so explicitly.
