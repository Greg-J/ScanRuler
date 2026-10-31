# ScanRuler local checkout

Audience: Hosted for others. Fixes must work across supported browsers and systems.

Upstream: https://github.com/CNCKitchen/scanruler
Review baseline: 2cd89c6 (0.9.2), cloned 2026-10-31.

## Greg decisions

2026-10-31: "Put yourself on an automated loop of inspection and improvement, but don't create featuers for the sake of creating them. Only provide genuine value to the end product."

2026-10-31: "When you find and repair bugs specifically, you can create a PR to the main cnckitchen project but make sure you do it as me, under my account, because it is more likely to be accepted."

Verified GitHub account: Greg-J. Keep feature and visual proposals in the review; the first bug-fix PR covers signed-zero welding and units-dialog Enter handling. Do not sign the upstream CLA on Greg’s behalf.

This file is tracked only on the automation branch and must never enter an upstream PR. Upstream contributor instructions are in CONTRIBUTING.md.

## Current handoff

PR: https://github.com/CNCKitchen/ScanRuler/pull/22, author Greg-J. Commit f0fb2eb. Build, 3,089 unit tests, import browser checks, production smoke, and five agent browser suites pass. Baseline macOS mesh-edits and reverse-body-tree browser suites fail; private scan fixtures are absent. Greg must personally decide whether to sign CLA.md in the PR.

Remaining review findings: replacement-scan data loss (measurements cleared without confirmation and history reset), modal focus escaping behind Settings, eager 3.61 MB main JS bundle, large-mesh temporary buffer overhead, synchronous 3MF image decompression with no expansion budget, and mobile support-card obstruction. Product priorities: sample scans and parameter-to-geometry highlighting requested upstream, repeatable inspection workflows, visual report exports, and Mac SpaceMouse compatibility.

## Session overlay

### Extra state verdicts
- The run is not active until `gk run status` reports RUNNING. A registered hub project is not proof of a running worker.
- Read the current ledger and PR status rather than repeating historic test counts as current facts.

### Ranking overrides
- Protect measurements and saved projects before startup speed or cosmetic polish.
- Only reproduce-and-repair work or measured performance gains belongs in this run. No speculative features.

### Close-pass traps
- Never send automation files upstream or mix unrelated fixes into PR #22.
- The existing browser-test failures were reproduced before edits; repair native keyboard/mouse simulation without weakening product assertions.
- Optional private scan tests are skipped here. Never claim real-scanner accuracy or hardware compatibility.

## Other agents

Read the run ledger and CONTRIBUTING.md. Do not start helpers. During the active run, source paths are owned by the supervisor; other sessions are read-only by convention. Work in the isolated worktree the supervisor supplies. Record evidence and keep changes scoped. The supervisor commits/promotes according to its contract and pushes the automation branch at pass boundaries. Follow the publication runbook for clean upstream PRs under Greg-J only.

## Deploying and safety

No deployment is authorized. Never merge upstream, sign the CLA, alter production, enable paid model fallback, or touch another repo or personal browser profile. See `.gk-docs/reference/runbooks/run-and-publication.md`.

## Commands

- Verify: use `.greenskeeper.json`'s verify command verbatim.
- Progress: `gk run status`, `gk run ledger`.
- Stop: `gk run stop`.
- Docs and bounded work: `.gk-docs/README.md`, `.gk-docs/planning/value-improvements-ledger.md`.

## Active loop executor

2026-10-31: The built-in task goal is active on automation/scanruler-improvements. Greenskeeper is prepared and enrolled but `gk run` is stopped; gk doctor reports four missing global session-skill links. Do not install them or start a second worker. The native loop needs neither. Work sequentially in this checkout, commit/push checked changes to origin, and follow the ledger's value/verification/publication rules. Resume SR-01 first. A supervisor-specific rule applies only if a gk supervisor is actually running. Native automatic continuations keep this task going; do not claim the execution Mac is running it.

### Continuation state

The initial complete gate is running in exec session 53743. Logs: /tmp/scanruler-loop-unit.log (3,089 passed), /tmp/scanruler-loop-mcp.log (123 passed), /tmp/scanruler-loop-build.log (passed), /tmp/scanruler-loop-e2e.log (browser suite still running at this handoff). Poll the existing job rather than starting a duplicate. Tests may skip private fixtures; report the skips. Both intentionally failing gate canaries were correctly rejected. Git is on automation/scanruler-improvements, origin is Greg-J/ScanRuler and upstream is CNCKitchen/ScanRuler. Start SR-01 after the full gate settles. Inspection also found that App.tsx openImage/commitImage clears history and deviationWorkspace openNominal/commitNominal clears history; audit these along with scan replacement. Agent scan.open already calls requireDiscardable, whereas flat.open_image does not. Preserve legitimate agent opt-in semantics and avoid duplicate browser prompts.
