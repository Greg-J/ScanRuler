# Upstream design proposal

2026-11-01. Greg authorized offering the complete redesign upstream. Published
[draft PR #71](https://github.com/CNCKitchen/ScanRuler/pull/71) as **Greg-J**.
Verified OPEN/draft, base main, branch `feat/guided-workspace-design`, head
`bc2bd04e1f6c1fb035693b42800a5627c66b98bc`, nine commits and all 114 files.
The complete paginated file list excludes automation records and the supplied
`new-design-system/` inputs. GitHub attributes the commits to Greg-J.

The isolated worktree is `/tmp/scanruler-pr-design-20261101`, based on upstream
`5c1f2f96b7ac336d5c2bad64148ae19790b0443c` (0.9.4). It preserves upstream's
sample scan, small-feature sizing, Mac modifier handling and note provenance.
Modal focus (#31) and note CSS isolation (#70) are separate prerequisite
commits. Other mesh-welding, replacement-import, 3MF and preview-depth fixes
remain in their focused PRs. The proposal includes four actual app screenshots,
manual updates, checkout instructions and the verification limits.

## Verification

Plugin-boundary and units checks, full unit suite, 127 MCP tests with current
lockfile dependencies, TypeScript and production build passed. The final
`npm run e2e:ci` exited 0: 25 executed browser suites passed; the additional
private scooter-cover check was skipped because its scan is unavailable.
An additional production run of the complete workspace/guide flow passed,
including save/reopen, thickness and deviation, dark mode and narrow layouts.
Production sample import also passes at 1440×900, 390×844, 320×568 and 720×450.

Integration reproduced two harness defects: a headless Mac selection shortcut
edited the last digit instead of replacing a number, and a small-feature test
clicked coordinates cached before the new tool panel resized the canvas.
Native Select All and projection of the same world-space ray fix these; the
geometry assertions, camera setup and numerical tolerances are retained.
Both focused suites passed, followed by the complete browser gate.

A real phone overlap appeared when both sample choices were present. Empty-state
content and wrapped viewport controls now occupy separate grid rows, so import
and sample buttons scroll in an unobstructed area. The production phone check
failed before this fix and passes after it. The initial dark canvas also now
matches the final dark theme before styles load.

The final browser log is `/tmp/scanruler-pr-final-browser.log`; production proof
is `/tmp/scanruler-pr-production.log`. Runtime screenshots are in the clean
worktree's `e2e-out/`, with four reviewed copies committed under
`docs/images/workspace-design/`. No new performance claim: the earlier timing
numbers describe local build 03, not this upstream port. Physical scanner
accuracy, Safari/Firefox, physical input hardware and human novice tests remain
unverified.

## Local handoff and publication status

Greg requested stopping ports 5198 and 5199; both are stopped and verified.
The unchanged local build 03 remains at http://127.0.0.1:5200/ and returned
HTTP 200 after publication. All temporary verification servers have closed.
The root automation branch remains on its reviewed 0.9.2 implementation;
current-upstream source changes are isolated in the PR worktree.

No deployment, merge or CLA signature was performed. CONTRIBUTING.md says
upstream applies accepted patches in its development repository, closes the
public PR, and credits contributors in the next published commit. Greg alone
can decide and provide any required CLA signature.
