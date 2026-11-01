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

Build 03 server is stopped at Greg’s request. Saved production copy remains available locally. Source 059702612fab754241f959ff507b2a744a1aad71; review copy `e2e-out/review/build-03`. All six workspaces now use the supplied design and darker dark mode. Guided measurement, shared 2D selection and keyboard body-tree controls are implemented. The first-piece approval blocker is superseded.

Full final gate passed: 3,116 unit tests (24 skipped), 123 MCP tests, production build and 27 configured browser suites. Additional production workspace/guide and note checks passed. Build 02→03 startup medians: 1888.5→1885.3 ms default, 1854.8→1852.9 ms without plugins; +5,316 encoded bytes (0.48%). Effectively unchanged startup, no speed gain claim. See `.gk-docs/reference/design-build-03.md` and raw measurements.

Six focused bug PRs are open under Greg-J: #22, #23, #31, #32, #40 and #70. Latest #70 isolates reverse-note CSS from 2D annotations: +34/-17 px before, 0/0 after, reproduced on current upstream 5c1f2f9. Clean 2537b18; local integration 9b71470. The complete design is now offered separately as draft PR #71: https://github.com/CNCKitchen/ScanRuler/pull/71, author Greg-J, based on upstream 5c1f2f9 (0.9.4). Clean branch feat/guided-workspace-design, head bc2bd04, nine reviewable commits and 114 files, no automation metadata. No merge, deployment or CLA signature. This local automation branch and running build 03 remain on the reviewed 0.9.2 line; the current-upstream port lives in /tmp/scanruler-pr-design-20261101. See .gk-docs/reference/design-upstream-pr.md.

The bounded ledger is complete. After handing over build 03, do not run GPU/timing jobs until Greg replies. Private fixtures, Safari/Firefox, physical scanner/SpaceMouse/touch/pen and human novice testing remain unverified. Greg must personally decide any CLA signature.

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

Verified upstream PRs under Greg-J, all based on main and isolated from automation/design metadata:
- PR22 https://github.com/CNCKitchen/ScanRuler/pull/22, f0fb2eb: signed-zero welding and units-dialog Enter-on-Cancel. CLA remains Greg's legal decision.
- SR01 PR23 https://github.com/CNCKitchen/ScanRuler/pull/23, clean c70450d / integration 2f9a99f: replacement-import work protection. Full gate 3,096 unit / 123 MCP / build / browser checks passed; isolated branch also validated.
- SR02 PR31 https://github.com/CNCKitchen/ScanRuler/pull/31, clean f351648 / integration d2749e9: native modal focus and background keyboard isolation. Full gate passed, 40 focused browser assertions; desktop and phone geometry unchanged. Chrome only.
- SR03 PR32 https://github.com/CNCKitchen/ScanRuler/pull/32, clean fb07615 / integration 25bbfcf: texture worker removes measured synchronous 3MF extraction stall. Full gate 3,099 unit / 123 MCP / build / browser checks passed. Clean branch additionally passed production worker/render/save/reopen checks. Main-thread extraction median 1,154.5→11 ms; timer gap 1,157→97.7 ms on a 4x main-thread throttle. Workers are not equally throttled, so no equal-CPU throughput claim. Raw data in .gk-docs/reference/measurements/3mf-textures.json.

SR04 COMPLETE, 6d614f2, pushed. Moving FILLET_TRY_MS from the heavy builder into existing buildTypes.ts keeps CAD Builder out of initial JS. Entry gzip 1,154,114→1,090,393 bytes. Cold usable UI median 2032.4→1954 ms; plugins=none 1987.5→1922.9 ms (three runs each, gzip, 1 MB/s, 100 ms latency, 4x main-thread slowdown). Bundle regression fails before/passes after. Full gate: 3,100 unit / 123 MCP / build / executable browser suites. Portable scripts/bench-startup.mjs executed. Data in startup.json. Performance-only change stays on the fork.

SR05 COMPLETE, ed403c8. Reuse the filter's own exact-sized output if every triangle survives, avoiding its redundant final copy while preserving independent output storage. Bounded Node parse/graph profiles at 32,768 / 524,288 / 1,179,648 triangles: peak RSS medians 57.52→57.14 / 163.55→157.61 / 321.69→314.91 MiB. Exact position/index/normal/adjacency hashes unchanged. No speed improvement; excludes full browser/GPU memory. Focused 26 tests and full gate 79613 exited 0: 3,103 unit / 123 MCP / build / executable browser suites. Private scooter skipped. Reproducer scripts/bench-mesh-memory.mjs executed; raw mesh-memory.json. Pushed with metadata checkpoint 660e950.

