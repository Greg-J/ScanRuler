// SPDX-License-Identifier: AGPL-3.0-only
// A page-side import of a builder constant once pulled the entire CAD build
// implementation into the initial bundle, despite its lazy worker/local paths.
import { expect, it } from 'vitest'
import { build } from 'vite'
import { fileURLToPath } from 'node:url'

it('keeps CAD build and kernel implementation out of the initial page chunks', async () => {
  const root = fileURLToPath(new URL('../../../', import.meta.url))
  const initialModules = new Set<string>()
  await build({
    root,
    logLevel: 'silent',
    build: { write: false },
    plugins: [{
      name: 'check-initial-cad-code',
      generateBundle(_, bundle) {
        const seen = new Set<string>()
        const visit = (name: string) => {
          if (seen.has(name)) return
          seen.add(name)
          const chunk = bundle[name]
          if (chunk?.type !== 'chunk') return
          for (const id of Object.keys(chunk.modules)) initialModules.add(id)
          for (const imported of chunk.imports) visit(imported)
        }
        for (const chunk of Object.values(bundle)) if (chunk.type === 'chunk' && chunk.isEntry) visit(chunk.fileName)
      },
    }],
  })
  expect(initialModules.size).toBeGreaterThan(0)
  for (const name of ['build.ts', 'reService.ts', 'kernel.ts']) {
    expect(initialModules.has(fileURLToPath(new URL(`../core/${name}`, import.meta.url))), name).toBe(false)
  }
}, 60_000)
