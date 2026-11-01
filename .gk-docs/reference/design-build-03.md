# Design review: build 03

2026-11-01. Full-workspace continuation approved by Greg. Source reference: supplied `new-design-system/`, preserved unmodified. Source: `059702612fab754241f959ff507b2a744a1aad71`. Production copy: `e2e-out/review/build-03`. Local review: http://127.0.0.1:5200/.

## What changed

All six workspaces now use the same shell: 3D Measure, Surface deviation, Wall thickness, 2D Measure, Reverse engineering and Mesh tools. Changing workspace no longer restores the old layout. Project content and active-tool settings have separate resizable docks; smaller layouts use sheets. Editors retain their original operations, geometry validators and commit handlers. Primary actions stay in a footer outside the scrolling settings. The parts tree remains available while a mesh tool is active.

Dark mode is darker throughout: canvas `#080c12`, panels `#121820`, outer chrome `#0c1017`. Shared text, borders, focus accents and dialog styling remain readable. The start pane fills its available stage, and the small-screen top bar no longer overflows at 320 px.

Command search is available from every workspace and Ctrl/Command K. Measure search invokes existing actions with prerequisites. Other workspaces navigate to actual controls, revealing the right dock and opening More disclosures. File → Export filters those destinations. Search does not execute a destructive edit just by choosing a result. Measure, 2D, Mesh and Reverse show a short tool list plus More.

The optional Guided measurement panel covers import, scale, measurement choice, surface fitting, fit-quality interpretation, dimensions, Undo/Redo and editable project download. It includes angle, parallel-face spacing and diameter choices. Back reviews instructions; Skip closes guidance. The real sample still goes through the normal importer and fitter. Reopening a source resets scale acknowledgement even when its filename is unchanged; a reopened project without history explains how to practise recovery after a small edit. Fit scatter is explicitly distinguished from scanner accuracy.

2D viewport and tree selection now share the existing 2D store, including additive selection and undoable rename. Selection alone does not create undo steps. The reverse body tree supports arrow/Home/End navigation, keyboard selection and F2 rename using existing body state. Existing geometry/edit/export capabilities remain in place; the source review found no removed existing control IDs.

A separate pre-existing bug was found by the 2D workflow check: reverse-note CSS moved 2D labels 34 px right and 17 px up. Giving reverse notes their own CSS class restores the clicked anchor. The new regression fails on upstream 5c1f2f9 before the fix and passes at zero offset after it; reverse-note behavior also passes its existing browser suite. Published separately as [PR #70](https://github.com/CNCKitchen/ScanRuler/pull/70), author Greg-J, clean `2537b18`, integration `9b71470`.

## Proof and limits

Final gate passed: 3,116 unit tests (24 skipped), 123 MCP tests, production build and all 27 configured browser suites. Additional production runs of the full workspace/guide and note-style checks passed. The exact source commit is in `build.json`; the production copy is byte-for-byte verified against the tested output.

Build 02 → build 03 startup medians: default 1,888.5 → 1,885.3 ms; plugins disabled 1,854.8 → 1,852.9 ms. Initial encoded JS/CSS/WASM resources 1,115,287 → 1,120,603 bytes (+5,316 bytes, 0.48%). Three cold runs per mode with the same constrained profile. This is effectively unchanged startup, not evidence of a speed gain. [Raw measurements](measurements/design-build-03.json).

The earlier integration runs exposed a hidden More-tool test click and an asynchronous tally-pin assertion. The harness now opens the visible disclosure and waits for the original marker assertion. Mesh parts now deliberately remain in Project during an edit, so its layout assertion checks the new tree/context contract. Geometry assertions and tolerances were retained. The note-anchor test failed on the actual product and current upstream before the CSS fix. The guide same-name reopen check failed before its scan-load reset and passes after it.

The browser checks use owned headless Chrome profiles, synthetic geometry and actual UI operations. They cover real guided measurement and download/reopen, wall thickness and fitted-surface deviation maps, 2D image calibration/drafting/counts/notes/SVG/DXF, mesh edits/trim/export, reverse body-tree and notes, project recovery, units and command behavior. Layout coverage includes desktop/tablet/phone/short windows and the first-piece equivalent 200% layout and reduced-motion checks.

No physical scanner, touch/pen/SpaceMouse hardware, Safari/Firefox or human novice study was performed. Private scan fixtures remain unavailable and skipped. Existing numeric conversion and validation behavior was retained; no new expression grammar or document-precision setting was invented. Upstream advanced to 0.9.4 during this work; the redesign fork remains based on the reviewed 0.9.2 line, while the isolated note-style PR is based on current upstream.

No deployment, upstream design PR, merge or CLA signature. Review builds 01 and 02 remain unchanged for comparison. After handing over build 03, do not run further GPU/timing work until Greg responds.

## Review checks

1. In Settings, choose Dark; switch through the workspaces and compare the canvas/panel contrast.
2. In 3D Measure, open Guided measurement and try the sample through measuring and saving.
3. Resize the window and check Project/context sheets, More tools and the persistent action footer.

If the owned preview has ended, from this project run `npm run preview -- --outDir e2e-out/review/build-03 --host 127.0.0.1 --port 5200 --strictPort`. Do not stop another process to free the port.
