// SPDX-License-Identifier: AGPL-3.0-only
// STL parse + graph assembly, including a retained source copy. Nine fresh
// bounded Node processes, sequentially; reports RSS and exact output hashes.
// This excludes browser rendering/GPU memory. Do not run beside timing jobs.
import { build } from 'esbuild'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const directory = mkdtempSync(join(tmpdir(), 'scanruler-memory-bench-'))
const entry = join(directory, 'case.mjs')
try {
  await build({
    entryPoints: [fileURLToPath(new URL('./bench-mesh-memory-case.ts', import.meta.url))],
    bundle: true, platform: 'node', format: 'esm', outfile: entry, logLevel: 'silent',
  })
  for (const n of [128, 512, 768]) for (let run = 0; run < 3; run++) {
    const result = spawnSync(process.execPath, ['--expose-gc', '--max-old-space-size=1024', entry, String(n)], {
      encoding: 'utf8', timeout: 120_000, maxBuffer: 1024 * 1024,
    })
    if (result.status !== 0) throw new Error(result.stderr || String(result.error))
    console.log(JSON.stringify({ run, ...JSON.parse(result.stdout) }))
  }
} finally { rmSync(directory, { recursive: true, force: true }) }
