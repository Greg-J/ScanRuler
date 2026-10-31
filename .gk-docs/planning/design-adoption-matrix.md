# Supplied design system: implementation and proof map

Authorized by Greg on 2026-10-31. Inputs: all eight files in `new-design-system/`. They remain unmodified reference material. Written foundations and component/interaction contracts govern where the illustrative HTML differs. This is an implementation checklist, not a completed-review claim.

## First reviewable piece

A working 3D Measure workspace with the new shell, imported scan, project tree, a fitted-element editor, precise unit-labelled controls, commit/cancel and undo. Use actual scan/fit/session functions, not fake geometry or demo controls. Show desktop and phone layouts plus a runnable local build. Greg's AGENTS rule 16 requires his approval of this finished piece before applying the visual direction to the remaining screens. Independent audits continue while that decision is pending.

Before building: finish work-preservation/access fixes (complete), texture responsiveness fix (published as PR32), and startup/memory baselines (complete). Archive protection is in final verification. Reference rendered and visually inspected in owned headless Chrome at1440×1000 and390×844. Its mobile demo clips Export and hides side panels; production follows the written sheet/access requirements. Fresh-default novice workflow audit completed; see `.gk-docs/reference/novice-workflow.md` for observed gaps and the proposed scanner path.

## Coverage

| Contract | Existing integration points | Required implementation/proof | State |
| --- | --- | --- | --- |
| Tokens and type | `src/styles.css`, `src/ui/icons.tsx`, plugin CSS | Supplied colours, 4px rhythm, 12px minimum, 14px primary controls, outline icons, focus states; no decorative bitmap geometry | Planned |
| Canvas-first shell | `src/App.tsx`, `TopBar`, `StatusStrip`, `shellStore` | 48px top, 56px rail, resizable 248px project/304px context panels, 28px status; at least 70% canvas without expanded context panel | Planned |
| Responsive shell | App/panel layout and scene resize handling | One dock at medium widths; nonmodal bottom sheets below 768px; 44px touch targets; commit reachable below 480px; preserve camera, draft, selection and scroll | Planned |
| Project identity and files | `TopBar`, `ModelSlot`, `StartPane`, `useProject`, import queue | Real open/save/new/export, named consequences before replacement, truthful local recovery/save states, exact retained file bytes | Existing behavior protected; design pending |
| 3D Measure | `Panel`, `DraftEditor`, `ElementRow`, `DimensionSection`, `SectionEditor`, alignment/tolerance/volume sections | Separate tree from active tool; stable valid actions; full fit, pick, construct, section, alignment and dimension capabilities; numeric/preview/undo loop | First working piece planned |
| Selection | `store` draft/reference selections, `SceneManager`, reverse `reStore.selection`, flat stores | One authoritative selection per workspace, mirrored tree/viewport, visible filters where applicable, keyboard tree navigation and rename/visibility; no parallel stale selection model | Planned |
| Context actions | `ELEMENT_KINDS`, workspace/tool validity and plugin APIs | At most four frequent valid actions plus More; fixed ordering for same context; explain useful unavailable prerequisites; no invented CAD operations | Planned |
| Precision | `NumberField`, `KnownDiameterField`, `useUnits`, reverse `ExprInput`/`reLength` | Units by values; preserve internal precision and actual conversion; labelled fields, inline errors; equivalent numeric/gizmo parameters and keyboard adjustments | Planned |
| 2D Measure and sections | `FlatPanel`, `FlatDraftEditor`, `FlatDimensionSection`, `FlatViewer`, section views | Image calibration and section sheets, edge finding, dimensions/notes, drafting, SVG/DXF/report export with context panels and clear scale warnings | Planned |
| Surface deviation | `DeviationPanel`, `TargetSection`, `CompareView`, map/mark/probe tools | Scan/reference roles, alignment, comparison maps, clipping, probes and reports; usable split-view selection | Planned |
| Wall thickness | `ThicknessPanel`, maps and probe tools | Start/parameters/progress/result states, visible units and error recovery; preserve worker results | Planned |
| Mesh tools | `plugins/mesh-tools` UI and runtime | All current trim/edit/reduce/repair controls and previews, selection and commit/undo under shared shell | Planned |
| Reverse engineering | `plugins/reverse/ui`, `reStore`, plugin runtime | Bodies, sketches, features, parameters, notes, history/playback; every existing feature editor; preserve kernel and expression semantics | Planned |
| Command discovery | `commands` catalog, workspace actions, global shortcuts | Visible search and shortcut; names/synonyms/categories; keyboard results; prerequisite explanations; invoke same existing session actions | Planned |
| Novice guidance | `core/hints.ts`, `useHints`, `stageHints`, `StartPane` | Audit actual scanner-owner path first. Existing hints stop at first dimension and 2D import. New design requires action-driven onboarding, Skip/Back, contextual help reopened later, and real sample/task paths | Runtime audit complete; guided-path proposal ready for first-piece review |
| Modal and transient UI | `Modal`, Settings, Units, agent consent, imprint/support, `InfoDot`, menus, recovery/busy/error UI | Adopt tokens throughout; native focus containment retained; accessible anchored menus; persistent blocking errors and preserved fields | Focus repair complete; design pending |
| Navigation and input | `ViewBar`, scene navigation/SpaceMouse/touch handlers, sketch viewport | Visible fit/orientation/pan/zoom alternatives, preserve supported navigation presets, pointer cancellation, no hover commits | Planned; physical hardware unavailable |
| Accessibility | Shell landmarks, tree, numeric fields, live regions, dialogs | Keyboard-only completion, focus restoration, 200% zoom, contrast and targets, announcements, reduced-motion camera/panels; canvas operations have DOM equivalents | Planned |
| Verification and performance | Existing full gate, new targeted browser cases, recorded startup/import/memory profiles | Feature and command parity, imported/saved projects, exact values/undo, novice task, desktop/mobile screenshots; compare identical workloads after overhaul | Planned |

## Interpretation boundaries

- Preserve supported capabilities. A reference example that names an unsupported operation is not authorization to invent a new geometry engine or cloud service.
- Generic sketch onboarding belongs to the existing reverse workspace. Scanner onboarding must explain measurement tasks, file units/scale, fitting versus raw points, confidence and saving. Runtime evidence determines where assistance is needed.
- The reference's illustrative unit switch changes labels only. Production continues to convert through the existing unit model.
- The reference's tiny/all-caps demo labels and breakpoint-hidden controls do not override its written minimum sizes or sheet-access requirements.
- Existing optional workspaces remain discoverable and respect the plugin contract. Do not violate plugin boundaries to make a unified-looking shell.
- Browser tests use owned profiles and ephemeral servers. No personal tabs, deployment, or upstream design PR is authorized. Physical pen/touch/SpaceMouse and unavailable browsers remain unverified.
