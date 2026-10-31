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

SR-01 product commit 2f9a99f is checked and committed on automation/scanruler-improvements. The full gate completed with exit 0: 3,096 unit tests passed (24 skipped, 1 todo), 123 MCP tests, build, and every executable browser suite. The private scooter fixture was skipped. The focused replacement browser script has 12 assertions and the guard has 7 tests. The final review found retained data from absent plugins was initially unprotected; a new unit test reproduced that omission, then passed with keptParts included, and the final full gate also passed it. The prior reverse-import-move test stalled at its file upload; it now accepts and asserts the replacement warning and passed the complete rerun with all original geometry assertions.

Clean upstream-based PR worktree: /tmp/scanruler-pr-replacement-20261031, branch fix/confirm-replacement-imports. It has exactly 10 source/test/docs/changelog files staged, no automation metadata. Local dependencies are independent APFS copies of the checked-out dependencies, not symlinks: the first attempt with symlinks correctly failed Vite's filesystem boundary when it resolved WASM outside the worktree. No checker or app configuration was weakened. Clean relevant validation is LIVE in exec session 18049: boundary/units, 6 selected unit files, production build, and e2e-replacement + e2e-import + reverse-import-move. Logs /tmp/scanruler-sr01-clean-{preflight,unit,build,e2e}.log. Poll that job, then review/commit/push this clean branch and create the PR as Greg-J. No unrelated PR #22 commits are included. Source guard is UI-only queue admission; low-level agent contracts and plugin-derived references keep their behavior. Root automation docs are still being updated; publication is not yet complete and SR-01 remains unticked.

SR-02 only inspected, no edits: true modals use div overlays/useDismiss without focus containment. Native HTML dialog showModal provides inert background and focus restoration. W3C modal APG and WHATWG interaction docs checked. Preserve design, nested consent, native button Enter and underlying drafts. React bubbling isolation can protect global shortcuts; inspect capture-phase useDismiss/FitOptions handlers too. FitOptions is intentionally NONMODAL and must remain so.

SR-07 added by Greg during this pass: assess guided mode for novice scanner owners. Source already has state-aware next-step hints (core/hints.ts, app/useHints.ts, state/hintStore.ts), enabled by default, retired after two completed visits. 3D hints progress scan → fitted elements → dimension, ending at the first dimension. 2D hints currently cover image import only. stageHints.ts supplies instructions during picks. core/fit/guide.ts is fitting constraints, NOT a user tutorial. Actual novice UI walkthrough and product recommendation remain unperformed. A new guided mode requires Greg's product/taste review; do not build it speculatively.
