# Design review: build 01

Source: d87bdae, 2026-10-31. Working 3D Measure implementation of Greg's supplied design system. The original reference directory remains unmodified. Full application adoption remains open pending Greg's first-piece approval under his AGENTS rule 16.

## Try the working screen

Local review URL: http://127.0.0.1:5198/ . Numbered production copy: `e2e-out/review/build-01`. If the owned review process has ended, run `npm run preview -- --outDir e2e-out/review/build-01 --host 127.0.0.1 --port 5198 --strictPort` from this project. Do not stop another process to free that port.

1. Choose **Try a measurement sample**, then **Plane**, and click the broad face.
2. Create the plane, select it in Project, change an extension value, and use Undo/Redo.
3. Resize the window and check whether the project tree, tool panel and mobile sheets feel right.

The sample is original ideal geometry, not a real scan or scanner accuracy validation. It uses the real importer and fitter. Existing geometry operations and project formats are retained.

## Review findings and implemented value

| Area | What works well | Improvement or remaining need |
| --- | --- | --- |
| Measurement | Broad fit, dimension, alignment and export capabilities; unit conversion and fit maths have extensive regressions | Keep exact numeric controls and preview/commit/undo central. Build 01 separates project selection from the active tool and links tree/viewport selection. |
| Architecture | Geometry separated from rendering; optional workspaces and workers; transactional import/recovery paths | Repaired destructive replacement, modal input leakage, archive preallocation and blocking texture extraction. Avoid architectural rewrites without evidence. |
| Performance | Expensive work has worker boundaries; optional export writers load on demand | Removed an accidental eager CAD import and a redundant mesh index copy. Gains are measured and modest; remaining full-app memory and real scan workloads need evidence. |
| Novice workflow | State-aware hints, pick instructions and fit previews already exist | Hints stop at first dimension. Scale sanity, task/method choice, fit-quality interpretation, recovery and saving need one connected guide. Build 01 adds a real sample but is not that full guided mode. |
| Interface | Existing tools expose precise inputs and many useful workflows | New Measure shell provides resizable panels, searchable actions, keyboard tree/rename and phone sheets. Other workspaces still need the supplied design system. |

## Verified

Final full gate passed: 3,115 unit tests, 123 MCP tests, production build and all available browser suites. The dedicated Measure suite passed 40 assertions including actual sample import, two plane fits and a 90° dimension, viewport/tree selection, rename, visibility, exact 2.5 mm edits, undo/redo, draft preservation, resizing, desktop/tablet/phone, equivalent 200% layout, menu focus and reduced motion. Production sample chunk loading passed desktop and phone. A pre-existing preview stripe defect was reproduced and fixed separately in upstream PR40.

Cold usable UI median, before → build 01: default 1,984.2 → 1,926.7 ms; plugins disabled 1,950.7 → 1,931.7 ms. Three fresh Chrome runs per mode, 100 ms latency, 1 MB/s, gzip, 4x main-thread slowdown. Initial encoded resources increased 1,106,648 → 1,115,229 bytes (+0.78%). These small shared-Mac samples do not establish a speed gain. Raw data: [design-build-01.json](measurements/design-build-01.json).

Limits: private scooter scan unavailable; Chrome only; no physical scanner, SpaceMouse, touch hardware or human novice study. Some test categories are explicitly skipped. No deployed site or upstream design PR. All GPU/timing work stops after handing over this build until Greg responds.

## Upstream bug repairs

All submitted as Greg-J, separately from design and automation metadata: [#22](https://github.com/CNCKitchen/ScanRuler/pull/22), [#23](https://github.com/CNCKitchen/ScanRuler/pull/23), [#31](https://github.com/CNCKitchen/ScanRuler/pull/31), [#32](https://github.com/CNCKitchen/ScanRuler/pull/32), [#40](https://github.com/CNCKitchen/ScanRuler/pull/40). These address welding/Enter handling, replacement protection, modal focus, texture/archive imports and preview depth conflicts. The CLA remains Greg's personal legal decision. No merges or signatures performed.

Next after visual approval: complete the coverage in [the adoption matrix](../planning/design-adoption-matrix.md), preserving every supported workspace's functionality. Implement the justified scanner guide described in [the novice audit](novice-workflow.md) within the approved design direction; do not invent additional geometry features.
