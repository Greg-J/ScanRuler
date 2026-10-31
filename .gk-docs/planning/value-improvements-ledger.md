---
owned: src/** plugins/** tests/** scripts/** mcp/** CHANGELOG.md package.json package-lock.json vite.config.ts .gk-docs/** TODO.md CLAUDE.md AGENTS.md .greenskeeper.json
---
# ScanRuler: evidence-led inspection and repair

Maintain the existing measurement product through repeated inspect → reproduce → repair → verify passes. The October 31 review exercised imports, keyboard controls, save/reopen/export, recovery and agent workflows, read the architecture, measured bundle size and reproduced four bugs. PR #22 already fixes signed-zero welding and units-dialog Enter handling. Remaining evidence covers destructive scan replacement, modal focus escape, main-thread 3MF decompression and eager workspace loading. The Mac browser harness had two independently reproduced native-input failures, repaired during setup. Real private scan fixtures, physical SpaceMouse, Safari/Firefox, and user taste have not been verified.

**7 planned tasks.** New work must earn its place with a reproducible defect or a measured user-visible bottleneck. No feature invention.

## How to work this list

1. Protect work first, then keyboard access, then responsiveness. Finish the selected item before searching for more. No new features, redesigns, preferences, vendors or unrelated refactors.
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
Protect work and access       0 / 2
Measure and reduce overhead   0 / 3
Inspect workflows and guidance 0 / 2
                             ---------
                             0 / 7 planned tasks
Discovered                   0 / 0
```

Last touched: 2026-10-31; native loop active. SR-01 product commit 2f9a99f passed the full gate (3,096 unit tests, 123 MCP tests, build and executable browser suites; private scooter fixture skipped). Clean upstream-based validation is running in session 18049 before PR publication. Its 12 browser assertions include absent-plugin project data; 7 guard tests pass.

## Protect work and access

- [ ] **SR-01** · high · `src/app/scanImport.ts:138`, `src/App.tsx:147`
      A valid replacement scan clears measurements and all undo history without asking, unlike opening a project. Reproduced with one existing point: elements 1 → 0 and no dialog.
      **Fix:** make destructive user imports preserve work on cancellation and explicitly resolve replacement before commit, covering drop/load/replace/address/plugin entry paths. Audit equivalent image/reference replacements for the same data-loss property. Preserve the agent's existing discard-required contract and avoid duplicate prompts for already-authorized agent actions. A failed import must still preserve worker/scene/source/history state.
      refs: `docs/manual.md`, `CONTRIBUTING.md`
      **Acceptance:** Browser regressions must show Cancel preserves measurements, source bytes and undo history; accepted replacement happens once; malformed replacement remains transactional; agent discard refusal and explicit acceptance still work.
      route: substantial/agentic

- [ ] **SR-02** · high · `src/ui/SettingsModal.tsx:149`, `src/ui/UnitsModal.tsx`, `src/ui/AgentDataWarning.tsx`, `src/ui/SupportCard.tsx`, `src/ui/Imprint.tsx`
      Settings opens with focus on its trigger and Tab visits background controls. Inspect every actual modal for the same defect, including stacked dialogs; do not convert nonmodal popovers.
      **Fix:** share focus entry, containment, restoration and background interaction protection across actual modals while preserving Escape semantics and native focused-control activation. Preserve the visual design and screen-reader labels. Do not reintroduce the Enter-on-Cancel bug fixed in PR #22.
      refs: `docs/manual.md`, `.gk-docs/reference/runbooks/run-and-publication.md`
      **Acceptance:** Real keyboard tests must cover Tab and Shift+Tab wrapping, restoration to the opener, Escape with an underlying draft, nested agent consent, Cancel versus Open, and no background action while a modal is active.
      route: substantial/agentic

## Measure and reduce overhead

- [ ] **SR-03** · medium · `src/app/scanFiles.ts:97`, `src/core/parsers/threemf.ts:394`
      3MF texture entries decompress synchronously on the UI thread; archive expansion is not bounded like project archives. This is a source-confirmed risk, not yet a measured stall.
      **Fix:** measure a representative textured 3MF first, then remove demonstrated blocking work and protect allocation from malformed archive metadata using existing format/resource contracts. Preserve colors, image companions, transactional imports and actionable errors. Do not invent arbitrary product tiers or silently reject ordinary supported files. If no material stall is reproduced, document that and limit changes to proven robustness defects.
      refs: `docs/development.md`, `src/core/project/archive.ts`
      **Acceptance:** Same input before/after main-thread blocking and memory observations; real textured import/save/reopen; malformed archive rejection without losing the current project. Do not allocate huge adversarial buffers just to test rejection.
      route: substantial/agentic

- [ ] **SR-04** · medium · `src/plugins/registry.ts:14`
      The baseline main JS bundle is 3.61 MB raw / 1.15 MB gzip and eagerly imports plugin entries. A user-visible startup improvement has not yet been measured.
      **Fix:** measure cold-start resource loading and usable-interface latency on an identical constrained test profile. Only split code when measurements show a worthwhile improvement, preserving workspace registration, hooks, command availability, project restore and headless/plugin-free modes. No framework migration or rewrite. A measured no-change conclusion is acceptable.
      refs: `docs/development.md`, `plugins/README.md`
      **Acceptance:** Record identical before/after transfer and startup metrics, first workspace activation, saved-project opening, plugins=none and agent command behavior. The existing production exporter-laziness test must stay green.
      route: substantial/agentic

- [ ] **SR-05** · medium · `src/core/parsers/stl.ts`, `src/core/geometry/weld.ts`, `src/app/imports.ts`
      Source accounting estimates roughly 804 MB of input/welding buffers for a 250 MB, five-million-triangle STL before later geometry allocations; actual peak memory has not been measured.
      **Fix:** profile generated meshes of increasing size without exhausting this shared Mac. Reduce a proven redundant allocation or copy only if it produces a meaningful memory/time reduction while preserving exact geometry and failure recovery. Do not reduce input precision, fit fidelity, tolerances or rendering resolution to improve the score. Otherwise retain the implementation and report the evidence.
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
      **Acceptance:** show what already guides the person, where a novice gets stuck (with concrete UI evidence), and a proposed end-to-end guided workflow only where gaps justify it. Present that workflow to Greg for product/taste review before building a new mode. No speculative feature implementation; independently reproducible bugs still get repairs.
      **Initial evidence (source only):** `src/core/hints.ts` already implements a state-aware next-control ladder; hints default on and retire after two completed visits (`src/state/hintStore.ts`). 3D Measure ends guidance at the first dimension; 2D currently guides image import only. `src/app/stageHints.ts` narrates pick/editor steps. A novice UI walkthrough is still required.
      route: substantial/product-review

## For Greg

- PR #22's CLA remains Greg's legal decision. It blocks upstream merge, not independent inspection or repairs. No agent may sign it.
- Visual redesigns, new feature requests and physical SpaceMouse testing are outside this run. Bring a concrete proposal only if evidence warrants it.

## New — found while working, not planned

None yet.

## Run log

2026-10-31: Seeded from the completed review. PR #22 is ready under Greg-J. Setup is checking the browser harness and full gate. The runner has not started.

2026-10-31: Native task loop activated after Greenskeeper doctor required missing global skill links. No global links were installed; gk run remains stopped. Missing-link approval is no longer required. Commit 2ceaafe repairs native input simulation; the two previously failing browser suites pass unchanged assertions.
