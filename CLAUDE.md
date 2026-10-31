# ScanRuler local checkout

Audience: Hosted for others. Fixes must work across supported browsers and systems.

Upstream: https://github.com/CNCKitchen/scanruler
Review baseline: 2cd89c6 (0.9.2), cloned 2026-10-31.

## Greg decisions

2026-10-31: "Something I want you to think about during one of these passes is whether their is a guided mode. A way for someone who has a 3d scanner but has never actually done any 3d modeling or maybe they have. This seems like an application that NEEDS a guided mode if it doesn't have that workflow already"

Inspect existing guidance and exercise a novice scanner-owner workflow. Identify actual gaps and propose a concrete guided path if needed; product/taste approval precedes building a new mode. This extends the active loop with SR-07, without delaying independent bug repairs.

2026-10-31: "Put yourself on an automated loop of inspection and improvement, but don't create featuers for the sake of creating them. Only provide genuine value to the end product."

2026-10-31: "When you find and repair bugs specifically, you can create a PR to the main cnckitchen project but make sure you do it as me, under my account, because it is more likely to be accepted."

Verified GitHub account: Greg-J. Keep feature and visual proposals in the review; the first bug-fix PR covers signed-zero welding and units-dialog Enter handling. Do not sign the upstream CLA on Greg’s behalf.

This file is tracked only on the automation branch and must never enter an upstream PR. Upstream contributor instructions are in CONTRIBUTING.md.

## Current handoff

PR: https://github.com/CNCKitchen/ScanRuler/pull/22, author Greg-J. Commit f0fb2eb. Build, 3,089 unit tests, import browser checks, production smoke, and five agent browser suites pass. The macOS mesh-edits and reverse-body-tree browser harness failures were repaired in 2ceaafe and both suites now pass; private scan fixtures are absent. Greg must personally decide whether to sign CLA.md in the PR.

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

SR-01 is complete. Integration commit 2f9a99f passed the full gate: 3,096 unit tests (24 skipped, 1 todo), 123 MCP tests, build and every executable browser suite; private scooter fixture skipped. Clean upstream commit c70450d passed 52 relevant unit tests, boundary/units checks, production build and import/replacement/reverse-import-move browser suites. PR https://github.com/CNCKitchen/ScanRuler/pull/23 is OPEN, verified author Greg-J, base main, head c70450d and exactly 10 source/test/docs files. No automation metadata or PR #22 changes included. Scratch worktree /tmp/scanruler-pr-replacement-20261031 retains independent local dependency copies. No validation job remains live. Initial clean symlink-dependency validation correctly failed Vite's filesystem boundary; copies resolved that without changing tests/configuration. SR01 completion metadata was pushed in ac29cc9.

SR-02 implementation is uncommitted and undergoing the full gate in LIVE exec session 45894. Logs /tmp/scanruler-sr02-{preflight,unit,mcp,build,e2e}.log. No other heavy job is live. Poll it before starting another. Original browser regression /tmp/scanruler-modal-before.log had 22 focus failures across Settings, nested agent consent, units, imprint and support; Cancel/Open and draft protection already passed. New shared src/ui/Modal.tsx uses native dialog.showModal for inertness/stack/return focus, explicit Tab edge wrap (native forward Tab otherwise visited browser chrome), scoped key/pointer bubbling, and initial focus for units/support. Five true modals use it; Fit options remains nonmodal. Native conversion exposed background capture listeners: targeted regressions caught help/export/Fit options reacting to Escape behind the modal. InfoDot/useDismiss/FitOptions now defer while a native modal is present. Focused scripts/e2e-modal.mjs + plugins/reverse/scripts/e2e-modal-focus.mjs pass all 40 assertions, registered in CI. No source/test assertions were weakened.

Desktop visual check: baseline PR23 clean worktree and current Settings both x=480,y=66.5,width=540,height=817 at 1500x950; colors, font and padding identical. Both screenshots visually inspected: /tmp/scanruler-pr-replacement-20261031/e2e-out/review/verification/modal-layout.png and e2e-out/review/verification/modal-layout.png. Private helper e2e-out/review/modal-layout.mjs captures it. Mobile runtime and Safari/Firefox are not yet checked. Consider a small mobile layout comparison before publication; do not imply all browsers were tested. W3C modal APG and native HTML dialog docs informed implementation; local UX skill searches found general focus guidance, not an exact containment result.

After SR02 full gate: independently review and prepare a new clean upstream-based PR as Greg-J. IMPORTANT overlapping integration files: scripts/e2e-ci.mjs must add ONLY e2e-modal to upstream, not e2e-replacement from PR23; CHANGELOG only the modal entry; docs/manual.md only the Settings paragraph. The other modal source/test/plugin-CI files can be isolated directly. UnitsModal replaces the keyboard effect touched by PR22 but is independently functional; do not include signed-zero changes or automation metadata. Root source is uncommitted until the gate passes. Use real local dependency copies in an OUTSIDE /tmp worktree, not symlinks or nested checkout (lessons in SR01).

An untracked new-design-system/ directory appeared at 18:04 from outside this task. I only listed filenames to identify it. Do NOT edit, delete, stage or claim its work. Keep all commits scoped to this task's named files. Its Markdown files do not affect the verification gate.

SR-07 added by Greg during this pass: assess guided mode for novice scanner owners. Source already has state-aware next-step hints (core/hints.ts, app/useHints.ts, state/hintStore.ts), enabled by default, retired after two completed visits. 3D hints progress scan → fitted elements → dimension, ending at the first dimension. 2D hints currently cover image import only. stageHints.ts supplies instructions during picks. core/fit/guide.ts is fitting constraints, NOT a user tutorial. Actual novice UI walkthrough and product recommendation remain unperformed. A new guided mode requires Greg's product/taste review; do not build it speculatively.