SR03 archive robustness COMPLETE. Integration 6445fb4; clean 2e0dbd5; published as an update to PR32. Full gate19691 exited 0: 3,111 unit tests, 123 MCP tests, build and all executable browser suites; private scooter skipped. Eight new archive regressions include giant declarations, combined model/texture budget, stored-size undercount, ignored sidecars and many small entries. The original four allocator regressions failed, as did the later stored-size case before correction. A safe VM allocator blocked the original 2 GiB allocation attempts; no gigabyte adversarial buffers were allocated. Seven real-browser checks preserve source, scene, worker mesh, measurement, draft and undo/redo on oversized models, textures and nested projects. Initial full gate63509 was deliberately stopped for the stored-size correction, not counted as a pass.

Clean worktree /tmp/scanruler-pr-textures-20261031 passed 36 relevant unit tests, boundary/units checks, build, archive/textured/import browser suites and five production worker/render/save/reopen checks. All verification sessions exited 0; NO LIVE JOB. PR32 updated with the combined final behavior and related PR28 policy difference; Published OPEN state, author Greg-J, main base, exact 2e0dbd5 head and 16 scoped files were rechecked. Guard reuses the existing 1 GiB expanded project budget, inspects the whole selected directory before allocation, excludes unread sidecars/thumbnails and adds no member-count/per-entry cap. PR28 by Jozkah uses different limits; overlap is disclosed, no authorship claimed. Allocation evidence is saved in .gk-docs/reference/measurements/3mf-archive.json. ZIP budget does not claim to bound decoded-image, XML-object or total GPU memory.

SR07 assessment COMPLETE: fresh-default desktop UI walkthrough imported a generated 20 mm cube, answered source units, fitted two planes, measured 90°, used Undo/Redo, downloaded the project and exported STEP. No store/API geometry seeding. Hints work but stop at first dimension, require geometric vocabulary, and do not guide scale sanity, fit-quality interpretation or saving. First save opens a support dialog. .gk-docs/reference/novice-workflow.md has the concrete guided-path recommendation, backed by measurements/novice-workflow.json and local e2e-out/review/novice screenshots. No human novice study or real-scanner accuracy claim. New guided mode is not implemented; its proposal feeds SR08's reviewable first piece. Existing hints are state-aware, enabled by default, retire after two completed visits; core/fit/guide.ts is constraints, not tutorial.

SR06 bounded recovery/units/history/worker/export sweep COMPLETE; current logs and actual assertions rechecked. No additional defect reproduced in the seeded recovery/units/history/worker/export paths. Existing upstream PR20 is recorded as a known input issue, not claimed locally fixed. The final archive gate passed its recovery/history/units/browser export paths. Read actual e2e-import/recovery/history and workerRpc/history/units tests in this turn. They cover transactional failed imports, IndexedDB quota failure and restore, chronological cross-workspace undo and geometry restore, unit conversion and worker retries; distinguish fake-worker unit checks from real browser proof. Upstream PR20 already proposes Mac Command additive picking; FlatScene/networkLayer remain outside this first design piece. The new 3D selection path accepts Shift/Ctrl/Command; do not claim the whole upstream input issue is fixed. No duplicate PR.

SR08 COMPLETE OVERHAUL is explicitly authorized, overriding the stale native goal's no-redesign text. All eight files in new-design-system/ read; user-supplied untracked inputs stay unmodified. Reference rendered/inspected at 1440×1000 and 390×844; mobile prototype clips Export and hides panels, so follow written requirements rather than copying those defects. .gk-docs/planning/design-adoption-matrix.md maps full application coverage. 3D Measure implementation is verified in build 01; visual approval remains pending. First finished piece: actual 3D Measure shell, imported scan, project tree, fitted-element context editor, exact numeric edits, commit/cancel/undo and desktop/phone layouts. Greg's AGENTS rule16 requires his visual approval of that working piece before extending the overhaul. Do concrete work before asking. Continue independent tasks while review is pending. No deployment or upstream design PR authorized. After handing over a running build, no GPU/timing jobs until Greg responds (rule25).

All private runners own ephemeral servers/profiles and close them. Independent clean worktrees are outside the repo, each with real local dependency copies, not node_modules symlinks. Source refs and prior verification details are retained in the ledger. No gk run, helpers, global installs, personal tabs, merge, deployment or CLA signature.

