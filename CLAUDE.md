# ScanRuler local checkout

Audience: Hosted for others. Fixes must work across supported browsers and systems.

Upstream: https://github.com/CNCKitchen/scanruler
Review baseline: 2cd89c6 (0.9.2), cloned 2026-10-31.

## Greg decisions

2026-10-31: "I have another one to add. You are to - once you get to a point where it makes sense - adopt the design system in new-design-system and completely overhaul the application to follow that new design system."

This explicitly authorizes the design overhaul and supersedes the earlier no-redesign constraint for SR-08. Apply the supplied tokens, shell, components and interaction contract across the complete application while preserving its measurement/modeling capabilities. The guided-workflow assessment (SR-07) feeds the design system's onboarding requirements. First finish the protective bug fixes and capture performance baselines. Build one complete, working screen for Greg's visual approval before extending the design, as his supplied AGENTS.md rule 16 requires; then complete every workspace. Continue independent audits while a visual decision is pending. Do not substitute a CSS reskin or a partial implementation for the requested overhaul. No deployment, upstream design PR, unsupported geometry features or cloud-service invention is authorized.

2026-10-31: "Something I want you to think about during one of these passes is whether their is a guided mode. A way for someone who has a 3d scanner but has never actually done any 3d modeling or maybe they have. This seems like an application that NEEDS a guided mode if it doesn't have that workflow already"

Inspect existing guidance and exercise a novice scanner-owner workflow. Identify actual gaps and propose a concrete guided path if needed; product/taste approval precedes building a new mode. This extends the active loop with SR-07, without delaying independent bug repairs.

2026-10-31: "Put yourself on an automated loop of inspection and improvement, but don't create featuers for the sake of creating them. Only provide genuine value to the end product."

2026-10-31: "When you find and repair bugs specifically, you can create a PR to the main cnckitchen project but make sure you do it as me, under my account, because it is more likely to be accepted."

Verified GitHub account: Greg-J. SR-08 design work is now explicitly authorized; other feature proposals still require review; the first bug-fix PR covers signed-zero welding and units-dialog Enter handling. Do not sign the upstream CLA on Greg’s behalf.

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
- Repairs require reproductions and performance work requires measurements. SR-08 separately authorizes the full supplied design overhaul. No speculative features.

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

SR-02 is complete. Integration d2749e9 passed the full gate: 3,096 unit tests (24 skipped, 1 todo), 123 MCP tests, build and all executable browser suites; private scooter skipped. Clean upstream f351648 passed 75 unit tests, boundary/units checks, build and five browser scripts. PR https://github.com/CNCKitchen/ScanRuler/pull/31 is OPEN, verified author Greg-J, base main, head f351648 and exactly 16 scoped files. Original regression had 22 focus failures; repaired core/plugin checks pass 40 assertions. Native dialog focus/stack plus background capture guards preserve drafts and nonmodal Fit options. Desktop Settings geometry x480/y66.5/540×817 and emulated-phone x15.59375/y59.078125/358.796875×725.828125 match baseline exactly; both before/after screenshots inspected. Chrome only; no Safari/Firefox or physical touch claim. Initial independent run hit an absent ballbar fixture and an incorrect unit-test filename; corrected to generated mesh and actual tests, then all five browser suites passed. No validation job remains live. Clean worktree /tmp/scanruler-pr-modal-20261031 has local dependency copies. No automation or PR23 changes entered PR31.

SR03 responsiveness repair is published and verified. Integration25bbfcf; cleanfb07615; https://github.com/CNCKitchen/ScanRuler/pull/32 OPEN, authorGreg-J, basemain, exactly9 scoped files. Full gate exited0:3,099 unit tests,123MCP,build,all executable browser suites; private scooter skipped. Isolated /tmp/scanruler-pr-textures-20261031 passed20 unit tests,boundary/units,build,3MF/import browser suites, and five production checks (bundled worker,red pixels,saved bytes,reopenworker,reopencolours). All jobs finished; NO LIVE VERIFICATION OR BENCHMARK.

Dedicated short-lived texture worker copies original archive, transfers expanded images back, disposes in finally; worker errors reject import and preserve current scan/draft/source. Plain 3MF uses directory-only preflight, no extraction/worker. Corehelper filters metadata thumbnails. Focused10 browser assertions include exact vertex colours, retained bytes, lifecycle, live scene, save/reopen and failure preservation. Original baseline fails worker assertion and cannot hit injected-worker-failure path; preservation/colour assertions already passed before. Tests registered in CI; all source checked and committed.

Measurements .gk-docs/reference/measurements/3mf-textures.json include originalbefore/after and independentclean benchmark. 4K normally-compressed PNG median synchronous extraction1154.5ms→11ms; max timer gap1157ms→97.7ms (canvas readback remains). Chrome4x slowdown only throttles main thread, not equally workers; do not claim equal-CPU throughput. Clean reproducible scripts/bench-3mf-textures.mjs ran successfully:4K sync median10.8ms and gap78.9ms. Fixture pixels match; clean benchmark fixes ZIP dates and formats XML, producing13 extra bytes in archive. Synthetic textures only, no private scans. Production helper e2e-out/review/production-texture.mjs uses only public UI and pixel screenshots, no src imports; runner run-preview.mjs owns its ephemeral server.

SR03 archive robustness is still an explicit open sub-item. Upstream PR28 by Jozkah already proposes512member/256MiBentry/512MiBtotal caps. Source reviewed; do not duplicate their PR or claim their authorship. No cap adopted locally: ordinary large-file compatibility and bounded malformed-metadata validation remain to review. PR32 names overlap in scanFiles and need to apply guards to directory preflight and worker extraction when combined. Do not claim archive expansion is fixed. Keep SR03 unchecked until this disposition is resolved. Startup/memory baseline work can progress independently while avoiding a duplicate size-policy patch.

Next: capture SR04 cold-start and SR05 bounded memory baselines before design changes, complete SR03 robustness disposition, then novice-guidance runtime audit and first finished design screen. Design reference has now been rendered and visually inspected at1440×1000 and390×844: e2e-out/review/new-design-reference-{desktop,mobile}.png. Reference mobile clips Export and hides sidepanels; do NOT copy these demo defects, follow written sheets/accessibility requirements. Full coverage map .gk-docs/planning/design-adoption-matrix.md; all implementation rows still planned. No visible design code built yet, so no approval request yet.

new-design-system/ was supplied by another session and Greg has now explicitly named it as the authoritative reference for SR-08. All eight files have been read: README, foundations, components, interaction-model, research, tokens.json, styles.css and index.html (eight files total). Preserve the reference files as inputs, do not overwrite or claim authorship of them. The visual reference was rendered and inspected in an owned headless browser; see continuation state. New design work is authorized on this project/fork; bug PRs remain separate and scoped.

SR-07 added by Greg during this pass: assess guided mode for novice scanner owners. Source already has state-aware next-step hints (core/hints.ts, app/useHints.ts, state/hintStore.ts), enabled by default, retired after two completed visits. 3D hints progress scan → fitted elements → dimension, ending at the first dimension. 2D hints currently cover image import only. stageHints.ts supplies instructions during picks. core/fit/guide.ts is fitting constraints, NOT a user tutorial. Actual novice UI walkthrough and product recommendation remain unperformed. A new guided mode requires Greg's product/taste review; do not build it speculatively.
