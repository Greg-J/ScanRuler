---
owned: src/** plugins/** tests/** scripts/** mcp/** CHANGELOG.md package.json package-lock.json vite.config.ts .gk-docs/** TODO.md CLAUDE.md AGENTS.md .greenskeeper.json
---
# ScanRuler: evidence-led inspection and repair

Maintain the existing measurement product through repeated inspect → reproduce → repair → verify passes. The October 31 review exercised imports, keyboard controls, save/reopen/export, recovery and agent workflows, read the architecture, measured bundle size and reproduced four bugs. PR #22 already fixes signed-zero welding and units-dialog Enter handling. Remaining evidence covers destructive scan replacement, modal focus escape, main-thread 3MF decompression and eager workspace loading. The Mac browser harness had two independently reproduced native-input failures, repaired during setup. Real private scan fixtures, physical SpaceMouse, Safari/Firefox, and user taste have not been verified.

**8 planned tasks.** New work must earn its place with a reproducible defect or a measured user-visible bottleneck. No speculative feature invention. SR-08 is an explicitly requested design overhaul, not an unsolicited redesign.

## How to work this list

1. Protect work first, then keyboard access, then responsiveness. Finish the selected item before searching for more. No speculative features, preferences, vendors or unrelated refactors. Greg explicitly authorized the complete new-design-system overhaul in SR-08; its required UI behavior is in scope.
2. One item at a time, with a scoped commit and its ledger evidence. Record which product paths belong in an upstream patch. The native task loop currently owns this checkout and automation branch; commit and push verified work directly. No gk supervisor is running. If later migrated to gk run, its isolated-worktree/promotion rules apply instead. Never add work to PR #22.
3. Gate every change with `.greenskeeper.json`'s verify command, verbatim. The command is `bash scripts/prepare-verification.sh && npm test -- --maxWorkers=2 && npm --prefix mcp test && npm run build && npm run e2e:ci`. Also run the item's regression through its real user/agent entry point. Reproduce before repair, keep original assertions and tolerances, and require the new regression to fail without the fix. A red gate requires diagnosing and reverting the unverified edit before moving on; record the cause. Never weaken a test, scene or gate.
4. Tick completed boxes and update Status in the same commit. Record before/after evidence and verification limits. No blanket claims that a feature works because a unit test passed.
5. Add discovered defects in causal order using the next SR id, with source/behavior evidence, a bounded repair and a real proof. A hypothesis is not a repair task. If a performance investigation finds no material benefit, record the measured no-change result and finish the investigation without inventing a patch. Do not hunt findings instead of completing planned items.
6. Only human decisions go under For Greg: product/taste, money, legal signatures and physical hardware. Continue independent work. Never sign the CLA, merge PRs, deploy, enable paid fallback, or alter machine/global configuration. Stop when no demonstrated, independently actionable problem remains; do not replenish the list with cosmetic work.
7. This loop cannot validate real-scanner accuracy without the private fixtures, physical SpaceMouse behavior, Safari/Firefox without available runtimes, or Greg's visual preference. Headless Chrome UI behavior IS testable here with isolated profiles and owned ephemeral servers. Never touch existing browser tabs or dev servers. No helpers or parallel heavy jobs.
8. Publication is part of a completed bug fix: follow the runbook to prepare a clean upstream-based branch containing only the reviewed fix, validate it, verify GitHub identity Greg-J, and open a focused PR. Keep all automation metadata out. If publication cannot be isolated safely, record exact commits and park just publication. No upstream merge or legal signature is authorized. Performance-only proposals remain on the fork unless they repair a demonstrated defect; feature and visual proposals require Greg's decision.

## References

- `CONTRIBUTING.md` — upstream contribution and verification rules.
- `docs/manual.md` — current product semantics, not a request to add roadmap features.
- `docs/development.md` — browser checks, fixtures, worker and plugin contracts.
- `.gk-docs/reference/runbooks/run-and-publication.md` — branch ownership, clean PRs, and prohibited actions.
- `https://github.com/CNCKitchen/ScanRuler/pull/22` — existing independent bug-fix PR; do not append unrelated work.

## Decisions this list already encodes

| Date | Decision |
| --- | --- |
| 2026-10-31 | Greg: "Put yourself on an automated loop of inspection and improvement, but don't create featuers for the sake of creating them. Only provide genuine value to the end product." |
| 2026-10-31 | Greg: "When you find and repair bugs specifically, you can create a PR to the main cnckitchen project but make sure you do it as me, under my account, because it is more likely to be accepted." |
| 2026-10-31 | Engineering: sequential Codex passes on automation/scanruler-improvements; no deployment, no speculative features, and no changes to Greg's screen. Preserve upstream docs; Greenskeeper maps only .gk-docs. |

## Status

```
Protect work and access       2 / 2
Measure and reduce overhead   1 / 3
Inspect workflows and guidance 0 / 2
Adopt supplied design system  0 / 1
                             ---------
                             3 / 8 planned tasks
Discovered                   0 / 0
```

Last touched: 2026-10-31; SR01/SR02 published as PR23/PR31; SR03 responsiveness as PR32, with archive-limit disposition open. SR04 complete in6d614f2 after full gate. SR05 small measured memory improvement in full gate79613. Guided-workflow assessment and full design overhaul remain in scope. Native loop active.

## Protect work and access

- [x] **SR-01** · high · `src/app/scanImport.ts:138`, `src/App.tsx:147`
      A valid replacement scan clears measurements and all undo history without asking, unlike opening a project. Reproduced with one existing point: elements 1 → 0 and no dialog.
      **Fix:** make destructive user imports preserve work on cancellation and explicitly resolve replacement before commit, covering drop/load/replace/address/plugin entry paths. Audit equivalent image/reference replacements for the same data-loss property. Preserve the agent's existing discard-required contract and avoid duplicate prompts for already-authorized agent actions. A failed import must still preserve worker/scene/source/history state.
      refs: `docs/manual.md`, `CONTRIBUTING.md`
      **Acceptance:** Browser regressions must show Cancel preserves measurements, source bytes and undo history; accepted replacement happens once; malformed replacement remains transactional; agent discard refusal and explicit acceptance still work.
      **Proof:** original drop regression failed on scan/image/reference cancellation, confirmation and queued drafts; repaired regression passes 12 checks. Seven guard unit tests include redo-only work, plugin drafts and absent-plugin retained data. Full gate passed 3,096 unit tests, 123 MCP tests, build and executable browser suites; private scooter fixture skipped. Clean upstream branch additionally passed 52 relevant unit tests, boundary/units checks, build, and import/replacement/reverse-import-move browser checks. The latter now explicitly accepts and asserts the replacement warning with original geometry assertions unchanged.
      **Publication:** integration commit `2f9a99f`; clean upstream commit `c70450d`; https://github.com/CNCKitchen/ScanRuler/pull/23, verified author Greg-J and exact 10-file source/test/docs scope. No automation metadata or PR #22 dependency. No merge or CLA signature.
      route: substantial/agentic

- [x] **SR-02** · high · `src/ui/SettingsModal.tsx:149`, `src/ui/UnitsModal.tsx`, `src/ui/AgentDataWarning.tsx`, `src/ui/SupportCard.tsx`, `src/ui/Imprint.tsx`
      Settings opens with focus on its trigger and Tab visits background controls. Inspect every actual modal for the same defect, including stacked dialogs; do not convert nonmodal popovers.
      **Fix:** share focus entry, containment, restoration and background interaction protection across actual modals while preserving Escape semantics and native focused-control activation. Preserve the visual design and screen-reader labels. Do not reintroduce the Enter-on-Cancel bug fixed in PR #22.
      refs: `docs/manual.md`, `.gk-docs/reference/runbooks/run-and-publication.md`
      **Acceptance:** Real keyboard tests must cover Tab and Shift+Tab wrapping, restoration to the opener, Escape with an underlying draft, nested agent consent, Cancel versus Open, and no background action while a modal is active.
      **Proof:** 22 original focus failures; all 40 focused keyboard assertions pass. Full gate: 3,096 unit tests, 123 MCP, build and all executable browser suites pass (private scooter skipped). Clean branch: 75 unit tests, preflight, build and five browser suites pass. Desktop and emulated-phone Settings geometry and styles match baseline; screenshots inspected. No Safari/Firefox or physical-touch claim.
      **Publication:** integration d2749e9; clean f351648; https://github.com/CNCKitchen/ScanRuler/pull/31 verified OPEN, Greg-J, main, exactly 16 scoped files. No automation metadata or unrelated fixes.
      **Implementation references:** https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ and https://html.spec.whatwg.org/multipage/interaction.html .
      route: substantial/agentic

## Measure and reduce overhead

- [ ] **SR-03** · medium · `src/app/scanFiles.ts:97`, `src/core/parsers/threemf.ts:394`
      3MF texture entries decompress synchronously on the UI thread; archive expansion is not bounded like project archives. This is a source-confirmed risk, not yet a measured stall.
      **Fix:** measure a representative textured 3MF first, then remove demonstrated blocking work and protect allocation from malformed archive metadata using existing format/resource contracts. Preserve colors, image companions, transactional imports and actionable errors. Do not invent arbitrary product tiers or silently reject ordinary supported files. If no material stall is reproduced, document that and limit changes to proven robustness defects.
      **Responsiveness complete:** integration25bbfcf, cleanfb07615, https://github.com/CNCKitchen/ScanRuler/pull/32 verified OPEN/Greg-J/main/exactly9 files. Synthetic4K PNG median UI synchronous extraction1,154.5ms→11ms; timer gap1,157ms→97.7ms. Chrome4x main-thread slowdown does not equally throttle workers; canvas readback remains. Raw metrics `.gk-docs/reference/measurements/3mf-textures.json`; cleaned reproducer ran independently and confirms10.8ms median extraction. Full gate passed3,099unit/123MCP/build/browser suites; private scooter skipped. Clean branch20unit/preflight/build/two browser suites plus five production worker/render/save/reopen assertions passed. All jobs finished.
      **Remaining robustness disposition:** no size cap adopted locally. Review ordinary large-file compatibility and bounded malformed-metadata behavior against the existing PR28 before closing this sub-item. Do not claim expansion protection is fixed. Independent startup/memory/design-baseline work may proceed while this upstream overlap is resolved.
      **Overlap:** https://github.com/CNCKitchen/ScanRuler/pull/28 by Jozkah already proposes limits for both 3MF readers. Reviewed its source; do not duplicate that patch or claim authorship. Responsiveness work is separate and will name the overlap.
      refs: `docs/development.md`, `src/core/project/archive.ts`
      **Acceptance:** Same input before/after main-thread blocking and memory observations; real textured import/save/reopen; malformed archive rejection without losing the current project. Do not allocate huge adversarial buffers just to test rejection.
      route: substantial/agentic

- [x] **SR-04** · medium · `src/plugins/registry.ts:14`
      The baseline main JS bundle is 3.61 MB raw / 1.15 MB gzip and eagerly imports plugin entries. A user-visible startup improvement has not yet been measured.
      **Fix:** measure cold-start resource loading and usable-interface latency on an identical constrained test profile. Only split code when measurements show a worthwhile improvement, preserving workspace registration, hooks, command availability, project restore and headless/plugin-free modes. No framework migration or rewrite. A measured no-change conclusion is acceptable.
      **Complete:** `FILLET_TRY_MS` imported from the heavy CAD builder forced it into the initial page chunk. Moving the unchanged constant to existing `buildTypes.ts` reduces entry gzip 1,154,114 → 1,090,393 bytes. Cold usable UI median 2032.4 → 1954 ms (three runs each, 4x main-thread CPU slowdown, gzip, 1 MB/s, 100 ms latency); plugins=none 1987.5 → 1922.9 ms. Raw data in `.gk-docs/reference/measurements/startup.json`. No plugin lifecycle rewrite. Actual production bundle-graph regression fails before and passes after; 13 focused tests/build pass. Full gate passed: 3,100 unit tests, 123 MCP, build and all executable browser suites (private scooter skipped). Commit 6d614f2. Portable benchmark executed successfully after the gate. Performance-only change stays on Greg's fork.
      refs: `docs/development.md`, `plugins/README.md`
      **Acceptance:** Record identical before/after transfer and startup metrics, first workspace activation, saved-project opening, plugins=none and agent command behavior. The existing production exporter-laziness test must stay green.
      route: substantial/agentic

- [ ] **SR-05** · medium · `src/core/parsers/stl.ts`, `src/core/geometry/weld.ts`, `src/app/imports.ts`
      Source accounting estimates roughly 804 MB of input/welding buffers for a 250 MB, five-million-triangle STL before later geometry allocations; actual peak memory has not been measured.
      **Fix:** profile generated meshes of increasing size without exhausting this shared Mac. Reduce a proven redundant allocation or copy only if it produces a meaningful memory/time reduction while preserving exact geometry and failure recovery. Do not reduce input precision, fit fidelity, tolerances or rendering resolution to improve the score. Otherwise retain the implementation and report the evidence.
      **In progress:** bounded parse/graph profiles at 32,768/524,288/1,179,648 triangles, three fresh Node processes each. Removing the redundant final index copy when all triangles survive reduces peak RSS medians 57.52→57.14, 163.55→157.61 and 321.69→314.91 MiB. All position/index/normal/adjacency hashes match. This is a small memory gain; no speed improvement, and it excludes full browser/GPU memory. Reproducer and raw JSON saved. Focused26 tests pass; full gate LIVE79613. No algorithm rewrite or precision reduction.
      refs: `docs/development.md`, `CONTRIBUTING.md`
      **Acceptance:** Same inputs before/after peak-memory and import-time measurements; topology, measurements, save/reopen, signed-zero regressions and interrupted/failed import safety remain correct. One benchmark at a time.
      route: substantial/agentic

## Inspect remaining workflows

- [ ] **SR-06** · medium · `src/app`, `src/core/project`, `src/core/workerRpc.ts`, `src/state/historyStore.ts`
      The first review sampled the product and cannot establish all save/recovery/undo and asynchronous worker transitions are safe.
      **Fix:** perform a bounded second inspection of recovery after errors, unit conversion, undo across workspaces, worker failure/cancellation and export round trips. Add only reproducible user-impacting defects with exact trigger, evidence, repair and proof, then work those findings. Inspect unresolved upstream bug reports for overlap before opening duplicate PRs. Stop after this sweep and its actionable findings; no perpetual speculative backlog.
      refs: `docs/manual.md`, `docs/development.md`
      **Acceptance:** Record the exercised paths, outcomes, explicit blind spots and any new defect IDs. For each repair, preserve a failing-before/passing-after case through a real entry point and an independently reviewed clean PR or a precise publication blocker.
      route: substantial/longctx

- [ ] **SR-07** · medium · novice guidance assessment, added by Greg 2026-10-31
      Greg asks whether a guided mode exists for a 3D scanner owner with little or no modeling experience. Audit current onboarding, hints, fit guides, manuals and sample availability before proposing additions.
      **Work:** exercise the actual path from first scan through unit/scale sanity checks, choosing a useful task, making a measurement, understanding confidence/accuracy, recovering from a bad pick, and saving/exporting the result. Compare novice and experienced paths. Distinguish a measurement guide from CAD/reverse-engineering instruction.
      **Acceptance:** show what already guides the person, where a novice gets stuck (with concrete UI evidence), and a proposed end-to-end guided workflow only where gaps justify it. Use that evidence in the explicitly requested SR-08 overhaul and its task-based onboarding. Present the first complete design for Greg’s visual review before extending it. No speculative feature implementation; independently reproducible bugs still get repairs.
      **Initial evidence (source only):** `src/core/hints.ts` already implements a state-aware next-control ladder; hints default on and retire after two completed visits (`src/state/hintStore.ts`). 3D Measure ends guidance at the first dimension; 2D currently guides image import only. `src/app/stageHints.ts` narrates pick/editor steps. A novice UI walkthrough is still required.
      route: substantial/product-review

- [ ] **SR-08** · high · complete adoption of `new-design-system/`, added by Greg 2026-10-31
      Greg explicitly requests a full application overhaul following this supplied design system, once the current work reaches a sensible point. This overrides the run's former no-redesign restriction for this item.
      **Work:** read and render the supplied reference; map its tokens, desktop/mobile shell, project/tool/context panels, selection-driven actions, precise unit-labeled controls, preview/commit/undo, accessible feedback, command discovery and task-based onboarding to ScanRuler's existing capabilities. Preserve original design references and existing feature behavior. Apply the system throughout core 3D/2D measurement, deviation/thickness, mesh tools, reverse engineering, project/import/export, settings/help/recovery and transient UI. Do not replace live controls with mockups or add unsupported CAD/cloud capabilities merely because the generic reference mentions them.
      **Sequence:** finish work-preservation/access fixes and capture performance baselines; build one complete working screen/tool loop and show it to Greg. His supplied AGENTS.md rule 16 requires approval of one finished piece before producing the rest of the visual overhaul. Keep independent inspections progressing while that decision is pending. After approval, complete the application, not an MVP or reskin.
      **Coverage map:** `.gk-docs/planning/design-adoption-matrix.md` maps every workspace/component/interaction to existing code. All design rows remain planned; no visual completion claimed. Reference rendered/inspected at1440×1000 and390×844; its mobile clipping/hidden panels must be corrected according to written requirements, not copied.
      **Acceptance:** a requirement-by-requirement design-system matrix with code/runtime evidence; full functional regression gate; real imported/saved projects and command parity; linked tree/viewport selection; valid contextual actions; exact numeric edits and undo; novice task completion; keyboard and responsive checks including 200% zoom, focus/announcements, reduced motion and visible units; before/after performance comparison on identical inputs. Rendered desktop/mobile application screens must follow the supplied visual reference. Physical pen/touch and unavailable browsers remain explicit validation limits, not claimed passes.
      **Publication:** commit/push checked design work to Greg's fork, separately from upstream bugfix PRs. Deployment and an upstream design PR require separate authorization. Source reference docs remain inputs, not files to overwrite or claim as our authorship.
      route: substantial/design-implementation

## For Greg

- PR #22's CLA remains Greg's legal decision. It blocks upstream merge, not independent inspection or repairs. No agent may sign it.
- SR08 design overhaul is authorized. First complete working screen needs Greg’s visual approval under his AGENTS rule 16; prepare it before asking. Physical SpaceMouse testing and additional speculative features remain outside autonomous scope.

## New — found while working, not planned

None yet.

## Run log

2026-10-31: Seeded from the completed review. PR #22 is ready under Greg-J. Setup is checking the browser harness and full gate. The runner has not started.

2026-10-31: Native task loop activated after Greenskeeper doctor required missing global skill links. No global links were installed; gk run remains stopped. Missing-link approval is no longer required. Commit 2ceaafe repairs native input simulation; the two previously failing browser suites pass unchanged assertions.

2026-10-31: SR02 published as PR31 after full integration gate and isolated validation. All active verification processes finished. SR03 archive-expansion overlap discovered in upstream PR28 by Jozkah; review rather than duplicate it.