First-piece verification checkpoint: dedicated real-UI checks now pass exact 2.5 mm edits, undo/redo, rename/visibility, a 90° sample measurement, desktop/tablet/phone and 200% equivalent CSS viewport layout, reachable commit controls and File menu keyboard focus. Added viewport↔tree assertions to the full gate. Focused history/reduced-motion tests pass 17 assertions. Gate85257 passed 3,115 unit / 123 MCP / build and the early browser suites, then was stopped after the mesh harness clicked the newly disclosed support card instead of a hole. Its geometry assertions were retained; a shared visible-control dismissal helper updates every affected setup. The standalone mesh-edits suite now passes. Gate26915 completed with one regression: switching Measure→Reverse let the core effect turn off the plugin element picker. The core now defers to an active plugin with its own element-pick handler. The unchanged reverse-notes assertions and the new Measure UI suite pass in focused run68634. Gate21696 passed fully; source committed as f8f0564. Visual inspection then reproduced a pre-existing coplanar-preview depth conflict. The same raster-depth offset already used by committed elements changes the measured pixel range from63 to0, without changing fit geometry. The same regression failed at current upstream main with range 63 and passed on the isolated fix with range 0. PR40 https://github.com/CNCKitchen/ScanRuler/pull/40 is OPEN under Greg-J, main base, exact aa8d81c head, only overlays.ts and the regression script. Gate89401 passed fully on d87bdae: 3,115 unit, 123 MCP, build and all available browser suites. Private scooter skipped. Baseline06b2186 rebuilt in /tmp/scanruler-design-baseline-20261031 with real APFS-copied dependencies; six sequential cold startup samples completed. Final six-sample comparison completed with no browser errors: default median 1,984.2→1,926.7 ms; plugins=none 1,950.7→1,931.7 ms; initial encoded resources +8,581 bytes (0.78%). Small shared-Mac samples do not establish a speed gain. Raw data: .gk-docs/reference/measurements/design-build-01.json. Build 01 copies the verified d87bdae production output. After its review link is handed over, no GPU/timing jobs until Greg responds. Remaining work is SR08 beyond the first visual piece; do not mark the full overhaul complete.

Current executor status: BLOCKED on Greg's first-piece visual approval after the handoff and two automatic continuations. Build 01 http://127.0.0.1:5198/ remains running. Full overhaul SR08 is incomplete; all independent bounded inspection/repair tasks are complete. No GPU/timing jobs after handoff. No user approval has arrived. Resume the remaining design coverage after the requested visual decision; do not treat automatic continuation as approval.

2026-11-01: Greg: ".startpane is weirdly narrow". Treat this as feedback to correct the first review piece, not approval to extend the full overhaul. Reproduced the Measure empty-state container capped at 480 px in a 1,136 px stage; phone also lost 24 px on one side. Remove the container cap and phone width override, retain the existing 520 px heading measure, and make short-height content scroll from a reachable top below the tool strip. The five-size layout check also reproduced sample-button interception by floating controls at 320 px. Mobile bottom padding and scroll-padding reserve clearance; the real sample now opens at 1440×900, 900×800, 390×844, 320×568 and 720×450. Existing 320 px top-bar overflow remains a separate full-shell concern, not a start-pane-width fix. Both the initial and final full gates passed: 3,115 unit / 123 MCP / build / all available browser suites; private scooter skipped. The final five-size check also passed against production, including real sample import at every size. Raw evidence: .gk-docs/reference/measurements/startpane-width.json. Updated review build 02: http://127.0.0.1:5199/. After handing it over, no further GPU/timing jobs until Greg responds. No upstream PR for this design-introduced issue.

2026-11-01: Greg: "It looks great on initial load but then when I click one of the buttons like \"Surface Deviation\" it goes back to the old layout?" followed by "Excellent. Once you are done with that, please provide me a list here of all of the bug fixes, improvements, feature enhancements, etc. that have been made since you started working on it." The first-screen direction is approved; continue the complete shared-shell and workspace overhaul without another first-piece approval request. At completion, provide the cumulative changes in chat, distinguishing measured improvements and upstream PRs. This supersedes the prior visual-review blocker.

2026-11-01: Greg: "I do not like the dark mode btw. It needs to be darker." Apply a darker near-black canvas and charcoal chrome consistently across all workspaces; keep readable text, focus and geometry contrast. This overrides the supplied light system's optional dark treatment.

2026-11-01: Final continuation verified and committed as 0597026. Same-name project reopening now resets the guide using the real scan-load event; a reopened project without history explains recovery practice. The new browser regressions are in the regular gate. Full review details and cumulative changes are in build-03 documentation and the final chat response.

2026-11-01: Greg: "We should offer this as a pull request or a fork to merge or however something this large should be handled". This authorizes publishing the complete design/guidance contribution as a draft upstream PR under Greg-J. Prepare a clean branch against current upstream, keep local automation records out, disclose related bug PRs and validation limits, include reviewable screenshots and run instructions. This supersedes the earlier upstream-design-PR restriction. No deployment, merge or CLA signature is authorized.

2026-11-01: Greg: "kill 5198 and 5199". Stopped the build 01 and build 02 review servers and verified neither port has a listener. Build 03 remains available on port 5200. Historical review links below describe past handoffs, not active servers.

2026-11-01: Greg: "kill the server". Stopped the remaining ScanRuler review server on port 5200 and verified no listener remains. All three review servers are now stopped; historical localhost links are inactive.
