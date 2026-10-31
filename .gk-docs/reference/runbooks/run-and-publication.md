---
status: authoritative
last-verified: 2026-10-31
covers: ScanRuler maintenance-loop scope, verification and publication
---
# Run and publication safety

## Deployment

This fork has no approved deployment. Never run `npm run deploy`, wrangler deploy, change Cloudflare configuration, merge upstream PRs, publish npm packages, or sign the CLA. Upstream's deploy procedure is in `docs/development.md`; only CNC Kitchen owns the live site.

## Run

The native task loop is the active executor as of 2026-10-31. It works sequentially in this checkout and commits/pushes checked work to the automation branch. Do not start gk run concurrently. The Greenskeeper-specific instructions below describe a future migration, not the current worker. Global skill-link restoration is not needed for the native executor.

Start from `automation/scanruler-improvements` after `gk doctor` and the manifest verify command pass. Use one sequential Codex executor, subscription capacity only; do not opt into paid fallback or start other helpers. Use isolated headless browsers with fresh profiles and owned ephemeral servers. Existing tabs, dev servers and profiles are off limits.

`gk run status` and `gk run ledger` read progress; `gk run stop` finishes the current pass and stops. The supervisor owns its isolated worktrees and pushes the automation branch at pass boundaries. The Claude write hook is registered, but Codex follows ownership by convention, not hook enforcement.

## Verification

The manifest runs dependency preparation, all unit tests, the production build, and the complete browser CI suite. The preparation script also runs any standalone Node test modules and rejects TAP failures including failing teardown hooks. Missing private scan fixtures must be reported as skipped, never as tested. Each product change also needs a specific failing-before/passing-after reproduction through the real entry point. No assertion or threshold may be weakened to make a gate green.

## Publication

`origin` is Greg-J/ScanRuler; `upstream` is CNCKitchen/ScanRuler. Keep runner configuration, this record, CLAUDE.md, AGENTS.md, TODO.md and the verification preparation script out of upstream PRs. Do not add unrelated commits to PR #22.

After each verified bug fix, record the exact product/test diff and proof in the ledger. A publication pass must independently review the diff, verify GitHub identity is Greg-J, prepare a clean branch from the current upstream main containing only the fix and needed dependencies, run its relevant checks, then open a focused PR. If clean isolation or verification cannot be established, park publication with evidence. PRs are authorized; merges, deploys and legal signatures are not.

## Value and stopping

Fix reproducible defects before optimizing. Performance changes need representative before/after measurements with identical inputs and a clear user-visible benefit. Do not add features, redesigns, settings, dependencies, or generic cleanup merely to keep the loop busy. Add discovered defects with evidence and proof; stop when no independently actionable, demonstrated problem remains. Product/taste, hardware and legal decisions go to For Greg without stopping independent repairs.
