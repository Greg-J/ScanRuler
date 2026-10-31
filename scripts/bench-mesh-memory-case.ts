// SPDX-License-Identifier: AGPL-3.0-only
// One bounded import-core sample; invoked by bench-mesh-memory.mjs in a
// fresh process so peak RSS is not inherited from a preceding mesh.
import { parseSTL } from '../src/core/parsers/stl'
import { buildMeshGraph } from '../src/core/geometry/buildGraph'
import { createHash } from 'node:crypto'

const n = Number(process.argv[2])
if (![128, 512, 768].includes(n)) throw new Error('Choose one of the bounded benchmark grid sizes.')
const count = 2 * n * n
const bytes = new ArrayBuffer(84 + 50 * count), view = new DataView(bytes)
view.setUint32(80, count, true)
let at = 84
const triangle = (a: number[], b: number[], c: number[]) => {
  at += 12
  for (const vertex of [a, b, c]) for (const coordinate of vertex) {
    view.setFloat32(at, coordinate, true); at += 4
  }
  at += 2
}
for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
  triangle([x, y, 0], [x + 1, y, 0], [x + 1, y + 1, 0])
  triangle([x, y, 0], [x + 1, y + 1, 0], [x, y + 1, 0])
}
// Model the retained source copy, in addition to the bytes sent for parsing.
// This is not a measurement of the complete browser, worker and GPU footprint.
const source = bytes.slice(0)
global.gc?.()
const snapshot = () => ({
  rss: process.memoryUsage().rss,
  arrayBuffers: process.memoryUsage().arrayBuffers,
  maxRSSKiB: process.resourceUsage().maxRSS,
})
const stages = [{ name: 'input + retained source', ...snapshot() }]
const start = performance.now()
const parsed = parseSTL(bytes)
const parseMs = performance.now() - start
stages.push({ name: 'parsed soup', ...snapshot() })
const graphStart = performance.now()
const graph = buildMeshGraph(parsed, (name) => stages.push({ name, ...snapshot() }))
const graphMs = performance.now() - graphStart
stages.push({ name: 'graph complete', ...snapshot() })
const digest = createHash('sha256')
for (const array of [graph.positions, graph.indices, graph.normals, graph.adjOffsets, graph.adjList]) {
  digest.update(new Uint8Array(array.buffer, array.byteOffset, array.byteLength))
}
if (graph.triangleCount !== count || graph.vertexCount !== (n + 1) ** 2) throw new Error('Unexpected topology')
console.log(JSON.stringify({ n, triangles: count, fileBytes: bytes.byteLength, sourceBytes: source.byteLength,
  parsedBytes: parsed.positions.byteLength, parseMs, graphMs, stages, vertices: graph.vertexCount, sha256: digest.digest('hex') }))
