# Scanner-owner workflow review

2026-10-31. Desktop Chrome, a fresh isolated profile and a generated 20 mm cube with 2,400 triangles. All first-use preferences remained at their defaults. The operator used real file inputs, canvas clicks, buttons and dropdowns; no store mutation or command API created the measurement. This is an interface walkthrough by an informed operator, not a usability study with novice participants.

Evidence: `measurements/novice-workflow.json`; local screenshots and downloads in `e2e-out/review/novice/`; reproducible private driver `e2e-out/review/novice-walkthrough.mjs`.

## What exists and works

- The empty workspace explains importing a scan and fitting geometric features. Files stay local.
- STL import asks for source units and explains why it cannot infer them from the file.
- State-aware hints point to a shape, then creating an element, then another element and a dimension. Pick instructions change with the actual draft. Escape cancels; unfinished work is not committed.
- Two fitted cube faces produced a visible 90.00° angle. The draft showed the preview before commit. Toolbar Undo removed the dimension and Redo restored it.
- Save Project downloaded a `.scanruler` file. Export STEP downloaded the fitted geometry. Both were invoked through the UI. The save support dialog was closed with Escape before exporting.
- Fit details already expose sigma, flatness and the number of accepted points. Help explains surface picking and fitting options. There is useful existing machinery to build on.

## Concrete gaps

| Stage | Observed interface | Consequence for a newcomer |
| --- | --- | --- |
| Choose a purpose | First title is “Fitting elements”; next hint says “Pick a shape to fit” | The user must translate “measure this hole/face spacing” into a geometric fitting operation before help starts. |
| Check scale | Units dialog explains source units; the guided hints move directly to fitting | The path does not ask the user to compare a known physical size with the imported scan. Correct units do not establish scanner accuracy. |
| Choose a method | Plane editor offers fit-to-scan, three points, offset, midplane, coordinates and symmetry | These are legitimate expert tools, but the hint does not explain which one serves a simple scanned flat face. |
| Judge quality | Exact synthetic plane reports `σ 0.0000 mm`, flatness and accepted points | No guided explanation distinguishes agreement with an ideal shape from real measurement accuracy. The synthetic result must not imply a perfect scanner. |
| Recover | Missed canvas pick leaves the draft empty; Escape returns to shape selection; Undo/Redo work | The operations exist, but the learning path does not teach recovery as part of the task. |
| Finish | The hint disappears immediately after the first dimension | Saving, resuming and choosing a useful export are outside the hint ladder. |
| Save | First save opens a support dialog; a support card also occupies the lower-left canvas | It interrupts the finish step. Preserve attribution/support access while keeping the measurement workflow clear in the authorized overhaul. |

The plane draft's primary action and the dimension commit button also require panel scrolling at 1440×900. The supplied design contract's persistent, reachable commit controls address this directly. Context help buttons currently use `tabIndex=-1`; the new design's keyboard-accessible help requirement must cover them.

## Recommended guided path for the design review

Use an optional **Measure my scan** task that operates the existing tools. It is distinct from the supplied **sketch → extrude → exact height → undo** CAD task; a scanner owner should not have to learn solid modeling to measure a scan.

1. **Open and check scale.** Explain source units, show the imported size, and offer a known-length sanity check using existing measurements. Do not silently rescale or invent an accuracy guarantee.
2. **Choose what to measure.** Use plain examples linked to existing tools: a hole diameter uses a cylinder fit; an angle between flat faces uses two planes. Let experienced users skip guidance.
3. **Pick the surface.** Explain the selected shape, highlight the real control, and wait for an actual valid preview. Offer hand marking when automatic surface selection includes the wrong area.
4. **Inspect the fit.** Explain accepted points and surface scatter in plain language, including their limits. Keep exact values and advanced settings available.
5. **Create and measure.** Create the feature, then request only the references required by the chosen dimension. Display units and the live result before committing.
6. **Practice recovery.** Show Undo and Redo on the completed measurement; Back revisits guidance without silently undoing work. Cancel affects only the unfinished operation.
7. **Save and continue.** Explain that a project preserves editable work, a summary carries readings, and STEP exports fitted geometry. Confirm the download was initiated without claiming the browser wrote a chosen disk location. Offer a way to reopen help later.

Reuse the existing hint/state machinery, draft validators and history. Coach marks need Skip and Back and must not block the canvas or take focus away from the current input. The guide must follow actual project state when steps are done out of order or undone. Do not add a separate conflicting model of task completion.

This recommendation feeds the first working SR-08 design for Greg's review. It does not claim a new guided mode has been implemented or approved. The complete overhaul remains authorized; its first finished visual piece still needs the review required by Greg's AGENTS rule 16.
